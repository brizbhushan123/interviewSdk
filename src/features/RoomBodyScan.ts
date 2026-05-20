import { ai } from '../core/AIManager';
import { configrationManager } from '../core/ConfigrationManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import request from '../core/RequestManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import { roomUI } from '../ui/featuresUI/RoomUI';
import ui from '../ui/UiManager';
import { Ufm } from '../core/UFM';
import { regularSnap } from '../core/RegularSnap';
import { SDK_EVENT } from '../core/InternalEventManager';
import { socket } from '../core/SocketManager';
import { chatUi } from '../ui/ChatUi';
import { peer } from '../core/PeerConnectionManager';
import { ufmM } from '../core/UfmManager';

/**
 *
 */
class RoomBodyScan extends StepInterface {
  envAlias: string = 'Body_Scan_Check';
  ufm: Ufm;
  apiCode = { revoke: 2305, userEScalte: 2107, error: 2309 };
  recordingCamStarted: boolean = false;
  proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
  videoDiv:HTMLVideoElement | null = null;
  /**
   *
   */
  constructor() {
    super();
    this.ufm = new Ufm();
    this.proctorAssignTimeout = null;
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
    const keys = this.ufm.ALL_UFM;
    for (const key of keys) { 
        (this.ufm as any)[key] = true; 
    }
    this.ufm.FNP = false;
    this.ufm.FM = false;
    this.ufm.CHAIR = 100;

    let self = this;
    this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function (){
      ai.stopLeftProfile((message: any) => {});
      ai.stopRightProfile((message2: any) => {});
      ai.stopHandGesture((message2: any) => {});
      self.recordingStop();
    });
    
    this.recieveProctorMessage();
    this.proctorLeft();

