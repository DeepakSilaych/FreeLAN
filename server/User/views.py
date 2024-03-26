# users/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .auth import custom_authenticate
from .serializers import ProfileSerializer, UserSerializer
from .models import Profile, User


@api_view(['POST'])
def login(request):
    user = custom_authenticate(
      username=request.data.get('username'),
      password=request.data.get('password'),
      role=request.data.get('role')
    )
    
    if user is not None:
        return Response({
            'id': user.id,
            'username': user.username,
            'role': user.role
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials or role'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def fetch_profile(request):
    try:
        print(request.data)
        user_id = request.data.get('id')
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)
        
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
