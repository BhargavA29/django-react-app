from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        SUPERADMIN = 'SUPERADMIN', 'Super Admin'
        DEVELOPER = 'DEVELOPER', 'Developer'
        CONTENT_CREATOR = 'CONTENT_CREATOR', 'Content Creator'
        USER = 'USER', 'Regular User'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.USER
    )
    mobile = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.email