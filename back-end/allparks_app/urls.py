from django.urls import path
from .views import ParkInfo
from . import views

urlpatterns = [
    path('<str:park_code>/', ParkInfo.as_view(), name='park_info'),
]
