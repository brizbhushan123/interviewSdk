import { ai } from '../core/AIManager';
import { configrationManager } from '../core/ConfigrationManager';
import { liveStreamManager, LiveStreamManager } from '../core/LiveStreamManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import utility from '../core/Utility';
import { cameraSetup } from '../ui/featuresUI/CameraSetupUI';
import ui from '../ui/UiManager';
import { socket } from '../core/SocketManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import { peer } from '../core/PeerConnectionManager';
import { stepUIManager } from '../core/StepUIManager';

/**
 *
 */
class AddCamSideView extends StepInterface {
  envAlias: string = 'Side_Camera';
  camType: string = 'S_CAM';
  selectedCameraId: string = '';
  selectCameraLabel: string = '';
  stagnantTimer: ReturnType<typeof setTimeout> | null;
  previousPercentage: number | null;
  socketuserID: string;
  cameraRevokePopup: HTMLElement | null = null;
  preAiStatusResponse: number | null = null;
  preAiStatusResponseCounter: number = 0;
  recordingCamStarted: boolean = false;
  flag: boolean = false;
  validPositionCount: number = 0;
  streamSideInterval: ReturnType<typeof setInterval> | null = null;
  ntwDisconnectSide: boolean = false;

  /**
   *
   */
  constructor() {
    super();
    this.stagnantTimer = null;
    this.previousPercentage = null;
    this.socketuserID = '';
    this.cameraAllowClick = this.cameraAllowClick.bind(this);
    this.streamCallback = this.streamCallback.bind(this);
  }

  /**
   *
   */
  start(): void {
   
    cameraSetup.setPageTitle(ui.translations.cameraSetup.side_camera);
    let self = this;
    this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function (){
      self.ntwDisconnectSide = true;
      ai.stopSecondaryCameraPosition((message: any) => {});
    });

