from django.db import models

# Create your models here.
class Job(models.Model):
    topic = models.CharField('название объявления', max_length=100)
    category = models.CharField('категория объявления', max_length=50)
    description = models.TextField('описание объявления')
