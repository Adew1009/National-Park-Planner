from .models import Visited

from rest_framework.serializers import ModelSerializer
from allparks_app.serializers import ParkSerializer, Park, Activity, Topic, Contact, EntranceFee, OperatingHour, Address, ParkActivity, ParkTopic, Image


from rest_framework import serializers
from .models import Visited, Park


class AllVisitedSerializer(serializers.ModelSerializer):
    parkCode = ParkSerializer()

    class Meta:
        model = Visited
        fields = ['parkCode', 'journal', 'user', 'id']


class VisitedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Visited
        fields = ['parkCode', 'journal', 'user', 'id']
