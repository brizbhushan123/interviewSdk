/**
 *
 */
declare class PhotoUi {
    ctx: CanvasRenderingContext2D | null;
    pendingRendering: number | null;
    canvasIconArray: {
        [key: number]: HTMLImageElement;
    };
    captureClickAinProgress: boolean;
    constructor();
    /**
     *
     * @param stream
     */
    setStream(stream: MediaStream): HTMLVideoElement | undefined;
    showLoaderwithText(id: string): void;
    hideLoaderwithText(): void;
    /**
     *
     */
    drawFaceBox(coordinates: any[], statusCode: number, stageComing: string): void;
    drawFaceBoxInternal(state: {
        coordinates: any[];
        statusCode: number;
        stageComing: string;
        video: HTMLVideoElement;
        canvas: HTMLCanvasElement;
        dpr: number;
        ctx: CanvasRenderingContext2D;
    }): void;
    /**
     *
     * @param message
     */
    setMessage(message: string): void;
    /**
     *
     */
    showButton(): void;
    /**
     *
     */
    hideButon(attempNumber: number): void;
    /**
     *
     */
    getCaptureBtnEnable(captureBtn: HTMLButtonElement | null, video: HTMLVideoElement, envAlias: string, stageComing: string): void;
    clearCanvas(id: string): void;
    addDisableBtn(id: string): void;
    removeDisableBtn(id: string): void;
}
export declare const photoUi: PhotoUi;
export {};
