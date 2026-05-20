import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class IdVerify extends StepInterface {
    envAlias: string;
    proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
    proctorTimeList: {
        interviwerSocketID: string;
        time: number;
    }[];
    timezoneTimer: any;
    noRequestSend: boolean;
    timezoneFinalized: boolean;
    selectedInterviwerSocketID: string | null;
    /**
     *
     */
    constructor();
    /**
     *
     */
    start(): Promise<void>;
    /**
     *
     */
    compareIdAndPhoto(): Promise<void>;
    escalatedProctor(): void;
    /**
     *
     */
    reScan(): void;
    nextBtnView(response: any): void;
    verifyByProctor(): void;
    rejectByProctor(message: string): void;
    recieveMessage(): void;
    candiateSocketmode(mode: string, text: string, message: Record<string, any>, user_name: string): void;
    proctorLeft(): void;
    interviwerJoiningTimeResponse(time: number, interviwerSocketID: string): void;
    requestInterviwerJoiningTime(): void;
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
export declare const idVerify: IdVerify;
export {};
