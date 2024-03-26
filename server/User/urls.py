# users/urls.py
from django.urls import path
from .views import login, fetch_profile

urlpatterns = [
    path('login/', login, name='login'),
    path('profile/', fetch_profile, name='fetch_profile'),

]
