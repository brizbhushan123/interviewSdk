import { utimes } from 'fs';
import browserCheck from '../features/BrowserCheck';
import ui from '../ui/UiManager';
import { configrationManager } from './ConfigrationManager';
import { Recording } from './Recording';
import utility from './Utility';
import { regularSnap } from './RegularSnap';
import { socket } from './SocketManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import { peer } from './PeerConnectionManager';
import { chat } from './ChatManager';
import { environment } from '../config/environment';
import { interviewMonitor } from '../features/InterviewMonitor';

interface cameraConstraints {
  deviceId: { exact: string | undefined } | undefined;
  width: { ideal: 1024 };
  height: { ideal: 576 };
  frameRate: { ideal: 25 };
}

export interface cameraDetails {
  stream: null | MediaStream;
  deviceId: cameraConstraints;
  label: string;
  videoDeviceIN?: string;
  name: string;
  recording?: Recording;
  noise: boolean;
  external: boolean;
}
type mobileCams = 'environment' | 'user' | '';

export interface audioDetails {
  stream: null | MediaStream;
  deviceId: {
    deviceId: { exact: string | undefined } | undefined;
    echoCancellation?: boolean;
    noiseSuppression?: boolean;
    suppressLocalAudioPlayback?: boolean;
    autoGainControl?: boolean;
    sampleRate?: number;
  };
  label: string;
  audioDeviceIN?: string;
  name: string;
  noise: boolean;
  external: boolean;
}

/* Author : Prateek Jaiswal */

/**
 *
 */
export class LiveStreamManager {
  static PRIMARY_CAMERA_NAME = 'P_CAM';

  screen_stream: MediaStream | null;
  streamEndedEvent: string;
  camera_stream: MediaStream | null;
  camera_view: boolean;
  audio_view: boolean;
  camRevoked: { [key: string]: boolean };
  micRevoked: boolean;
  audio_stream: MediaStream | null;
  audio_device_id: { [key: string]: any };
  videoDeviceIN: string;
  audioDeviceIN: string;
  camera_device_id: { [key: string]: any };
  camPermissions: boolean;
  micPermissions: boolean;
  recognition: any = null;
  isCameraRevoked: boolean = false;

  cameraPermissionEventSet = false;
  micPermissionEventSet = false;
  audioContext = new AudioContext();
  destination: MediaStreamAudioDestinationNode | null = null;
  remoteAudioNodes: Map<string, MediaStreamAudioSourceNode> = new Map();
  workerPath = environment.UI_BASE_URL + 'recordingWorker.js';
  workerFile: string = '';
  cameraRevokeContinouslyInterval: ReturnType<typeof setInterval> | null = null;
  cameraRevokeRessign: boolean = false;

  static CAMERA: { [key: string]: cameraDetails } = {
    PRIMARY: LiveStreamManager.getCameraObject('P_CAM'),
    SIDE: LiveStreamManager.getCameraObject('S_CAM'),
    FRONT: LiveStreamManager.getCameraObject('F_CAM'),
    BACK: LiveStreamManager.getCameraObject('B_CAM'),
    ROOM: LiveStreamManager.getCameraObject('RS_CAM'),
    SCREEN: LiveStreamManager.getCameraObject('SR_CAM'),
    CUSTOM: LiveStreamManager.getCameraObject('C_CAM'),
  };

  static AUDIO: { [key: string]: audioDetails } = {
    PRIMARY: LiveStreamManager.getAudioObject('AUDIO'),
    PRIMARY_NOISE: LiveStreamManager.getAudioObject('PRIMARY_NOISE', true),
    SIDE: LiveStreamManager.getAudioObject('SIDE'),
    FRONT: LiveStreamManager.getAudioObject('FRONT'),
    BACK: LiveStreamManager.getAudioObject('BACK'),
    CUSTOM: LiveStreamManager.getAudioObject('CUSTOM'),
  };

  /**
   *
   */
  constructor() {
    this.screen_stream = null;
    this.streamEndedEvent = 'ended';
    this.camera_stream = null;
    this.camera_view = false;
    this.audio_view = false;
    this.camRevoked = {};
    this.micRevoked = false;
    this.audio_stream = null;
    this.audio_device_id = { deviceId: undefined };
    this.videoDeviceIN = '';
    this.audioDeviceIN = '';
    this.camera_device_id = { deviceId: undefined };
    this.hasPermissions();
    this.camPermissions = false;
    this.micPermissions = false;
    this.checkSelectedDevicePerm = this.checkSelectedDevicePerm.bind(this);
  }

  static getCameraConstraint(): cameraConstraints {
    return {
      deviceId: undefined,
      width: { ideal: 1024 },
      height: { ideal: 576 },
      frameRate: { ideal: 25 },
    };
  }
  /**
   *
   * @param name
   */
  static getCameraObject(name: string): cameraDetails {
    return {
      stream: null,
      deviceId: this.getCameraConstraint(),
      label: '',
      name: name,
      noise: false,
      external: false,
    };
  }

  /**
   *
   * @param name
   */
  static getAudioObject(name: string, noise = false): audioDetails {
    let constraints = utility.audioConstraints();
    return {
      stream: null,
      deviceId: constraints,
      label: '',
      name: name,
      noise: noise,
      external: false,
    };
  }

  /**
   *
   * @param value
   */
  async permissionEnable(value: string): Promise<boolean> {
    try {
      const permissionStatus = await navigator.permissions.query({ name: value as PermissionName });

      if (permissionStatus.state === 'granted') {
        return true;
      } else if (permissionStatus.state === 'prompt') {
        return false;
      } else if (permissionStatus.state === 'denied') {
        return false;
      }

      // You can also listen for changes in permission status
      // permissionStatus.onchange = () => {
      //   utility.log(`${value} permission changed to ${permissionStatus.state}`);
      // };
    } catch (error) {
      utility.error(`Error checking ${value} permission:`, error);
      return false;
    }
    return false;
  }

  /**
   *
   */
  async hasPermissions() {
    if (this.camera_view) {
      this.camPermissions = await this.permissionEnable('camera');
    }
    if (this.audio_view) {
      this.micPermissions = await this.permissionEnable('microphone');
    }
    return { camera: this.camPermissions, mic: this.micPermissions };
  }

