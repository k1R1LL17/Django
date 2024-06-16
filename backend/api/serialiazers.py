from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username", "password"]
    extra_kwargs = {"password": {"write_only": True}}

  def create(self,validated_data):
    user = User.objects.create_user(**validated_data)
    return user
  
class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = ["id", "name", "description", "price", "buyer", "image"]
    extra_kwargs = {"buyer": {"read_only": True}}