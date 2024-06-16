from django.urls import path
from . import views

urlpatterns = [
    path('products/',views.ProductCreate.as_view(), name = "products"),
    path('products/delete/<int:pk>/', views.ProductDelete.as_view(),name = "products_delete")
]
