# Generated by Django 3.2.12 on 2022-02-22 05:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='date_modified',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]