import { configrationManager } from './ConfigrationManager';
import { cameraDetails } from './LiveStreamManager';
import { Ufm } from './UFM';
import utility from './Utility';

class RegularSnap {
  regularSnapTimeout: { [cameraName: string]: ReturnType<typeof setTimeout> };
  ufm: Ufm;
  imageTypeSnap: number = 10;
  snapshotCanvas: HTMLCanvasElement;
  snapshotCtx: CanvasRenderingContext2D;

  constructor() {
    this.ufm = new Ufm();
    this.regularSnapTimeout = {};

    this.snapshotCanvas = document.createElement('canvas');
    this.snapshotCanvas.width = 768;
    this.snapshotCanvas.height = 576;

    const ctx = this.snapshotCanvas.getContext('2d');
    if (!ctx) {
      throw new Error('Unable to get canvas context');
    }

    this.snapshotCtx = ctx;
  }

  takeSnapImage(camera: cameraDetails) {
    if (!camera.stream) {
      return;
    }

    const cameraName = camera.name;

    const videoElement = this.getVideoFromStream(camera.stream);

    if (!videoElement) {
      utility.error(`No video element available for camera: ${camera.name}`);
      return;
    }

    // Delay the snapshot and DB insert by imageTypeSnap seconds
    if (this.regularSnapTimeout[cameraName]) {
      clearTimeout(this.regularSnapTimeout[cameraName]);
    }
    this.regularSnapTimeout[cameraName] = setInterval(() => {
      utility.log(`📸 Snapshot triggered for ${cameraName}`);
      const snapshot = this.takeSnapshots(videoElement, false, false);
      const blob = utility.base64ToBlob(snapshot);
      this.ufm.regularUfmData(configrationManager.currentStepAlias, cameraName, blob);
    }, this.imageTypeSnap * 1000);
  }

  takeSnapshots(video: HTMLVideoElement, saveActivity: boolean, takeReturn: boolean): string {
    this.snapshotCtx.drawImage(video, 0, 0, this.snapshotCanvas.width, this.snapshotCanvas.height);
    const dataURI = this.snapshotCanvas.toDataURL('image/jpeg', 0.8);
    return dataURI;
  }

  getVideoFromStream(stream: MediaStream): HTMLVideoElement | null {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    video.width = 640;
    video.height = 480;
    video.play().catch(() => {});
    return video;
  }

  stopRegularSnapForCamera(cameraName: string) {
    if (this.regularSnapTimeout?.[cameraName]) {
      clearInterval(this.regularSnapTimeout[cameraName]);
      delete this.regularSnapTimeout[cameraName];
    }
  }
}

export const regularSnap = new RegularSnap();
