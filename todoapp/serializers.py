from rest_framework import serializers
from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
	users = serializers.StringRelatedField(many=True)

	class Meta:
		model = Project
		fields = ['id', 'url', 'project_name', 'repo_link', 'users']


class ToDoModelSerializer(serializers.ModelSerializer):
	user = serializers.StringRelatedField()
	project = ProjectModelSerializer()

	class Meta:
		model = ToDo
		fields = ['id', 'url', 'project', 'description', 'created', 'updated', 'user', 'closed']

class ToDoModelSerializerBase(serializers.ModelSerializer):
	class Meta:
		model = ToDo
		fields = '__all__'