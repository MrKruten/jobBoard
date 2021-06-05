# Generated by Django 3.2 on 2021-05-22 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topic', models.CharField(max_length=100, verbose_name='название объявления')),
                ('category', models.CharField(max_length=50, verbose_name='категория объявления')),
                ('description', models.TextField(verbose_name='описание объявления')),
            ],
        ),
    ]