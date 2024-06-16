from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
  name = models.CharField(max_length=50)
  description = models.CharField(max_length = 200)
  price = models.IntegerField()
  buyer = models.ForeignKey(User, on_delete= models.CASCADE, related_name = "products")
  image = models.ImageField(blank = True, upload_to = 'product_images')

  def __str__(self):
    return self.name 