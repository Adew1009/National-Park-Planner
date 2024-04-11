from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from .models import Park
from user_app.views import TokenReq
from .serializers import (
    ParkSerializer, ActivitySerializer, TopicSerializer,
    ContactSerializer, EntranceFeeSerializer, OperatingHourSerializer,
    AddressSerializer, ParkActivitySerializer, ParkTopicSerializer,
    ImageSerializer
)


class ParkInfo(APIView):
    def get(self, request, park_code):
        try:
            park = Park.objects.get(parkCode=park_code)

            # Serialize Park model
            park_serializer = ParkSerializer(park).data

            # Serialize related objects
            activity_serializer = ActivitySerializer(
                park.activities.all(), many=True).data
            topic_serializer = TopicSerializer(
                park.topics.all(), many=True).data
            contact_serializer = ContactSerializer(park.contact).data
            entrance_fee_serializer = EntranceFeeSerializer(
                park.entrance_fees.all(), many=True).data
            operating_hour_serializer = OperatingHourSerializer(
                park.operating_hours.all(), many=True).data
            address_serializer = AddressSerializer(
                park.addresses.all(), many=True).data
            park_activity_serializer = ParkActivitySerializer(
                park.parkactivity_set.all(), many=True).data
            park_topic_serializer = ParkTopicSerializer(
                park.parktopic_set.all(), many=True).data
            image_serializer = ImageSerializer(
                park.images.all(), many=True).data

            # Merge all serializers into one dictionary
            merged_data = {
                "park": park_serializer,
                "activities": activity_serializer,
                "topics": topic_serializer,
                "contact": contact_serializer,
                "entrance_fees": entrance_fee_serializer,
                "operating_hours": operating_hour_serializer,
                "addresses": address_serializer,
                "park_activities": park_activity_serializer,
                "park_topics": park_topic_serializer,
                "images": image_serializer
            }

            return Response(merged_data)
        except Park.DoesNotExist:
            return Response({'error': 'Park not found'}, status=404)
