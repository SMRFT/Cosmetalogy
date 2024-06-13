# models.py
from django.utils import timezone
from datetime import timedelta,datetime
from django.db import models

class Register(models.Model):
    id = models.CharField(max_length=500, primary_key=True)
    name = models.CharField(max_length=500)
    role = models.CharField(max_length=500)
    email = models.EmailField(max_length=500, unique=True)
    password = models.CharField(max_length=500)
    confirmPassword = models.CharField(max_length=500)


class Login(models.Model):
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=120)


class Pharmacy(models.Model):
    medicine_name = models.CharField(max_length=500)
    quantity = models.CharField(max_length=500)
    expiry_date = models.CharField(max_length=500)

    def __str__(self):
        return self.medicine_name

    def is_quantity_low(self):
        return int(self.quantity) <= 15

    def is_expiry_near(self):
        expiry_date = datetime.strptime(self.expiry_date, '%Y-%m-%d').date()
        return expiry_date - timezone.now().date() <= timedelta(days=10)