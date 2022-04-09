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
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from users.views import CustomUserModelViewSet
from todo.views import MyProjectViewSet ,MyTodoViewSet ,ProjectModelViewSet ,TodoModelViewSet
from todo.views import ProjectListAPIView ,ProjectFilterView ,ProjectGetAPIView 
from todo.views import ProjectCreateAPIView ,ProjectDeleteAPIView ,ProjectUpdateAPIView


router = DefaultRouter()
router.register('users', CustomUserModelViewSet)
router.register('projects', MyProjectViewSet)
# router.register('projects', ProjectModelViewSet)
router.register('todos', MyTodoViewSet, basename='todos')
# router.register('todos', TodoModelViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title = "Library",
        default_version = '1.0',
        description = "Documentation to out project",
        contact = openapi.Contact(email = "admin@admin.local"),
        license = openapi.License(name = "MIT License"),
    ),
    public = True,
    permission_classes = (permissions.AllowAny, )
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    # ----------------------------------------------------------------------------
    # URLPathVersioning
    # re_path(r'^api/(?P<version>v\d)/users/$', CustomUserModelViewSet.as_view({'get': 'list'})),
    
    # NamespaceVersioning
    # path('api/users/v1', include('users.urls', namespace='v1')),
    # path('api/users/v2', include('users.urls', namespace='v2')),

    # QueryParameterVersioning
    # path('api/', include(router.urls)), # default urls
    # ----------------------------------------------------------------------------
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # ----------------------------------------------------------------------------
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
