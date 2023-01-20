from django_filters import rest_framework as filters
from .models import Project, ToDo

class ProjectFilter(filters.FilterSet):
	project_name = filters.CharFilter(lookup_expr='contains')

	class Meta:
		model = Project
		fields = ['project_name']


class ToDoFilter(filters.FilterSet):
	start_date= filters.DateFilter(field_name="created", lookup_expr='gte')
	end_date = filters.DateFilter(field_name="created", lookup_expr='lte')

	class Meta:
		model = ToDo
		fields = ['project']