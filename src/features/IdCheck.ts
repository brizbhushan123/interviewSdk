import { ai } from '../core/AIManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { idUi } from '../ui/featuresUI/IdUI';
import utility from '../core/Utility';
import ui from '../ui/UiManager';
import request from '../core/RequestManager';
import { configrationManager } from '../core/ConfigrationManager';
import { photoUi } from '../ui/featuresUI/PhotoUI';
import { SDK_EVENT } from '../core/InternalEventManager';
import { stepUIManager } from '../core/StepUIManager';

/**
 *
 */
class IdCheck extends StepInterface {
  envAlias: string = 'Id_Capture';
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
        utility.log('Error stopping ID capture on network disconnect', err);
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
    const button = ui.id('thinkX_id-card-retry') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        ui.show(ui.id('thinkX_id-card-capture-id'));
        // this.capture();
        photoUi.captureClickAinProgress = false;
        ui.hide(ui.id('thinkX_id-card-next'));
        ui.hide(ui.id('thinkX_id-card-retry'));
        let videoElement = ui.id('thinkX_id-video') as HTMLVideoElement;
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
    photoUi.addDisableBtn('thinkX_id-card-next');
    stepUIManager.insertText('thinkX_id-card-next', ui.translations.ai_label.please_wait);
    idUi.hideButon(configrationManager.photoAttemptNo);
    idUi.setMessage(ui.translations.idVerification.setIdCard);
    const stream = await this.getCameraStream();
    if (stream) {
      const video = idUi.setStream(stream);
      if (!video) {
        utility.log('❌ Failed to get video element');
        return;
      }
      video.play();
      const captureBtn = ui.id('thinkX_id-card-capture-id') as HTMLButtonElement | null;
      photoUi.getCaptureBtnEnable(captureBtn, video, this.envAlias, 'id');
      photoUi.showLoaderwithText('thinkx_proc_video_wrap_id');
      ai.idVerify(video, (message: any) => {
        if (photoUi.captureClickAinProgress == false) {
          utility.log(message, 'prateek');
          idUi.setMessage(message.message);
          photoUi.drawFaceBox(message.face_coordinates, message.status_code, 'id');

          if (captureBtn) {
            if (message.status_code === 102) {
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
    const button = ui.id('thinkX_id-card-next') as HTMLElement;

    if (button) {
      ui.click(button, () => {
        photoUi.addDisableBtn('thinkX_id-card-next');
        ai.stopPhotoAndID().then((message: any) => {
            utility.log(message);
            photoUi.captureClickAinProgress = false;
            this.resultData.info = 'ID capture successfully';
            this.end(0); 
        }).catch((err: any) => {
          utility.log('Error stopping ID capture', err);
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

  /**
   *
   */
  cameraRevokeRetry() {
    ai.stopPhotoAndID().then((message: any) => {
      utility.log(message);
    }).catch((err: any) => {
      utility.log('Error stopping ID capture on camera revoke retry', err);
    });
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
      utility.log('Error stopping ID capture on mic revoke retry', err);
    });
    photoUi.captureClickAinProgress = false;
    this.capture();
  }
}

export const idCheck = new IdCheck();
