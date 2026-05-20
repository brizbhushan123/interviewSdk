import { StepInterface, StepResult } from '../core/StepInterface';
import { Ufm } from '../core/UFM';
/**
 *
 */
declare class RoomBodyScan extends StepInterface {
    envAlias: string;
    ufm: Ufm;
    apiCode: {
        revoke: number;
        userEScalte: number;
        error: number;
    };
    recordingCamStarted: boolean;
    proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
    videoDiv: HTMLVideoElement | null;
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
    /**
     *
     */
    leftProfile(): Promise<void>;
    /**
     *
     */
    rightProfile(): Promise<void>;
    /**
     *
     */
    handGesture(): Promise<void>;
    /**
     *
     */
    ufmlist(requestufmOnly?: number): Promise<void>;
    escaltedToProctor(): void;
    /**
     *
     */
    rescan(): void;
    closeBtn(): void;
    closeTrigger(): void;
    /**
     *
     */
    result(): StepResult;
    cameraRevoke(): void;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
    recordingStop(): void;
    verifyByProctor(): void;
    rejectByProctor(message: string): void;
    recieveProctorMessage(): void;
    showRoomVideo(): void;
    proctorLeft(): void;
    showUFMPage(from: string): void;
    candiateSocketmode(mode: string, text: string, message: Record<string, any>, from: string): void;
}
export declare const bodyScan: RoomBodyScan;
export {};
