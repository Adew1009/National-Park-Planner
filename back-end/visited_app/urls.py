from django.urls import path
from .views import A_Visit, All_Visits, Info

urlpatterns = [
    path("", Info.as_view(), name="info"),
    path("all-visits/", All_Visits.as_view(), name="all_visits"),
    path("visit/<int:visit_id>/", A_Visit.as_view(), name="single_visit"),
]
