import os
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serialiazers import UserSerializer, ProductSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Product
from django.conf import settings

class ProductCreate(generics.ListCreateAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Product.objects.filter(buyer = user)
  
  def perform_create(self, serializer):
    if serializer.is_valid():
      serializer.save(buyer = self.request.user)
    else:
      print(serializer.errors)

class ProductDelete(generics.DestroyAPIView):
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    user = self.request.user
    return Product.objects.filter(buyer = user)
  
  def perform_destroy(self, instance):
    if instance.image:
      image_path = os.path.join(settings.MEDIA_ROOT, str(instance.image))
      if os.path.exists(image_path):
            os.remove(image_path)
    instance.delete()
class createUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]
