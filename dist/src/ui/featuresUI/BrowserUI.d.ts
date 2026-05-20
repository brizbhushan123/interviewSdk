/**
 *
 */
declare class BrowserUI {
    /**
     *
     */
    showLoader(): void;
    /**
     *
     */
    hideLoader(): void;
    /**
     *
     */
    retryCloseBtn(): void;
    /**
     *
     */
    browserSuccess(): void;
    /**
     *@param data
     *@param data.browser
     *@param data.oldVersion
     *@param data.newVersion
     */
    replacePlaceholders(template: string, data: Record<string, string | number>): string;
    browserVersionMessage(data: {
        browser: string;
        oldVersion: string;
        newVersion: number;
    }): string;
}
export declare const browserUI: BrowserUI;
export {};
