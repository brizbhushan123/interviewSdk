import { Recording } from './Recording';
interface cameraConstraints {
    deviceId: {
        exact: string | undefined;
    } | undefined;
    width: {
        ideal: 1024;
    };
    height: {
        ideal: 576;
    };
    frameRate: {
        ideal: 25;
    };
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
        deviceId: {
            exact: string | undefined;
        } | undefined;
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
/**
 *
 */
export declare class LiveStreamManager {
    static PRIMARY_CAMERA_NAME: string;
    screen_stream: MediaStream | null;
    streamEndedEvent: string;
    camera_stream: MediaStream | null;
    camera_view: boolean;
    audio_view: boolean;
    camRevoked: {
        [key: string]: boolean;
    };
    micRevoked: boolean;
    audio_stream: MediaStream | null;
    audio_device_id: {
        [key: string]: any;
    };
    videoDeviceIN: string;
    audioDeviceIN: string;
    camera_device_id: {
        [key: string]: any;
    };
    camPermissions: boolean;
    micPermissions: boolean;
    recognition: any;
    isCameraRevoked: boolean;
    cameraPermissionEventSet: boolean;
    micPermissionEventSet: boolean;
    audioContext: AudioContext;
    destination: MediaStreamAudioDestinationNode | null;
    remoteAudioNodes: Map<string, MediaStreamAudioSourceNode>;
    workerPath: string;
    workerFile: string;
    cameraRevokeContinouslyInterval: ReturnType<typeof setInterval> | null;
    cameraRevokeRessign: boolean;
    static CAMERA: {
        [key: string]: cameraDetails;
    };
    static AUDIO: {
        [key: string]: audioDetails;
    };
    /**
     *
     */
    constructor();
    static getCameraConstraint(): cameraConstraints;
    /**
     *
     * @param name
     */
    static getCameraObject(name: string): cameraDetails;
    /**
     *
     * @param name
     */
    static getAudioObject(name: string, noise?: boolean): audioDetails;
    /**
     *
     * @param value
     */
    permissionEnable(value: string): Promise<boolean>;
    /**
     *
     */
    hasPermissions(): Promise<{
        camera: boolean;
        mic: boolean;
    }>;
    /**
     *
     * @param callback
     * @param error_callback
     */
    requestScreenShare(callback?: () => void, error_callback?: (data: string) => void): Promise<void>;
    /**
     *
     * @param callback
     * @param error_callback
     */
    screenShare(callback?: () => void, error_callback?: (data: string) => void): Promise<void>;
    /**
     *
     */
    stopScreenStream(): void;
    /**
     *
     */
    getMediaDevices(): Promise<{
        video: MediaDeviceInfo[];
        audio: MediaDeviceInfo[];
    } | boolean>;
    /**
     * Get list of available cameras excluding the ones already in use
     * @param includePrimary whether to include the primary camera
     */
    getAvailableCameras(includePrimary?: boolean): Promise<MediaDeviceInfo[] | boolean>;
    /**
     *
     * @param includePrimary
     */
    getCameraList(includePrimary?: boolean): Promise<MediaDeviceInfo[] | boolean>;
    getCameraListAvaliable(includePrimary?: boolean): Promise<MediaDeviceInfo[] | boolean>;
    /**
     *
     * @param includePrimary
     */
    getAudioList(includePrimary?: boolean): Promise<MediaDeviceInfo[] | boolean>;
    /**
     *
     * @param audio
     */
    requestAudio(audio: audioDetails): Promise<MediaStream | undefined>;
    /**
     *
     * @param camera
     */
    requestVideo(camera: cameraDetails, mobile?: mobileCams): Promise<{
        stream: MediaStream;
        settings: MediaTrackSettings;
    } | undefined>;
    /**
     *
     * @param camera
     */
    checkCameraDevices(camera: null | cameraDetails): Promise<void>;
    /**
     *
     * @param audio
     */
    checkAudioDevices(audio: null | audioDetails): Promise<void>;
    /**
     *
     * @param deviceId
     * @param type
     */
    isValidDeviceId(deviceId: string, type: string): Promise<boolean>;
    /**
     *
     * @param deviceId
     */
    setCameraDeviceId(camera: cameraDetails, deviceId?: string): Promise<this>;
    /**
     *
     * @param deviceId
     */
    setAudioDeviceId(deviceId: any): Promise<this>;
    /**
     *
     * @param camera
     */
    getCameraStream(camera: cameraDetails, mobile?: mobileCams): Promise<false | {
        stream: MediaStream;
        settings: MediaTrackSettings;
    }>;
    /**
     *
     * @param audio
     */
    getAudioStream(audio: audioDetails): Promise<false | MediaStream>;
    deviceChange(): void;
    /**
     *
     * @param e
     * @param check
     */
    checkSelectedDevicePerm(e: any, check?: string, devicename?: string): Promise<boolean>;
    /**
     *
     */
    checkCameraPermission(): Promise<boolean>;
    /**
     *
     */
    checkMicPermission(): Promise<boolean>;
    /**
     *
     */
    handleVideoEnded(): void;
    /**
     *
     */
    stopVideoStream(): void;
    /**
     *
     */
    handleAudioEnded(): void;
    /**
     *
     */
    stopAudioStream(): void;
    cameraRevokeRetryCallback: Function;
    /**
     *
     * @param fn
     */
    setCameraRevokeRetryCallback(fn: Function): void;
    cameraRevokeCallback: Function;
    /**
     *
     * @param fn
     */
    setCameraRevokeCallback(fn: Function): void;
    micRevokeRetryCallback: Function;
    /**
     *
     * @param fn
     */
    setMicRevokeRetryCallback(fn: Function): void;
    micRevokeCallback: Function;
    /**
     *
     * @param fn
     */
    setMicRevokeCallback(fn: Function): void;
    screenRevokeCallback: Function;
    /**
     *
     * @param fn
     */
    setScreenRevokeCallback(fn: Function): void;
    screenRevokeRetryCallback: Function;
    /**
     *
     * @param fn
     */
    setScreenRevokeRetryCallback(fn: Function): void;
    /**
     *
     */
    showCameraRevokeDialog(cameraName?: string): void;
    /**
     *
     */
    showAudioRevokeDialog(): void;
    /**
     *
     */
    showCameraAudioRevokeDialog(): void;
    /**
     *
     */
    stopStreams(): void;
    /**
     *
     * @param camera
     */
    record(camera: cameraDetails): Promise<void>;
    /**
     *
     * @param camera
     */
    pauseRecord(camera: cameraDetails): void;
    /**
     *
     * @param camera
     */
    stopRecord(camera: cameraDetails): void;
    stopAllRecordings(): void;
    /**
     *
     */
    checkSpeakerAvailable(): Promise<boolean>;
    getAudioChannelCountFromStream(audio: audioDetails): Promise<number>;
    closeAudioStream(audio: audioDetails): void;
    closeVideoStream(video: cameraDetails): void;
    updateRoomRemoteStream(stream: MediaStream): void;
    updateCameraSetupStream(stream: MediaStream, camera_type: string): void;
    getStreamByName(name: string): cameraDetails | audioDetails | null;
    setSocketEvents(): void;
    getAllStreamsId(): {
        [key: string]: string;
    };
    disableStreamTracks(camera: cameraDetails | audioDetails): void;
    enableStreamTracks(camera: cameraDetails | audioDetails): void;
    disableAudioTracks(audio: audioDetails): void;
    addRemoteUserAudio(userId: string, track: MediaStreamTrack): Promise<void>;
    removeRemoteUserAudio(userId: string): void;
    getRecordingWorker(): Promise<Worker>;
    monitorMic(stream: MediaStream): void;
    cameraRevokeContinously(cameraName?: string): void;
    updateStream(): void;
}
export declare const liveStreamManager: LiveStreamManager;
export {};
