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
            'stage': project.stages,
            'image': project.current_image.url,
            'client': project.client.username,
            'developer': [developer.username for developer in project.developers.all()]
        }
        if project.stages != 5: 
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
            'stage': project.stages,
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
    
@api_view(['POST'])
def update_link(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        project.link = request.data['link']
        project.save()
        return Response({'message': 'Link updated successfully'})
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)
    
@api_view(['POST'])
def update_eta(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        project.deadline = request.data['deadline']
        project.save()
        return Response({'message': 'ETA updated successfully'})
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)


@api_view(['GET'])
def project_comments(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        comments = Comments.objects.filter(project=project)
        data = {
            'project_id': project.id,
            'user': comments.user.username,
            'comment': comments.comment,    
            'time': comments.created_at.isoformat() 
        }
        return Response(data)
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)

@api_view(['POST'])
def add_comments(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        comments = Comments.objects.create(
            project=project,
            user=request.user,
            comment=request.data['comment']
        )
        return Response({'message': 'Comment added successfully'})
    except Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)