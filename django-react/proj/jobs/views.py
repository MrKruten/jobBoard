from django.shortcuts import render
from .models import Job
from .serializers import JobSerializer
from rest_framework import generics

class JobListCreate(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

