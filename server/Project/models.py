from django.db import models
from User.models import User

choices = [
    ('website', 'Website'),
    ('design', 'Design'),
    ('app', 'App'),
    ('videoediting', 'Video Editing'),
]

class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='client')
    developers = models.ManyToManyField(User, related_name='developers')
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True)
    current_image = models.ImageField(upload_to='project_images/')
    status = models.BooleanField(default=True)   # 0 = completed, 1 = ongoing
    type = models.CharField(choices=choices, max_length=20)
    link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
    
class Comments(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.comment
    
  


