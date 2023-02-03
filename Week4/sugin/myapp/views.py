from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from myapp.db.seed_models import testData
from myapp.db.db_controller import getList, search
import json

T = testData()

def main(request):
    return HttpResponse('''SQL Processing Page''')

@csrf_exempt
def testUser(request):
    if request.method == 'POST':
        try:
            total = json.loads(request.body)['seed']
            user_list = serializers.serialize("json", T.handleUser(total))
            result = json.loads(user_list)
            return JsonResponse(result, safe=False, status=200)

        except Exception as ex:
            print('error !!', ex)
            return JsonResponse({"status" : "400"})
            
@csrf_exempt
def testPost(request):
    if request.method == 'POST':
        try:
            total = json.loads(request.body)['seed']
            post_list = serializers.serialize("json", T.handlePost(total))
            result = json.loads(post_list)
            return JsonResponse(result, safe=False, status=200)

        except Exception as ex:
            print('error !!', ex)
            return JsonResponse({"status" : "400"})

@csrf_exempt
def postList(request):
    if request.method == 'GET':
        try:
            type = request.GET['type']
            cnt = int(request.GET['count'])
            data = []
            if type == 'most': data = getList.getMost(cnt)
            elif type == 'recent': data = getList.getRecent(cnt)

            result = serializers.serialize("json", data)
            return JsonResponse(json.loads(result), safe=False, status=200)

        except Exception as ex:
            print('error !!', ex)
            return JsonResponse({"status" : "400"})

@csrf_exempt
def postSearch(request):
    if request.method == 'GET':
        try:
            type = request.GET['type']
            text = request.GET['text']
            data = []
            if type == 'title': data = search.getTitle(text)
            elif type == 'content': data = search.getContent(text)
            elif type == 'writer': data = search.getWriter(int(text))

            result = serializers.serialize("json", data)
            return JsonResponse(json.loads(result), safe=False, status=200)

        except Exception as ex:
            print('error !!', ex)
            return JsonResponse({"status" : "400"})