from django.urls import path
from .views import Info, A_WishList, All_WishList


urlpatterns = [
    path("", Info.as_view(), name="info"),
    path("allwishlist/", All_WishList.as_view(), name="all_wishes"),
    path("wishlist/<int:wishlist_id>/",
         A_WishList.as_view(), name="single_wish"),
]
