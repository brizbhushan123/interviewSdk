import { cameraDetails } from './LiveStreamManager';
import { Ufm } from './UFM';
declare class RegularSnap {
    regularSnapTimeout: {
        [cameraName: string]: ReturnType<typeof setTimeout>;
    };
    ufm: Ufm;
    imageTypeSnap: number;
    snapshotCanvas: HTMLCanvasElement;
    snapshotCtx: CanvasRenderingContext2D;
    constructor();
    takeSnapImage(camera: cameraDetails): void;
    takeSnapshots(video: HTMLVideoElement, saveActivity: boolean, takeReturn: boolean): string;
    getVideoFromStream(stream: MediaStream): HTMLVideoElement | null;
    stopRegularSnapForCamera(cameraName: string): void;
}
export declare const regularSnap: RegularSnap;
export {};
