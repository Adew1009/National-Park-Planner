from django.db import models
from user_app.models import App_user
from allparks_app.models import Park


# Create your models here.


class WishList(models.Model):
    parkCode = models.ForeignKey(
        Park, on_delete=models.CASCADE, related_name='wishlist_park')
    user = models.ForeignKey(
        App_user, on_delete=models.CASCADE, related_name='wishlists')
