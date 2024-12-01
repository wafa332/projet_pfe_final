import pandas as pd
import numpy as np
from scipy.stats import lognorm, poisson, gaussian_kde
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from django.core.files.uploadedfile import InMemoryUploadedFile
from cryptography.fernet import Fernet
from django.conf import settings
from utils.encryption import encrypt_data, decrypt_data
from io import BytesIO

def estimate_lognormal_params(data):
    positive_data = data[data > 0]
    shape, loc, scale = lognorm.fit(positive_data, floc=0)
    meanlog = np.log(scale)
    sdlog = shape
    return meanlog, sdlog

def calculate_results(data_op):
    results = {}

    freq = data_op['Moyenne_Annee_detection'].value_counts().sort_index()
    tab_freq = freq.reset_index()
    tab_freq.columns = ['Annees', 'Frequence_Incidents']

    if len(tab_freq) > 7:
        tab_freq2 = tab_freq.drop(index=7)
    else:
        tab_freq2 = tab_freq

    pois = poisson(mu=tab_freq2['Frequence_Incidents'].mean())
    simpois = pois.rvs(size=10000)

    top10 = data_op.nlargest(10, 'Somme_montant_Euro_signe')[['ID', 'Somme_montant_Euro_signe']]
    top10.columns = ['ID_incident', 'Somme_montant_Euro_signe']

    meanlog, sdlog = estimate_lognormal_params(data_op['Somme_montant_Euro_signe'])
    threshold = data_op['Somme_montant_Euro_signe'].min()

    simlog = lognorm(s=sdlog, scale=np.exp(meanlog)).rvs(size=simpois.sum()) + threshold
    perte = [np.sum(lognorm(s=sdlog, scale=np.exp(meanlog)).rvs(size=n) + threshold) for n in simpois]

    perte = np.array(perte)
    VaR = np.percentile(perte, 50)
    EL = np.mean(perte)

    kde = gaussian_kde(perte)
    density_x = np.linspace(min(perte), max(perte), 1000)
    density_y = kde(density_x)

    results['var_el'] = [{"VaR": VaR, "EL": EL}]
    results['top10'] = top10.to_dict(orient='records')
    results['freq_dist'] = tab_freq2.to_dict(orient='records')
    results['perte'] = pd.DataFrame(perte, columns=['perte']).to_dict(orient='records')
    results['density'] = pd.DataFrame({'x': density_x, 'y': density_y}).to_dict(orient='records')

    return results

@api_view(['POST'])
def upload_and_calculate(request):
    required_columns = ['ID', 'Somme_montant_Euro_signe', 'Moyenne_Annee_detection']
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No file provided'}, status=400)

    file = request.FILES['file']
    if isinstance(file, InMemoryUploadedFile):
        try:
            file_data = file.read()
            encrypted_data = encrypt_data(file_data, settings.ENCRYPTION_KEY)
            decrypted_data = decrypt_data(encrypted_data, settings.ENCRYPTION_KEY)
            data_op = pd.read_excel(BytesIO(decrypted_data))

            if not all(column in data_op.columns for column in required_columns):
                return JsonResponse({'error': 'Invalid file format. Required columns are missing.'}, status=400)

            results = calculate_results(data_op)
            
            output = BytesIO()
            with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
                pd.DataFrame(results['var_el']).to_excel(writer, sheet_name='var_el', index=False)
                pd.DataFrame(results['top10']).to_excel(writer, sheet_name='top10', index=False)
                pd.DataFrame(results['freq_dist']).to_excel(writer, sheet_name='freq_dist', index=False)
                pd.DataFrame(results['perte']).to_excel(writer, sheet_name='perte', index=False)
                pd.DataFrame(results['density']).to_excel(writer, sheet_name='density', index=False)

            output.seek(0)
            
            response = HttpResponse(output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            response['Content-Disposition'] = 'attachment; filename=operationnel_results.xlsx'
            return response
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request'}, status=400)
