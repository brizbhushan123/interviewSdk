declare class UfmManager {
    captureTime: number;
    constructor();
    id: {
        MFD: number;
        FNP: number;
        FM: number;
        OD: number;
        VD: number;
        SFL: number;
        PR: number;
        LA: number;
    };
    objectId: {
        [key: string]: number;
    };
    track: {
        MFD: Date;
        FNP: Date;
        FM: Date;
        VD: Date;
        SFL: Date;
        PR: Date;
        LA: Date;
        tv_moniotr: Date;
        chair: Date;
        laptop: Date;
        cell_phone: Date;
        headphone: Date;
        book: Date;
        ring: Date;
        watch: Date;
    };
    assignNewProctorTimer: ReturnType<typeof setInterval> | null;
    proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
    UfmSubTypes(ufm_sub_type: any[]): void;
    setCaptureTime(time: number): void;
    checkSessionStatus(): Promise<void>;
    checkStatusTimeout(time: number): void;
    stopStatusCheck(): void;
}
export declare const ufmM: UfmManager;
export {};
