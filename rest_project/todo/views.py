from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet, GenericViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework import generics 
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin , UpdateModelMixin ,CreateModelMixin ,DestroyModelMixin
# from rest_framework.pagination import CursorPagination
from django_filters import rest_framework as filters
from .models import Project, Todo
from .serializers import TodoModelSerializer, ProjectModelSerializer
from .serializers import MyTodoModelSerializer, MyProjectModelSerializer


# базовый класс для Views
class ProjectAPIView(APIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def get(self, request, format=None):
        projects = Project.objects.all()
        serializer = MyProjectModelSerializer(projects, many=True)
        return Response(serializer.data)


# Предоставляет метод get и выводит список данных из выборки queryset
class ProjectListAPIView(generics.ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


# Предоставляет метод post. Для создания модели достаточно указать queryset и serializer_class
class ProjectCreateAPIView(generics.CreateAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


# Выдаёт метод get и выводит данные об одном объекте из выборки queryset. 
# Для указания адреса требуется параметр pk, чтобы определить id элемента. 
# Например: path('generic/retrieve/<int:pk>/', views.ArticleRetrieveAPIView.as_view())
class ProjectGetAPIView(generics.RetrieveAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = MyProjectModelSerializer


# filtering data
class ProjectFilterView(generics.ListAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = MyProjectModelSerializer

    def get_queryset(self):
        name = self.kwargs['name']
        return Project.objects.filter(name__contains=name)


# DjangoFilter
class ProjectDjangoFilterViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_fields = ['name', 'link']


# Предоставляет метод delete и удаляет один объект из выборки. 
# В адресе также требуется указать pk объекта.
class ProjectDeleteAPIView(generics.DestroyAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


# Выдаёт методы put и patch для изменения объекта из выборки queryset. 
# Требует pk в url-адресе.
class ProjectUpdateAPIView(generics.UpdateAPIView):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


# class ProjectSetPagination(CursorPagination):
#     page_size = 1
#     ordering = '-name'

# наличие этих классов определяет возможность редактирования, создания и т.п.
# ListModelMixin, RetrieveModelMixin , UpdateModelMixin ,CreateModelMixin ,DestroyModelMixin
class MyProjectViewSet(ListModelMixin, RetrieveModelMixin , UpdateModelMixin ,CreateModelMixin ,DestroyModelMixin ,GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # pagination_class = ProjectSetPagination

    @action(detail=True, methods=['get'])
    def project_name_only(self, request, pk=None):
        project = get_object_or_404(Project, pk=pk)
        return Response({'project.name': project.name})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        todo = Todo.objects.filter(project=instance.id)
        for obj in todo:
            obj.is_active = False # удаляем связанные с этим проектом todo
            obj.save()
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    
# class TodoSetPagination(CursorPagination):
#     page_size = 5
#     ordering = '-project_id'


class TodoFilter(filters.FilterSet):
    date_from = filters.DateFilter(field_name="date_created", lookup_expr='gte')
    date_to = filters.DateFilter(field_name="date_created", lookup_expr='lte')

    class Meta:
        model = Todo
        fields = ['date_created']


class MyTodoViewSet(ListModelMixin, RetrieveModelMixin , UpdateModelMixin ,CreateModelMixin ,DestroyModelMixin ,GenericViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    # pagination_class = TodoSetPagination
    filterset_class = TodoFilter

    # http://localhost:8000/api/todos/?date_from=2022.03.01&date_to=2022.03.05
    # def get_queryset(self):
    #     queryset = Todo.objects.all()
    #     date_from = self.request.query_params.get('date_from', None)
    #     date_to = self.request.query_params.get('date_to', None)
    #     if date_from and date_to:
    #         queryset = queryset.filter(date_created__gt=date_from, date_created__lt=date_to)
    #     return queryset
        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


#-----------------------------------------------------------------------------
class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    

class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    