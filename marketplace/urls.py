from marketplace import views
from django.urls import path

urlpatterns = [
    path('', views.marketplace, name='marketplace'),
    #ADD TO CART
    path('add_to_cart/<int:food_id>/', views.add_to_cart, name="add_to_cart"),
    #DECREASE CART
    path('decrease_cart/<int:food_id>/', views.decrease_cart, name="decrease_cart"),
    path('delete_cart/<int:cart_id>', views.delete_cart, name="delete_cart"),
    path('<slug:vendor_slug>/', views.vendor_detail, name="vendor_detail"),
]