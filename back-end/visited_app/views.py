from .serializers import VisitedSerializer  # Import your serializer
from .models import Visited  # Import your models
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import render
from rest_framework.response import Response
from .serializers import Visited, VisitedSerializer, Park, AllVisitedSerializer
from rest_framework.views import APIView
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from user_app.views import TokenReq
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
# Create your views here.


class Info(APIView):

    def get(self, request):
        pass


class All_Visits(TokenReq):
    def get(self, request):
        try:
            all_visits = AllVisitedSerializer(
                request.user.visited.order_by("id"), many=True)
            return Response(all_visits.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(str(e), status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data.copy()
        existing_park = get_object_or_404(Park, parkCode=data.get("parkCode"))

        data['user'] = request.user.id
        print(data)

        ser_list = VisitedSerializer(data=data)

        if ser_list.is_valid():
            ser_list.save()
            return Response(ser_list.data, status=HTTP_201_CREATED)
        else:
            return Response(ser_list.errors, status=HTTP_400_BAD_REQUEST)


class A_Visit(TokenReq):
    def get_visit(self, request, visit_id):
        return get_object_or_404(request.user.visited, id=visit_id)

    def get(self, request, visit_id):
        visited_entry = get_object_or_404(Visited, id=visit_id)
        serializer = VisitedSerializer(visited_entry)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, visit_id):
        visited_entry = self.get_visit(request, visit_id)
        ser_visit = VisitedSerializer(
            visitefd_entry, data=request.data, partial=True)
        if ser_visit.is_valid():
            ser_visit.save()
            return Response(ser_visit.data, status=HTTP_200_OK)
        return Response(ser_visit.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, visit_id):
        visited_entry = get_object_or_404(Visited, id=visit_id)
        visited_entry.delete()
        return Response(status=HTTP_204_NO_CONTENT)
