# risque_credit/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_and_calculate_credit, name='upload_and_calculate_credit'),
]
