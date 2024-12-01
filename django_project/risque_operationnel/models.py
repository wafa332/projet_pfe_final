
from django.db import models

class Incident(models.Model):
    id_incident = models.AutoField(primary_key=True)
    somme_montant_euro_signe = models.FloatField()
    moyenne_annee_detection = models.IntegerField()

class VaREl(models.Model):
    var = models.FloatField()
    el = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

class TopIncident(models.Model):
    id_incident = models.IntegerField()
    somme_montant_euro_signe = models.FloatField()

class FrequencyDistribution(models.Model):
    annee = models.IntegerField()
    frequence_incidents = models.IntegerField()

class LossDensity(models.Model):
    x = models.FloatField()
    y = models.FloatField()
