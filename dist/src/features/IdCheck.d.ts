import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class IdCheck extends StepInterface {
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
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
}
export declare const idCheck: IdCheck;
export {};
