from django.urls import path
from . import views

urlpatterns = [
    path('csrf/', views.get_csrf_token, name='csrf'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile_view, name='profile'),
    path('users/', views.get_users, name='users-list'),
    path('users/<int:user_id>/role/', views.update_user_role, name='user-role-update'),
    path('users/<int:user_id>/toggle-active/', views.toggle_user_active, name='user-toggle-active'),
]