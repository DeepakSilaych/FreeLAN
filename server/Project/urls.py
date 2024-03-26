from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_projects, name='list_projects'),
    path('<int:project_id>/link/', views.update_link, name='update_link'),
    path('<int:project_id>/eta/', views.update_eta, name='update_eta'),
    path('<int:project_id>/', views.project_details, name='project_details'),
    path('<int:project_id>/comments/', views.project_comments, name='project_comments'),
]
