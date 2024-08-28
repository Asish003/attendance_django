# attendance/urls.py

from django.urls import path
from .views import register_attendance, download_attendance_records

urlpatterns = [
    path('api/attendance/register/', register_attendance, name='register_attendance'),
    path('api/attendance/download/', download_attendance_records, name='download_attendance_records'),
]

# attendance_server/urls.py

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('attendance.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
