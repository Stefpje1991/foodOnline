from django.urls import path, include

import accounts.views
from . import views

urlpatterns = [
    path('profile', views.vprofile, name='vprofile'),
    path('', accounts.views.vendorDashboard, name='vendor'),
    path('menu-builder/', views.menu_builder, name='menu-builder'),
    path('menu-builder/category/<int:pk>/', views.fooditems_by_category, name='fooditems_by_category'),

    # Category CRUD
    path('menu-builder/category/add/', views.add_category, name="add_category"),
    path('menu-builder/category/edit/<int:pk>', views.edit_category, name="edit_category"),
    path('menu-builder/category/delete/<int:pk>', views.delete_category, name="delete_category")
]
