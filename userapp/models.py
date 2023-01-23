from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User

# Create your models here.

class UserModel(models.Model):

    username = models.CharField(_("username"), max_length=150)
    first_name = models.CharField(_("first name"), max_length=150, blank=True)
    last_name = models.CharField(_("last name"), max_length=150, blank=True)
    email = models.CharField(
        _("email address"),
        max_length=256,
        unique=True,
        error_messages={
            "unique": _("A user with that email address already exists."),
        },
    )

    def __str__(self):
        return self.username
    

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")