from django.urls import path
from . import views
from django.conf.urls import include

urlpatterns = [
    path('', views.index ),
    path('create', views.create),
    path('edit/<int:id>/', views.edit),
    path('delete/<int:id>/', views.delete),
]