    if (LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
      if (configrationManager.CameraSetupInstruction) {
        ui.show(ui.id('thinkX_cameraSetup_Instruction'));
        configrationManager.CameraSetupInstruction = false;
      }
      cameraSetup.hideInactiveCameraLabel();
      this.showQrUIPage();
    } else {
      ui.hide(ui.id('thinkX_cameraSetup_Instruction'));
      cameraSetup.hideCountLabelInMobile();
      liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.SIDE, 'environment')
        .then((stream) => {
          if (stream) this.setRoomStream(stream.stream);
          cameraSetup.hideCameraSelectPage();

          const socketUserName = utility.extractPrefix(configrationManager.socketUserName, 'S_CAM');
          this.socketuserID = socketUserName;
          let message1 = { mode: 'sending_stream', text: 'sending stream' };
          socket.sendMessage(this.socketuserID, message1);
          peer.connect(socketUserName, LiveStreamManager.CAMERA.SIDE);

          // utility.wait(2000).then(() => {
          //   peer.streamAdd(socketUserName, LiveStreamManager.CAMERA.SIDE);
          // });
        })
        .catch((error) => {
          ui.alertDialog(
            ui.translations.popup_text.additionalCameraDisconnect,
            ui.translations.popup_text.cameraDisconnected,
            ui.translations.popup_buttons.retry,
            (dialog: HTMLElement) => {
              ui.remove(dialog);
              if (LiveStreamManager.PRIMARY_CAMERA_NAME !== 'P_CAM') {
                const message = { mode: 'side_camera_restart', text: 'side camera restart' };
                socket.sendMessage(this.socketuserID, message);
              }
            }
          );
        });
    }
  }

  showQrUIPage() {
    const button = ui.id('thinkX_CameraSetup_ProceedNow') as HTMLElement;
    let self = this;
    if (button) {
      ui.click(button, async () => {
        // After showing QR code - if URL opened then socket events will be recived from the Mobile.
        this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name: string, stream: MediaStream) {
          self.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
          liveStreamManager.updateCameraSetupStream(stream, self.camType);
          cameraSetup.hideCameraSelectPage();
          clearInterval(self.streamSideInterval!);
        });

        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
          utility.log('second stream disconnected', user_name);
          const cameraName = utility.getCameraNameInUserSocket(user_name);
          if(cameraName == 'S_CAM'){
            LiveStreamManager.CAMERA.SIDE.stream = null;
            if (self.cameraRevokePopup == null) {
              if (LiveStreamManager.CAMERA.SIDE.external == true) {
                LiveStreamManager.CAMERA.SIDE.external = false
                self.cameraRevokePopup = ui.alertDialog(
                  ui.translations.popup_text.additionalCameraDisconnect,
                  ui.translations.popup_text.cameraDisconnected,
                  ui.translations.popup_buttons.retry,
                  function (dialog: HTMLElement) {
                    ui.remove(dialog);
                    self.cameraRevokePopup = null;
                    cameraSetup.showQrPage(self.cameraAllowClick, self.envAlias, self.camType);
                  }
                );
              }
            }
          }else{
            if(cameraName == 'B_CAM'){
                LiveStreamManager.CAMERA.BACK.stream = null;
                LiveStreamManager.CAMERA.BACK.external = false
            }else if(cameraName == 'F_CAM'){
                LiveStreamManager.CAMERA.FRONT.external = false
                LiveStreamManager.CAMERA.FRONT.stream = null;
            }
          }
        });

        this.subscribe(
          SDK_EVENT.RECEIVE_MESSAGE,
          function (user_name: string, message: Record<string, any>) {
            self.modeSelector(message.mode, message, user_name);
          }
        );
        cameraSetup.showQrPage(this.cameraAllowClick, this.envAlias, this.camType);
      });
    }
  }

  async cameraAllowClick(select: HTMLSelectElement) {
    const selectedDeviceId = select.value;
    const selectCameraLabel = select?.selectedOptions[0]?.text || '';
    if (selectedDeviceId) {
      cameraSetup.hideCameraSelectPage();
      this.selectedCameraId = selectedDeviceId;
      this.selectCameraLabel = selectCameraLabel;
      await cameraSetup.cameraSetupStart(this.streamCallback, this.selectedCameraId, this.camType);
    } else {
      utility.log('Please select a camera first.');
    }
  }

  streamCallback(stream: MediaStream) {
    this.setRoomStream(stream);
  }

  async setRoomStream(stream: MediaStream, aiStart = 1) {
    cameraSetup.showLoaderwithText("thinkX_cameraSetup-card-video");
    cameraSetup.setAttemptData(configrationManager.roomAttemptNo, 1);
    if (stream) {
      const video = cameraSetup.setStream(stream);
      if (aiStart == 0) {
        video.onplaying = () => {
          cameraSetup.hideLoaderwithText();
        }
      }
      video.play();
      if (aiStart == 1) {
        setTimeout(() => {
          cameraSetup.hideLoaderwithText();
          cameraSetup.showTextAndAudio(
            ui.translations.status.cameraSetup_instuction,
            true,
            this.socketuserID,
            'cam_setup_audioText',
            'cameraSetup_instuction',
          );
        }, 2000);
        utility.log('Starting AI for side camera');
        let response = await this.waitForPosition(video);

        if (response === 155 || this.flag) {
          utility.wait(4000).then(async () => {
            await this.waitForValidation(video);
          });
        }
      }
    } else {
      cameraSetup.showQrPage(this.cameraAllowClick, this.envAlias, this.camType);
    }
  }

  waitForPosition(video: HTMLVideoElement): Promise<any> {
    return new Promise((resolve) => {
      ai.secondaryCameraPosition(video, this.camType, (message: any) => {
        utility.log(message, 'position_ai');
        if(this.ntwDisconnectSide == true){
          return;
        }
        this.modeSelector('camera_setup_instruction', message);
        if (message.status_code === 155  || this.flag) {
          this.validPositionCount++;
          if(this.validPositionCount > 2 || this.flag){
            this.preAiStatusResponse = 0;
            this.modeSelector('camera_setup_instruction', message);
              ai.stopSecondaryCameraPosition((msg: any) =>
              utility.log(msg, 'stop_secondary_camera_position')
            );
            resolve(message.status_code); // Resolve when 155 is detected
          }
        } else {
          this.validPositionCount = 0;
        }
      });
    });
  }

  waitForValidation(video: HTMLVideoElement): Promise<any> { 
    return new Promise((resolve) => {
      ai.secondaryCameraPositionValidate(video, (message: any) => {
        utility.log(message, 'validate_ai');
        if(this.ntwDisconnectSide == true){
          return;
        }
        this.modeSelector('camera_setup_validate', message);
        if (message.status_code === 169 || this.flag) {
          this.completeCameraSetup();
          ai.stopSecondaryCameraPositionValidate((msg: any) =>
            utility.log(msg, 'stop_secondary_camera_position_validate')
          );
          video.pause();
          resolve(message); // Resolve on success
        } else {
          this.modeSelector('camera_setup_instruction', message);
        }
      });
    });
  }
  // Only for socket messages
  modeSelector(mode: string, message: Record<string, any>, user_name: string = '') {
    switch (mode) {
      case 'camera_setup_greenTick':
        this.completeCameraSetup(false);
        break;
      case 'camera_setup_instruction':
        this.showCameraSetupInstructions(message);
        break;
      case 'camera_setup_validate':
        this.showCameraSetupValidation(message);
        break;
      case 'camera_setup_close_browser':
        this.closeTrigger();
        break;
      case 'cam_setup_audioText':
        cameraSetup.showOverlayMessage(message.text || '');
        break;
      case 'sending_stream':
        this.streamSideInterval = setInterval(() => { 
          let message1 = { mode: 'getting_stream', text: 'getting stream' };
          socket.sendMessage(user_name, message1);
        }, 5000);
        break;
      case 'getting_stream':
        peer.close(user_name);
        peer.connect(user_name, LiveStreamManager.CAMERA.SIDE);
        break;
      default:
        utility.log('Unknown mode:', mode);
    }
  }

  completeCameraSetup(log: boolean = true) {
    ui.show(ui.id('thinkX_camera_setup_success'));
    ui.hide(ui.id('thinkX_videoOverlayMsg_cameraSetup'));

    stepUIManager.insertText(
      'thinkX_cameraSetupFinish',
      ui.translations.status.side_cameraSetupFinish
    );
    if (configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam) {
      stepUIManager.insertText(
        'thinkX_cameraSetup_proceeding',
        ui.translations.status.rear_proceedingTo
      );
    } else if (configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam) {
      stepUIManager.insertText(
        'thinkX_cameraSetup_proceeding',
        ui.translations.status.front_proceedingTo
      );
    } else {
      ui.hide(ui.id('thinkX_cameraSetup_proceeding'));
    }
    const camSetUp = ui.id('thinkX_sideCameraSetup_Start');
    if (camSetUp) {
      ui.removeClass(camSetUp, 'threeSixtyStart');
      ui.addClass(camSetUp, 'complete');
    }
    utility.wait(2000).then(() => {
      ui.hide(ui.id('thinkX_camera_setup_success'));
      this.end(0, false, log);
      if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
        let message = { mode: 'camera_setup_greenTick', text: 'complete' };
        socket.sendMessage(this.socketuserID, message);
      }
    });
  }

  showCameraSetupInstructions(message: Record<string, any>) {
    if (this.preAiStatusResponse !== message.status_code) {
      let instructionMsg = ''; 
      let uniqueKey = '';
      this.preAiStatusResponse = message.status_code;

      if (message.status_code == 155) {
        if(this.validPositionCount == 0){
            instructionMsg = ui.translations.cameraSetup.valid_position_hold;
            uniqueKey = 'cameraSetup.valid_position_hold';
        }else{
            instructionMsg = ui.translations.cameraSetup.valid_position;
            uniqueKey = 'cameraSetup.valid_position';
        }
      } else if (message.status_code == 156) {
        instructionMsg = ui.translations.cameraSetup.go_closer;
        uniqueKey = 'cameraSetup.go_closer';
      } else if (message.status_code == 157) {
        instructionMsg = ui.translations.cameraSetup.get_away;
        uniqueKey = 'cameraSetup.get_away';
      } else if (message.status_code == 158) {
        instructionMsg = ui.translations.cameraSetup.move_left;
        uniqueKey = 'cameraSetup.move_left';
      } else if (message.status_code == 159) {
        instructionMsg = ui.translations.cameraSetup.move_right;
        uniqueKey = 'cameraSetup.move_right';
      } else if (message.status_code == 160) {
        instructionMsg = ui.translations.cameraSetup.move_up;
        uniqueKey = 'cameraSetup.move_up';
      } else if (message.status_code == 161) {
        instructionMsg = ui.translations.cameraSetup.move_down;
        uniqueKey = 'cameraSetup.move_down';
      } else if (message.status_code == 162) {
        instructionMsg = ui.translations.cameraSetup.violation;
        uniqueKey = 'cameraSetup.violation';
      } else if (message.status_code == 163) {
        instructionMsg = ui.translations.cameraSetup.stop_position;
        uniqueKey = 'cameraSetup.stop_position';
      } else if (message.status_code == 180) {
        instructionMsg = ui.translations.cameraSetup.screen_not_found;
        uniqueKey = 'cameraSetup.screen_not_found';
      }
      
      if (instructionMsg) {
        //let instructionMsg2 = instructionMsg + ' ' + JSON.stringify(message.detections);
        const Element = ui.id('thinkX_videoOverlayMsg_cameraSetup');
        if (Element) {
          ui.innerText(Element, instructionMsg);
        }
        cameraSetup.showTextAndAudio(
          instructionMsg,
          true,
          this.socketuserID,
          'cam_setup_audioText',
          uniqueKey,
        );
      }
      this.preAiStatusResponseCounter = 1;
    }else{
      this.preAiStatusResponseCounter++;
      if(this.preAiStatusResponseCounter > 4){
        this.preAiStatusResponse = 0;
        this.preAiStatusResponseCounter = 0;
      }
    }
  }
  showCameraSetupValidation(message: Record<string, any>) {
    if (this.preAiStatusResponse !== message.status_code) {
      this.preAiStatusResponse = message.status_code;
      let validationMsg = '';
      let uniqueKey = '';
      if (message.status_code == 169) {
        validationMsg = ui.translations.cameraSetup.validate_success;
        uniqueKey = 'cameraSetup.validate_success';
      } else if (message.status_code == 172) {
        validationMsg = ui.translations.cameraSetup.multiple_object_detected;
        uniqueKey = 'cameraSetup.multiple_object_detected';
      } else if (message.status_code == 173) {
        validationMsg = ui.translations.cameraSetup.not_screen_person;
        uniqueKey = 'cameraSetup.not_screen_person';
      }
      if (validationMsg) {
        //let instructionMsg2 = validationMsg + ' ' + JSON.stringify(message.detections);
        const Element = ui.id('thinkX_videoOverlayMsg_cameraSetup');
        if (Element) {
          ui.innerText(Element, validationMsg);
        }
        cameraSetup.showTextAndAudio(validationMsg, true, this.socketuserID, 'cam_setup_audioText', uniqueKey);
      }
    }
  }

  closeBtn() {
    let closeBtn = ui.id('thinkX_CameraSetupCloseBtn');
    if (closeBtn) {
      ui.click(closeBtn, () => {
        this.closeTrigger();
        let message = { mode: 'room_close_browser', text: 'close' };
        socket.sendMessage(this.socketuserID, message);
      });
    }
  }

  closeTrigger() {
    ui.hide(ui.id('thinkX_CameraSetupRescanBtn'));
    ui.show(ui.id('thinkX_CameraSetupCloseBtn'));
    AddCamSideView.stepManager.closeApplication();
    utility.log('close');
  }

  cameraRevoke(): void {
    let self = this;
    ai.stopSecondaryCameraPosition((msg: any) => {utility.log(msg, 'stop_secondary_camera_position')});
    ai.stopSecondaryCameraPositionValidate((msg: any) => {utility.log(msg, 'stop_secondary_camera_position_validate')});
    utility.log('side camera revoke alert show');
    if (this.cameraRevokePopup == null) {
      if (
        LiveStreamManager.CAMERA.SIDE.external == false &&
        LiveStreamManager.CAMERA.SIDE.stream == null
      ) {
        this.cameraRevokePopup = ui.alertDialog(
          ui.translations.popup_text.additionalCameraDisconnect,
          ui.translations.popup_text.cameraDisconnected,
          ui.translations.popup_buttons.retry,
          function (dialog: HTMLElement) {
            ui.remove(dialog);
            self.cameraRevokePopup = null;
            cameraSetup.showQrPage(self.cameraAllowClick, self.envAlias, self.camType);
          }
        );
      }
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
  cameraRevokeRetry() {}
  /**
   *
   */
  micRevokeRetry() {}
}

export const addCamSideView = new AddCamSideView();
