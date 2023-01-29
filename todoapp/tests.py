from django.test import TestCase
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectViewSet
from .models import Project, ToDo


class TestAPIRequestFactory(TestCase):
	def test_get_list(self):
		factory = APIRequestFactory()
		request = factory.get('/api/projects/')
		view = ProjectViewSet.as_view({'get': 'list'})
		response = view(request)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		

class TestAPIClient(TestCase):
    def test_get_project(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_edit_project_no_authorized(self):
        project = mixer.blend(Project)
        client = APIClient()
        response = client.put(f'/api/projects/{project.id}/', {
              'project_name':'Новый проект', 
              'repo_link': project.repo_link,
            #   'users': project.users
              })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_project_authorized(self):
        project = mixer.blend(Project)
        client = APIClient()
        admin = User.objects.create_superuser('admin01', 'admin@admin.com', 'admin123456')
        client.login(username='admin01', password='admin123456')
        response = client.put(f'/api/projects/{project.id}/', {
              'project_name':'Новый проект', 
            #   'repo_link': project.repo_link,
            #   'users': project.users
              })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.project_name, 'Новый проект')
        client.logout()


class TestBookViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        project = mixer.blend(Project)
        todo = mixer.blend(ToDo, project = project)

        admin = User.objects.create_superuser('admin01', 'admin@admin.com', 'admin123456')
        self.client.login(username='admin01', password='admin123456')
        response = self.client.put(f'/api/todo/{todo.id}/', {
             'project': todo.project.id, 
             "description": "Заметочка", 
            #  'created': todo.created,
            #  'updated': todo.updated,
             'user': todo.user.id, 
            #  'closed': todo.closed
            })

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.description,'Заметочка')