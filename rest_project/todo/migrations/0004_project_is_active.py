# Generated by Django 3.2.12 on 2022-04-10 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_alter_todo_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]