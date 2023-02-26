from django.contrib import admin
from listings.models import Listing
from listings.models import Poi
from .forms import PoiForm
# Register your models here.

class PoiAdmin(admin.ModelAdmin):
    form = PoiForm

admin.site.register(Listing)
admin.site.register(Poi, PoiAdmin,)
