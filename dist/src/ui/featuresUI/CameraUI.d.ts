/**
 *
 */
declare class CameraUI {
    /**
     * Appends the given HTML content inside a container element identified by its ID.
     * Also attaches event listeners to the newly inserted content.
     *
     * @param html - The HTML string to insert into the container.
     * @param containerId - The ID of the target container element.
     * @param cameraCallback - A callback function to be used when attaching event listeners (e.g., for camera setup).
     * @returns The container element if found, otherwise null.
     */
    /**
     *
     * @param html
     * @param containerId
     * @param cameraCallback
     */
    cameraAppendHtmlInsideContainer(html: string, containerId: string, cameraCallback: Function, errorCallback: Function): HTMLElement | null;
    /**
     * Attaches click event listeners to all buttons with a "data-target" attribute inside the given container.
     * When clicked, the button triggers camera selection logic using the associated <select> element.
     *
     * @param container - The parent HTML element that contains the target buttons.
     * @param cameraCallback - Callback function to be invoked with the selected camera details if a valid device is selected.
     */
    /**
     *
     * @param container
     * @param cameraCallback
     */
    attachListenersOn(container: HTMLElement, cameraCallback: Function, errorCallback: Function): void;
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
    cameraPermission(message: string): void;
}
export declare const cameraUI: CameraUI;
export {};
