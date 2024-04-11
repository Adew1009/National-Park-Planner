from django.urls import path
from .views import NPS_image, NPS_alert, NPS_latlong, NPS_park_boundaries, NPS_passport, NPS_parkbystate, NPS_webcams
from .views import AddressView
from . import views

urlpatterns = [
    path('image/<str:name>/', NPS_image.as_view(), name="NPS_image"),

    path('parkboundary/<str:name>/', NPS_park_boundaries.as_view(),
         name="NPS_park_boundaries"),

    path('alert/<str:name>/', NPS_alert.as_view(), name="NPS_alert"),

    path('passport/<str:name>/', NPS_passport.as_view(), name="NPS_passport"),

    path('parkbystate/<str:state>/',
         NPS_parkbystate.as_view(), name="NPS_parkbystate"),

    path('passport/<str:name>/', NPS_webcams.as_view(), name="NPS_webcams"),

    path('latlong/<str:name>/', NPS_latlong.as_view(), name="NPS_latlong"),




    #! Map path for MapBox

    path('', AddressView.as_view(), name='home'),


]
