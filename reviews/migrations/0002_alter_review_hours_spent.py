# Generated by Django 3.2.21 on 2023-09-21 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='hours_spent',
            field=models.IntegerField(blank=True),
        ),
    ]
