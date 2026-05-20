declare class CameraSetupUI {
    cameraSetupDivID: string;
    private qrStatusInterval;
    showQrPage(allowclickCallback: Function, step: string, camType: string): Promise<void>;
    stopQrStatusCheck(): void;
    getQRData(camSelect: string, step: string): void;
    loadSecondaryCamerasOnly(): Promise<void>;
    retryAdditionalCamera(): Promise<void>;
    showLoader(): void;
    hideLoader(): void;
    hideCameraSelectPage(): void;
    hideCameraStreamPage(): void;
    cameraSetupStart(callback: Function, cameraID?: string, camType?: string): Promise<void>;
    showTextAndAudio(text: string, audio?: boolean, socketuserID?: string, modeSend?: string, uniqueKey?: string, direct?: number): void;
    clearOverlayMessage(): void;
    showOverlayMessage(message: string): void;
    setAttemptData(attemptNo: number, step: number): void;
    setStream(stream: MediaStream): HTMLVideoElement;
    setPageTitle(title: string): void;
    hideCountLabelInMobile(): void;
    hideInactiveCameraLabel(): void;
    cameraSetupAudioText(message: any): void;
    showLoaderwithText(id: string): void;
    hideLoaderwithText(): void;
    showSecondInstruction(callback: () => void): void;
}
export declare const cameraSetup: CameraSetupUI;
export {};
