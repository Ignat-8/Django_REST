from django.db import models
from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=32)
    link = models.CharField(max_length=32)
    users = models.ManyToManyField(CustomUser)
    def __str__(self):
        return self.name


class Todo(models.Model):
    project = models.ForeignKey(Project, models.PROTECT)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    title = models.TextField(max_length=64)
    text = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title