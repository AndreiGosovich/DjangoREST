from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Project(models.Model):

    project_name = models.CharField(verbose_name=_("project name"), max_length=150)
    repo_link = models.CharField(verbose_name=_('link to repository'), max_length=254, blank=True)
    users = models.ManyToManyField('userapp.UserModel')

    def __str__(self):
        return self.project_name

    class Meta:
        verbose_name = _("project")
        verbose_name_plural = _("projects")


class ToDo(models.Model):

    project = models.ForeignKey('todoapp.Project', on_delete=models.CASCADE)
    description = models.TextField(
        verbose_name=_('Description'), blank=True, null=True
    )
    created = models.DateTimeField(
        auto_now_add=True, verbose_name="Created", editable=False
    )
    updated = models.DateTimeField(
        auto_now=True, verbose_name="Edited", editable=False
    )
    user = models.ForeignKey('userapp.UserModel', on_delete=models.CASCADE)
    closed = models.BooleanField(default=False, verbose_name='Closed')

    class Meta:
        verbose_name = _("ToDo")
        verbose_name_plural = _("ToDo's")