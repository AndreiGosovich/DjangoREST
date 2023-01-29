from django.contrib import admin
from django.urls import path, include
# from rest_framework.permissions import 
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from userapp.views import UserModelViewSet
from todoapp.views import ProjectViewSet, ToDoViewSet

router = DefaultRouter()
# router.register('users', UserModelViewSet)
router.register('users', UserModelViewSet, basename='users')
router.register('projects', ProjectViewSet)
router.register('todo', ToDoViewSet)

urlpatterns = [
	path('admin/', admin.site.urls),
	path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
	path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
	path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]