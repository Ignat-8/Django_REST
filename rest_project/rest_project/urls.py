"""rest_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from posixpath import basename
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import CustomUserModelViewSet
from todo.views import MyProjectViewSet ,MyTodoViewSet ,ProjectModelViewSet ,TodoModelViewSet
from todo.views import ProjectListAPIView ,ProjectFilterView ,ProjectGetAPIView 
from todo.views import ProjectCreateAPIView ,ProjectDeleteAPIView ,ProjectUpdateAPIView


router = DefaultRouter()
router.register('users', CustomUserModelViewSet)
router.register('projects', MyProjectViewSet)
# router.register('projects', ProjectModelViewSet)
# router.register('todos', MyTodoViewSet, basename='todos')
router.register('todos', TodoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    # path('api-view/projects/v1', ProjectAPIView.as_view()),
    # path('api-view/projects/v2', ProjectListAPIView.as_view()),
    # path('api-view/projects/v3', MyProjectViewSet.as_view({'get': 'list'})),
    # path('api-view/projects/v3/<int:pk>', MyProjectViewSet.as_view({'get':'retrieve'})),
    # path('api-view/projects/<str:name>/', ProjectFilterView.as_view()),
    # path('api-view/project/<int:pk>', ProjectGetAPIView.as_view()),
    # path('api-view/project/create', ProjectCreateAPIView.as_view()),
    # path('api-view/project/delete/<int:pk>', ProjectDeleteAPIView.as_view()),
    # path('api-view/project/update/<int:pk>', ProjectUpdateAPIView.as_view()),
]
