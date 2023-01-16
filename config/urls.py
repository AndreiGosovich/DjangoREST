from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
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
	path('api/', include(router.urls)),
]