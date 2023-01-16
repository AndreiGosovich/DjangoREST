from rest_framework.serializers import ModelSerializer
from .models import UserModel


class UserModelSerializer(ModelSerializer):
	class Meta:
		model = UserModel
		fields = ['id', 'username', 'first_name', 'last_name', 'email']