from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectViewSet(ModelViewSet):
	queryset = Project.objects.all()
	serializer_class = ProjectModelSerializer


class ToDoViewSet(ModelViewSet):
	queryset = ToDo.objects.all()
	serializer_class = ToDoModelSerializer