    if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
      liveStreamManager.record(LiveStreamManager.CAMERA.PRIMARY);
      this.recordingCamStarted = true;
    }

    roomUI.bodyScanHeader();
    if (configrationManager.image_recording == 1) {
      regularSnap.takeSnapImage(LiveStreamManager.CAMERA.PRIMARY);
    }
    roomUI.clearOverlayMessage();
    ui.alertDialog(ui.translations.popup_text.startBodyScan, ui.translations.popup_text.clickStartBodyScan, ui.translations.popup_text.okButton,async (dialog:HTMLElement)=>{
      ui.remove(dialog);
      await self.leftProfile();
      await utility.wait(4000);
      await self.rightProfile();
      await utility.wait(4000);
      await self.handGesture();
      await utility.wait(4000);
      await self.ufmlist();
    },true,false);
    
  }

  /**
   *
   */
  async leftProfile() {
    return new Promise<void>(async (resolve) => {
      const stream = await this.getCameraStream();
      if (stream) {
        const video = roomUI.setStream(stream);
        this.videoDiv = video;
        video.play();
        roomUI.showOverlayMessage(ui.translations.status.leftFace);
        roomUI.showTextAndAudio(ui.translations.status.leftFace, true, '', '', 'leftFace');
        ai.leftProfile(video, async (message: any, image: any) => {
          utility.log(message);
          if (image != null) {
            image =  await utility.convertBase64PngToCompressedBase64Jpg(image);
            const imageBlob = utility.base64ToBlob(image);
            this.ufm.log(
              message.detections,
              this.envAlias,
              configrationManager.roomAttemptNo,
              '',
              imageBlob
            );
            // roomUI.getUfmApiCall('FM', imageBlob, this.envAlias, configrationManager.roomAttemptNo);
          }
          if (message.status_code == 132) {
            ai.stopLeftProfile((message: any) => {
              resolve();
            });
          }
        });
      }
    });
  }

  /**
   *
   */
  async rightProfile() {
    return new Promise<void>(async (resolve) => {
      const stream = await this.getCameraStream();
      if (stream) {
        const video = this.videoDiv ?? roomUI.setStream(stream);
        video.play();
        roomUI.showOverlayMessage(ui.translations.status.rightFace);
        roomUI.showTextAndAudio(ui.translations.status.rightFace, true, '', '', 'rightFace');
        ai.rightProfile(video, async (message1: any, image1: any) => {
          utility.log(message1);
          if (image1 != null) {
            image1 =  await utility.convertBase64PngToCompressedBase64Jpg(image1);
            const imageBlob1 = utility.base64ToBlob(image1);
            this.ufm.log(
              message1.detections,
              this.envAlias,
              configrationManager.roomAttemptNo,
              '',
              imageBlob1
            );
          }
          if (message1.status_code == 133) {
            ai.stopRightProfile((message1: any) => {
              resolve();
            });
          }
        });
      }
    });
  }

  /**
   *
   */
  async handGesture() {
    return new Promise<void>(async (resolve) => {
      const stream = await this.getCameraStream();
      if (stream) {
        const video = this.videoDiv ?? roomUI.setStream(stream);
        video.play();
        roomUI.showOverlayMessage(ui.translations.status.showBothHands);
        roomUI.showTextAndAudio(ui.translations.status.showBothHands, true, '', '', 'showBothHands');
        ai.handGesture(video, async (message2: any, image2: any) => {
          utility.log(message2);
          if (image2 != null) {
            image2 =  await utility.convertBase64PngToCompressedBase64Jpg(image2);
            const imageBlob2 = utility.base64ToBlob(image2);
            this.ufm.log(
              message2.detections,
              this.envAlias,
              configrationManager.roomAttemptNo,
              '',
              imageBlob2
            );
          }
          if (message2.status_code == 134) {
            ai.stopHandGesture((message2: any) => {
              resolve();
            });
          }
        });
      }
    });
  }

  /**
   *
   */
  async ufmlist(requestufmOnly: number = 0) {
    request
      .getRoomUfmList({ environment: this.envAlias, attempt_no: configrationManager.roomAttemptNo,requestufmOnly:requestufmOnly })
      .then((response) => {
        const { code, data } = response;
        utility.log(response);

        if (
          (code === this.apiCode.error ||
            code === this.apiCode.revoke ||
            code === this.apiCode.userEScalte) &&
          data?.count > 0
        ) {
          roomUI.hideVideoDiv('thinkX_BodyScan');
          roomUI.showUfmDiv();
          stepUIManager.insertText(
            'thinkX_issueFound',
            ui.translations.status.issueFound + ' (' + response.data.count + ')'
          );
          if (Array.isArray(response.data.url)) {
            roomUI.createUfmImg(response.data.url);
          }
          if (code === this.apiCode.revoke) {
            const revokeClass = ui.id('thinkX_threeSixtyRoomScan');
            if (revokeClass) {
              ui.addClass(revokeClass, 'thinkproc-roomScanFail');
            }
            roomUI.showHeaderAndLoader(ui.translations.status.firstStepRoomFail);
            this.closeBtn();
          } else if (code === this.apiCode.userEScalte) {
            const revokeClass = ui.id('thinkX_threeSixtyRoomScan');
            if (revokeClass) {
              ui.addClass(revokeClass, 'thinkproc-roomScanFail');
            }
            utility.log('user escalated to proctor');
            roomUI.showHeaderAndLoaderProctor(ui.translations.status.escalatedProctor);
            ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
            this.escaltedToProctor();
          } else {
            this.rescan();
          }
        } else if (
          data.count > 0 &&
          configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san.value == 0
        ) {
          roomUI.hideVideoDiv('thinkX_BodyScan');
          roomUI.showUfmDiv();
          stepUIManager.insertText(
            'thinkX_issueFound',
            ui.translations.status.issueFound + ' (' + response.data.count + ')'
          );
          if (Array.isArray(response.data.url)) {
            roomUI.createUfmImg(response.data.url);
          }

          ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
          ui.hide(ui.id('thinkX_threeSixtyCloseBtn'));

          utility.wait(4000).then(() => {
            roomUI.showWaitLoader(ui.translations.desk.deskWait);
            utility.wait(4000).then(() => {
              this.end();
            });
          });
        } else {
          roomUI.clearOverlayMessage();
          ui.show(ui.id('thinkX_roomSuccess'));
          stepUIManager.insertText('thinkX_roomScanFinish', ui.translations.status.bodyScanFinish);
          ui.hide(ui.id('thinkX_proceeding'));
          utility.log('proceed further');
          const threeSixtyStart = ui.id('thinkX_BodyScan');
          if (threeSixtyStart) {
            ui.removeClass(threeSixtyStart, 'threeSixtyStart');
            ui.removeClass(threeSixtyStart, 'ufmRoom');
            ui.addClass(threeSixtyStart, 'complete');
          }
          this.recordingStop();
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
          this.end(4000);
        }
      })
      .catch((error) => {
        utility.log('error', error);
      });
  }

  escaltedToProctor() {
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
    //         this.escaltedToProctor();
    //       }, 10000);
    //     }
    //   })
    //   .catch((error) => {
    //     utility.log('❌ Failed to check session status', error);
    //   });
    ufmM.checkSessionStatus();
  }
  /**
   *
   */
  rescan() {
    const button = ui.id('thinkX_threeSixtyRescanBtn') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        configrationManager.roomAttemptNo++;
        roomUI.resetDiv();
        this.start();
      });
    }
  }

  closeBtn() {
    let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
    if (closeBtn) {
      ui.click(closeBtn, () => {
        this.closeTrigger();
      });
    }
  }

  closeTrigger() {
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
    RoomBodyScan.stepManager.closeApplication();
    utility.log('close');
  }

  /**
   *
   */
  result(): StepResult {
    return this.resultData;
  }

  cameraRevoke(): void {
    this.recordingStop();
    socket.cameraRevoke('P_CAM');
    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
  }

  /**
   *
   */
  cameraRevokeRetry() {
    ai.stopLeftProfile((message: any) => {});
    ai.stopRightProfile((message2: any) => {});
    ai.stopHandGesture((message2: any) => {});
    if (configrationManager.image_recording == 1) {
      regularSnap.takeSnapImage(LiveStreamManager.CAMERA.PRIMARY);
    }
    utility.log('camera revoked');
    this.start();
  }
  /**
   *
   */
  micRevokeRetry() {}

  recordingStop(): void {
    if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
      liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
      this.recordingCamStarted = false;
    }
  }

  // async checkSessionStatus() {
  //   return await request.checkSessionStatus();
  // }

  verifyByProctor() {
    // roomUI.completeView();
    setTimeout(() => {
      ui.show(ui.id('thinkX_roomSuccess'));
      ui.hide(ui.id('thinkproc-room-scan-data'));
      ui.show(ui.id('thinkX_room-card-video'));
      ui.hide(ui.id('thinkX_proceeding'));
      chatUi.initCloseButton();
      stepUIManager.insertText('thinkX_roomScanFinish', ui.translations.status.bodyScanFinish);
      this.resultData.status = true;
      this.resultData.info = 'Body Scan Approved by Proctor';
      configrationManager.currentProctor = "";
      this.end();
    }, 1000);
  }

  rejectByProctor(message: string) {
    ufmM.stopStatusCheck();
    roomUI.rejectView(message);
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
    const removeClass = ui.id('thinkX_threeSixtyRoomScan');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkpro_roomFullHeight');
    } 
    chatUi.initCloseButton();
    let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
    if (closeBtn) {
      ui.click(closeBtn, () => {
        this.closeBtn();
      });
    }
  }

  recieveProctorMessage() {
    let self = this;
    this.subscribe(
      SDK_EVENT.CHAT_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        self.candiateSocketmode(message.mode, message.text, message,user_name);
      }
    );
  }

  showRoomVideo() {
    roomUI.clearOverlayMessage();
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    ui.show(ui.id('thinkX_room-card-video'));
    ui.hide(ui.id('thinkproc-room-scan-data'));
    const videoEl = document.querySelector(
      '#thinkX_room-card-video video'
    ) as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.play();
    }
  }

  proctorLeft() {
    let self = this;
    this.subscribe(SDK_EVENT.USER_LEFT, function (user_name: string) {
      if (user_name == configrationManager.currentProctor) {
        self.escaltedToProctor();
      }
    });
  }

  showUFMPage(from:string){
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    ui.hide(ui.id('thinkX_room-card-video'));
    ui.show(ui.id('thinkproc-room-scan-data'));
    chatUi.initCloseButton();
    const videoEl = document.querySelector(
      '#thinkX_room-card-video video'
    ) as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.pause();
    }
    peer.close(from);
  }

  candiateSocketmode(mode: string, text: string, message: Record<string, any>,from:string) {
    switch (mode) {
      case 'room_verify_done':
        this.verifyByProctor();
        break;
      case 'room_reject':
        this.rejectByProctor(text);
        break;
      case 'room_video_show':
        this.showRoomVideo();
        break;
      case 'proctor_trigger_back':
        this.showUFMPage(from);
        break;
      default:
        utility.log('Unknown mode:', mode);
    }
  }
}
export const bodyScan = new RoomBodyScan();
