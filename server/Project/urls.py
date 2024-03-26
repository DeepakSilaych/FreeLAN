from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_projects, name='list_projects'),
    path('<int:project_id>/', views.project_details, name='project_details'),
    path('<int:project_id>/comments/', views.project_comments, name='project_comments'),
    path('<int:project_id>/update/', views.update_project, name='update_project'),
]
