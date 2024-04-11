from .models import WishList
from rest_framework.serializers import ModelSerializer
from allparks_app.serializers import ParkSerializer
from allparks_app.serializers import ParkSerializer, Park, Activity, Topic, Contact, EntranceFee, OperatingHour, Address, ParkActivity, ParkTopic, Image


class AllWishListSerializer(ModelSerializer):
    parkCode = ParkSerializer()

    class Meta:
        model = WishList
        fields = '__all__'


class WishListSerializer(ModelSerializer):

    class Meta:
        model = WishList
        fields = '__all__'
