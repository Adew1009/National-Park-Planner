import json
from django.core.management.base import BaseCommand
from allparks_app.models import Park, Activity, Topic, Contact, EntranceFee, OperatingHour, Address, ParkActivity, ParkTopic, Image


class Command(BaseCommand):
    help = 'Import data from JSON file'

    def handle(self, *args, **kwargs):
        with open('allparks_app/data/data.json', 'r') as file:
            data = json.load(file)

            for park_data in data.values():
                activities = park_data.pop('activities', [])
                topics = park_data.pop('topics', [])
                contacts = park_data.pop('contacts', {})
                entrance_fees = park_data.pop('entranceFees', [])
                addresses = park_data.pop('addresses', [])
                operating_hours = park_data.pop('operatingHours', [])
                images = park_data.pop('images', [])

                # Create Park
                park = Park.objects.create(
                    url=park_data['url'],
                    fullName=park_data['fullName'],
                    parkCode=park_data['parkCode'],
                    description=park_data['description'],
                    latitude=park_data['latitude'],
                    longitude=park_data['longitude'],
                    latLong=park_data['latLong'],
                    states=park_data['states'],
                    directionsInfo=park_data['directionsInfo'],
                    directionsUrl=park_data['directionsUrl'],
                    weatherInfo=park_data['weatherInfo'],
                    name=park_data['name'],
                    designation=park_data['designation'],
                    relevanceScore=park_data['relevanceScore'],
                )

                # Create or get Activities and assign to Park
                activity_objs = []
                for activity_data in activities:
                    activity, created = Activity.objects.get_or_create(
                        **activity_data)
                    activity_objs.append(activity)
                park.activities.set(activity_objs)

                # Create or get Topics and assign to Park
                topic_objs = []
                for topic_data in topics:
                    topic, created = Topic.objects.get_or_create(**topic_data)
                    topic_objs.append(topic)
                park.topics.set(topic_objs)

                # Create Contact and assign to Park
                contact = Contact.objects.create(
                    phoneNumbers=contacts['phoneNumbers'],
                    emailAddresses=contacts['emailAddresses'],
                    park=park  # Assign park to contact
                )

                # Create Entrance Fees and assign to Park
                entrance_fee_objs = [EntranceFee.objects.create(
                    title=fee['title'], description=fee['description'], cost=fee['cost']) for fee in entrance_fees]

                # Create Addresses and assign to Park
                address_objs = [Address.objects.create(
                    **address) for address in addresses]
                park.addresses.set(address_objs)

                # Create Operating Hours and assign to Park
                operating_hour_objs = [OperatingHour.objects.create(
                    name=oh) for oh in operating_hours]
                park.operating_hours.set(operating_hour_objs)

            #    Create Images and assign to Park
                image_objs = [Image(**image_data) for image_data in images]
                for image_obj in image_objs:
                    image_obj.save()
                    park.images.add(image_obj)
