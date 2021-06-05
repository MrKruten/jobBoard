from django.contrib.auth.forms import AuthenticationForm
from django.forms import ModelForm, TextInput, Textarea
from django import forms
from django.db import models
from jobs.models import Job

class JobForm(ModelForm):
    class Meta:
        model = Job
        fields = ['topic', 'category', 'description']
