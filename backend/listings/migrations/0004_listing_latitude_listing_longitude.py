# Generated by Django 4.1.6 on 2023-02-10 12:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0003_remove_listing_latitude_remove_listing_longitude_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="latitude",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="listing",
            name="longitude",
            field=models.FloatField(blank=True, null=True),
        ),
    ]