"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from allauth.account.views import ConfirmEmailView as CustomConfirmEmailView, EmailVerificationSentView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('risque_operationnel/', include('risque_operationnel.urls')),
    path('risque_credit/', include('risque_credit.urls')),
     path('accounts/', include('accounts.urls')),
     
     # Chemin personnalisé pour la confirmation de l'email
    re_path(r'^accounts/confirm-email/(?P<key>[-:\w]+)/$', CustomConfirmEmailView.as_view(), name='account_confirm_email'),
    path('accounts/email-verification-sent/', EmailVerificationSentView.as_view(), name='account_email_verification_sent'),
]
