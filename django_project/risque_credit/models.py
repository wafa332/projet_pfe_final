from django.db import models

class CreditRiskAssessment(models.Model):
    file_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
    result_file = models.FileField(upload_to='credit_risk_results/', null=True, blank=True)
    status = models.CharField(max_length=50, choices=[('pending', 'Pending'), ('processed', 'Processed')], default='pending')
    error_message = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.file_name
