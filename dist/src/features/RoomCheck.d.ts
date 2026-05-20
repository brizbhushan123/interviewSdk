import { StepInterface, StepResult } from '../core/StepInterface';
import { Ufm } from '../core/UFM';
/**
 *
 */
declare class RoomCheck extends StepInterface {
    envAlias: string;
    ufm: Ufm;
    selectedCameraId: string;
    selectCameraLabel: string;
    previousPercentage: number | null;
    stagnantTimer: ReturnType<typeof setTimeout> | null;
    socketuserID: string;
    apiCode: {
        revoke: number;
        userEScalte: number;
        error: number;
    };
    cameraRevokePopup: HTMLElement | null;
    recordingStarted: boolean;
    recordingCamStarted: boolean;
    proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
    additionalCameraProceed: boolean;
    streamInterval: ReturnType<typeof setInterval> | null;
    ntwDisconnectRoom: boolean;
    /**
     *
     */
    constructor();
    /**
     *
     */
    getCameraStream(): Promise<MediaStream | null>;
    /**
     *
     */
    start(): Promise<void>;
    sessionExpire(): void;
    setRoomStream(stream: MediaStream, aiStart?: number): void;
    showUFMList(requestufmOnly?: number): void;
    escaltedToProctor(): void;
    completeRoom(log?: boolean): void;
    /**
     *
     */
    rescan(): void;
    rescanTrigger(): void;
    closeBtn(): void;
    closeTrigger(): void;
    /**
     *
     */
    showInsructionPage(): Promise<void>;
    recieveMessage(): void;
    cameraAllowClick(select: HTMLSelectElement): Promise<void>;
    getStreamByDeviceId(deviceId: string): Promise<MediaStream | null>;
    modeSelector(mode: string, message: Record<string, any>, user_name: string): void;
    setAttemptNo(user_name: string): void;
    recievedAttemptNo(data: any): void;
    streamCallback(stream?: MediaStream): void;
    cameraRevoke(): void;
    verifyByProctor(): void;
    rejectByProctor(message: string): void;
    showRoomVideo(): void;
    recieveProctorMessage(): void;
    proctorLeft(): void;
    showUFMPage(from: string): void;
    candiateSocketmode(mode: string, text: string, message: Record<string, any>, from: string): void;
    /**
     *
     */
    result(): StepResult;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
}
export declare const roomCheck: RoomCheck;
export {};
