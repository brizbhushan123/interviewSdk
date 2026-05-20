import { StepInterface } from './StepInterface';
import { Ufm } from './UFM';
/**
 *
 */
export declare class StepManager {
    steps: {
        [key: string]: StepInterface;
    };
    stepsOrder: string[];
    stepSwitch: {
        [key: string]: boolean;
    };
    currentStep: number;
    currentStepName: string;
    nextStep: number;
    ufm: Ufm;
    /**
     *
     */
    constructor();
    /**
     *
     * @param stepName
     */
    turnOff(stepName: string): void;
    /**
     *
     * @param stepName
     */
    turnOn(stepName: string): void;
    /**
     *
     */
    init(): void;
    beforeUnload(): void;
    blur(): void;
    onFocus(): void;
    shareRetry(): void;
    exitBtn(): void;
    /**
     *
     */
    offTab(): void;
    /**
     *
     */
    offTabCamera(camera: string, step: string, current_env_alias: string): void;
    /**
     *
     * @param goStep
     */
    next(goStep?: string): void;
    /**
     *
     */
    getCurrentStepObject(): StepInterface;
    /**
     *
     * @param goStep
     */
    jumpToStep(goStep: string): void;
    cameraRevokeRetry(): void;
    micRevokeRetry(): void;
    cameraRevoke(): void;
    micRevoke(): void;
    screenRevoke(): void;
    screenRevokeRetry(): void;
    isSdkClosed: boolean;
    closeApplication(beforeUnload?: boolean): void;
}
export declare const stepManager: StepManager;
