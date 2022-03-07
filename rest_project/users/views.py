from rest_framework.viewsets import ModelViewSet, GenericViewSet ,ViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin , UpdateModelMixin
from rest_framework.pagination import CursorPagination
from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CursorSetPagination(CursorPagination):
    # page_size = 1
    ordering = '-first_name'


# ListModelMixin, RetrieveModelMixin , UpdateModelMixin ,CreateModelMixin ,DestroyModelMixin
class CustomUserModelViewSet(ListModelMixin ,RetrieveModelMixin ,UpdateModelMixin ,GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    pagination_class = CursorSetPagination
