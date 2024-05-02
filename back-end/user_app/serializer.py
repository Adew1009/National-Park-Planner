from .models import App_user

from rest_framework.serializers import ModelSerializer


from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = App_user
        fields = ["display_name"]


class UpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = App_user
        fields = ['email', 'display_name',
                  "username", "password", "new_password"]
