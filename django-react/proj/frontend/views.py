from django.shortcuts import render

from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseRedirect
from .forms import JobForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic
from django.views.generic import UpdateView, DeleteView
from django.db import models
from jobs.models import Job

def index(request):
    return render(request, 'frontend/index.html')

@csrf_exempt
def create(request):
    if request.method == 'POST':
        form = JobForm(request.POST)
        if form.is_valid():
            newTopic = form.cleaned_data['topic']
            newCategory = form.cleaned_data['category']
            newDescription = form.cleaned_data['description']

            newJob = Job(topic=newTopic, category=newCategory, description=newDescription)
            newJob.save()
        return HttpResponseRedirect("/")

@csrf_exempt
def edit(request, id):
    try:
        job = Job.objects.get(id=id)
        if request.method == "POST":
            form = JobForm(request.POST)
            if form.is_valid():
                job.topic = form.cleaned_data['topic']
                job.category = form.cleaned_data['category']
                job.description = form.cleaned_data['description']
                job.save()
                return HttpResponseRedirect("/")
    except Job.DoesNotExist:
        return HttpResponseNotFound("<h2>Job not found</h2>")


@csrf_exempt
def delete(request, id):
    try:
        job = Job.objects.get(id=id)
        job.delete()
        return HttpResponseRedirect("/")
    except Job.DoesNotExist:
        return HttpResponseNotFound("<h2>Job not found</h2>")

