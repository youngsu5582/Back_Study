from django.urls import path, include
from fileProcess import views

urlpatterns = [
    path('', views.main),
    path('v1/files/json', views.jsonFile),
    path('v1/files/xml', views.xmlFile),
    path('v1/files/csv', views.csvFile),
    path('v1/files/yaml', views.yamlFile),
    path('v1/files/exif', views.exifFile)
]