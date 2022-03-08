from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Todo, Project
from users.serializers import CustomUserModelSerializer


class MyProjectModelSerializer(ModelSerializer):
    users = CustomUserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'users']


class MyTodoModelSerializer(ModelSerializer):
    project = MyProjectModelSerializer()
    user = CustomUserModelSerializer()
    class Meta:
        model = Todo
        fields = ['id', 'project', 'user', 'title' ,'text', 'date_created', 'date_modified', 'is_active']


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'link', 'users']


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'project', 'user', 'title' ,'text', 'date_created', 'date_modified', 'is_active']
