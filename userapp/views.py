from rest_framework import viewsets
from .models import UserModel
from .serializers import UserModelSerializer
from rest_framework import mixins


class UserModelViewSet(mixins.ListModelMixin
						, mixins.RetrieveModelMixin
						, mixins.UpdateModelMixin
						, viewsets.GenericViewSet):
	
	queryset = UserModel.objects.all()
	serializer_class = UserModelSerializer
