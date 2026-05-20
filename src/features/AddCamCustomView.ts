import { ai } from '../core/AIManager';
import { configrationManager } from '../core/ConfigrationManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import { liveStreamManager, LiveStreamManager } from '../core/LiveStreamManager';
import { peer } from '../core/PeerConnectionManager';
import { socket } from '../core/SocketManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import { cameraSetup } from '../ui/featuresUI/CameraSetupUI';
import ui from '../ui/UiManager';

/**
 *
 */
class AddCamCustomView extends StepInterface {
  envAlias: string = 'Custom_Camera';
  camType: string = 'C_CAM';
  selectedCameraId: string = '';
  selectCameraLabel: string = '';
  socketuserID: string;
  cameraRevokePopup: HTMLElement | null = null;
  preAiStatusResponse: number | null = null;
  preAiStatusResponseCounter: number = 0;
  recordingCamStarted: boolean = false;
  flag: boolean = false;
  validPositionCount: number = 0;
  streamCustomInterval: ReturnType<typeof setInterval> | null = null;
  /**
   *
   */
  constructor() {
    super();
    this.socketuserID = '';
    this.cameraAllowClick = this.cameraAllowClick.bind(this);
    this.streamCallback = this.streamCallback.bind(this);
  }

  /**
   *
   */
  start(): void {
    cameraSetup.setPageTitle(ui.translations.cameraSetup.custom_camera);
    stepUIManager.insertHtml(
        'thinkX_cameraSetup_instruction_step',
        ui.translations.cameraSetup.customInstructionStep
      );
    ui.show(ui.id('thinkX_compatibility_wrapper'));
    ui.show(ui.id('thinkX_cameraSetup_Instruction'));
    stepUIManager.insertText(
      'thinkX-additionalCamera-subTitle',
      ui.translations.cameraSetup.additional_camera_subtitle
      );
    ui.hide(ui.id('thinkX_step_count_area'));
    ui.hide(ui.id('thinkX-additionalCamName'));
    ui.hide(ui.id('thinkX_cameraSetup-card-video'));
    ui.show(ui.id('thinkX_additional_camera_box'));
    cameraSetup.cameraSetupDivID = 'thinkX_additional-cameraSetup-card-video';
    stepUIManager.insertHtml(
      'thinkX_customCam_instruition',
      configrationManager.valueMap.additional_cam.data.live_custom_cam.data.live_custom_cam_ins
      );
    stepUIManager.insertHtml(
      'thinkX_popup_customCam_instruition',
      configrationManager.valueMap.additional_cam.data.live_custom_cam.data.live_custom_cam_ins
      );

    if (LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
      if (configrationManager.CameraSetupInstruction) {
        ui.show(ui.id('thinkX_cameraSetup_Instruction'));
        configrationManager.CameraSetupInstruction = false;
      }
      cameraSetup.hideInactiveCameraLabel();
      this.showQrUIPage();
    } else {
      ui.hide(ui.id('thinkX_cameraSetup_Instruction'));

      cameraSetup.showSecondInstruction(() => {
      
        cameraSetup.hideCountLabelInMobile();
        liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.CUSTOM, 'environment')
          .then((stream) => {
            if (stream) this.setRoomStream(stream.stream);
            cameraSetup.hideCameraSelectPage();

            const socketUserName = utility.extractPrefix(configrationManager.socketUserName, this.camType);
            this.socketuserID = socketUserName;
            let message1 = { mode: 'sending_stream', text: 'sending stream' };
            socket.sendMessage(this.socketuserID, message1);
            peer.connect(socketUserName,LiveStreamManager.CAMERA.CUSTOM);

            // utility.wait(2000).then(() => {
            //   peer.streamAdd(socketUserName, LiveStreamManager.CAMERA.CUSTOM);
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
                  const message = { mode: 'custom_camera_restart', text: 'custom camera restart' };
                  socket.sendMessage(this.socketuserID, message);
                }
              }
            );
          });
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
          clearInterval(self.streamCustomInterval!);
        });

        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
          utility.log('second stream disconnected', user_name);
          LiveStreamManager.CAMERA.CUSTOM.stream = null;
          if (self.cameraRevokePopup == null) {
            if (LiveStreamManager.CAMERA.CUSTOM.external == true) {
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
        });

        this.subscribe(
          SDK_EVENT.RECEIVE_MESSAGE,
          function (user_name: string, message: Record<string, any>) {
            self.modeSelector(message.mode, message,user_name);
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
    cameraSetup.showLoaderwithText("thinkX_additional_camera_box");
    cameraSetup.setAttemptData(configrationManager.roomAttemptNo, 4);
    if (stream) {
      const video = cameraSetup.setStream(stream);
      video.onplaying = () => {
        cameraSetup.hideLoaderwithText();
      }
      video.play();
      if(aiStart == 1){
        ui.show(ui.id('thinkX_cameraSetup_btn'));
        const button = ui.id('thinkX_additionalCamera_AllowBtn') as HTMLElement;
        if (button) {
          ui.click(button, async () => {
            this.completeCameraSetup();
          });
        }
        const checkBox = ui.id('thinkX_additional_camera_checkbox')  as HTMLInputElement;
        const button2   = ui.id('thinkX_additionalCamera_AllowBtn') as HTMLButtonElement;
        if (checkBox && button2) {
          ui.enableOnCheck(checkBox, button2);
        }
      }else{
        ui.hide(ui.id('thinkX_cameraSetup_btn'));
      }
              
    } else {
      cameraSetup.showQrPage(this.cameraAllowClick, this.envAlias, this.camType);
    }
  }

  //only for socket messages
  modeSelector(mode: string, message: Record<string, any>, user_name: string = '') {
    switch (mode) {
      case 'camera_setup_greenTick':
        this.completeCameraSetup(false);
        break;
      case 'camera_setup_close_browser':
        this.closeTrigger();
        break;
      case 'cam_setup_audioText':
        cameraSetup.showOverlayMessage(message.text || '');
        break;
      case 'sending_stream':
        this.streamCustomInterval = setInterval(() => { 
          let message1 = { mode: 'getting_stream', text: 'getting stream' };
          socket.sendMessage(user_name, message1);
        }, 5000);
        break;
      case 'getting_stream':
        peer.close(user_name);
        peer.connect(user_name,LiveStreamManager.CAMERA.CUSTOM);
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
      ui.translations.status.additional_cameraSetupFinish
    );
    ui.textColor(ui.id('thinkX_cameraSetupFinish'), 'black');
    
    ui.hide(ui.id('thinkX_additional_cam_heading'));
    ui.hide(ui.id('thinkX_cameraSetup_proceeding'));
    ui.hide(ui.id('thinkX_additional_camera_box'));
    ui.hide(ui.id('thinkX_cameraSetup_btn'));

    utility.wait(4000).then(() => {
      ui.hide(ui.id('thinkX_camera_setup_success'));
      this.end(0, false, log);
      if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
        let message = { mode: 'camera_setup_greenTick', text: 'complete' };
        socket.sendMessage(this.socketuserID, message);
      }
    });
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
    AddCamCustomView.stepManager.closeApplication();
    utility.log('close');
  }

  cameraRevoke(): void {
    let self = this;
    ai.stopSecondaryCameraPosition((msg: any) => {});
    ai.stopSecondaryCameraPositionValidate((msg: any) => {});
    utility.log('Custom camera revoke alert show');
    if (this.cameraRevokePopup == null) {
      if (
        LiveStreamManager.CAMERA.CUSTOM.external == false &&
        LiveStreamManager.CAMERA.CUSTOM.stream == null
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

export const addCamCustomView = new AddCamCustomView();
