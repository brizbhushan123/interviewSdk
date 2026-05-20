

describe("SDK Initialization",() => { 
  test("Initialize SDK successfully with provided config and call callback",async ()=>{
   
    expect(global.sessionToken).toEqual(
      expect.objectContaining({
        sessionToken: expect.any(String), 
      })
    );
    
    const sdkRoot = document.getElementsByClassName('thinkproc-popup-wrapper');
    expect(sdkRoot).not.toBeNull();
    // expect(sdkRoot!.innerHTML).toContain('<h1>SDK Initialized!</h1>'); 
    expect(sdkRoot[0]!.querySelector('.thinkproc-popup')).not.toBeNull();

  });

 

});

 
//   beforeEach(() => {
//     // Reset the JSDOM document body before each test
//     document.body.innerHTML = `
//       <div id="app"></div>
//       <video id="cameraFeed"></video>
//     `;
//   });

//   test('addMessageToElement should add a div with the correct message', () => {
//     const targetSelector = '#app';
//     const message = 'Hello from SDK Test!';

//     const result = addMessageToElement(targetSelector, message);

//     expect(result).toBe(true);
//     const appElement = document.querySelector(targetSelector);
//     expect(appElement).not.toBeNull();
//     expect(appElement!.innerHTML).toContain(message); // Use ! for non-null assertion
//     expect(appElement!.querySelector('.sdk-message')).not.toBeNull();
//     expect(appElement!.querySelector('.sdk-message')?.textContent).toBe(message);
//   });

//   test('addMessageToElement should return false if target element is not found', () => {
//     const result = addMessageToElement('#nonExistentId', 'Message');
//     expect(result).toBe(false);
//     expect(document.body.innerHTML).not.toContain('Message');
//   });
// });

// // --- Mocking Media APIs in JSDOM (TypeScript style) ---
// describe('SDK Camera Feed Setup (Mocked)', () => {
//   // Declare your mocks at a higher scope
//   let mockMediaStream: MediaStream;
//   let mockGetUserMedia: jest.Mock; // Type the mock function

//   beforeEach(() => {
//     document.body.innerHTML = `
//       <video id="cameraFeed"></video>
//     `;

//     // Create a mock MediaStream object
//     mockMediaStream = {
//       id: 'mock-stream-id',
//       getTracks: jest.fn(() => ([
//         { kind: 'video', stop: jest.fn() } as MediaStreamTrack, // Cast to MediaStreamTrack
//         { kind: 'audio', stop: jest.fn() } as MediaStreamTrack
//       ])),
//       getVideoTracks: jest.fn(() => ([{ kind: 'video', stop: jest.fn() } as MediaStreamTrack])),
//       getAudioTracks: jest.fn(() => ([{ kind: 'audio', stop: jest.fn() } as MediaStreamTrack])),
//       active: true,
//       oninactive: null,
//       clone: jest.fn(() => ({ ...mockMediaStream, id: 'cloned-id' } as MediaStream)) // Cast to MediaStream
//     } as MediaStream; // Final cast for the overall object

//     // Mock navigator.mediaDevices.getUserMedia
//     // Use jest.fn() for strong typing and better mocking capabilities
//     mockGetUserMedia = jest.fn(() => Promise.resolve(mockMediaStream));

//     // Temporarily overwrite navigator.mediaDevices for the test
//     Object.defineProperty(navigator, 'mediaDevices', {
//       writable: true,
//       value: {
//         getUserMedia: mockGetUserMedia,
//         enumerateDevices: jest.fn(() => Promise.resolve([
//           { kind: 'videoinput', deviceId: 'mock-video-id', label: 'Mock Camera' } as MediaDeviceInfo,
//           { kind: 'audioinput', deviceId: 'mock-audio-id', label: 'Mock Microphone' } as MediaDeviceInfo
//         ])),
//       },
//     });
//   });

//   afterEach(() => {
//     // Restore the original implementation of getUserMedia after each test
//     // This is good practice to ensure test isolation
//     jest.restoreAllMocks(); // Restores mocks created with jest.spyOn
//   });

//   test('setupCameraFeed should call getUserMedia and set srcObject on video element', async () => {
//     const videoElementId = 'cameraFeed';

//     await setupCameraFeed(videoElementId);

//     // Assert that getUserMedia was called with the correct constraints
//     expect(mockGetUserMedia).toHaveBeenCalledWith({ video: true, audio: false });

//     // Assert that the video element's srcObject was set
//     const videoElement = document.getElementById(videoElementId) as HTMLVideoElement;
//     expect(videoElement.srcObject).toBe(mockMediaStream);

//     // If you need to assert that .play() was called on the video element:
//     // const playSpy = jest.spyOn(videoElement, 'play');
//     // await setupCameraFeed(videoElementId);
//     // expect(playSpy).toHaveBeenCalled();
//   });

//   test('setupCameraFeed should throw an error if getUserMedia fails', async () => {
//     const error = new Error('User denied media access.');
//     mockGetUserMedia.mockImplementationOnce(() => Promise.reject(error)); // Mock failure for this test

//     await expect(setupCameraFeed('cameraFeed')).rejects.toThrow('User denied media access.');
//     expect((document.getElementById('cameraFeed') as HTMLVideoElement).srcObject).toBeNull();
//   });
// });