import { configrationManager } from '../core/ConfigrationManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import request from '../core/RequestManager';
import { socket } from '../core/SocketManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import { ufmM } from '../core/UfmManager';
import utility from '../core/Utility';
import { idVerifyUI } from '../ui/featuresUI/idVerifyUI';
import ui from '../ui/UiManager';

/**
 *
 */
class IdVerify extends StepInterface {
  envAlias: string = 'Identity_Verification';
  proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
  proctorTimeList: { interviwerSocketID: string; time: number }[] = [];
  timezoneTimer: any = null;
  noRequestSend = false;
  timezoneFinalized = false;
  selectedInterviwerSocketID: string | null = null;
  /**
   *
   */
  constructor() {
    super();
    this.proctorAssignTimeout = null;
  }

  /**
   *
   */
  async start(): Promise<void> {
    this.compareIdAndPhoto();
    this.reScan();
  }

  /**
   *
   */
  async compareIdAndPhoto() {
    const {
      auth_reg_id: { value: auth_reg_id },
      auth_reg_photo: { value: auth_reg_photo },
      auth_capture_id: { value: auth_capture_id },
    } = configrationManager.valueMap.candidate_authentication.data;
    //Reset UI
    idVerifyUI.waitingForCompare();

    // set default images and remaining attempt in UI
    idVerifyUI.addCompareView(configrationManager.photoAttemptNo);
    this.recieveMessage();
    this.proctorLeft();
    if (auth_reg_photo == 1 || auth_reg_id == 1 || auth_capture_id == 1) {
      // if any photo compare in enabled

      request
        .compareIdAndPhoto({
          attempt_no: configrationManager.photoAttemptNo,
        })
        .then((response) => {
          if (response.status === true && (response.code === 2306 || response.code === 2305)) {
            this.resultData.info = response;
            if (response.code === 2306) {
              idVerifyUI.resetCompareView();
            } else if (response.code === 2305) {
              idVerifyUI.revokeView();
              idVerifyUI.capturePhotoCaptureSuccess(configrationManager.base64Snapshot);

            }

            if (auth_reg_photo == 1) {
              const { register_photo } = response.data;
              if (register_photo.status !== 200 || register_photo.data.result != 'success') {
                idVerifyUI.registerPhotoError(response);
                this.resultData.status = false;
                this.resultData.error.push('Register ID Verification Failed');
              } else {
                idVerifyUI.registerPhotoSuccess(response);
              }
            }

            if (auth_reg_id == 1) {
              const { register_id } = response.data;
              if (register_id.status !== 200 || register_id.data.result != 'success') {
                idVerifyUI.registerIdError(response);
                this.resultData.status = false;
                this.resultData.error.push('Register ID Verification Failed');
              } else {
                idVerifyUI.registerIdSuccess(response);
              }
            }

            if (auth_capture_id == 1) {
              const { capture_id } = response.data;
              if (capture_id.status !== 200 || capture_id.data.result != 'success') {
                idVerifyUI.registerIdCaptureError(response);
                this.resultData.status = false;
                this.resultData.error.push('Capture ID Verification Failed');
              } else {
                idVerifyUI.registerIdCaptureSuccess(response);
              }
            }
            if (
              configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture
                .value == 0
            ) {
              ui.show(ui.id('thinkX_rescanBtn'));
              ui.show(ui.id('thinkX_rescan'));
              ui.hide(ui.id('thinkX_closeBtn'));
              // this.resultData.status = false;
              // this.end(3000, true);
            } else {
              this.nextBtnView(response);
              return;
            }
          } else if (response.status === true && response.code === 2801) {
            idVerifyUI.waitingForCompare();
            if (auth_reg_photo == 1) {
              const { register_photo } = response.data;
              if (register_photo.status !== 200 || register_photo.data.result != 'success') {
                idVerifyUI.registerPhotoError(response);
                this.resultData.status = false;
                this.resultData.error.push('Register ID Verification Failed');
              } else {
                idVerifyUI.registerPhotoSuccess(response);
              }
            }

            if (auth_reg_id == 1) {
              const { register_id } = response.data;
              if (register_id.status !== 200 || register_id.data.result != 'success') {
                idVerifyUI.registerIdError(response);
                this.resultData.status = false;
                this.resultData.error.push('Register ID Verification Failed');
              } else {
                idVerifyUI.registerIdSuccess(response);
              }
            }

            if (auth_capture_id == 1) {
              const { capture_id } = response.data;
              if (capture_id.status !== 200 || capture_id.data.result != 'success') {
                idVerifyUI.registerIdCaptureError(response);
                this.resultData.status = false;
                this.resultData.error.push('Capture ID Verification Failed');
              } else {
                idVerifyUI.registerIdCaptureSuccess(response);
              }
            }

            idVerifyUI.capturePhotoCaptureSuccess(configrationManager.base64Snapshot);

            this.escalatedProctor();
          } else {
            idVerifyUI.fullMatchView();
            if (auth_reg_photo == 1) {
              const { register_photo } = response.data;
              idVerifyUI.registerPhotoSuccess(response);
            }
            if (auth_reg_id == 1) {
              const { register_id } = response.data;
              idVerifyUI.registerIdSuccess(response);
            }
            if (auth_capture_id == 1) {
              const { capture_id } = response.data;
              idVerifyUI.registerIdCaptureSuccess(response);
            }
            idVerifyUI.capturePhotoCaptureSuccess(configrationManager.base64Snapshot);

            this.nextBtnView(response);
            // this.end(4000);
          }
        })
        .catch((error) => {
          utility.error('API call failed', error);
        });
    } else {
      this.nextBtnView({});
    }
  }

