from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), #장고가 기본적으로 가지고 있는 관리자 화면으로 이동하기 위한 라우팅 설정
    path('', include('fileProcess.urls'))
]