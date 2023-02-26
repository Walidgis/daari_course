# Generated by Django 4.1.6 on 2023-02-11 08:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("listings", "0007_listing_latitude_listing_longitude"),
    ]

    operations = [
        migrations.RemoveField(model_name="listing", name="location",),
        migrations.AddField(
            model_name="listing",
            name="seller",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
