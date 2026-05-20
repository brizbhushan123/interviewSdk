import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class AddCamSideView extends StepInterface {
    envAlias: string;
    camType: string;
    selectedCameraId: string;
    selectCameraLabel: string;
    stagnantTimer: ReturnType<typeof setTimeout> | null;
    previousPercentage: number | null;
    socketuserID: string;
    cameraRevokePopup: HTMLElement | null;
    preAiStatusResponse: number | null;
    preAiStatusResponseCounter: number;
    recordingCamStarted: boolean;
    flag: boolean;
    validPositionCount: number;
    streamSideInterval: ReturnType<typeof setInterval> | null;
    ntwDisconnectSide: boolean;
    /**
     *
     */
    constructor();
    /**
     *
     */
    start(): void;
    showQrUIPage(): void;
    cameraAllowClick(select: HTMLSelectElement): Promise<void>;
    streamCallback(stream: MediaStream): void;
    setRoomStream(stream: MediaStream, aiStart?: number): Promise<void>;
    waitForPosition(video: HTMLVideoElement): Promise<any>;
    waitForValidation(video: HTMLVideoElement): Promise<any>;
    modeSelector(mode: string, message: Record<string, any>, user_name?: string): void;
    completeCameraSetup(log?: boolean): void;
    showCameraSetupInstructions(message: Record<string, any>): void;
    showCameraSetupValidation(message: Record<string, any>): void;
    closeBtn(): void;
    closeTrigger(): void;
    cameraRevoke(): void;
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
export declare const addCamSideView: AddCamSideView;
export {};
