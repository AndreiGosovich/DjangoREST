from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer

from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, ToDoFilter

from rest_framework.response import Response
from rest_framework import status

class ProjectLimitOffsetPagination(LimitOffsetPagination):
	defaul_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
	defaul_limit = 20


class ProjectViewSet(ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = ProjectModelSerializer
	pagination_class = ProjectLimitOffsetPagination
	filterset_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
	queryset = ToDo.objects.all()
	serializer_class = ToDoModelSerializer
	pagination_class = ToDoLimitOffsetPagination
	# filterset_fields = ['project']
	filterset_class = ToDoFilter


	def destroy(self, request, *args, **kwargs):
		instance = self.get_object()
		instance.closed = True
		instance.save()
		serializer = self.get_serializer(instance)
		return Response(serializer.data, status=status.HTTP_200_OK)