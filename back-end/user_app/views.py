from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import App_user
from datetime import datetime, timedelta
from .serializer import UserSerializer
# from utilities import HttpOnlyTokenAuthentication

# Create your views here.


class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get(
            "username", request.data.get("email"))
        new_user = App_user(**data)
        try:
            new_user.full_clean()
            new_user.save()
            new_user.set_password(data.get("password"))
            new_user.save()
            login(request, new_user)
            token = Token.objects.create(user=new_user)
            return Response({"user": new_user.display_name, "token": token.key}, status=HTTP_201_CREATED)

            #! Here is where we update our signup logic to send the user back a cookie instead of a token
            # life_time = datetime.now() + timedelta(days=7)
            # format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")

            # # _response = Response(
            #     {"user": new_user.display_name, "email": new_user.email}, status = HTTP_201_CREATED)
            # # _response.set_cookie(key="token", value=token.key, httponly=True,
            # #                      secure=True, samesite="Lax", expires=format_life_time)
            # # return _response

        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)

            return Response({"user": new_user.display_name, "token": token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get(
            "username", request.data.get("email"))
        user = authenticate(username=data.get("username"),
                            password=data.get("password"))
        print(user)
        if user:
            login(request, user)
            # if
            # return SELECT * token WHERE user = user
            # else
            # return INSERT token (user) VALUES (user)
            token, created = Token.objects.get_or_create(user=user)
            # return Response({"user": user.email, "token": token.key}, status=HTTP_200_OK)
        return Response({"display_name": request.user.display_name, "user": request.user.email, "token": token.key}, status=HTTP_200_OK)
    #! ******UNCOMMENT AND REPLACE IF STATEMENT FOR COOKIE USE*************
    # TODO set sercure to true for deployment
        # if user:
        #     token, created = Token.objects.get_or_create(user=user)
        #     life_time = datetime.now() + timedelta(days=7)
        #     format_life_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
        #     _response = Response({"user": user.display_name, "token": token.key})
        #     response.set_cookie(key="token", value=token.key, httponly=True,
        #                         secure=False, samesite="Lax", expires=format_life_time)
        #     return response
        return Response("No user matching credentials", status=HTTP_400_BAD_REQUEST)


class TokenReq(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)

    #!Replace is using cookies  *****Change TokenReq to APIView *******
    # class Log_out(APIView):

    # authentication_classes = [HttpOnlyTokenAuthentication]
    # permission_classes = [IsAuthenticated]

    # def post(self, request):
    #     request.user.auth_token.delete()
    #     _response = Response(status=HTTP_204_NO_CONTENT)
    #     _response.delete_cookie("token")
    #     return _response


class Info(TokenReq):
    # authentication_classes = [HttpOnlyTokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        # return Response({"email": request.user.email, "display name": request.user.display_name, "user name": request.user.username})
        return Response({"display_name": request.user.display_name, "user": request.user.email})

    def put(self, request):
        try:
            data = request.data.copy()
            ruser = request.user

            ruser.display_name = data.get("display_name", ruser.display_name)
            ser_user = UserSerializer(instance=ruser, data=data)
            if ser_user.is_valid():
                ser_user.save()
            # authenticate credential
            cur_pass = data.get("password")
            if cur_pass and data.get("new_password"):
                auth_user = authenticate(
                    username=ruser.username, password=cur_pass)
                print(auth_user)
                print(ruser.username, ruser.password)
                if auth_user == ruser:
                    print("auth user matches")

                    ruser.set_password(data.get("new_password"))
                    ruser.full_clean()
                    ruser.save()

            return Response(ruser.display_name, status=HTTP_200_OK)
            # return Response({"display_name": ruser.display_name})
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)
