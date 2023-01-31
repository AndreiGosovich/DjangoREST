from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from userapp.views import UserModelViewSet
from todoapp.views import ProjectViewSet, ToDoViewSet

from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view as get_schema_view_open_api

router = DefaultRouter()
# router.register('users', UserModelViewSet)
router.register('users', UserModelViewSet, basename='users')
router.register('projects', ProjectViewSet)
router.register('todo', ToDoViewSet)

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
	openapi.Info(
		title="Проекты",
		default_version='0.1',
		description="Документация по трекеру проектов",
		contact=openapi.Contact(email="admin@admin.local"),
		license=openapi.License(name="MIT License"),
	),
	public=True,
	permission_classes=[permissions.AllowAny],
)


urlpatterns = [
	path('admin/', admin.site.urls),
	path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
	path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
	path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
	re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
	path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
	path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
	# Use the `get_schema_view()` helper to add a `SchemaView` to project URLs.
        #   * `title` and `description` parameters are passed to `SchemaGenerator`.
        #   * Provide view name for use with `reverse()`.
	path('openapi/', get_schema_view_open_api(
            title="Схема OpenAPI по доп. заданию.",
            description="API for all things …",
            version="1.0.0"
        ), name='openapi-schema'),

	# Route TemplateView to serve Swagger UI template.
    #   * Provide `extra_context` with view name of `SchemaView`.
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
    
	# Route TemplateView to serve the ReDoc template.
    #   * Provide `extra_context` with view name of `SchemaView`.
    path('redoc-ui/', TemplateView.as_view(
        template_name='redoc.html',
        extra_context={'schema_url_redoc':'openapi-schema'}
    ), name='redoc'),
]

