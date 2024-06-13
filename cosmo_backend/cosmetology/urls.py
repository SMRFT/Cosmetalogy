from django.urls import path
from .views import registration,login,pharmacy_list,check_medicine_status

urlpatterns = [
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('pharmacy/', pharmacy_list, name='pharmacy_list'),
    path('check_medicine_status/', check_medicine_status, name='check_medicine_status'),
]

