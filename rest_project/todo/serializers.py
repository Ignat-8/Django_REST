from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Todo, Project
from users.serializers import CustomUserModelSerializer


class MyProjectModelSerializer(HyperlinkedModelSerializer):
    users = CustomUserModelSerializer(many=True)
    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class MyTodoModelSerializer(HyperlinkedModelSerializer):
    project = MyProjectModelSerializer()
    user = CustomUserModelSerializer()
    class Meta:
        model = Todo
        fields = ['project', 'user', 'title' ,'text', 'date_created', 'date_modified', 'is_active']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'link', 'users']


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['project', 'user', 'title' ,'text', 'date_created', 'date_modified', 'is_active']
