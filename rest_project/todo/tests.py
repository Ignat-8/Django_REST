import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from users.models import CustomUser
from .views import MyProjectViewSet, TodoModelViewSet
from .models import Project, Todo


class TestProjectViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = MyProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
    
    def test_get_list_1(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = MyProjectViewSet.as_view({'get': 'list'})
        Project.objects.create(name='project_test', link='http://test')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_list_2(self):
        client = APIClient()
        response = client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_create_project(self):
        # проверяем наличие регистрации при создании проекта
        factory = APIRequestFactory()
        request = factory.post('/api-view/project/create/', {'name': 'Project_test', 'link': 'http://test'}, format='json')
        view = MyProjectViewSet.as_view({'post':'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_2(self):
        # проверяем создание проекта для зарегистрированного пользователя
        factory = APIRequestFactory()
        request = factory.post('/api-view/project/create/', {'name': 'Project_test', 'link': 'http://test'}, format='json')
        admin = CustomUser.objects.create_superuser(first_name='admin', 
                                            last_name='adminadmin',
                                            email='admin@localhost', 
                                            birthday_year='2020',
                                            password='adminadmin')
        force_authenticate(request, admin)
        view = MyProjectViewSet.as_view({'post':'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        project = Project.objects.all()
        self.assertEqual(len(project), 1) # проверяем количество созданных проектов


class TestProjectClientApi(APITestCase):
    def test_create_project(self):
        CustomUser.objects.create_superuser(first_name='admin', 
                                            last_name='adminadmin',
                                            email='admin@localhost', 
                                            birthday_year='2020',
                                            password='adminadmin')                        
        self.client.login(username='admin@localhost', password='adminadmin')
        response = self.client.post('/api/projects/', 
                                {'name': 'Project_test', 
                                'link': 'http://test'}, 
                                format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        project = Project.objects.all()
        self.assertEqual(len(project), 1) # проверяем количество созданных проектов
        self.client.logout()


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todos/')
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_2(self):
        client = APIClient()
        response = client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_create_mixer(self):
        admin = CustomUser.objects.create_superuser(first_name='admin', 
                                            last_name='adminadmin',
                                            email='admin@localhost', 
                                            birthday_year='2020',
                                            password='adminadmin')
        project = mixer.blend(Project)
        # todo = mixer.blend(Todo)                
        self.client.login(username='admin@localhost', password='adminadmin')
        response = self.client.post('/api/todos/', 
                                {
                                'project': f"'{project.name}'", 
                                'user': f"'{admin.email}'",
                                'title': 'test title',
                                'text': 'some text'
                                }, 
                                format='json')
        # self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        todo = Todo.objects.all()
        self.assertEqual(len(todo), 1) # проверяем количество созданных проектов
        self.client.logout()
