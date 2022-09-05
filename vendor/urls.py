from django.urls import path, include

import accounts.views
from . import views

urlpatterns = [
    path('profile', views.vprofile, name='vprofile'),
    path('', accounts.views.vendorDashboard, name='vendor'),
]
