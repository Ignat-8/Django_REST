from django.core.management.base import BaseCommand
# from django.contrib.auth.models import User
from users.models import CustomUser
# import json, os


# JSON_PATH = ''
# def load_from_json(file_name):
#     with open(os.path.join(JSON_PATH, file_name + '.json'), 'r') as infile:
#         return json.load(infile)


class Command(BaseCommand):
    # Создаем суперпользователя при помощи менеджера модели
    super_user = CustomUser.objects.create_superuser('admin', 'adminadmin', '2000', 'admin@localhost', 'adminadmin')
    user1 = CustomUser.objects.create_user('user1', 'user1user1', '2001', 'user1@localhost', 'user1user1')
    user2 = CustomUser.objects.create_user('user2', 'user2user2', '2002', 'user2@localhost', 'user2user2')
