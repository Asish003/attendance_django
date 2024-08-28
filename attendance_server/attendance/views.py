# attendance/views.py

from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AttendanceRecord
import os
from django.conf import settings

@csrf_exempt
def register_attendance(request):
    if request.method == 'POST':
        image = request.FILES.get('image')
        if image:
            record = AttendanceRecord(image=image)
            record.save()

            # backendconnect

            return JsonResponse({'message': 'Attendance registered successfully'})
        else:
            return JsonResponse({'error': 'No image provided'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def download_attendance_records(request):
    file_path = os.path.join(settings.MEDIA_ROOT, 'attendance_records.xlsx')
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type='application/vnd.ms-excel')
            response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
            return response
    return JsonResponse({'error': 'File not found'}, status=404)
