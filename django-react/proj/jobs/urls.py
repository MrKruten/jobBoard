from django.urls import path
from . import views
from django.conf.urls import include

urlpatterns = [
    path('api/job/', views.JobListCreate.as_view() ),
]
