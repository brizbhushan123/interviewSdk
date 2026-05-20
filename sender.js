// Global variables
let localStream;
let videoProcessor; // Our MediaStreamTrackProcessor for blurring

const localVideo = document.getElementById('localVideo');
const startLocalVideoButton = document.getElementById('startLocalVideo');
const statusDiv = document.getElementById('status');
const logDiv = document.getElementById('log');

// Debug canvases
const debugCanvas1 = document.getElementById('debugCanvas1');
const debugCtx1 = debugCanvas1 ? debugCanvas1.getContext('2d') : null;
const debugCanvas2 = document.getElementById('debugCanvas2');
const debugCtx2 = debugCanvas2 ? debugCanvas2.getContext('2d') : null;

// Log utility
function log(message) {
    const p = document.createElement('p');
    p.textContent = message;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight; // Auto-scroll to bottom
}

// --- OpenCV.js Initialization ---
let cvReady = false;
function onOpenCvReady() {
    cvReady = true;
    log('OpenCV.js is ready.');
    startLocalVideoButton.disabled = false; // Enable button once OpenCV is loaded
    
    // Hide WebRTC specific elements since this is a local-only demo
    document.getElementById('createOffer').style.display = 'none';
    document.getElementById('answerReceived').style.display = 'none';
    document.getElementById('offerSdp').style.display = 'none';
    document.getElementById('answerSdp').style.display = 'none';
    document.getElementById('setOffer').style.display = 'none';
    const h2s = document.querySelectorAll('h2');
    if (h2s.length > 1) h2s[1].style.display = 'none'; // Hide "Remote Offer/Answer" heading
    document.querySelector('div[style="display: none;"]').style.display = 'none'; // Ensure the container is hidden
}