  /* This function is request for screen share */
  /**
   *
   * @param callback
   * @param error_callback
   */
  async requestScreenShare(callback = () => { }, error_callback = (data: string) => { }) {
    try {
      let newConstraints = {
        audio: false,
        video: {
          width: { max: 1024 },
          height: { max: 576 },
          cursor: 'always',
          displaySurface: 'monitor',
          frameRate: 25,
        },
      };

      let stream = await navigator.mediaDevices.getDisplayMedia(newConstraints);
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();

      // Detect Firefox using user agent
      const isFirefox = browserCheck.getBrowserName();

      let isEntireScreenShared = true;
      //settings.width === screen.width && settings.height === screen.height;

      if (isFirefox == 'Firefox') {
        isEntireScreenShared = true;
      }
      const displaySurface = (settings as any).displaySurface;

      if ((displaySurface && displaySurface !== 'monitor') || !isEntireScreenShared) {
        stream.getTracks().forEach((t) => t.stop());
        error_callback(ui.translations.status.entire_screen);
        return;
      }
      let self = this;

      stream.getTracks().forEach((track) => {
        track.addEventListener(
          'ended',
          function () {
            configrationManager.isScreenStreamEnding = true;
            error_callback(ui.translations.status.entire_screen);
            regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SCREEN.name);
            if (configrationManager.video_recording == 1) {
              self.stopRecord(LiveStreamManager.CAMERA.SCREEN);
            }
            LiveStreamManager.CAMERA.SCREEN.stream = null;
            self.screenRevokeCallback();
            setTimeout(() => {
              configrationManager.isScreenStreamEnding = false;
            }, 5000);
          },
          false
        );
      });
      self.screenRevokeRetryCallback();

      LiveStreamManager.CAMERA.SCREEN.stream = stream;
      if (configrationManager.video_recording == 1) {
        this.record(LiveStreamManager.CAMERA.SCREEN);
      }

      if (configrationManager.image_recording == 1) {
        regularSnap.takeSnapImage(LiveStreamManager.CAMERA.SCREEN);
      }

      // Success for Firefox or Chrome with valid screen selection
      callback();
    } catch (e) {
      utility.error('Error requesting screen share:', e);
      error_callback(ui.translations.status.shareScreenFailed);
    }
  }

  /**
   *
   * @param callback
   * @param error_callback
   */
  async screenShare(callback = () => { }, error_callback = (data: string) => { }) {
    const button = ui.id('thinkX_btnScreen') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        ui.addClass(button, 'thinkproc-disable');
        await this.requestScreenShare(callback, error_callback);
        setTimeout(() => {
          ui.removeClass(button, 'thinkproc-disable');
        }, 500);
      });
    }
  }

  /* This function is stop screen share */
  /**
   *
   */
  stopScreenStream() {
    if (this.screen_stream) {
      this.screen_stream.getTracks().forEach((track) => {
        track.removeEventListener(this.streamEndedEvent, this.handleVideoEnded);
        track.removeEventListener('ended', this.checkSelectedDevicePerm);
        track.removeEventListener('mute', this.checkSelectedDevicePerm);
        track.stop();
      });
      this.screen_stream = null;
    }
  }

  /**
   *
   */
  async getMediaDevices(): Promise<
    { video: MediaDeviceInfo[]; audio: MediaDeviceInfo[] } | boolean
  > {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const audioDevices = devices.filter((device) => device.kind === 'audioinput');
      return { video: videoDevices, audio: audioDevices };
    } catch (error) {
      utility.error('Error enumerating devices:', error);
      return false;
    }
  }

  /**
   * Get list of available cameras excluding the ones already in use
   * @param includePrimary whether to include the primary camera
   */
  async getAvailableCameras(includePrimary = true): Promise<MediaDeviceInfo[] | boolean> {
    try {
      // Enumerate all devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      let videoDevices = devices.filter((device) => device.kind === "videoinput");

      // Collect all deviceIds that are already in use by LiveStreamManager.CAMERA
      const usedDeviceIds: string[] = Object.values(LiveStreamManager.CAMERA)
        .filter((cam) => cam.stream && cam.videoDeviceIN) // active cameras
        .map((cam) => cam.videoDeviceIN as string);

      // Filter out used cameras
      videoDevices = videoDevices.filter((device) => !usedDeviceIds.includes(device.deviceId));

      // Exclude primary camera if includePrimary = false
      if (!includePrimary && this.videoDeviceIN) {
        videoDevices = videoDevices.filter((device) => device.deviceId !== this.videoDeviceIN);
      }

      return videoDevices;
    } catch (error) {
      utility.error("Error getting available cameras:", error);
      return false;
    }
  }

  /**
   *
   * @param includePrimary
   */
  async getCameraList(includePrimary = true): Promise<MediaDeviceInfo[] | boolean> {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      const deviceList = await this.getMediaDevices();
      if (typeof deviceList != 'boolean') {
        const cameraList = deviceList.video;
        if (includePrimary != true) {
          //
        }
        return cameraList;
      }
      return false;
    } catch (error) {
      // need to work here....
      utility.error('Error getting camera list');
      return false;
    }
  }

  async getCameraListAvaliable(includePrimary = true): Promise<MediaDeviceInfo[] | boolean> {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      const deviceList = await this.getAvailableCameras();
      if (typeof deviceList != 'boolean') {
        const cameraList = deviceList;
        if (includePrimary != true) {
          //
        }
        return cameraList;
      }
      return false;
    } catch (error) {
      // need to work here....
      utility.error('Error getting camera list');
      return false;
    }
  }

  /**
   *
   * @param includePrimary
   */
  async getAudioList(includePrimary = true): Promise<MediaDeviceInfo[] | boolean> {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      const deviceList = await this.getMediaDevices();
      if (typeof deviceList != 'boolean') {
        const audioList = deviceList.audio;
        if (includePrimary != true) {
        }
        return audioList;
      }
      return false;
    } catch (error) {
      utility.error('Error getting audio list');
      return false;
    }
  }

  /* This function is request for Audio Stream */
  /**
   *
   * @param audio
   */
  async requestAudio(audio: audioDetails) {
    const streamData = await this.getAudioStream(audio);
    if (!streamData) {
      this.showAudioRevokeDialog();
    } else {
      return streamData;
    }
  }

  /* This function is request for Video Stream*/
  /**
   *
   * @param camera
   */
  async requestVideo(camera: cameraDetails, mobile: mobileCams = '') {
    const streamData = await this.getCameraStream(camera, mobile);
    if (!streamData) {
      this.showCameraRevokeDialog(camera.name);
    } else {
      return streamData;
    }
  }

  /* This function is check which device is available */
  /**
   *
   * @param camera
   */
  async checkCameraDevices(camera: null | cameraDetails) {
    // Enumerate all available devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputDevices = devices.filter((device) => device.kind === 'videoinput');

    // Check if the specific video device is still available
    // const videoDeviceStillAvailable = videoInputDevices.some(device => device.deviceId === this.videoDeviceIN);

    let allVideoUnavailable = true;
    let videoDeviceStillAvailable = false;

    // Check each camera's videoDeviceIN
    if (camera && camera.stream && camera.videoDeviceIN) {
      const videoDeviceId = camera.videoDeviceIN;
      videoDeviceStillAvailable = videoInputDevices.some(
        (device) => device.deviceId === videoDeviceId
      );

      if (!videoDeviceStillAvailable) {
        this.setCameraDeviceId(camera);
        camera.videoDeviceIN = '';
        camera.stream = null;
        utility.log(`Video device for provided camera is no longer available.`);
        this.showCameraRevokeDialog(camera.name); // You can pass info if needed
        this.closeVideoStream(camera);
      } else {
        allVideoUnavailable = false;
      }
    } else {
      // If no specific camera passed, check all as before
      for (const key in LiveStreamManager.CAMERA) {
        const cam = LiveStreamManager.CAMERA[key];
        const videoDeviceId = cam.videoDeviceIN;

        if (!cam.stream || !videoDeviceId) {
          continue;
        }

        if (!videoInputDevices.some((device) => device.deviceId === videoDeviceId)) {
          cam.deviceId = LiveStreamManager.getCameraConstraint();
          cam.videoDeviceIN = '';
          cam.stream = null;
          utility.log(`Video device for camera [${key}] is no longer available.`);
          this.showCameraRevokeDialog(cam.name);
          this.closeVideoStream(cam);
        } else {
          allVideoUnavailable = false;
        }
      }
    }
  }

  /**
   *
   * @param audio
   */
  async checkAudioDevices(audio: null | audioDetails) {
    // Enumerate all available devices
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputDevices = devices.filter((device) => device.kind === 'audioinput');

    // Check if the specific video device is still available

    let allAudioUnavailable = true;
    let audioDeviceStillAvailable = false;

    // Check each camera's videoDeviceIN
    if (audio && audio.stream && audio.audioDeviceIN) {
      const audioDeviceId = audio.audioDeviceIN;
      audioDeviceStillAvailable = audioInputDevices.some(
        (device) => device.deviceId === audioDeviceId
      );

      if (!audioDeviceStillAvailable) {
        audio.deviceId = utility.audioConstraints();
        audio.audioDeviceIN = '';
        audio.stream = null;
        utility.log(`Audio device for provided audio is no longer available.`);
        this.showAudioRevokeDialog(); // You can pass info if needed
        this.closeAudioStream(audio);
      } else {
        allAudioUnavailable = false;
      }
    } else {
      // If no specific camera passed, check all as before
      for (const key in LiveStreamManager.AUDIO) {
        const mic = LiveStreamManager.AUDIO[key];
        const audioDeviceId = mic.audioDeviceIN;

        if (!mic.stream || !audioDeviceId) {
          continue;
        }

        if (!audioInputDevices.some((device) => device.deviceId === audioDeviceId)) {
          mic.deviceId = utility.audioConstraints();
          mic.audioDeviceIN = '';
          mic.stream = null;
          utility.log(`audio device for audio [${key}] is no longer available.`);
          this.showAudioRevokeDialog();
          this.closeAudioStream(mic);
        } else {
          allAudioUnavailable = false;
        }
      }
    }
  }
  /**
   *
   * @param deviceId
   * @param type
   */
  async isValidDeviceId(deviceId: string, type: string): Promise<boolean> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Filter video or audio devices based on the 'type' parameter
      const filteredDevices = devices.filter((device) => device.kind === type);

      // Check if the deviceId exists in the filtered devices
      const deviceExists = filteredDevices.some((device) => device.deviceId === deviceId);

      return deviceExists;
    } catch (error) {
      utility.error('Error checking devicecheckDevices ID validity:', error);
      return false;
    }
  }

  /**
   *
   * @param deviceId
   */
  async setCameraDeviceId(camera: cameraDetails, deviceId?: string) {
    //videoinput
    let deviceInfo: cameraConstraints = LiveStreamManager.getCameraConstraint();
    if (!(deviceId == undefined || deviceId == '')) {
      deviceInfo.deviceId = { exact: deviceId };
    }
    camera.deviceId = deviceInfo;
    // this.camRevoked = false;
    return this;
  }
  /**
   *
   * @param deviceId
   */
  async setAudioDeviceId(deviceId: any) {
    //audioinput
    if (!this.audio_view) {
      throw new Error('Mic setting not configured.');
    }
    if (!(await this.isValidDeviceId(deviceId, 'audioinput'))) {
      this.showAudioRevokeDialog();
      throw new Error('Invalid Audio Device Id');

      //return;
    }
    this.audio_device_id = { deviceId: deviceId ? { exact: deviceId } : undefined };
    this.micRevoked = false;
    return this;
  }

  /* This function is used to get Camera stream */
  /**
   *
   * @param camera
   */
  async getCameraStream(camera: cameraDetails, mobile: mobileCams = '') {
    const self = this;
    try {
      if (camera.stream != null) {
        const existingTracks = camera.stream.getVideoTracks();
        const existingSettings = existingTracks.length > 0 ? existingTracks[0].getSettings() : {};
        return {
          stream: camera.stream,
          settings: existingSettings,
        };
      }
      this.camRevoked[camera.name] = false;
      if (!(await this.checkSelectedDevicePerm(null, 'camera', camera.name))) {
        return false;
      }
      const deviceId = camera.deviceId.deviceId != undefined ? camera.deviceId : true;
      let constraints = { video: deviceId };
      let stream: MediaStream;
      if (mobile != '') {
        let constraintsReal = LiveStreamManager.getCameraConstraint();
        let constraintsNew = {
          video: {
            // width: constraintsReal.height,
            // height: constraintsReal.width,
            frameRate: constraintsReal.frameRate,
            facingMode: mobile, // 'environment' targets the rear camera
          },
          audio: false, // You can set this to true if you need audio as well
        };
        stream = await navigator.mediaDevices.getUserMedia(constraintsNew);
        stream = this.mobileOrientedStream(stream,constraintsReal.width.ideal,constraintsReal.height.ideal);
      } else {
        utility.log('Camera constraints:', constraints);
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      camera.stream = stream;
      if ('oninactive' in stream) {
        this.streamEndedEvent = 'inactive';
      }

      // Extract the device IDs for video and audio tracks
      const videoTracks = stream.getVideoTracks();
      if (videoTracks.length === 0) {
        utility.log('No video tracks found in the stream.');
        return false;
      }

      const videoTrack = videoTracks[0];
      const settings = videoTrack.getSettings();
      utility.log('Video track settings:', settings);
      if (videoTracks.length > 0) {
        //  await  videoTrack.applyConstraints({
        //           width: {ideal:1280},
        //           height: {ideal:720},
        //           frameRate: {ideal:25}});

        this.setCameraDeviceId(camera, videoTracks[0].getSettings().deviceId);
        camera.videoDeviceIN =
          videoTracks[0].getSettings().deviceId || ui.translations.status.unknownVideoDevice;
        //utility.log(`Video Device ID: ${this.camera_device_id}`);
      }

      if (this.cameraPermissionEventSet == false) {
        // If video is true. add event listener for camera permissions
        const camera_perm = await navigator.permissions.query({ name: 'camera' });
        camera_perm.onchange = (evt) => {
          const allowed = camera_perm.state === 'granted';
          if (allowed) {
            //utility.log("Camera permission allowed");
          } else {
            self.checkCameraDevices(null);
          }
        };
        this.cameraPermissionEventSet = true;
        this.deviceChange();
      }

      stream.getTracks().forEach((track) => {
        track.addEventListener(
          this.streamEndedEvent,
          function () {
            utility.log('Jitendra Camera stream ended');
            self.checkSelectedDevicePerm(null, 'camera', camera.name);
          },
          false
        );
        track.addEventListener(
          'mute',
          function () {
            self.checkSelectedDevicePerm(null, 'camera', camera.name);
          },
          false
        );
      });
      this.camera_view = true;
      camera.external = false;
      return { stream, settings };
    } catch (error) {
      utility.error('Error getting camera stream:', error);
      this.checkCameraDevices(camera);
      // this.handleGetUserMediaError(error);
      return false;
    }
  }

  /* This function is used to get Audio stream */
  /**
   *
   * @param audio
   */
  async getAudioStream(audio: audioDetails) {
    const self = this;
    try {
      if (audio.stream) {
        return audio.stream;
      }
      if (!(await this.checkSelectedDevicePerm(null, 'mic'))) {
        return false;
      }
      let deviceId = audio.deviceId.deviceId != undefined ? audio.deviceId : true;
      if (audio.noise) {
        // If noise is true, we will use the noise suppression feature
        if (deviceId != undefined && deviceId != true) {
          deviceId.echoCancellation = false;
          deviceId.noiseSuppression = false;
          deviceId.suppressLocalAudioPlayback = false;
        }
      } else {
        if (deviceId != undefined && deviceId != true) {
          deviceId.echoCancellation = true;
          deviceId.noiseSuppression = true;
          deviceId.autoGainControl = true;
          deviceId.sampleRate = 16000;
        }
      }
      const constraints = { audio: deviceId };
      utility.log('Audio constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      audio.stream = stream;
      if ('oninactive' in stream) {
        this.streamEndedEvent = 'inactive';
      }
      this.micRevoked = false;
      // Extract the device IDs for video and audio tracks
      const audioTracks = stream.getAudioTracks();

      if (audioTracks.length > 0) {
        let deviceId = audioTracks[0].getSettings().deviceId
          ? { exact: audioTracks[0].getSettings().deviceId }
          : undefined;
        audio.deviceId = utility.audioConstraints(deviceId);
        audio.audioDeviceIN =
          audioTracks[0].getSettings().deviceId || ui.translations.status.unknownAudioDevice;
        //                    utility.log(`Audio Device ID: ${this.audio_device_id}`);
      }

      if (this.micPermissionEventSet == false) {
        // If audio is true. add event listener for mic permissions
        const mic_perm = await navigator.permissions.query({ name: 'microphone' });
        mic_perm.onchange = (evt) => {
          const allowed = mic_perm.state === 'granted';
          if (allowed) {
            //utility.log("Mic permission allowed");
          } else {
            self.checkAudioDevices(audio); // need to work
          }
        };
        this.micPermissionEventSet = true;
        this.deviceChange();
      }

      // this.monitorMic(stream);
      stream.getTracks().forEach((track) => {
        track.addEventListener(
          this.streamEndedEvent,
          function () {
            self.checkSelectedDevicePerm('mic');
          },
          false
        );
        track.addEventListener(
          'mute',
          function () {
            self.checkSelectedDevicePerm('mic');
          },
          false
        );
      });
      this.audio_view = true;
      return stream;
    } catch (error) {
      this.checkAudioDevices(audio); // need to work
      //                this.handleGetUserMediaError(error);
      return false;
    }
  }

  deviceChange() {
    navigator.mediaDevices.ondevicechange = async () => {
      utility.log('Device change detected');
      this.checkCameraDevices(null);
      this.checkAudioDevices(null);
    };
  }

  /**
   *
   * @param e
   * @param check
   */
  async checkSelectedDevicePerm(e: any, check = '', devicename = '') {
    let cameraAccess: boolean = true;
    let micAccess = true;

    // System-level permission checks
    if (this.camera_view && (check == '' || check == 'camera')) {
      // cameraAccess = await this.checkCameraPermission();
      // if (!cameraAccess) {
      //   this.camRevoked = true;
      // }else{
      cameraAccess = await this.permissionEnable('camera');
      if (!cameraAccess) {
        for (let cam in this.camRevoked) {
          this.camRevoked[cam] = true;
        }
      }
      // }
    }

    if (this.audio_view && (check == '' || check == 'mic')) {
      // micAccess = await this.checkMicPermission();
      // if (!micAccess) {
      //   this.micRevoked = true;
      // }else {
      micAccess = await this.permissionEnable('microphone');
      if (!micAccess) {
        this.micRevoked = true;
      }
      // }
    }

    // if (this.camRevoked && this.micRevoked) {
    //   utility.log('System-level device permission revoked');
    //   this.showCameraAudioRevokeDialog();
    //   this.handleVideoEnded();
    //   this.handleAudioEnded();
    //   return false;
    // }
    for (let cam in this.camRevoked) {
      if (
        (cam == devicename || devicename == '') &&
        this.camRevoked[cam] &&
        (check == '' || check == 'camera')
      ) {
        utility.log('System-level camera permission revoked');
        this.showCameraRevokeDialog(cam);
        if (cam == devicename) {
          return false;
        }
      }
    }

    if (this.micRevoked && (check == '' || check == 'mic')) {
      utility.log('System-level microphone permission revoked');
      this.showAudioRevokeDialog();
      return false;
    }

    return true;
  }

  /**
   *
   */
  async checkCameraPermission() {
    try {
      const cm: MediaStream | boolean = await navigator.mediaDevices
        .getUserMedia({ video: true })
        .catch(() => false);
      if (cm && typeof cm !== 'boolean') {
        cm.getTracks().forEach((track: { stop: () => any }) => track.stop()); // Stop all tracks
      }
      return cm ? true : false;
    } catch (e) {
      return false;
    }
  }
  /**
   *
   */
  async checkMicPermission() {
    try {
      const cm: MediaStream | boolean = await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .catch(() => false);
      if (cm && typeof cm !== 'boolean') {
        cm.getTracks().forEach((track: { stop: () => any }) => track.stop()); // Stop all tracks
      }
      return cm ? true : false;
    } catch (e) {
      return false;
    }
  }

  /**
   *
   */
  handleVideoEnded() {
    this.stopVideoStream();
  }

  /**
   *
   */
  stopVideoStream() {
    for (const key in LiveStreamManager.CAMERA) {
      const cam = LiveStreamManager.CAMERA[key];

      if (cam.stream) {
        cam.stream.getTracks().forEach((track) => {
          track.removeEventListener(this.streamEndedEvent, this.handleVideoEnded);
          track.removeEventListener('ended', this.checkSelectedDevicePerm);
          track.removeEventListener('mute', this.checkSelectedDevicePerm);
          track.stop();
        });
        cam.stream = null;
        cam.deviceId = LiveStreamManager.getCameraConstraint();
        cam.videoDeviceIN = '';
        utility.log(`Stopped stream for camera [${key}].`);
      }
    }
    this.camera_stream = null;
  }

  /**
   *
   */
  handleAudioEnded() {
    this.stopAudioStream();
  }
  /**
   *
   */
  stopAudioStream() {
    for (const key in LiveStreamManager.AUDIO) {
      const mic = LiveStreamManager.AUDIO[key];
      if (mic.stream) {
        mic.stream.getTracks().forEach((track) => {
          track.removeEventListener(this.streamEndedEvent, this.handleAudioEnded);
          track.removeEventListener('ended', this.checkSelectedDevicePerm);
          track.removeEventListener('mute', this.checkSelectedDevicePerm);
          track.stop();
        });
        mic.stream = null;
        mic.deviceId = utility.audioConstraints();
        utility.log(`Stopped stream for audio [${key}].`);
      }
    }
    this.audio_stream = null;
  }

  cameraRevokeRetryCallback: Function = () => { };
  /**
   *
   * @param fn
   */
  setCameraRevokeRetryCallback(fn: Function) {
    this.cameraRevokeRetryCallback = fn;
  }

  cameraRevokeCallback: Function = () => { };
  /**
   *
   * @param fn
   */
  setCameraRevokeCallback(fn: Function) {
    this.cameraRevokeCallback = fn;
  }

  micRevokeRetryCallback: Function = () => { };
  /**
   *
   * @param fn
   */
  setMicRevokeRetryCallback(fn: Function) {
    this.micRevokeRetryCallback = fn;
  }

  micRevokeCallback: Function = () => { };
  /**
   *
   * @param fn
   */
  setMicRevokeCallback(fn: Function) {
    this.micRevokeCallback = fn;
  }

  screenRevokeCallback: Function = () => { };
  /**
   *
   * @param fn
   */
  setScreenRevokeCallback(fn: Function) {
    this.screenRevokeCallback = fn;
  }

  screenRevokeRetryCallback: Function = () => { };
  /**
   *
   * @param fn
   */
  setScreenRevokeRetryCallback(fn: Function) {
    this.screenRevokeRetryCallback = fn;
  }

  /**
   *
   */
  showCameraRevokeDialog(cameraName = '') {
    if (this.isCameraRevoked && this.camRevoked[cameraName]) {
      return;
    }

    this.isCameraRevoked = true;

    utility.wait(5000).then(() => {
      this.isCameraRevoked = false;
    });

    this.camRevoked[cameraName] = true;
    // this.monitor.apiM.userActivity(this.monitor.currentStep,"Camera Revoked.");
    // var uiM = this.monitor.uiManager;
    const self = this;
    // ui.alertDialog(
    //   ui.translations.popup_text.additionalCameraDisconnect,
    //   ui.translations.popup_text.cameraDisconnected,
    //   ui.translations.popup_buttons.retry,
    //   function (dialog: HTMLElement) {
    //     ui.hide(dialog);
    //     self.cameraRevokeCallback();
    //   }
    // );
    if (this.cameraRevokeContinouslyInterval) {
      clearInterval(this.cameraRevokeContinouslyInterval);
    }
    self.cameraRevokeCallback();
    if (cameraName == 'P_CAM') {
      socket.cameraRevoke('P_CAM');
    }
    if (cameraName == 'P_CAM' || cameraName == '') {
      // if (LiveStreamManager.CAMERA.PRIMARY.recording) {
      //   self.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
      // }
      ui.cameraPermission(function (
        dialog: HTMLElement,
        selectedCameraId: string,
        selectedCameraLabel: string
      ) {
        ui.hide(dialog);

        self
          .isValidDeviceId(selectedCameraId, 'videoinput')
          .then(async (response) => {
            if (response == true) {
              self.setCameraDeviceId(LiveStreamManager.CAMERA.PRIMARY, selectedCameraId);
              LiveStreamManager.CAMERA.PRIMARY.label = selectedCameraLabel;
              LiveStreamManager.CAMERA.PRIMARY.stream = null;
              self.camRevoked[LiveStreamManager.CAMERA.PRIMARY.name] = false;
              await self.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
              // After retry successfull. trigger camera retry of the current step
              self.cameraRevokeRetryCallback();
              self.cameraRevokeContinously(cameraName);
            } else {
              self.showCameraRevokeDialog(cameraName);
              // errorManager.throwError("Error", "CAMERA_NOT_FOUND");
            }
          })
          .catch(() => {
            self.showCameraRevokeDialog(cameraName);
            // errorManager.throwError("Error", "CAMERA_NOT_FOUND");
          });
      });
    } else {
      utility.log("Camera REvoke", cameraName);
    }
  }
  /**
   *
   */
  showAudioRevokeDialog() {
    this.micRevoked = true;
    // // this.monitor.apiM.userActivity(this.monitor.currentStep,"Mic Revoked.");
    // // var uiM = this.monitor.uiManager;
    const self = this;
    // ui.alertDialog(
    //   ui.translations.popup_text.additionalMicDisconnect,
    //   ui.translations.popup_text.micDisconnected,
    //   ui.translations.popup_buttons.retry,
    //   function (dialog: HTMLElement) {
    //     ui.hide(dialog);
    //     self.micRevokeCallback();
    //   }
    // );
    self.micRevokeCallback();
    ui.micPermission(function (
      dialog: HTMLElement,
      selectedMicId: string,
      selectedMicLabel: string
    ) {
      ui.hide(dialog);

      self
        .isValidDeviceId(selectedMicId, 'audioinput')
        .then(async (response) => {
          if (response == true) {
            LiveStreamManager.AUDIO.PRIMARY.deviceId = utility.audioConstraints(selectedMicId);
            LiveStreamManager.AUDIO.PRIMARY.label = selectedMicLabel;
            LiveStreamManager.AUDIO.PRIMARY.stream = null;
            self.micRevoked = false;
            await self.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
            // After retry successfull. trigger mic retry of the current step
            self.micRevokeRetryCallback();
          } else {
            self.showAudioRevokeDialog();
            // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
          }
        })
        .catch(() => {
          self.showAudioRevokeDialog();
          // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
        });
    });
  }
  /**
   *
   */
  showCameraAudioRevokeDialog() {
    // this.monitor.apiM.userActivity(this.monitor.currentStep,"Camera and Mic Revoked.");
    // var uiM = this.monitor.uiManager;
    // uiM.deviceRetryDialog('both');
  }

  /**
   *
   */
  stopStreams() {
    this.stopAllRecordings();
    this.stopScreenStream();
    this.stopVideoStream();
    this.stopAudioStream();
  }

  /**
   *
   * @param camera
   */
  async record(camera: cameraDetails) {
    if (configrationManager.video_recording == 0) {
      return;
    }
    if (!camera.stream) {
      return;
    }
    let mediaStream: MediaStream;
    if (camera.name == 'P_CAM' && LiveStreamManager.AUDIO.PRIMARY.stream) {
      mediaStream = new MediaStream([
        ...camera.stream.getTracks(),
        ...LiveStreamManager.AUDIO.PRIMARY.stream?.getTracks(),
      ]);
    }
    else if (camera.name == 'SR_CAM' && configrationManager.currentStepAlias == 'Interview_Session') {
      if (this.destination == null) {
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }
        this.destination = this.audioContext.createMediaStreamDestination();
      } else {
        if (this.audioContext.state === "suspended") {
          await this.audioContext.resume();
        }
      }
      if (LiveStreamManager.AUDIO.PRIMARY.stream) {
        this.audioContext.createMediaStreamSource(LiveStreamManager.AUDIO.PRIMARY.stream).connect(this.destination);
      }

      mediaStream = new MediaStream([
        camera.stream.getVideoTracks()[0],
        ...this.destination.stream.getAudioTracks(),
      ]);
    }
    else {
      mediaStream = camera.stream;
    }
    if (!(camera.recording instanceof Recording)) {
      if (!configrationManager.recordingUrl) {
        utility.error('Recording URL is not configured.');
        return;
      }

      const cameraName = camera.name;
      let worker = await this.getRecordingWorker();
      camera.recording = new Recording(configrationManager.recordingUrl, mediaStream, cameraName, worker);
    } else {
      camera.recording.setStream(mediaStream);
    }
    utility.log(`Starting recording for camera: ${camera.name}`, camera.recording);
    camera.recording.start();
  }
  /**
   *
   * @param camera
   */
  pauseRecord(camera: cameraDetails) {
    if (camera.recording instanceof Recording) {
      camera.recording.pause();
    }
  }
  /**
   *
   * @param camera
   */
  stopRecord(camera: cameraDetails) {
    if (camera.recording instanceof Recording) {
      camera.recording.stop();
      camera.recording = undefined; // Reset the recording object
    }
  }

  stopAllRecordings() {
    for (let cameraIndex in LiveStreamManager.CAMERA) {
      let camera = LiveStreamManager.CAMERA[cameraIndex];
      this.stopRecord(camera);
    }
  }

  /**
   *
   */
  async checkSpeakerAvailable(): Promise<boolean> {
    if (!navigator.mediaDevices?.enumerateDevices) {
      utility.warn('enumerateDevices() not supported.');
      return false;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasSpeaker = devices.some((device) => device.kind === 'audiooutput');

    return hasSpeaker;
  }

  async getAudioChannelCountFromStream(audio: audioDetails): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        if (!audio.stream) {
          return reject(new Error('Audio stream is null.'));
        }
        let track = audio.stream.getAudioTracks()[0];
        let channelCount = track.getSettings().channelCount;
        if (channelCount == undefined) {
          channelCount = 2;
        }
        resolve(channelCount);
      } catch (error) {
        reject(error);
      }
    });
  }

  closeAudioStream(audio: audioDetails) {
    if (audio && audio.stream instanceof MediaStream) {
      audio.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      audio.stream = null; // Set the stream reference to null
    }
  }

  closeVideoStream(video: cameraDetails) {
    if (video && video.stream instanceof MediaStream) {
      video.stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      video.stream = null; // Set the stream reference to null
    }
  }

  updateRoomRemoteStream(stream: MediaStream) {
    LiveStreamManager.CAMERA.ROOM.stream = stream;
    LiveStreamManager.CAMERA.ROOM.external = true;
  }

  updateCameraSetupStream(stream: MediaStream, camera_type: string) {
    if (camera_type === 'S_CAM') {
      LiveStreamManager.CAMERA.SIDE.stream = stream;
      LiveStreamManager.CAMERA.SIDE.external = true;
    } else if (camera_type === 'B_CAM') {
      LiveStreamManager.CAMERA.BACK.stream = stream;
      LiveStreamManager.CAMERA.BACK.external = true;
    } else if (camera_type === 'F_CAM') {
      LiveStreamManager.CAMERA.FRONT.stream = stream;
      LiveStreamManager.CAMERA.FRONT.external = true;
    } else if (camera_type === 'C_CAM') {
      LiveStreamManager.CAMERA.CUSTOM.stream = stream;
      LiveStreamManager.CAMERA.CUSTOM.external = true;
    } else {
      utility.error(`Unknown camera type: ${camera_type}`);
      return;
    }
  }

  getStreamByName(name: string): cameraDetails | audioDetails | null {
    for (let cam in LiveStreamManager.CAMERA) {
      if (LiveStreamManager.CAMERA[cam].name == name) {
        return LiveStreamManager.CAMERA[cam];
      }
    }
    for (let mic in LiveStreamManager.AUDIO) {
      if (LiveStreamManager.AUDIO[mic].name == name) {
        return LiveStreamManager.AUDIO[mic];
      }
    }
    return null;
  }
  setSocketEvents() {
    let self = this;
    sdkEvents.on(SDK_EVENT.CHAT_MESSAGE, function (from: string, msg: Record<string, any>) {
      utility.log(from, msg);
      if (msg?.mode == 'stream_request') {
        if (msg?.text == 'P_CAM' && LiveStreamManager.CAMERA.PRIMARY.stream != null) {
          peer.streamAdd(from, LiveStreamManager.CAMERA.PRIMARY);
        }
      }
    });

    sdkEvents.on(SDK_EVENT.STREAM_INFO_REQUEST, function () {
      let streamInfo = self.getAllStreamsId();
      socket.sendRoomMessage({ mode: 'streamInfo', text: 'Stream Ids', data: streamInfo });
    });

    sdkEvents.on(SDK_EVENT.STREAM_REQUEST, function (camera: string, from: string) {
      let obj = self.getStreamByName(camera);
      if (obj && obj.external == false) {
        peer.connect(from, obj);
        // utility.wait(100).then(() => {
        //   peer.streamAdd(from, obj); // Send mobile stream to Desktop . it will be recived in subscribe events.
        // });
      }
    });
  }

  getAllStreamsId() {
    let cameraDetails: { [key: string]: string } = {};
    for (let cam in LiveStreamManager.CAMERA) {
      let camera = LiveStreamManager.CAMERA[cam];
      if (camera.stream != null && camera.external == false) {
        cameraDetails[camera.name] = camera.stream.id;
      }
    }

    const sideEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
    const backEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
    const frontEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
    const customEnable =
      configrationManager.valueMap.additional_cam.data.live_custom_cam.value;

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
      && (!("P_CAM" in cameraDetails)
        && LiveStreamManager.CAMERA.PRIMARY.stream == null)) {
      cameraDetails["P_CAM"] = "";
    }

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
      && configrationManager.sharedScreen
      && (!("SR_CAM" in cameraDetails)
        && LiveStreamManager.CAMERA.SCREEN.stream == null)) {
      cameraDetails["SR_CAM"] = "";
    }

    if (customEnable
      && (!("C_CAM" in cameraDetails)
        && LiveStreamManager.CAMERA.CUSTOM.stream == null
        && ((LiveStreamManager.CAMERA.CUSTOM.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM'))
    ) {
      cameraDetails["C_CAM"] = "";
    }
    if (sideEnable
      && (!("S_CAM" in cameraDetails)
        && LiveStreamManager.CAMERA.SIDE.stream == null
        && ((LiveStreamManager.CAMERA.SIDE.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM'))
    ) {
      cameraDetails["S_CAM"] = "";
    }

    if (backEnable
      && (!("B_CAM" in cameraDetails)
        && LiveStreamManager.CAMERA.BACK.stream == null
        && ((LiveStreamManager.CAMERA.BACK.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM'))
    ) {
      cameraDetails["B_CAM"] = "";
    }
    if (frontEnable
      && (!("F_CAM" in cameraDetails)
        && LiveStreamManager.CAMERA.FRONT.stream == null
        && ((LiveStreamManager.CAMERA.FRONT.external == false && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') || LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM'))
    ) {
      cameraDetails["F_CAM"] = "";
    }



    for (let mic in LiveStreamManager.AUDIO) {
      let audio = LiveStreamManager.AUDIO[mic];
      if (audio.stream != null && audio.external == false) {
        cameraDetails[audio.name] = audio.stream.id;
      }
    }
    return cameraDetails;
  }

  //disable stream tracks
  disableStreamTracks(camera: cameraDetails | audioDetails) {
    if (camera && camera.stream instanceof MediaStream) {
      camera.stream.getTracks().forEach((track) => {
        track.enabled = false;
      });
    }
  }
  //enable stream tracks
  enableStreamTracks(camera: cameraDetails | audioDetails) {
    if (camera && camera.stream instanceof MediaStream) {
      camera.stream.getTracks().forEach((track) => {
        track.enabled = true;
      });
    }
  }

  disableAudioTracks(audio: audioDetails) {
    if (audio?.stream instanceof MediaStream) {
      audio.stream.getAudioTracks().forEach(track => {
        track.enabled = false;
      });
    }
  }

  async addRemoteUserAudio(userId: string, track: MediaStreamTrack) {
    const s = new MediaStream([track]);
    const node = this.audioContext.createMediaStreamSource(s);
    // Ensure destination exists before connecting
    if (!this.destination) {
      this.destination = this.audioContext.createMediaStreamDestination();
    }
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
    node.connect(this.destination);
    this.remoteAudioNodes.set(userId, node);
  }

  // Remove remote user
  removeRemoteUserAudio(userId: string) {
    const node = this.remoteAudioNodes.get(userId);
    if (node) {
      // If destination exists disconnect from it, otherwise just disconnect the node
      if (this.destination) {
        node.disconnect(this.destination);
      } else {
        node.disconnect();
      }
      this.remoteAudioNodes.delete(userId);
    }
  }

  getRecordingWorker() {
    let self = this;
    return new Promise<Worker>((resolve, reject) => {
      if (self.workerFile) {
        let worker = new Worker(self.workerFile);
        resolve(worker);
        return;
      }
      fetch(this.workerPath)
        .then(response => response.text())
        .then(workerCode => {
          // Create a Blob from the code and get an object URL
          const blob = new Blob([workerCode], { type: 'application/javascript' });
          const workerUrl = URL.createObjectURL(blob);
          self.workerFile = workerUrl;
          let worker = new Worker(self.workerFile);
          // Construct the worker using the local object URL
          resolve(worker);
          // ... proceed with postMessage
        }).catch(error => utility.error("Could not load recording worker script:", error));
    });
  }

  monitorMic(stream: MediaStream) {
    let self = this;
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let silenceStart: number | null = null;

    function checkVolume() {
      analyser.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

      if (volume === 0) {
        if (!silenceStart) silenceStart = Date.now();

        // If silent for more than 3 seconds, trigger your "lost mic" logic
        if (Date.now() - silenceStart > 3000) {
          utility.log("Microphone signal lost (System Revoke likely)");
          stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
          self.showAudioRevokeDialog();
          // Trigger your custom 'stream stopped' event here
          return;
        }
      } else {
        silenceStart = null; // Reset if sound returns
      }
      requestAnimationFrame(checkVolume);
    }
    setTimeout(() => {
      checkVolume();
    }, 5000);
  }

  cameraRevokeContinously(cameraName = '') {
    if (this.cameraRevokeContinouslyInterval) {
      clearInterval(this.cameraRevokeContinouslyInterval);
    }
    this.cameraRevokeContinouslyInterval = setInterval(async () => {
      let self = this;
      const cameraObj = LiveStreamManager.CAMERA.PRIMARY;
      const stream = cameraObj.stream;

      if (!stream || !stream.active) {
        this.cameraRevokeRessign = true;
      } else {
        const videoTrack = stream.getVideoTracks()[0];
        if (!videoTrack || videoTrack.readyState !== 'live') {
          this.cameraRevokeRessign = true;
        }
      }

      if (this.cameraRevokeRessign) {
        utility.log('Camera issue detected. Trying recovery using getCameraStream...');

        // Reset old stream before retry
        cameraObj.stream = null;

        const res: any = await this.getCameraStream(cameraObj);

        if (res && res.stream) {
          utility.log('Camera recovered successfully');

          if (configrationManager.userType == "2") {
            const videoElement = ui.id('thinkInterview_candidateVideoSession') as HTMLVideoElement | null;
            if (videoElement) {
              videoElement.srcObject = res.stream;
              videoElement.play().catch(() => { });
              this.updateStream();
            }
          } else {
            const videoElement = ui.id('thinkInterview_interviewerVideo') as HTMLVideoElement | null;
            if (videoElement) {
              videoElement.srcObject = res.stream;
              videoElement.play().catch(() => { });
              this.updateStream();
            }
          }

          // ✅ Reset flag after success
          this.cameraRevokeRessign = false;
          return;
        } else {

          self.camRevoked[LiveStreamManager.CAMERA.PRIMARY.name] = true;
          self.showCameraRevokeDialog(cameraName);
          return;
        }
      }

      console.log('Camera stream is active');
    }, 6000);
  }

  updateStream() {
    let streamInfo = this.getAllStreamsId();
    // chat.sendData('stream_update', streamInfo);
    // utility.wait(2000).then(() => {
    //   peer.streamAddAll(LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM, LiveStreamManager.AUDIO.PRIMARY);
    // });
    interviewMonitor.attendance();
  }

  mobileOrientedStream(stream: MediaStream, requiredWidth: number, requiredHeight: number) {
    const input = document.createElement('video');
    input.srcObject = stream;
    input.muted = true;
    input.playsInline = true;

    const canvas = document.createElement('canvas');
    canvas.width = requiredWidth;
    canvas.height = requiredHeight;
    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      // videoWidth/videoHeight are 0 until the video has decoded a frame; skip until ready
      const vw = input.videoWidth;
      const vh = input.videoHeight;

      if (vw && vh) {
        const targetAspect = requiredWidth / requiredHeight;
        const sourceAspect = vw / vh;
        let sx, sy, sw, sh;
        if (sourceAspect > targetAspect) {
          sh = vh; sw = vh * targetAspect; sx = (vw - sw) / 2; sy = 0;
        } else {
          sw = vw; sh = vw / targetAspect; sx = 0; sy = (vh - sh) / 2;
        }
        ctx.drawImage(input, sx, sy, sw, sh, 0, 0, requiredWidth, requiredHeight);
      }

      requestAnimationFrame(draw);
    };

    // Only start drawing after the browser has actual frame data
    input.addEventListener('playing', () => requestAnimationFrame(draw), { once: true });
    input.play().catch((e) => utility.error('mobileOrientedStream play error', e));

    const outStream = canvas.captureStream(30);
    return outStream;
  }

}

export const liveStreamManager = new LiveStreamManager();
