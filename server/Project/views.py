from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project, Comments
from .serializers import ProjectSerializer, CommentsSerializer
from User.models import User
from rest_framework import status


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Project

@api_view(['POST'])
def list_projects(request):
    userid = request.data.get('id')
    try:
        user = User.objects.get(id=userid)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if user.role == 'client':
        projects = Project.objects.filter(client=user)
    elif user.role == 'developer':
        projects = Project.objects.filter(developers=user)
    else:
        return Response({'error': 'Invalid user role'}, status=status.HTTP_400_BAD_REQUEST)

    ongoing_projects = []
    completed_projects = []
    for project in projects:
        project_data = {
            'id': project.id,
            'title': project.title,
            'status': project.status,
            'image': project.current_image.url,
            'client': project.client.username,
            'developer': [developer.username for developer in project.developers.all()]
        }
        if project.status: 
            ongoing_projects.append(project_data)
        else:  
            completed_projects.append(project_data)
    
    return Response({'ongoing_projects': ongoing_projects, 'completed_projects': completed_projects})


@api_view(['GET'])
def project_details(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        data = {
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'client': project.client.username,
            'developers': [developer.username for developer in project.developers.all()],
            'created_at': project.created_at,
            'deadline': project.deadline,
            'current_image': project.current_image.url,
            'status': project.status,
            'type': project.type,
            'link': project.link
        }

        return Response([data])
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)


@api_view(['PUT'])
def update_project(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)

@api_view(['GET'])
def project_comments(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        comments = Comments.objects.filter(project=project)
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)
