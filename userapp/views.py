from rest_framework import viewsets
from .models import UserModel
from .serializers import UserModelSerializer, UserModelSerializer2
from rest_framework import mixins


class UserModelViewSet(mixins.ListModelMixin
						, mixins.RetrieveModelMixin
						, mixins.UpdateModelMixin
						, viewsets.GenericViewSet):
	
	queryset = UserModel.objects.all()

	def get_serializer_class(self):
		if self.request.version == '2.0':
			return UserModelSerializer2
		return UserModelSerializer
