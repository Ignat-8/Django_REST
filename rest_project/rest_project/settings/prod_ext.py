from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '10.0.2.2']

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'rest_project',
        'USER': 'admin',
        'PASSWORD': 'adminadmin',
        'HOST': '127.0.0.1',
        'PORT': '54326'
    }
}

