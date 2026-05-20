import { SDK_EVENT, SdkEventCallbacks } from './InternalEventManager';
import { StepManager } from './StepsManager';
export interface StepResult {
    info: any;
    error: string[];
    status: boolean;
}
/**
 *
 */
export declare abstract class StepInterface {
    resultData: StepResult;
    completeCallback: Function;
    errorCallback: Function;
    abstract envAlias: string;
    static stepManager: StepManager;
    eventList: Map<keyof SdkEventCallbacks, ((user: string, stream: MediaStream) => void) | ((user: string) => void) | ((user: string) => void) | ((user: string, message: Record<string, any>) => void) | ((user: string) => void) | ((user: string) => void) | ((response: any) => void) | ((response: any) => void) | ((user: string, message: Record<string, any>) => void) | (() => void) | ((camera: string, from: string) => void) | ((response: any) => void) | (() => void) | ((user: string, stream: MediaStream) => void) | ((response: any) => void) | (() => void) | (() => void) | ((data: any) => void) | (() => void) | (() => void)>;
    /**
     *
     */
    /**
     *
     */
    constructor();
    abstract start(): void;
    abstract result(): StepResult;
    /**
     *
     * @param delay
     * @param allowNext
     */
    end(delay?: number, allowNext?: boolean, log?: boolean): void;
    /**
     *
     * @param fn
     */
    /**
     *
     * @param fn
     */
    onComplete(fn: Function): void;
    /**
     *
     * @param fn
     */
    onError(fn: Function): void;
    /**
     *
     * @param fn
     */
    error(): void;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
    /**
     *
     */
    cameraRevoke(): void;
    /**
     *
     */
    micRevoke(): void;
    /**
     *
     */
    secondaryCameraRevoke(): void;
    /**
     *
     */
    seccondaryCameraRevokeRetry(): void;
    /**
     *
     */
    screenRevoke(): void;
    /**
     *
     */
    screenRevokeRetry(): void;
    /**
     *
     */
    closeApplication(): void;
    /**
     *
     * @param manager
     */
    setManager(manager: StepManager): void;
    /**
     *
     */
    manager(): StepManager;
    subscribe<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName: K, fn: SdkEventCallbacks[K]): void;
    unSubscribe<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName?: K): void;
}
