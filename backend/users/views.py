from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from .serializers import UserSerializer, RegisterSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import User

@api_view(['GET'])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'detail': 'CSRF cookie set'})

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "user": UserSerializer(user).data,
            "message": "User Created Successfully"
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    from django.contrib.auth import authenticate
    username = request.data.get('username')
    password = request.data.get('password')
    remember_me = request.data.get('remember_me', False)
    
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                    status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        if remember_me:
            # Set session expiry to 7 days
            request.session.set_expiry(7 * 24 * 60 * 60)
        else:
            # Set session expiry to 0 (until browser closes)
            request.session.set_expiry(0)
            
        login(request, user)
        return Response({
            'user': UserSerializer(user).data,
            'message': 'Login Successful'
        })
    else:
        return Response({'error': 'Invalid Credentials'},
                    status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    serializer = UserSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        try:
            user = serializer.save()
            return Response(UserSerializer(user).data)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
    return Response(
        {'error': serializer.errors},
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    if request.user.role != User.Role.SUPERADMIN:
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    users = User.objects.all().order_by('-date_joined')
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user_role(request, user_id):
    if request.user.role != User.Role.SUPERADMIN:
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    new_role = request.data.get('role')
    if new_role not in [choice[0] for choice in User.Role.choices]:
        return Response(
            {"error": "Invalid role"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user.role = new_role
    user.save()
    return Response(UserSerializer(user).data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def toggle_user_active(request, user_id):
    if request.user.role != User.Role.SUPERADMIN:
        return Response(
            {"error": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Prevent deactivating SUPERADMIN accounts
    if user.role == User.Role.SUPERADMIN:
        return Response(
            {"error": "Cannot deactivate SUPERADMIN accounts"},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user.is_active = request.data.get('is_active', not user.is_active)
    user.save()
    return Response(UserSerializer(user).data)