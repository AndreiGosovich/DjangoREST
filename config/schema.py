import graphene
from graphene_django import DjangoObjectType
from userapp.models import UserModel
from todoapp.models import Project, ToDo

class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        fields ='__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields ='__all__'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields ='__all__'

class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(ToDoType)

    project_by_name = graphene.Field(ProjectType, name=graphene.String(required=True))
    
    def resolve_all_users(root, info):
        return UserModel.objects.all()
    
    def resolve_all_projects(root, info):
        return Project.objects.all()
    
    def resolve_all_todo(root, info):
        return ToDo.objects.all()
    
    def resolve_project_by_name(self, info, name):
        try:
            return Project.objects.get(project_name=name)
        except Project.DoesNotExist:
            return None

class ToDoMutation(graphene.Mutation):

    class Arguments:
        id = graphene.ID()
        description = graphene.String(required=True)

    todo = graphene.Field(ToDoType)

    @classmethod
    def mutate(cls, root, info, description, id):        
        todo = ToDo.objects.get(pk=id)
        todo.description = description
        todo.save()
        return ToDoMutation(todo=todo)
    
class Mutation(graphene.ObjectType):
    update_todo = ToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)