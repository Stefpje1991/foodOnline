# Generated by Django 4.1 on 2022-09-07 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='slug',
            field=models.SlugField(blank=True, max_length=100, null=True),
        ),
    ]
