# forms.py
from django import forms
from rest_framework import serializers

from .models import Register
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    
from .models import Login
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model =   Login
        fields = '__all__'


from .models import Pharmacy
class PharmacySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacy
        fields = '__all__'