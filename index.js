let camera = document.getElementById('camera');
let captureButton = document.getElementById('captureButton');
let uploadContainer = document.getElementById('uploadContainer');
let uploadInput = document.getElementById('uploadInput');
let uploadButton = document.getElementById('uploadButton');
let photoCanvas = document.getElementById('photoCanvas');
let capturedPhotoContainer = document.getElementById('capturedPhotoContainer');
let capturedPhoto = document.getElementById('capturedPhoto');


function requestCameraAccess() {
    navigator.mediaDevices.getUserMedia({
            video: true
        })
        .then((stream) => {
            const video = document.getElementById('camera');
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera: ", error);
            alert("Could not access the camera. Please check your permissions.");
        });
}

function uploadImage(imageData) {
    fetch('/api/attendance/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageData
            })
        }).then(response => response.json())
        .then(data => {
            console.log('Attendance registered: ', data);
        }).catch(error => {
            console.error('Error:', error);
        });
}

function fetchAttendanceRecords() {
    fetch('/api/attendance/download')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'attendance_records.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }).catch(error => {
            console.error('Error fetching attendance records: ', error);
        });
}

function chooseOption(option) {
    if (option === 'live') {
        camera.style.display = 'block';
        captureButton.style.display = 'inline-block';
        uploadContainer.style.display = 'none';
        requestCameraAccess();
    } else if (option === 'upload') {
        uploadInput.style.display = 'block';
        uploadButton.style.display = 'block';
        uploadContainer.style.display = 'block';
        camera.style.display = 'none';
        captureButton.style.display = 'none';
        capturedPhotoContainer.style.display = 'none';
    }
}

function capturePhoto() {
    const video = camera;
    const canvas = photoCanvas;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL('image/png');
    uploadImage(dataURL);
    capturedPhoto.src = dataURL;
    capturedPhotoContainer.style.display = 'block';
}

function uploadPhoto() {
    const fileInput = document.getElementById('uploadInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            uploadImage(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a photo to upload.');
    }
}
