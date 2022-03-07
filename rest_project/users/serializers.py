from rest_framework.serializers import HyperlinkedModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['first_name', 
                  'last_name', 
                  'birthday_year', 
                  'email', 
                  'date_joined',
                  'is_active',
                  'is_staff',
                #   'is_superuser' 
                  ]
