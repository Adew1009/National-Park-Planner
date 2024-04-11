from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from .mapdata import yellowstone
from user_app.views import TokenReq
# from requests_oauthlib import OAuth1
# ? add import of env from project settings file
from nps_project.settings import env
# from pprint import PrettyPrinter
# import urllib.request
import json
from django.shortcuts import render
# from decouple import config
# from django.http import JsonResponse
# from django.views.generic.detail import BaseDetailView
# from mapbox_baselayer import models
from django.views.generic import TemplateView
# from .models import Address

# pp = PrettyPrinter(indent=2, depth=2)

# Create your views here.
#! TODO CHANGE VIEWS TO (TokenReq) instead of (APIView)


class NPS_latlong(APIView):

    def get(self, request, name):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/parks?parkCode={name}&api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response.get("data"):
            latlong = json_response.get(
                'data')[0].get('latLong')
            return Response(latlong)
        return Response("This parameter doesn't exist within the nps project")


class NPS_image(APIView):

    def get(self, request, name):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/parks?parkCode={name}&api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response.get("data"):
            # image_url = json_response.data.images[0].url
            image_url = json_response.get(
                'data')[0].get('images')[0].get('url')
            return Response(image_url)
        return Response("This parameter doesn't exist within the nps project")


class NPS_alert(APIView):

    def get(self, request, name):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/alerts?parkCode={name}&api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response.get("data"):
            # image_url = json_response.data.images[0].url
            alert = json_response.get('data')
            return Response(alert)
        return Response("There are no current alerts for this park.")


class NPS_park_boundaries(APIView):

    def get(self, request, name):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/mapdata/parkboundaries/{name}?api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response:
            # image_url = json_response.data.images[0].url
            park_boundaries = json_response["geometry"]['coordinates'][0][0]
            # park_boundaries = json_response["geometry"]['coordinates'][0][0]

            return Response(park_boundaries)
        return Response("This parameter doesn't exist within the nps project")


class NPS_passport(APIView):

    def get(self, request, name):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/passportstamplocations?parkCode={name}&parkCode=&api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response.get("data"):
            passport = json_response.get(
                'data')
            return Response(passport)
        return Response("This parameter doesn't exist within the nps project")


class NPS_parkbystate(APIView):

    def get(self, request, state):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/parks?stateCode={state}&api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response.get("data"):
            parks = json_response.get(
                'data')
            return Response(parks)
        return Response("This parameter doesn't exist within the nps project")


class NPS_webcams(APIView):

    def get(self, request, name):
        api_key = env.get("API_KEY")
        endpoint = f"https://developer.nps.gov/api/v1/webcams?parkCode=yell&parkCode=&api_key={name}&parkCode=&api_key={api_key}"
        response = requests.get(endpoint)
        json_response = response.json()
        # return Response(response.json())
        if json_response.get("data"):
            webcams = json_response.get(
                'data')
            return Response(webcams)
        return Response("This parameter doesn't exist within the nps project")


class AddressView(TemplateView):
    template_name = 'home.html'
    #! provides additional context data to the template rendering process.

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        #! context = super().get_context_data(**kwargs): This line calls the parent class method get_context_data to retrieve the default context data and stores it in the variable context. The **kwargs allows passing additional keyword arguments if needed.
        context['mapbox_access_token'] = env.get("MAPBOX_ACCESS_TOKEN")
        #! context['mapbox_access_token'] = config('MAPBOX_ACCESS_TOKEN'): This line adds a key-value pair to the context dictionary. It sets the key 'mapbox_access_token' to the value obtained from the environment variable named 'MAPBOX_ACCESS_TOKEN' using the config function from the decouple module. The config function retrieves values from a .env file or environment variables, which is a common way to manage sensitive information like API keys or access tokens.
        context['park'] = yellowstone

        return context
        #! return context: Finally, this line returns the updated context dictionary with the added mapbox_access_token to be used in the template rendering process. The context data will be accessible in the template, allowing you to access the Mapbox access token from within the template for rendering purposes.

        # In the context of Django views, **kwargs is often used to pass additional context data to templates dynamically. When calling the render function to render a template, any keyword arguments passed after the template name are included in the context dictionary passed to the template, and **kwargs allows for the flexible inclusion of these arguments.
