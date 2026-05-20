/**
 *
 */
export declare class UiComponents {
    /**
     *
     * @param text
     */
    static getMicSelect(text: string, selectMic: string): string;
    /**
     *
     * @param text
     */
    static getCameraSelect(text: string, selectCamera: string): string;
    /**
     *
     */
    static getDialogInnerHtml(icon?: boolean): string;
    static getInfoInnerHtml(): string;
    /**
     *
     * @param text
     * @param id
     */
    static retryCloseBtn(text: string, id: string): string;
    /**
     *
     * @param text
     */
    static loading(): string;
    /**
     *
     * @param text
     */
    static getCameraSelectPopup(selectCamera: string): string;
    /**
     *
     * @param text
     */
    static getMicSelectPopup(selectMic: string): string;
    static loadingwithtext(loadingText: string): string;
}
