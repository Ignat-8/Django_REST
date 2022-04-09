from rest_framework.viewsets import ModelViewSet, GenericViewSet ,ViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin , UpdateModelMixin
from rest_framework.pagination import CursorPagination
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerV2


class CursorSetPagination(CursorPagination):
    # page_size = 1
    ordering = '-first_name'


class CustomUserModelViewSet(ListModelMixin ,RetrieveModelMixin ,UpdateModelMixin ,GenericViewSet):
    # serializer_class = CustomUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return CustomUserModelSerializerV2
        return CustomUserModelSerializer

    # pagination_class = CursorSetPagination
    queryset = CustomUser.objects.all()
    # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
