# Generated by Django 5.0.3 on 2024-03-26 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('User', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='role',
            field=models.CharField(choices=[('developer', 'Developer'), ('client', 'Client')], default='developer', max_length=100),
        ),
    ]
