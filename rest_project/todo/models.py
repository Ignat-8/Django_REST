from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=32, help_text="Project name")
    link = models.CharField(max_length=128, help_text="link to the project")
    users = models.ManyToManyField(CustomUser, through='Todo', through_fields=['project','user'])
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    user = models.ForeignKey(CustomUser, models.PROTECT)
    title = models.TextField(max_length=64)
    text = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
