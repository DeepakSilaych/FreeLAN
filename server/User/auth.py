# users/auth.py
from .models import User

def custom_authenticate(username=None, password=None, role=None):
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return None
    if password != user.password:
        return None 
    if role and user.role != role:
        return None 

    return user
