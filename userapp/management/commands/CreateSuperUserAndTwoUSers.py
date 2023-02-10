from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = (
        "This command create superuser and load users from userapp/fixtures/001_users.json"
    )

    def handle(self, *args, **options):
        call_command("createsuperuser")
        call_command("loaddata", "001_users")




