from rest_framework.viewsets import ModelViewSet, GenericViewSet ,ViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin , UpdateModelMixin
from rest_framework.pagination import CursorPagination
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CursorSetPagination(CursorPagination):
    # page_size = 1
    ordering = '-first_name'


class CustomUserModelViewSet(ListModelMixin ,RetrieveModelMixin ,UpdateModelMixin ,GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
    # pagination_class = CursorSetPagination
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
