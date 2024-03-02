// camera.js
const videoObj = document.getElementById("videoElement");
const toggleStreamButton = document.getElementById("toggleStream");
const startRecordingButton = document.getElementById("startRecording");
const stopRecordingButton = document.getElementById("stopRecording");

let stream = null;

// Event listeners
toggleStreamButton.addEventListener("click", toggleStream);
startRecordingButton.addEventListener("click", startRecording);
stopRecordingButton.addEventListener("click", stopRecording);

const constraints = {
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: {ideal: "user"}
  },
}

// Function to toggle video stream
async function toggleStream() {
  if (stream) {
    stopStream();
  } else {
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleStream(stream);
      startRecordingButton.disabled = false;
      requestAnimationFrame(processVideoFrame);
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }
}

// Function to handle video stream
function handleStream(stream) {
  videoObj.srcObject = stream;
}

// Function to stop video stream
function stopStream() {
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoObj.srcObject = null;
    stream = null;
    startRecordingButton.disabled = true;
    stopRecordingButton.disabled = true;
  }
}
