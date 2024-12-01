from django.urls import path
from . import views 

urlpatterns = (
  
    path('upload/', views.upload_and_calculate, name='upload_and_calculate'),
)
