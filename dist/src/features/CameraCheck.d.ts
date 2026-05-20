import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class CameraCheck extends StepInterface {
    private mainDiv;
    envAlias: string;
    /**
     *
     */
    constructor();
    /**
     *
     * @param mainDiv
     */
    init(mainDiv: HTMLDivElement): void;
    /**
     *
     */
    start(): Promise<void>;
    cameraCallback: (data: {
        id: string;
        label: string;
        width: number;
        height: number;
        deviceId: string;
        groupId: string;
        frameRate: number;
    }) => void;
    /**
     *
     */
    cameraErrorCallback: (message: string) => void;
    /**
     *
     */
    cameraRetry(): void;
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
export declare const cameraCheck: CameraCheck;
export {};
