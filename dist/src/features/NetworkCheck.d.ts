import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class NetworkCheck extends StepInterface {
    envAlias: string;
    pkt_config: {
        packetCount: number;
        minSize: number;
        maxSize: number;
        testUrl: string;
        minTestTime: number;
        maxTestTime: number;
    };
    min_download: number;
    min_upload: number;
    config: any;
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
    getRandomSize(): number;
    /**
     *
     */
    testDownloadSpeed(): Promise<number | false>;
    /**
     *
     */
    testUploadSpeed(): Promise<number | false>;
    runDownloadTest(): Promise<number>;
    runUploadTest(): Promise<number>;
    /**
     *
     */
    runSpeedTest(): Promise<void>;
    /**
     *
     * @param speedMbps
     */
    formatSpeed(speedMbps: number): {
        speed: string;
        unit: string;
    };
    /**
     *
     */
    networkRetry(): void;
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
export declare const networkCheck: NetworkCheck;
export {};
