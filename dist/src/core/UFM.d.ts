export declare class Ufm {
    private mfd;
    private od;
    private odLabels;
    ALL_UFM: string[];
    INFORMATIVE_UFM_CODE: number[];
    MFD: boolean;
    FNP: boolean;
    FM: boolean;
    OD: boolean;
    VD: boolean;
    SFL: boolean;
    PR: boolean;
    LA: boolean;
    PHONE: number;
    CHAIR: number;
    log(data: any, elias: string, attempt_no: number, camera?: string, imageBlob?: Blob, status_code?: any): void;
    /**
     *
     *@param ufmType
     *@param imageBlob
     *@param elias
     *@param attempt_no
     */
    getUfmApiCall(ufmType: string, elias: string, attempt_no: number, cameraAngle: string, ufm_subtype?: string, imageBlob?: Blob, data?: any, code?: number, ufmLogEntry?: any): Promise<void>;
    sendUfmData(ufmType: string, env: string, attempt_no: number, camAngle: string, ufm_subtype: number, code?: number, imageBlob?: Blob, data?: any, ufmLogEntry?: any): Promise<any>;
    regularUfmData(env: string, camAngle: string, imageBlob?: Blob): void;
    endTest(env: string): void;
    checkSessionStatus(env: string): Promise<any>;
    resetFlagsAndCounters(): void;
    checkCodeIsInformative(statusCodes: number[], data: any): void;
}
