from rest_framework import serializers
from .models import Incident, VaREl, TopIncident, FrequencyDistribution, LossDensity

class IncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incident
        fields = ['id_incident', 'somme_montant_euro_signe', 'moyenne_annee_detection']

class VaRElSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaREl
        fields = ['var', 'el', 'created_at']

class TopIncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopIncident
        fields = ['id_incident', 'somme_montant_euro_signe']

class FrequencyDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrequencyDistribution
        fields = ['annee', 'frequence_incidents']

class LossDensitySerializer(serializers.ModelSerializer):
    class Meta:
        model = LossDensity
        fields = ['x', 'y']