// --- Video Processing Logic ---
// This function will now return a Promise that resolves with the generated track
async function applyBlurToStream(track) {
    if (!cvReady) {
        log('OpenCV.js not ready yet. Cannot blur.');
        return track; // Return original track
    }
    if (!('MediaStreamTrackProcessor' in window)) {
        log('MediaStreamTrackProcessor API not supported. Cannot blur video. Check browser compatibility.');
        log('Fallback: displaying original video without blurring.');
        return track; // Return original track
    }

    log('Initializing MediaStreamTrackProcessor for blurring...');
    videoProcessor = new MediaStreamTrackProcessor({ track: track });
    const videoGenerator = new MediaStreamTrackGenerator({ kind: 'video' });

    let srcMat; // OpenCV Mat to hold the input frame
    let dstMat; // OpenCV Mat to hold the processed (blurred) frame
    let pixelBuffer; // ArrayBuffer to hold pixel data from VideoFrame (for copyTo)
    let initialized = false;

    const debugFrameInterval = 30; // Log for roughly once per second at 30fps
    let frameCount = 0;

    const transformer = new TransformStream({
        async transform(videoFrame, controller) {
            frameCount++;
            const logThisFrame = (frameCount % debugFrameInterval === 0);

            const width = videoFrame.displayWidth;
            const height = videoFrame.displayHeight;

            if (!initialized) {
                // Set debug canvas dimensions
                if (debugCanvas1 && debugCtx1) {
                    debugCanvas1.width = width;
                    debugCanvas1.height = height;
                }
                if (debugCanvas2 && debugCtx2) {
                    debugCanvas2.width = width;
                    debugCanvas2.height = height;
                }

                // Initialize OpenCV Mats and the pixel buffer only once
                srcMat = new cv.Mat(height, width, cv.CV_8UC4);
                dstMat = new cv.Mat(height, width, cv.CV_8UC4);
                
                pixelBuffer = new Uint8ClampedArray(width * height * 4); 
                
                initialized = true;
                log(`OpenCV Mat and pixel buffer initialized for dimensions: ${width}x${height}`);
                log(`Processing video at resolution: ${width}x${height}`); // Log actual resolution
            }

            try {
                if (logThisFrame) log(`Frame ${frameCount}: Copying VideoFrame data to pixelBuffer...`);
                await videoFrame.copyTo(pixelBuffer, { format: 'RGBA' }); 
                if (logThisFrame) log(`Frame ${frameCount}: pixelBuffer first 10 values: ${pixelBuffer.slice(0, 10)}`);

                // DEBUG: Draw pixelBuffer to debugCanvas1 (pre-OpenCV)
                if (debugCtx1 && logThisFrame) { 
                    const imageDataDebug1 = new ImageData(pixelBuffer, width, height);
                    debugCtx1.putImageData(imageDataDebug1, 0, 0);
                    log(`Frame ${frameCount}: Debug Canvas 1 (Input) updated.`);
                }

                srcMat.data.set(pixelBuffer);
                if (logThisFrame) log(`Frame ${frameCount}: srcMat type: ${srcMat.type()}, channels: ${srcMat.channels()}`);

                if (logThisFrame) log(`Frame ${frameCount}: Applying Gaussian Blur.`);
                cv.GaussianBlur(srcMat, dstMat, new cv.Size(45, 45), 0, 0, cv.BORDER_DEFAULT); 

                // DEBUG: Draw dstMat to debugCanvas2 (post-OpenCV)
                if (debugCtx2 && logThisFrame) { 
                    const imageDataDebug2 = new ImageData(new Uint8ClampedArray(dstMat.data), dstMat.cols, dstMat.rows);
                    debugCtx2.putImageData(imageDataDebug2, 0, 0);
                    log(`Frame ${frameCount}: Debug Canvas 2 (Output) updated.`);
                }

                const imageDataForVideoFrame = new ImageData(new Uint8ClampedArray(dstMat.data), dstMat.cols, dstMat.rows);
                const processedBitmap = await createImageBitmap(imageDataForVideoFrame);

                const newVideoFrame = new VideoFrame(processedBitmap, {
                    timestamp: videoFrame.timestamp,
                    duration: videoFrame.duration,
                    displayWidth: width,
                    displayHeight: height,
                });

                controller.enqueue(newVideoFrame);

                videoFrame.close();
                processedBitmap.close();

            } catch (error) {
                log(`ERROR: Frame ${frameCount}: Error during frame processing: ${error.message}`);
                controller.enqueue(videoFrame); // Enqueue original frame
                videoFrame.close();
            }
        },
        flush() {
            if (initialized) {
                srcMat.delete();
                dstMat.delete();
                log('OpenCV Mats cleaned up.');
            }
        }
    });

    await videoProcessor.readable
        .pipeThrough(transformer)
        .pipeTo(videoGenerator.writable);

    return videoGenerator.track;
}

// --- Start Local Video and Display ---

startLocalVideoButton.onclick = async () => {
    try {
        statusDiv.textContent = 'Starting local video...';
        log('Requesting access to screen sharing with specific resolution (1024x768)...');

        localStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                width: { ideal: 1024, max: 1024 },
                height: { ideal: 768, max: 768 }
            },
            audio: true
        });

        const originalVideoTrack = localStream.getVideoTracks()[0];

        // Log the actual track settings obtained
        const settings = originalVideoTrack.getSettings();
        log(`Actual captured video resolution: ${settings.width}x${settings.height}`);
        
        const processedVideoTrack = await applyBlurToStream(originalVideoTrack);

        if (!processedVideoTrack) {
            log('CRITICAL ERROR: processedVideoTrack is null or undefined after generator. Fallbacking to original track.');
            statusDiv.textContent = 'Error: Processed video track not available. Displaying original.';
            localVideo.srcObject = new MediaStream([originalVideoTrack, ...localStream.getAudioTracks()]);
            return;
        }
        
        const audioTracks = localStream.getAudioTracks();
        const streamTracks = [processedVideoTrack];
        if (audioTracks.length > 0) {
            streamTracks.push(audioTracks[0]);
        }
        
        const blurredStream = new MediaStream(streamTracks);

        localVideo.srcObject = blurredStream;
        
        log('Local screen share started and blurring applied to local display.');
        statusDiv.textContent = 'Local screen share started (blurred).';

    } catch (e) {
        log(`Error starting local screen share: ${e.name} - ${e.message}`);
        statusDiv.textContent = `Error: ${e.message}`;
    }
};

// Disable button initially until OpenCV is ready
startLocalVideoButton.disabled = true;