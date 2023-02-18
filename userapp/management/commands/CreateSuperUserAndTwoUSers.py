from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        "This command create superuser and load users from userapp/fixtures/001_users.json"
    )

    def handle(self, *args, **options):
        # call_command("pwd")
        # call_command("DJANGO_SUPERUSER_PASSWORD=admin DJANGO_SUPERUSER_USERNAME=admin DJANGO_SUPERUSER_EMAIL=my_user@domain.com ./manage.py createsuperuser --no-input")
        from django.contrib.auth.models import User
        try:
            u = User.objects.get(username__exact='admin99')
        except:
            call_command("createsuperuser", "--username", "admin99", "--noinput", "--email", "admin@someon.tam") 
            u = User.objects.get(username__exact='admin99')
            u.set_password('admin99')
            u.save()
        call_command("loaddata", "001_users")
        call_command("loaddata", "001_projects")
        call_command("loaddata", "0021_todos")
