import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
export declare class ExamMonitor extends StepInterface {
    envAlias: string;
    recognition: any;
    vdClearTimeout: ReturnType<typeof setTimeout> | null;
    isAudioDetectionPaused: boolean;
    isBlurListenerAdded: boolean;
    imageTypeSnap: number;
    regularSnapTimeout: ReturnType<typeof setTimeout> | null;
    suspendCountdownTimer: ReturnType<typeof setInterval> | null;
    recordingStarted: boolean;
    recordingCamStarted: boolean;
    aiStarted: boolean;
    cameraRevokePopup: HTMLElement | null;
    camType: string;
    socketuserID: string;
    isRecognitionActive: boolean;
    proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
    assignNewProctorTimer: ReturnType<typeof setInterval> | null;
    /**
     *
     */
    constructor();
    getCameraStream(): Promise<MediaStream | null>;
    getAudioStream(): Promise<MediaStream | null>;
    sendSmartProctorUFM(): void;
    /**
     *
     */
    start(): void;
    proctorLeft(): void;
    startInternalAdditionalCam(): void;
    startCamera(): Promise<void>;
    getVideoFromStream(stream: MediaStream): HTMLVideoElement | null;
    startExamWithSFL(): Promise<void>;
    suspendResume(): void;
    terminateExam(): void;
    completeExam(): void;
    setStream(stream: MediaStream): HTMLVideoElement;
    getSpeechRecongnition(): any;
    checkForAudioLevelsVdInBrowser(mediaStream: MediaStream): void;
    pausedExam(): void;
    playExam(): void;
    stopAI(): void;
    takeSnapshots_sfl(video: HTMLVideoElement, saveActivity: boolean, takeReturn: boolean): string;
    /**
     *
     */
    result(): StepResult;
    screenRevoke(): void;
    cameraRevoke(): void;
    subscribeSocketEvent(): void;
    roomSocketmode(mode: string, text: string, message: Record<string, any>, from: string, cameraName: string): void;
    closeAdditionalCamera(): void;
    micRevoke(): void;
    permissionRevoke(code: number): void;
    ufmTrigger(ufmType: string, code?: number, blob?: Blob): void;
    terminatePopup(): void;
    suspendPopup(response: any): void;
    suspendCountdown(suspendTime: number): void;
    checkSessionStatus(): Promise<void>;
    checkStatusTimeout(time: number): void;
    /**
     *
     */
    screenRevokeRetry(): void;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
    saveSmartProctorMsg(response: any): void;
    userEscalted(): void;
}
export declare const examMonitor: ExamMonitor;
