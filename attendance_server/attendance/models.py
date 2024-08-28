from django.db import models

class AttendanceRecord(models.Model):
    image = models.ImageField(upload_to='attendance_images/')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attendance at {self.timestamp}"