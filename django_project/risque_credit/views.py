from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import pandas as pd
import numpy as np
from scipy.stats import norm
from rest_framework.decorators import api_view
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.conf import settings
from utils.encryption import encrypt_data, decrypt_data
from io import BytesIO
from .models import CreditRiskAssessment
from django.core.files.base import ContentFile

def CR_ASRF(data, corr=0, LGD=0.45, LGD_down=0.45, size_adj=0):
    df = pd.DataFrame(data)
    df['maturity'] = df['maturity'].apply(lambda x: 1 if pd.isna(x) or x < 0 else x)
    df = df[df['PD'].notna()]
    df = df[df['PD'] != 1]
    df = df[df['PD'] != 0]
    df['EL'] = df['PD'] * df['EAD'] * LGD
    df['rho'] = 0.12 * (1 - np.exp(-50 * df['PD'])) / (1 - np.exp(-50)) + 0.24 * (1 - (1 - np.exp(-50 * df['PD'])) / (1 - np.exp(-50))) - size_adj
    df['WCDF'] = norm.cdf((norm.ppf(df['PD']) + np.sqrt(df['rho']) * norm.ppf(0.999)) / np.sqrt(1 - df['rho']))
    df['WCLoss'] = LGD_down * df['EAD'] * df['WCDF']
    df['b'] = (0.11852 - 0.05478 * np.log(df['PD'])) ** 2
    df['MatAdj'] = (1 + ((df['maturity'] / 365) - 2.5) * df['b']) / (1 - 1.5 * df['b'])
    df['CE_sans_matuadj'] = (df['WCLoss'] - df['EL']) * np.minimum(1, df['maturity'] / 365)
    df['CE'] = df['CE_sans_matuadj'] * df['MatAdj']
    return df

@api_view(['POST'])
def upload_and_calculate_credit(request):
    required_columns = ['ID unique', 'Segment', 'EAD', 'PD', 'maturity', 'LGD']
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)

    file = request.FILES['file']
    if isinstance(file, InMemoryUploadedFile):
        assessment = CreditRiskAssessment.objects.create(
            file_name=file.name,
            status='pending'
        )
        try:
            file_data = file.read()
            encrypted_data = encrypt_data(file_data, settings.ENCRYPTION_KEY)
            decrypted_data = decrypt_data(encrypted_data, settings.ENCRYPTION_KEY)
            data_op = pd.read_excel(BytesIO(decrypted_data))

            if not all(column in data_op.columns for column in required_columns):
                assessment.status = 'error'
                assessment.error_message = 'Invalid file format. Required columns are missing.'
                assessment.save()
                return JsonResponse({'error': 'Invalid file format. Required columns are missing.'}, status=400)
            
            results_df = CR_ASRF(data_op)
            
            output = BytesIO()
            with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
                results_df.to_excel(writer, sheet_name='Results', index=False)
            
            output.seek(0)
            result_content = output.getvalue()
            assessment.result_file.save(f'{file.name}_results.xlsx', ContentFile(result_content))
            assessment.status = 'processed'
            assessment.processed_at = pd.Timestamp.now()
            assessment.save()

            response = HttpResponse(result_content, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = f'attachment; filename={file.name}_results.xlsx'
            return response
        except Exception as e:
            assessment.status = 'error'
            assessment.error_message = str(e)
            assessment.save()
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)