  escalatedProctor() {
    // this.checkSessionStatus()
    //   .then((response) => {
    //     if (response.code == 2313) {
    //       if (this.proctorAssignTimeout !== null) {
    //         clearTimeout(this.proctorAssignTimeout);
    //       }
    //       if (response.data.proctor_found == true) {
    //         socket.setProctor(response.data.proctor_user_name);
    //       }
    //     }
    //     if (response.code == 2901) {
    //       this.proctorAssignTimeout = setTimeout(() => {
    //         this.escalatedProctor();
    //       }, 10000);
    //     }
    //     utility.log('✅ Session status checked successfully', response);
    //   })
    //   .catch((error) => {
    //     utility.log('❌ Failed to check session status', error);
    //   });
    // ufmM.checkSessionStatus();
    this.requestInterviwerJoiningTime();
  }

  // async checkSessionStatus() {
  //   return await request.checkSessionStatus();
  // }

  /**
   *
   */
  reScan() {
    const button = ui.id('thinkX_rescan') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        configrationManager.photoAttemptNo++;
        this.resultData.status = true;
        this.resultData.error = [];
        this.manager().jumpToStep('photoCheck');
      });
    }
  }

  nextBtnView(response: any) {
    ui.show(ui.id('thinkX_nextBtn'));
    const nextButton = ui.id('thinkX_next') as HTMLElement;

    if (nextButton) {
      ui.click(nextButton, async () => {
        this.resultData.status = true;
        this.resultData.info = response;
        this.end();
      });
    }
  }

  verifyByProctor() {
    idVerifyUI.completeView();
    this.resultData.info = 'Register ID Verification Approved by Proctor';
    configrationManager.currentProctor = "";
    this.nextBtnView(this.resultData.info);
  }

  rejectByProctor(message: string) {
    idVerifyUI.rejectView(message);
    ufmM.stopStatusCheck();
  }

  recieveMessage() {
    let self = this;
    this.subscribe(
      SDK_EVENT.CHAT_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        self.candiateSocketmode(message.mode, message.text, message, user_name);
      }
    );
  }

  candiateSocketmode(mode: string, text: string, message: Record<string, any>, user_name: string) {
    switch (mode) {
      case 'photo_verify_done':
        this.verifyByProctor();
        break;
      case 'photo_reject':
        this.rejectByProctor(text);
        break;
      case 'send_candidate_proctor_timeZone':
        this.interviwerJoiningTimeResponse(message.data, user_name);
        break;
      case 'attendance':
        if (this.noRequestSend && configrationManager.userType == '2') {
          this.requestInterviwerJoiningTime();
        }
        break;
      default:
        utility.log('Unknown mode:', mode);
    }
  }

  proctorLeft() {
    let self = this;
    this.subscribe(SDK_EVENT.USER_LEFT, function (user_name: string) {
      if (user_name == configrationManager.currentProctor) {
        self.escalatedProctor();
      }
      if (user_name == self.selectedInterviwerSocketID) {

        self.selectedInterviwerSocketID = null;
        self.requestInterviwerJoiningTime();
      }
    });
  }

  interviwerJoiningTimeResponse(time: number, interviwerSocketID: string) {
    if (typeof time !== 'number' || this.timezoneFinalized) return;

    // Stop timeout once first response arrives
    if (this.timezoneTimer) {
      clearTimeout(this.timezoneTimer);
      this.timezoneTimer = null;
    }

    // Avoid duplicates
    if (!this.proctorTimeList.some(p => p.interviwerSocketID === interviwerSocketID)) {
      this.proctorTimeList.push({ interviwerSocketID, time });
    }

    // Decide only once
    const leastTimeProctor = this.proctorTimeList.reduce((min, curr) =>
      curr.time < min.time ? curr : min
    );

    this.selectedInterviwerSocketID = leastTimeProctor.interviwerSocketID;

    this.timezoneFinalized = true;
    this.noRequestSend = false;

    const msg = {
      mode: 'request_verify_photo_verification',
      text: 'send proctor request for photo verification',
      data: leastTimeProctor.interviwerSocketID
    };

    socket.sendRoomMessage(msg);

    utility.log(
      'Timezone request sent to:',
      leastTimeProctor.interviwerSocketID
    );
  }

  requestInterviwerJoiningTime() {
    this.proctorTimeList = [];
    this.noRequestSend = false;
    this.timezoneFinalized = false;

    const msg = {
      mode: 'request_proctor_timeZone',
      text: 'request proctor timeZone'
    };

    socket.sendRoomMessage(msg);

    this.timezoneTimer = setTimeout(() => {
      if (this.proctorTimeList.length === 0) {
        this.noRequestSend = true;
        utility.log('No proctor timezone response in 2 seconds');
      }
    }, 2000);
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
  cameraRevokeRetry() { }
  /**
   *
   */
  micRevokeRetry() { }
}

export const idVerify = new IdVerify();
