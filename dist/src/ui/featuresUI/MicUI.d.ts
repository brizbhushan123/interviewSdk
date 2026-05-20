/**
 *
 */
declare class MicUI {
    /**
     *
     * @param html
     * @param containerId
     * @param audioCallback
     */
    allowClickTimeout: ReturnType<typeof setTimeout> | null;
    audioAppendHtmlInsideContainer(html: string, containerId: string, audioCallback: Function, errorCallback: Function): HTMLElement | null;
    /**
     *
     * @param container
     * @param audioCallback
     */
    audioAttachListenersOn(container: HTMLElement, audioCallback: Function, errorCallback: Function): void;
    /**
     *
     */
    retryBtnRemove(): void;
    /**
     *
     */
    speakerRetry(): void;
    /**
     *
     */
    removeAndAddDisableClass(): void;
    /**
     *
     */
    removeDisable(): void;
    /**
     *
     */
    showLoader(): void;
    /**
     *
     */
    hideLoader(): void;
    speakerCheckHtml(): void;
    showAudioDiv(): void;
    stopMicStream(): void;
}
export declare const micUI: MicUI;
export {};
