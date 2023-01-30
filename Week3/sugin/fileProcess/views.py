from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json, xmltodict, csv, yaml, exifread
from PIL.ExifTags import TAGS

def main(request):
    return HttpResponse('''file processing ability page''')

@csrf_exempt
def jsonFile(request):
    if request.method == 'GET':
        return HttpResponse('''JSON file page''')

    elif request.method == 'POST':
        path = json.loads(request.body)['path']
        file = open(path + '.json')
        data = json.load(file)

        return JsonResponse({"status" : "ok", "body" : data})

@csrf_exempt
def xmlFile(request):
    if request.method == 'GET':
        return HttpResponse('''xml file page''')

    elif request.method == 'POST':
        path = json.loads(request.body)['path']
        file = open(path + '.xml')
        data= xmltodict.parse(file.read())
        return JsonResponse({"status" : "ok", "body" : data})

@csrf_exempt
def csvFile(request):
    if request.method == 'GET':
        return HttpResponse('''csv file page''')

    elif request.method == 'POST':
        data = []
        path = json.loads(request.body)['path']
        file = csv.DictReader(open(path + '.csv'))

        for row in file:
            data.append(row)

        return JsonResponse({"status" : "ok", "body" : data})

@csrf_exempt
def yamlFile(request):
    if request.method == 'GET':
        return HttpResponse('''csv file page''')

    elif request.method == 'POST':
        data =[]
        path = json.loads(request.body)['path']
        file = yaml.safe_load(open(path + '.yaml'))
        return JsonResponse({"status" : "ok", "body" : file})

@csrf_exempt
def exifFile(request):
    if request.method == 'GET':
        return HttpResponse('''exif file page''')

    elif request.method == 'POST':
        path = json.loads(request.body)['path']
        f = open(path, 'rb')
        tags = exifread.process_file(f, details=False)

        info = {}
        for t in tags:
            tag = TAGS.get(t, t)
            data = tags.get(t)
            if tag in ['Image Make', 'GPS GPSLatitude', 'GPS GPSLongitude']:
                info[f'{tag}'] = f'{data}'

        return JsonResponse({"status" : "ok", "body" : info})