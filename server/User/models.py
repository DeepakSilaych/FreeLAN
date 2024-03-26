from django.db import models
import uuid

choices = [
        ('developer', 'Developer'),
        ('client', 'Client'),
    ]
class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100, choices=choices, default='developer')

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ongoing_projects = models.IntegerField(default=0)
    completed_projects = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.user.username




