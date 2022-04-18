import graphene
from graphene_django import DjangoObjectType
from users.models import CustomUser
from todo.models import Project, Todo


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")
    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    user_by_id = graphene.Field(UserType, pk=graphene.Int(required=True))

    def resolve_user_by_id(root, info, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            return None

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_todo = graphene.List(TodoType)

    def resolve_all_todo(root, info):
        return Todo.objects.all()


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        birthday_year = graphene.String(required=True)
        email = graphene.String(required=True)
    
    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, 
                first_name, last_name, 
                birthday_year, email):
        user = CustomUser(first_name=first_name,
                        last_name=last_name,
                        birthday_year=birthday_year,
                        email=email)
        user.save()
        return cls(user)


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        birthday_year = graphene.String(required=False)
        email = graphene.String(required=False)
    
    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id,
                first_name=None, last_name=None, 
                birthday_year=None, email=None):
        user = CustomUser.objects.get(pk=id)
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if birthday_year:
            user.birthday_year = birthday_year
        if email:
            user.email = email
        if first_name or last_name or birthday_year or email:
            user.save()
        return cls(user)


class Mutations(graphene.ObjectType):
    create_user = UserCreateMutation.Field()
    update_user = UserUpdateMutation.Field()
    

schema = graphene.Schema(query=Query, mutation=Mutations)
