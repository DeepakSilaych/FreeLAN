# Generated by Django 5.0.3 on 2024-03-26 15:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0002_profile_role'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='role',
        ),
    ]
