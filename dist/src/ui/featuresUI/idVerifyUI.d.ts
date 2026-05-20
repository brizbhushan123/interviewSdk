/**
 *
 */
declare class IdVerifyUI {
    /**
     *
     * @param id
     * @param text
     * @param matchType
     */
    setFailIcon(id: any, // register photo, register id and capture id image url2
    mainDiv: string, // register photo, register id and capture id  main div show
    addImgID: string, // register photo, register id and capture id candidate image show
    showErrorIcon: string, // register photo, register id and capture id candidate error icon show
    statusID: string, // register photo, register id and capture id candidate error status
    successID: string): void;
    /**
     *
     * @param text
     * @param matchType
     */
    setSuccessIcon(id: string, showID: string | undefined, statusID: string | undefined, removeID: string): void;
    /**
     *
     */
    resetCompareView(): void;
    /**
     *
     */
    addCompareView(attemptNo: number): void;
    /**
     *
     * @param url1
     * @param url2
     */
    /**
     *
     * @param url1
     * @param url2
     */
    showSuccessIcon(id: string, url2: string | undefined, addImgID: string): void;
    setCapturePhoto(url: string): void;
    registerPhotoError(response: any): void;
    registerPhotoSuccess(response: any): void;
    registerIdError(response: any): void;
    registerIdSuccess(response: any): void;
    registerIdCaptureError(response: any): void;
    registerIdCaptureSuccess(response: any): void;
    waitingForCompare(): void;
    revokeView(): void;
    fullMatchView(): void;
    completeView(): void;
    rejectView(message: string): void;
    capturePhotoCaptureSuccess(image: any): void;
}
export declare const idVerifyUI: IdVerifyUI;
export {};
