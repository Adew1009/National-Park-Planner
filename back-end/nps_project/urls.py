"""
URL configuration for nps_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin

#! add include to django urls
from django.urls import path, include
#! add HTTP response
from django.http import HttpResponse

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/nps/', include("api_app.urls")),
    path('api/v1/users/', include("user_app.urls")),
    path('api/v1/parks/', include("allparks_app.urls")),
    path('api/v1/wishlist/', include("wishlist_app.urls")),
    path('api/v1/visited/', include("visited_app.urls")),

]
