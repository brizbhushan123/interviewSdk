import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class PhotoCheck extends StepInterface {
    envAlias: string;
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
    retryBtn(): void;
    /**
     *
     */
    capture(): Promise<void>;
    /**
     *
     */
    nextBtn(): void;
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
}
export declare const photoCheck: PhotoCheck;
export {};
