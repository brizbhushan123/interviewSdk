import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class ScreenCheck extends StepInterface {
    envAlias: string;
    /**
     *
     */
    constructor();
    /**
     *
     */
    start(): void;
    /**
     *
     */
    checkScreen(): void;
    /**
     *
     */
    screenRetry(): void;
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
export declare const screenCheck: ScreenCheck;
export {};
