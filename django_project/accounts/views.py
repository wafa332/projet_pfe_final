
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import CustomUser
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from allauth.account.utils import send_email_confirmation
from allauth.account.views import ConfirmEmailView
from django.http import HttpResponseRedirect
from django.urls import reverse


@csrf_exempt
@api_view(['POST'])
def signup(request):
    email = request.data.get('email')
    username = request.data.get('username')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')

    # Check if email already exists
    if CustomUser.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate password strength (add your own validation rules)
    if len(password) < 8:
        return Response({'error': 'Password must be at least 8 characters long'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = CustomUser(
        email=email,
        first_name=first_name,
        last_name=last_name,
        is_active=True  # Activate the user account directly
    )
    user.password = make_password(password)  # Hash the password
    user.save()
    # Send email confirmation
    send_email_confirmation(request, user)

    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
@csrf_exempt
@api_view(['POST'])
def signin(request):
    email = request.data.get('email')
    password = request.data.get('password')

    # Authenticate user
    user = authenticate(request, username=email, password=password)

    if user is None:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_active:
        return Response({'error': 'User account is not active'}, status=status.HTTP_401_UNAUTHORIZED)

    if user.is_blocked:
        return Response({'error': 'User account is blocked'}, status=status.HTTP_401_UNAUTHORIZED)

    # Generate JWT token
    expiration_time = datetime.utcnow() + timedelta(hours=1)
    payload = {
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'exp': expiration_time,
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    return Response({'token': token}, status=status.HTTP_200_OK)
class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, request, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        user = confirmation.email_address.user
        
        # Activate user after email confirmation
        user.is_active = True
        user.save()

        # Redirect to the sign-in page with a success message
        return HttpResponseRedirect(reverse('signin') + '?confirmed=true')
    
    def send_custom_confirmation_email(user, request):
    # Generate email confirmation URL
        send_email_confirmation(request, user, True)