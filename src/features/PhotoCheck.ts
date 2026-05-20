import { ai } from '../core/AIManager';
import { configrationManager } from '../core/ConfigrationManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import request from '../core/RequestManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import { photoUi } from '../ui/featuresUI/PhotoUI';
import ui from '../ui/UiManager';

/**
 *
 */
class PhotoCheck extends StepInterface {
  envAlias: string = 'Photo_Verification';
  /**
   *
   */
  constructor() {
    super();
  }

  /**
   *
   */
  async getCameraStream(): Promise<MediaStream | null> {
    const currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
    return currentStream?.stream || null;
  }

  /**
   *
   */
  async start(): Promise<void> {
    this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function (){
      ai.stopPhotoAndID().then((message: any) => {
        utility.log(message);
      }).catch((err: any) => {
        utility.log('Error stopping photo and ID capture on network disconnect', err);
      });
    });
    this.capture();

    this.retryBtn();

    this.nextBtn();
  }

  /**
   *
   */
  retryBtn() {
    const button = ui.id('thinkX_photo-card-retry') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        ui.show(ui.id('thinkX_photo-card-capture'));
        // this.capture();
        photoUi.captureClickAinProgress = false;
        ui.hide(ui.id('thinkX_photo-card-next'));
        ui.hide(ui.id('thinkX_photo-card-retry'));
        let videoElement = ui.id('thinkX_photo-video') as HTMLVideoElement;
        if (videoElement) {
          videoElement.play();
        }
      });
    }
  }

  /**
   *
   */
  async capture() {
    photoUi.addDisableBtn('thinkX_photo-card-next');
    stepUIManager.insertText('thinkX_photo-card-next', ui.translations.ai_label.please_wait);
    photoUi.hideButon(configrationManager.photoAttemptNo);
    photoUi.setMessage(ui.translations.idVerification.photo_info);
    const stream = await this.getCameraStream();
    if (stream) {
      const video = photoUi.setStream(stream);
      if (!video) {
        utility.log('❌ Failed to get video element');
        return;
      }
      video.play();
      const captureBtn = ui.id('thinkX_photo-card-capture') as HTMLButtonElement | null;
      photoUi.getCaptureBtnEnable(captureBtn, video, this.envAlias, 'photo');
      photoUi.showLoaderwithText('thinkx_proc_video_wrap_photo');
      ai.photoVerify(video, (message: any) => {
        if (photoUi.captureClickAinProgress == false) {
          utility.log(message, 'prateek');
          photoUi.setMessage(message.message);

          photoUi.drawFaceBox(message.face_coordinates, message.status_code, 'photo');

          if (captureBtn) {
            if (message.status_code === 105) {
              if (captureBtn.disabled) {
                captureBtn.disabled = false;
                captureBtn.classList.remove('thinkproc-disable');
              }
            } else {
              if (!captureBtn.disabled) {
                captureBtn.disabled = true;
                captureBtn.classList.add('thinkproc-disable');
              }
            }
          }
        }
      });
    }
  }

  /**
   *
   */
  nextBtn() {
    const button = ui.id('thinkX_photo-card-next') as HTMLElement;

    if (button) {
      ui.click(button, () => {
        photoUi.addDisableBtn('thinkX_photo-card-next');
        ai.stopPhotoAndID().then((message: any) => {
          utility.log(message);
          photoUi.captureClickAinProgress = false;
          this.resultData.info = 'Photo capture successfully';
          this.end(0);
        }).catch((err: any) => {
          utility.log('Error stopping photo capture', err);
          // Optionally, you can set an error message in resultData or handle it as needed
        });
      });
    }
  }

  /**
   *
   */
  result(): StepResult {
    return this.resultData;
  }

  cameraRevoke(): void {
    ai.stopPhotoAndID().then((message: any) => {
      utility.log(message);
    }).catch((err: any) => {
      utility.log('Error stopping photo capture on camera revoke', err);
    });
  }
  /**
   *
   */
  cameraRevokeRetry() {
    photoUi.captureClickAinProgress = false;
    this.capture();
  }
  /**
   *
   */
  micRevokeRetry() {
    ai.stopPhotoAndID().then((message: any) => {
      utility.log(message);
    }).catch((err: any) => {
      utility.log('Error stopping photo capture on mic revoke retry', err);
    });
    photoUi.captureClickAinProgress = false;
    this.capture();
  }
}

export const photoCheck = new PhotoCheck();
