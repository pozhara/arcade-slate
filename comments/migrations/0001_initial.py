# Generated by Django 3.2.21 on 2023-09-25 08:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('reviews', '0003_alter_review_image'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('best_deals', '0002_alter_bestdeals_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('content', models.TextField()),
                ('deal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='best_deals.bestdeals')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reviews.review')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
