from rest_framework import serializers
from .models import Project, ToDo


class ProjectModelSerializer(serializers.HyperlinkedModelSerializer):
	users = serializers.StringRelatedField(many=True)

	class Meta:
		model = Project
		fields = ['url', 'project_name', 'repo_link', 'users']


class ToDoModelSerializer(serializers.HyperlinkedModelSerializer):
	user = serializers.StringRelatedField()
	project = ProjectModelSerializer()

	class Meta:
		model = ToDo
		fields = ['url', 'project', 'description', 'created', 'updated', 'user']