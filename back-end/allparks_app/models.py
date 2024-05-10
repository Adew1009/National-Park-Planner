from django.db import models
import uuid
# this will be the park class


class Park(models.Model):
    url = models.URLField(max_length=2000)
    fullName = models.CharField(max_length=2000)
    parkCode = models.CharField(
        primary_key=True, max_length=5, unique=True, null=False)
    description = models.TextField()
    latitude = models.CharField(
        max_length=200, null=True)
    longitude = models.CharField(
        max_length=200, null=True)
    latLong = models.CharField(max_length=200)
    states = models.CharField(max_length=2000)
    directionsInfo = models.TextField()
    directionsUrl = models.URLField(max_length=2000)
    weatherInfo = models.TextField()
    name = models.CharField(max_length=2000)
    designation = models.CharField(max_length=2000)
    relevanceScore = models.FloatField()
    entrancePasses = models.JSONField(null=True)
    fees = models.JSONField(null=True)  #

    # New field to store contact information
    contact = models.OneToOneField(
        'Contact', on_delete=models.CASCADE, related_name='park_contact', null=True)

    # Relationships
    entrance_fees = models.ManyToManyField(
        'EntranceFee', related_name='parks')
    operating_hours = models.ManyToManyField(
        'OperatingHour', related_name='parks')  #
    addresses = models.ManyToManyField('Address', related_name='parks_address')
    activities = models.ManyToManyField(
        'Activity', through='ParkActivity', related_name='parks')
    topics = models.ManyToManyField(
        'Topic', through='ParkTopic', related_name='parks')
    images = models.ManyToManyField('Image', related_name='park')

    def __str__(self):
        return self.name


class Activity(models.Model):

    id = models.CharField(max_length=2000, primary_key=True)
    name = models.CharField(max_length=2000)


class Topic(models.Model):

    id = models.CharField(max_length=2000, primary_key=True)
    name = models.CharField(max_length=2000)


class Contact(models.Model):
    phoneNumbers = models.CharField(
        max_length=5000, default="000-000-0000")
    emailAddresses = models.EmailField(
        max_length=5000, default="email@email.com")
    park = models.OneToOneField(
        # Park, on_delete=models.CASCADE, related_name='contact_info', null=True
        Park, on_delete=models.CASCADE, related_name='contacts_info', null=True
    )


class EntranceFee(models.Model):
    title = models.CharField(max_length=2000)
    cost = models.DecimalField(
        max_digits=19, decimal_places=2)
    description = models.TextField()


class OperatingHour(models.Model):
    name = models.CharField(max_length=15000)


class Address(models.Model):
    line1 = models.CharField(max_length=2000)
    line2 = models.CharField(max_length=2000, blank=True,
                             null=True)  # Adjusted max_length
    line3 = models.CharField(max_length=2000, blank=True,
                             null=True)  # Adjusted max_length
    city = models.CharField(max_length=2000)  # Adjusted max_length
    stateCode = models.CharField(max_length=2000)  # Adjusted max_length
    postalCode = models.CharField(max_length=2000)  # Adjusted max_length
    countryCode = models.CharField(max_length=2000)  # Adjusted max_length
    provinceTerritoryCode = models.CharField(
        max_length=2000, blank=True, null=True)  # Adjusted max_length
    type = models.CharField(max_length=2000)  # Adjusted max_length


class ParkActivity(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)


class ParkTopic(models.Model):
    park = models.ForeignKey(Park, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)


class Image(models.Model):
    url = models.URLField(max_length=2000)  # Adjusted max_length
    credit = models.CharField(max_length=2000)  # Adjusted max_length
    title = models.CharField(max_length=2000)  # Adjusted max_length
    altText = models.CharField(max_length=2000)  # Adjusted max_length
    caption = models.TextField()  # No need for max_length for TextField
