from rest_framework import serializers
from .models import Park, Activity, Topic, Contact, EntranceFee, OperatingHour, Address, ParkActivity, ParkTopic, Image


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class EntranceFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntranceFee
        fields = '__all__'


class OperatingHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperatingHour
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class ParkActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkActivity
        fields = '__all__'


class ParkTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkTopic
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class ParkSerializer(serializers.ModelSerializer):
    activities = ActivitySerializer(many=True, read_only=True)
    topics = TopicSerializer(many=True, read_only=True)
    contact = ContactSerializer(read_only=True)
    entrance_fees = EntranceFeeSerializer(many=True, read_only=True)
    operating_hours = OperatingHourSerializer(many=True, read_only=True)
    addresses = AddressSerializer(many=True, read_only=True)
    park_activities = ParkActivitySerializer(many=True, read_only=True)
    park_topics = ParkTopicSerializer(many=True, read_only=True)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Park
        fields = '__all__'
