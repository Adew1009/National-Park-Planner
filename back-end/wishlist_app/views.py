from .serializers import WishList, WishListSerializer, AllWishListSerializer, Park
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.shortcuts import render
from rest_framework.response import Response
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


class All_WishList(TokenReq):
    def get(self, request):
        try:
            all_wishlist = AllWishListSerializer(
                request.user.wishlists.order_by("id"), many=True)
            return Response(all_wishlist.data, status=HTTP_200_OK)
        except Exception as e:
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data.copy()
        existing_park = get_object_or_404(
            Park, parkCode=data.get("parkCode"))

        data['user'] = request.user.id
        ser_wishlist = WishListSerializer(data=data)

        if ser_wishlist.is_valid():
            ser_wishlist.save()
            return Response(ser_wishlist.data, status=HTTP_201_CREATED)
        else:
            print(ser_wishlist.errors)
            return Response(ser_wishlist.errors, status=HTTP_400_BAD_REQUEST)


class A_WishList(TokenReq):
    def get_wishlist(self, request, wishlist_id):
        return get_object_or_404(request.user.wishlists, id=wishlist_id)

    def get(self, request, wishlist_id):
        visited_entry = get_object_or_404(WishList, id=wishlist_id)
        serializer = AllWishListSerializer(visited_entry)
        return Response(serializer.data, status=HTTP_200_OK)

    def put(self, request, wishlist_id):
        curr_wishlist = self.get_wishlist(request, wishlist_id=_id)
        ser_wishlist = WishListSerializer(
            curr_wishlist, data=request.data, partial=True)
        if ser_wishlist.is_valid():
            ser_wishlist.save()
            return Response(ser_wishlist.data, status=HTTP_200_OK)
        else:
            return Response(ser_wishlist.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, wishlist_id):
        visited_entry = get_object_or_404(WishList, id=wishlist_id)
        visited_entry.delete()
        return Response(status=HTTP_204_NO_CONTENT)
