from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework import status


from .serializers import RegisterSerializer
@api_view(['POST'])
@csrf_exempt
def registration(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .models import Register
@api_view(['POST'])
@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        endpoint = request.data.get('endpoint')

        try:
            user = Register.objects.get(email=username, password=password)

            # Check if the user is a doctor
            if user.role == 'Doctor':
                return Response({'message': 'Login successful', 'role': user.role, 'id': user.id, 'name': user.name}, status=status.HTTP_200_OK)

            # Check if the role matches the endpoint
            if endpoint == 'DoctorLogin' and user.role != 'Doctor':
                return Response('Access denied', status=status.HTTP_403_FORBIDDEN)
            elif endpoint == 'PharmacistLogin' and user.role != 'Pharmacist':
                return Response('Access denied', status=status.HTTP_403_FORBIDDEN)
            elif endpoint == 'ReceptionistLogin' and user.role != 'Receptionist':
                return Response('Access denied', status=status.HTTP_403_FORBIDDEN)

            return Response({'message': 'Login successful', 'role': user.role, 'id': user.id, 'name': user.name}, status=status.HTTP_200_OK)
        except Register.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        

from .serializers import PharmacySerializer
@api_view(['POST'])
@csrf_exempt
def pharmacy_list(request):
    if request.method == 'POST':
        print(request.data)  # Log the incoming data
        if isinstance(request.data, list):
            serializer = PharmacySerializer(data=request.data, many=True)
        else:
            serializer = PharmacySerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

from .models import Pharmacy
@api_view(['GET'])
def check_medicine_status(request):
    low_quantity_medicines = []
    near_expiry_medicines = []

    medicines = Pharmacy.objects.all()

    for medicine in medicines:
        if medicine.is_quantity_low():
            low_quantity_medicines.append(medicine)
        if medicine.is_expiry_near():
            near_expiry_medicines.append(medicine)

    response_data = {
        'low_quantity_medicines': PharmacySerializer(low_quantity_medicines, many=True).data,
        'near_expiry_medicines': PharmacySerializer(near_expiry_medicines, many=True).data,
    }

    return Response(response_data, status=status.HTTP_200_OK)
