import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class AddCamCustomView extends StepInterface {
    envAlias: string;
    camType: string;
    selectedCameraId: string;
    selectCameraLabel: string;
    socketuserID: string;
    cameraRevokePopup: HTMLElement | null;
    preAiStatusResponse: number | null;
    preAiStatusResponseCounter: number;
    recordingCamStarted: boolean;
    flag: boolean;
    validPositionCount: number;
    streamCustomInterval: ReturnType<typeof setInterval> | null;
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
    modeSelector(mode: string, message: Record<string, any>, user_name?: string): void;
    completeCameraSetup(log?: boolean): void;
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
export declare const addCamCustomView: AddCamCustomView;
export {};
