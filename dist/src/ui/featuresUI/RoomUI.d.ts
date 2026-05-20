/**
 *
 */
declare class RoomUI {
    /**
     *
     * @param stream
     */
    private qrStatusInterval;
    setStream(stream: MediaStream): HTMLVideoElement;
    showLoaderwithText(id: string): void;
    hideLoaderwithText(): void;
    /**
     *
     * @param message
     */
    setMessage(message: string): void;
    /**
     *
     *
     */
    hideVideoDiv(id: string): void;
    /**
     *
     *
     */
    showUfmDiv(): void;
    /**
     *
     *@param imageUrls
     */
    createUfmImg(imageData: {
        path: string;
        ufm_name: string;
    }[]): void;
    /**
     *
     *@param message
     */
    showOverlayMessage(message: string): void;
    clearOverlayMessage(): void;
    /**
     *
     */
    hideOverlayMessage(): void;
    /**
     *
     */
    resetDiv(): void;
    loadSecondaryCamerasOnly(): Promise<void>;
    retryRoomSecCamera(): Promise<void>;
    showCameraSelectPage(): void;
    hideCameraSelectPage(): void;
    resizeBase64Image(base64Str: string, newWidth?: number, newHeight?: number): Promise<string>;
    getQRData(camSelect: string, step: string): void;
    showTextAndAudio(text: string, audio?: boolean, socketuserID?: string, modeSend?: string, uniqueKey?: string, direct?: number): void;
    setAttemptData(attemptNo: number, step: number): void;
    updateAttempt(attemptNo: number): void;
    showHeaderAndLoader(text: string): void;
    showHeaderAndLoaderProctor(text: string): void;
    showWaitLoader(text: string): void;
    showcloseLoader(text: string): void;
    bodyScanHeader(): void;
    deskScanHeader(): void;
    hideDeskPopup(): void;
    showQrPage(allowclickCallback: Function, step: string): Promise<void>;
    stopQrStatusCheck(): void;
    roomStart360(callback: Function, cameraID?: string): Promise<void>;
    showLoader(): void;
    hideLoader(): void;
    deskBedPopupResult(): string | null;
    getDeskIssueDescription(): string;
    deskTextCount(): string;
    setPopupData(message: Record<string, any>): void;
    validateDeskIssueForm(): void;
    rejectView(message: string): void;
    completeView(completeText: string, completeHeader: string): void;
    updatePercentageCircle(value: number): void;
}
export declare const roomUI: RoomUI;
export {};
