import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class BrowserCheck extends StepInterface {
    envAlias: string;
    min_IE_version: number;
    min_chrome_version: number;
    min_firefox_version: number;
    min_safari_version: number;
    min_edge_version: number;
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
    get_browser(): {
        name: string;
        version: string;
    };
    /**
     *
     * @param userAgent
     */
    getBrowserName(userAgent?: string): string;
    /**
     *
     * @param userAgent
     */
    getOS(userAgent: string): string;
    /**
     *
     * @param userAgent
     */
    getDeviceType(userAgent: string): string;
    /**
     *
     */
    getDeviceInfo(): {
        browser: string;
        os: string;
        device: string;
        userAgent: string;
        version: string;
    };
    /**
     *
     */
    checkHTTPS(): {
        browserSupport: boolean;
        browserMsg: string;
    };
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
declare const browserCheck: BrowserCheck;
export default browserCheck;
