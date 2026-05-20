/**
 *
 */
declare class Utility {
    hiddenCanvas: HTMLCanvasElement | null;
    canvasContext: CanvasRenderingContext2D | null;
    blackStream: MediaStream | null;
    /**
     *
     */
    constructor();
    /**
     *
     * @param {...any} args
     */
    log(...args: any[]): void;
    /**
     *
     * @param {...any} args
     */
    info(...args: any[]): void;
    /**
     *
     * @param {...any} args
     */
    warn(...args: any[]): void;
    /**
     *
     * @param {...any} args
     */
    error(...args: any[]): void;
    /**
     *
     * @param base64String
     */
    decodeBase64(base64String: string): string;
    /**
     *
     * @param template
     */
    replacePlaceholders(template: string, values: {
        [key: string]: string;
    }): string;
    /**
     *
     * @param template
     * @param base64
     */
    base64ToBlob(base64: string): Blob;
    convertBase64PngToCompressedBase64Jpg(base64Png: string, quality?: number): Promise<string>;
    /**
     *
     * @param time
     */
    wait(time: number): Promise<void>;
    takeSnapshot(video: HTMLVideoElement): Promise<{
        blob: Blob | null;
        base64: string | null;
    }>;
    audioConstraints: (deviceId?: any) => {
        deviceId: {
            exact: any;
        } | undefined;
        echoCancellation: boolean;
        noiseSuppression: boolean;
        suppressLocalAudioPlayback: boolean;
    };
    extractPrefix(socketUserName: string, suffix: string): string;
    addPrefix(socketUserName: string, suffix: string): string;
    getCameraNameInUserSocket(username: string): string;
    getCameraKeyName(camType: string): "" | "SIDE" | "BACK" | "FRONT" | "CUSTOM";
    generateNameAvatar(overlay: HTMLElement | null, name: string, prepend?: number, size?: string, fontSize?: string): void;
    getMeetAvatarColor(): {
        bg: string;
        shadow: string;
    };
    getInitials(fullName: string): string;
    removeAvatarSvgImage(overlay: HTMLElement | null): void;
    getBlackStream(): MediaStream;
}
declare const utility: Utility;
export default utility;
