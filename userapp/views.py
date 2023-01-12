from rest_framework.viewsets import ModelViewSet
from .models import UserModel
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
	queryset = UserModel.objects.all()
	serializer_class = UserModelSerializer