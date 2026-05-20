import { StepInterface, StepResult } from '../core/StepInterface';
import { Ufm } from '../core/UFM';
/**
 *
 */
declare class DeskScan extends StepInterface {
    envAlias: string;
    ufm: Ufm;
    detectionTimeout: NodeJS.Timeout | undefined;
    onBed: boolean;
    socketuserID: string;
    selectedCameraId: string;
    selectCameraLabel: string;
    apiCode: {
        revoke: number;
        userEScalte: number;
        error: number;
    };
    bedRetryDialog: HTMLElement | null;
    cameraRevokePopup: HTMLElement | null;
    recordingCamStarted: boolean;
    proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
    additionalCameraProceed: boolean;
    streamDeskInterval: ReturnType<typeof setInterval> | null;
    ntwDisconnect: boolean;
    /**
     *
     */
    constructor();
    getCameraStream(): Promise<MediaStream | null>;
    /**
     *
     */
    start(): void;
    cameraSelect(): Promise<void>;
    sessionExpire(): void;
    subscribeShow(): void;
    recieveMessage(): void;
    deskScan(stream: MediaStream, aiStart?: number): Promise<void>;
    cameraAllowClick(select: HTMLSelectElement): Promise<void>;
    streamCallback(stream?: MediaStream): void;
    deskScanDetectionComplete(deskDetected: boolean, chairDetected: boolean, laptopDetected: boolean, video: HTMLVideoElement, end?: boolean): void;
    showUFM(allDetect: boolean, requestufmOnly?: number): void;
    escaltedToProctor(): void;
    completeDesk(log?: boolean): void;
    modeSelector(mode: string, message: Record<string, any>, user_name: string): void;
    setAttemptNo(user_name: string): void;
    setOnBed(user_name: string): void;
    recievedOnBed(data: any): void;
    recievedAttemptNo(data: any): void;
    closeBtn(): void;
    rescan(rescanAttempt?: number): void;
    rescanTrigger(rescanAttempt?: number): void;
    noDeskPopup(): void;
    sendPopupData(): void;
    noPopupTrigger(): void;
    /**
     *
     */
    result(): StepResult;
    cameraRevoke(): void;
    recordingStop(): void;
    verifyByProctor(): void;
    rejectByProctor(message: string): void;
    recieveProctorMessage(): void;
    showRoomVideo(): void;
    proctorLeft(): void;
    showUFMPage(from: string): void;
    candiateSocketmode(mode: string, text: string, message: Record<string, any>, from: string): void;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
}
export declare const deskScan: DeskScan;
export {};
