import { ai } from '../../core/AIManager';
import { configrationManager } from '../../core/ConfigrationManager';
import { liveStreamManager, LiveStreamManager } from '../../core/LiveStreamManager';
import { regularSnap } from '../../core/RegularSnap';
import request from '../../core/RequestManager';
import { socket } from '../../core/SocketManager';
import { stepUIManager } from '../../core/StepUIManager';
import { textToSpeech } from '../../core/TextToSpeech';
import utility from '../../core/Utility';
import { UiComponents } from '../UiComponents';
import { uiEvents } from '../UiEvents';
import ui from '../UiManager';
import { Ufm } from '../../core/UFM';
import { chat } from '../../core/ChatManager';
import { peer } from '../../core/PeerConnectionManager';
import { monitorUi } from './InterviewMoitorUI';

class ExamCameraSetupUI {
  envAlias: string = 'Interview_Session';
  preAiStatusResponse: number | null = null;
  socketuserID: string;
  selectedCameraId: string = '';
  selectCameraLabel: string = '';
  camType: string = '';
  ufm: Ufm;
  ufmSide: Ufm;
  ufmBack: Ufm;
  ufmFront: Ufm;
  recordingCamStarted: boolean = true;
  aiCameraRevoke: string = '';
  isExamPaused: boolean = false;
  additionalCameraDismiss: boolean = false;
  qrStatusInterval: any = null;
  flag: boolean = false;
  validPositionCount: number = 0;

  constructor() {
    this.ufm = new Ufm();
    this.ufmSide = new Ufm();
    this.ufmBack = new Ufm();
    this.ufmFront = new Ufm();
    this.socketuserID = '';
  }

  async showQrPage(allowclickCallback: Function, step: string, camType: string) {
    let select: HTMLSelectElement | null = null;
    let allowBtn: HTMLButtonElement | null = null;
    if (camType == 'S_CAM') {
      ui.show(ui.id('thinkX_exam_side_camera_setup_popup')); // show main container
      ui.hide(ui.id('thinkX_side_cameraSetup_box')); //hide camera frame page
      ui.show(ui.id('thinkX_side_qr_popup_dropdown')); // show QR code img Page
      select = ui.id('thinkX_side_cameraSetupSelect_exam') as HTMLSelectElement;
      allowBtn = ui.id('thinkX_side_CameraAllowBtn') as HTMLButtonElement;
    } else if (camType == 'B_CAM') {
      ui.show(ui.id('thinkX_exam_back_camera_setup_popup')); // show main container
      ui.hide(ui.id('thinkX_back_cameraSetup_box'));
      ui.show(ui.id('thinkX_back_qr_popup_dropdown'));
      select = ui.id('thinkX_back_cameraSetupSelect_exam') as HTMLSelectElement;
      allowBtn = ui.id('thinkX_back_CameraAllowBtn') as HTMLButtonElement;
    } else if (camType == 'F_CAM') {
      ui.show(ui.id('thinkX_exam_front_camera_setup_popup')); // show main container
      ui.hide(ui.id('thinkX_front_cameraSetup_box'));
      ui.show(ui.id('thinkX_front_qr_popup_dropdown'));
      select = ui.id('thinkX_front_cameraSetupSelect_exam') as HTMLSelectElement;
      allowBtn = ui.id('thinkX_front_CameraAllowBtn') as HTMLButtonElement;
    }else if (camType == 'C_CAM') {
      ui.show(ui.id('thinkX_exam_additional_camera_setup_popup')); // show main container
      ui.hide(ui.id('thinkX_additional_cameraSetup_box'));
      ui.show(ui.id('thinkX_additional_qr_popup_dropdown'));
      select = ui.id('thinkX_additional_cameraSetupSelect_exam') as HTMLSelectElement;
      allowBtn = ui.id('thinkX_additional_CameraAllowBtn') as HTMLButtonElement;
    }

    this.getQRData(camType, step);
    // Clear any old interval before starting a new one
    if (this.qrStatusInterval) {
      clearInterval(this.qrStatusInterval);
    }
    // Set interval to check status every 5 seconds
    this.qrStatusInterval = setInterval(async () => {
      try {
        const response = await request.checkCurrentQRstatus({ camera_type: camType, environment: step });

        if (response.data.status === 'EXPIRE') {
          this.getQRData(camType, step);
        }
      } catch (error) {
        utility.log('QR code status request failed', error);
      }
    }, 5000); // 5,000 ms = 5 seconds

    await this.loadSecondaryCamerasOnly();

    if (select && allowBtn) {
      // Optional: disable Allow button until a camera is selected
      allowBtn.disabled = true;
      ui.addClass(allowBtn, 'thinkproc-disable');
      select.addEventListener('change', () => {
        allowBtn.disabled = select.value === '';
      });

      // Enable if pre-selected value exists
      allowBtn.disabled = select.value === '';
      if (!allowBtn.disabled) {
        ui.removeClass(allowBtn, 'thinkproc-disable');
      }
      ui.click(allowBtn, async () => {
        allowclickCallback(select, camType);
      });
    }
  }

  // helper method to stop the interval
  stopQrStatusCheck() {
    if (this.qrStatusInterval) {
      clearInterval(this.qrStatusInterval);
      this.qrStatusInterval = null;
    }
  }


  getQRData(camSelect: string, step: string) {
    this.showLoader();
    request
      .QRCode({ camera_type: camSelect, environment: step })
      .then((response) => {
        if (response.message?.toLowerCase().includes('qr code') && response.data?.qr_svg) {
          const svg = response.data.qr_svg;
          const base64Svg =
            'data:image/svg+xml;base64,' +
            btoa(
              encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (_, p1) =>
                String.fromCharCode(parseInt(p1, 16))
              )
            );
          // Create <img> element
          const img = document.createElement('img');
          img.src = base64Svg;
          img.alt = 'QR Code';
          img.className = 'thinkproc-qrimgCamSetup';
          img.style.maxWidth = '100%'; // Optional styling
          // Append to the container with ID "thinkproc-qrimage"
          let container: HTMLElement | null = null;
          if (camSelect == 'S_CAM') {
            container = ui.id('thinkX_side_popup_qrCode');
          } else if (camSelect == 'B_CAM') {
            container = ui.id('thinkX_back_popup_qrCode');
          } else if (camSelect == 'F_CAM') {
            container = ui.id('thinkX_front_popup_qrCode');
          }else if (camSelect == 'F_CAM') {
            container = ui.id('thinkX_front_popup_qrCode');
          }else if (camSelect == 'C_CAM') {
            container = ui.id('thinkX_additional_popup_qrCode');
          }
          if (container) {
            container.innerHTML = ''; // Clear previous content
            container.appendChild(img);
          } else {
            utility.log('QR image container not found');
          }
          this.hideLoader();
        } else {
          utility.log('QR code generation failed or SVG missing', response);
        }
      })
      .catch((error) => {
        utility.log('QR code request failed', error);
      });
  }

  async loadSecondaryCamerasOnly(): Promise<void> {
    try {
      const currentDeviceId = LiveStreamManager.CAMERA.PRIMARY.videoDeviceIN;
      const sideDeviceId = LiveStreamManager.CAMERA.SIDE.videoDeviceIN;
      const frontDeviceId = LiveStreamManager.CAMERA.FRONT.videoDeviceIN;
      const backDeviceId = LiveStreamManager.CAMERA.BACK.videoDeviceIN;
      const devices = await liveStreamManager.getMediaDevices();

      let secRetryIcon: HTMLElement | null = null;
      let allowBtn: HTMLButtonElement | null = null;
      if (this.camType == 'S_CAM') {
        secRetryIcon = ui.id('thinkX_side_secondaryCamRetryIcon_exam');
        allowBtn = ui.id('thinkX_side_CameraAllowBtn') as HTMLButtonElement;
      } else if (this.camType == 'B_CAM') {
        secRetryIcon = ui.id('thinkX_back_secondaryCamRetryIcon_exam');
        allowBtn = ui.id('thinkX_back_CameraAllowBtn') as HTMLButtonElement;
      } else if (this.camType == 'F_CAM') {
        secRetryIcon = ui.id('thinkX_front_secondaryCamRetryIcon_exam');
        allowBtn = ui.id('thinkX_front_CameraAllowBtn') as HTMLButtonElement;
      } else if (this.camType == 'C_CAM') {
        secRetryIcon = ui.id('thinkX_additional_secondaryCamRetryIcon_exam');
        allowBtn = ui.id('thinkX_additional_CameraAllowBtn') as HTMLButtonElement;
      }

      if (devices && typeof devices !== 'boolean') {
        const videoDevices = devices.video;
        const secondaryDevices = videoDevices.filter(
          (device) =>
            device.deviceId !== frontDeviceId &&
            device.deviceId !== backDeviceId &&
            device.deviceId !== sideDeviceId &&
            device.deviceId !== currentDeviceId
        );
        let cameraSetupSelect: string = '';
        if (this.camType == 'S_CAM') {
          ui.show(ui.id('thinkproc-side_cameraSetupWrap'));
          cameraSetupSelect = 'thinkX_side_cameraSetupSelect_exam';
        } else if (this.camType == 'B_CAM') {
          ui.show(ui.id('thinkproc-back_cameraSetupWrap'));
          cameraSetupSelect = 'thinkX_back_cameraSetupSelect_exam';
        } else if (this.camType == 'F_CAM') {
          ui.show(ui.id('thinkproc-front_cameraSetupWrap'));
          cameraSetupSelect = 'thinkX_front_cameraSetupSelect_exam';
        } else if (this.camType == 'C_CAM') {
          ui.show(ui.id('thinkproc-additional_cameraSetupWrap'));
          cameraSetupSelect = 'thinkX_additional_cameraSetupSelect_exam';
        }

        const options = secondaryDevices.map((cam: MediaDeviceInfo, i: number) => ({
          value: cam.deviceId || `${i}`,
          label: cam.label || `Camera Device ${i + 1}`,
        }));
        utility.log(options.length, 'option length1');
        if (options.length > 0) {
          stepUIManager.initAndUpdateCustomSelectById(
            cameraSetupSelect,
            options,
            options[0]?.value
          );

          if (secRetryIcon) {
            ui.addClass(secRetryIcon, 'd-none');
          }

          if (allowBtn) {
            allowBtn.disabled = false;
            ui.removeClass(allowBtn, 'thinkproc-disable');
          }
        } else {
          stepUIManager.initAndUpdateCustomSelectById(
            cameraSetupSelect,
            [{ value: '', label: ui.translations.status.no_camera_found }],
            ''
          );
          if (secRetryIcon) {
            ui.show(secRetryIcon);
            // Prevent attaching the click multiple times
            if (!secRetryIcon.dataset.binded) {
              ui.click(secRetryIcon, async () => {
                await this.retryAdditionalCamera();
              });
              //secRetryIcon.dataset.binded = 'true';
            }
          }
        }
      } else {
        stepUIManager.initAndUpdateCustomSelectById(
          'thinkpro-get-camera-value',
          [{ value: '', label: ui.translations.status.cameraAccessDenied }],
          ''
        );
      }
    } catch (err) {
      utility.error('Failed to load camera devices:', err);
      stepUIManager.initAndUpdateCustomSelectById(
        'thinkpro-get-camera-value',
        [{ value: '', label: ui.translations.status.cameraAccessDenied }],
        ''
      );
    }
  }
  async retryAdditionalCamera(): Promise<void> {
    let cameraSetupSelect: string = '';
    let reloadIconSecCam: HTMLElement | null = null;
    let secRetryIcon: HTMLElement | null = null;
    let allowBtn: HTMLButtonElement | null = null;
    if (this.camType == 'S_CAM') {
      cameraSetupSelect = 'thinkX_side_cameraSetupSelect_exam';
      reloadIconSecCam = ui.id('thinkX_side_reloadIconSecCam');
      secRetryIcon = ui.id('thinkX_side_secondaryCamRetryIcon_exam');
      allowBtn = ui.id('thinkX_side_CameraAllowBtn') as HTMLButtonElement;
    } else if (this.camType == 'B_CAM') {
      cameraSetupSelect = 'thinkX_back_cameraSetupSelect_exam';
      reloadIconSecCam = ui.id('thinkX_back_reloadIconSecCam');
      secRetryIcon = ui.id('thinkX_back_secondaryCamRetryIcon_exam');
      allowBtn = ui.id('thinkX_back_CameraAllowBtn') as HTMLButtonElement;
    } else if (this.camType == 'F_CAM') {
      cameraSetupSelect = 'thinkX_front_cameraSetupSelect_exam';
      reloadIconSecCam = ui.id('thinkX_front_reloadIconSecCam');
      secRetryIcon = ui.id('thinkX_front_secondaryCamRetryIcon_exam');
      allowBtn = ui.id('thinkX_front_CameraAllowBtn') as HTMLButtonElement;
    } else if (this.camType == 'C_CAM') {
      cameraSetupSelect = 'thinkX_additional_cameraSetupSelect_exam';
      reloadIconSecCam = ui.id('thinkX_additional_reloadIconSecCam');
      secRetryIcon = ui.id('thinkX_additional_secondaryCamRetryIcon_exam');
      allowBtn = ui.id('thinkX_additional_CameraAllowBtn') as HTMLButtonElement;
    }
    try {
      const { PRIMARY, SIDE, FRONT, BACK } = LiveStreamManager.CAMERA;
      const currentDeviceId = PRIMARY.videoDeviceIN;
      const sideDeviceId = SIDE.videoDeviceIN;
      const frontDeviceId = FRONT.videoDeviceIN;
      const backDeviceId = BACK.videoDeviceIN;
      const devices = await liveStreamManager.getMediaDevices();
      if (reloadIconSecCam) {
        ui.addClass(reloadIconSecCam, 'iconRotate');
      }

      if (devices && typeof devices !== 'boolean') {
        const videoDevices = devices.video || [];

        const secondaryDevices = videoDevices.filter(
          (device) =>
            ![currentDeviceId, sideDeviceId, frontDeviceId, backDeviceId].includes(device.deviceId)
        );

        const options = secondaryDevices.map((cam: MediaDeviceInfo, i: number) => ({
          value: cam.deviceId || `${i}`,
          label: cam.label || `Camera Device ${i + 1}`,
        }));

        utility.log(options.length, 'Secondary camera options found');

        if (options.length > 0) {
          uiEvents.setOptions(cameraSetupSelect, options, options[0].value);
          if (secRetryIcon) ui.hide(secRetryIcon);
          if (allowBtn) {
            allowBtn.disabled = false;
            ui.removeClass(allowBtn, 'thinkproc-disable');
          }
        } else {
          uiEvents.setOptions(
            cameraSetupSelect,
            [{ value: '', label: ui.translations.status.no_camera_found }],
            ''
          );
          if (secRetryIcon) ui.show(secRetryIcon);
        }
      } else {
        uiEvents.setOptions(
          cameraSetupSelect,
          [{ value: '', label: ui.translations.status.cameraAccessDenied }],
          ''
        );
      }

      if (reloadIconSecCam) {
        utility.wait(3000).then(() => ui.removeClass(reloadIconSecCam, 'iconRotate'));
      }
    } catch (err) {
      utility.error('Retry failed to load secondary camera devices:', err);
      uiEvents.setOptions(
        cameraSetupSelect,
        [{ value: '', label: ui.translations.status.cameraAccessDenied }],
        ''
      );
    }
  }

  async cameraAllowClick(select: HTMLSelectElement, camType: string) {
    let self = examCameraUi;
    const selectedDeviceId = select.value;
    const selectCameraLabel = select?.selectedOptions[0]?.text || '';
    if (selectedDeviceId) {
      self.hideCameraSelectPage(camType);
      self.selectedCameraId = selectedDeviceId;
      self.selectCameraLabel = selectCameraLabel;
      await self.cameraSetupStart(self.streamCallback, self.selectedCameraId, camType);
    } else {
      utility.log('Please select a camera first.');
    }
  }
  streamCallback(stream: MediaStream) {
    examCameraUi.setRoomStream(stream);
  }

  async setRoomStream(stream: MediaStream, aiStart = 1) {
    let self = examCameraUi;
    self.stopQrStatusCheck();
    self.startStreamLoader(self.camType);
    if (stream) {
      const video = self.setStream(stream);
      video.onplaying = () => {
        self.hideLoaderwithText();
      }
      video.play();
      if(self.camType == 'C_CAM'){
        if(aiStart == 1){
          ui.show(ui.id('thinkX_pop_cameraSetup_btn'));
          const button = ui.id('thinkX_retry_additionalCamera_AllowBtn') as HTMLElement;
          if (button) {
            ui.click(button, async () => {
                self.completeCameraSetup(true, self.camType);
            });
          }
          const checkBox = ui.id('thinkX_popup_additional_camera_checkbox')  as HTMLInputElement;
          const button2   = ui.id('thinkX_retry_additionalCamera_AllowBtn') as HTMLButtonElement;
          if (checkBox && button2) {
            ui.enableOnCheck(checkBox, button2);
          }
        }else{
            ui.hide(ui.id('thinkX_pop_cameraSetup_btn'));
        }
      }else{
        if (aiStart == 1) {
          setTimeout(() => {
            self.showTextAndAudio(
              ui.translations.status.cameraSetup_instuction,
              true,
              self.socketuserID,
              'cam_setup_audioText',
              'cameraSetup_instuction',
            );
          }, 2000);
          utility.log(self.camType, 'Starting AI for camera');
          let response = await self.waitForPosition(video);

          if (response === 155 || response === 162 || this.flag) {
            utility.wait(4000).then(async () => {
              await self.waitForValidation(video);
            });
          }
        }
      }
    } else {
      examCameraUi.showQrPage(self.cameraAllowClick, self.envAlias, self.camType);
    }
  }

  setStream(stream: MediaStream) {
    let self = examCameraUi;
    let videoDivDom: HTMLElement | null = null;
    if (self.camType == 'S_CAM') {
      videoDivDom = ui.id('thinkX_side-cameraSetup-card-video');
    } else if (self.camType == 'B_CAM') {
      videoDivDom = ui.id('thinkX_back-cameraSetup-card-video');
    } else if (self.camType == 'F_CAM') {
      videoDivDom = ui.id('thinkX_front-cameraSetup-card-video');
    } else if (self.camType == 'C_CAM') {
      videoDivDom = ui.id('thinkX_popup-additional-cameraSetup-card-video');
    } else {
      videoDivDom = ui.id('thinkX_cameraSetup-card-video');
    }
    const video = ui.createVideoElement();
    video.srcObject = stream;
    video.muted = true;
    if (videoDivDom) {
      const existingVideos = videoDivDom.querySelectorAll('video');
      existingVideos.forEach((v) => v.remove());
    }
    videoDivDom?.append(video);
    return video;
  }

  waitForPosition(video: HTMLVideoElement): Promise<any> {
    return new Promise((resolve) => {
      ai.secondaryCameraPosition(video, this.camType, (message: any) => {
        utility.log(message, 'position_ai');
        this.modeSelector('camera_setup_instruction', message, this.camType);
        if (message.status_code === 155 || this.flag) {
          this.validPositionCount++;
          if(this.validPositionCount > 2 || this.flag){
            ai.stopSecondaryCameraPosition((msg: any) =>
              utility.log(msg, 'stop_secondary_camera_position')
            );
            resolve(message.status_code); // Resolve when 155 is detected
          }
        }else{
          this.validPositionCount = 0;
        }
      });
    });
  }

  waitForValidation(video: HTMLVideoElement): Promise<any> {
    return new Promise((resolve) => {
      ai.secondaryCameraPositionValidate(video, (message: any) => {
        utility.log(message, 'validate_ai');
        this.modeSelector('camera_setup_validate', message, this.camType);
        let valid_code = 0;
        if (this.camType == 'S_CAM') {
          valid_code = 169;
        } else if (this.camType == 'B_CAM') {
          valid_code = 171;
        } else if (this.camType == 'F_CAM') {
          valid_code = 170;
        }

        if (message.status_code === valid_code || this.flag) {
          this.completeCameraSetup(true, this.camType);
          ai.stopSecondaryCameraPositionValidate((msg: any) =>
            utility.log(msg, 'stop_secondary_camera_position_validate')
          );
          video.pause();
          resolve(message); // Resolve on success
        } else {
          this.modeSelector('camera_setup_instruction', message, this.camType);
        }
      });
    });
  }

  modeSelector(mode: string, message: Record<string, any>, cameraName: string) {
    switch (mode) {
      case 'camera_setup_greenTick':
        this.completeCameraSetup(false, cameraName);
        break;
      case 'camera_setup_instruction':
        this.showCameraSetupInstructions(message, cameraName);
        break;
      case 'camera_setup_validate':
        this.showCameraSetupValidation(message, cameraName);
        break;
      case 'cam_setup_audioText':
        this.showOverlayMessage(message.text || '', cameraName);
        break;
      case 'additional_camera_dismiss':
        this.additionalCameraDismiss = true;
        break;
      default:
        console.log('Unknown mode:', mode);
    }
  }

  completeCameraSetup(log: boolean = true, cameraName: string) {
    if (cameraName == 'S_CAM') {
      ui.show(ui.id('thinkX_side_camera_setup_success'));
      ui.hide(ui.id('thinkX_side_videoOverlayMsg_cameraSetup'));
    } else if (cameraName == 'B_CAM') {
      ui.show(ui.id('thinkX_back_camera_setup_success'));
      ui.hide(ui.id('thinkX_back_videoOverlayMsg_cameraSetup'));
    } else if (cameraName == 'F_CAM') {
      ui.show(ui.id('thinkX_front_camera_setup_success'));
      ui.hide(ui.id('thinkX_front_videoOverlayMsg_cameraSetup'));
    } else if (cameraName == 'C_CAM') {
      ui.show(ui.id('thinkX_additional_camera_setup_success'));
      ui.hide(ui.id('thinkX_additional_videoOverlayMsg_cameraSetup'));
      ui.hide(ui.id('thinkX_additional_cameraSetup_box'));
    }
    ui.textColor(ui.id('thinkX_popup_cameraSetupFinish'), 'black');
    utility.wait(1000).then(() => {
      if (cameraName == 'S_CAM') {
        ui.hide(ui.id('thinkX_exam_side_camera_setup_popup')); // hide side main container
        ui.hide(ui.id('thinkX_side_camera_setup_success'));
      } else if (cameraName == 'B_CAM') {
        ui.hide(ui.id('thinkX_exam_back_camera_setup_popup')); // hide  back main container
        ui.hide(ui.id('thinkX_back_camera_setup_success'));
      } else if (cameraName == 'F_CAM') {
        ui.hide(ui.id('thinkX_exam_front_camera_setup_popup')); // hide front main container
        ui.hide(ui.id('thinkX_front_camera_setup_success'));
      } else if (cameraName == 'C_CAM') {
        ui.hide(ui.id('thinkX_exam_additional_camera_setup_popup')); // hide additional main container
        ui.hide(ui.id('thinkX_additional_camera_setup_success'));
      }
      //this.end(0, false, log);
      this.startInternalCamSnapAndRecording(cameraName);
      
      let camName = this.getRevokeCameraName();
      if (camName != '' && configrationManager.currentStepObject) {
        configrationManager.reCameraRevoke = camName;
        configrationManager.currentStepObject.cameraRevoke();

      } else {
        utility.log('start_monitor_ai all cameras are set');
        chat.sendData('start_monitor_ai', 'start monitor ai');

        this.primaryCameraAiMonitoring();
      }
      //chat.sendData('cam_reconnect', 'camera reconnect');
      monitorUi.hideCameraDisconnectIcon("C_CAM")
      this.updateStream();
    });
  }

  updateStream(){
    let streamInfo = liveStreamManager.getAllStreamsId();
    chat.sendData('stream_update', streamInfo);
    utility.wait(2000).then(()=>{
      peer.streamAddAll(LiveStreamManager.CAMERA.PRIMARY,LiveStreamManager.CAMERA.CUSTOM,LiveStreamManager.AUDIO.PRIMARY); 
    });
  }
  getRevokeCameraName(): string {
    const sideStream = LiveStreamManager.CAMERA.SIDE.stream;
    const backStream = LiveStreamManager.CAMERA.BACK.stream;
    const frontStream = LiveStreamManager.CAMERA.FRONT.stream;
    const customStream = LiveStreamManager.CAMERA.CUSTOM.stream;

    const sideEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
    const backEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
    const frontEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
    const customEnable =
      configrationManager.valueMap.additional_cam.data.live_custom_cam.value;

    if (!sideStream && sideEnable) {
      return 'SIDE';
    } else if (!backStream && backEnable) {
      return 'BACK';
    } else if (!frontStream && frontEnable) {
      return 'FRONT';
    }else if (!customStream && customEnable) {
      return 'CUSTOM';
    } else {
      return '';
    }
  }
  showCameraSetupInstructions(message: Record<string, any>, cameraName: string) {
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
      } else if (message.status_code == 166) {
        instructionMsg = ui.translations.cameraSetup.invalid_position;
        uniqueKey = 'cameraSetup.invalid_position';
      } else if (message.status_code == 167) {
        instructionMsg = ui.translations.cameraSetup.no_person_detected;
        uniqueKey = 'cameraSetup.no_person_detected';
      } else if (message.status_code == 168) {
        instructionMsg = ui.translations.cameraSetup.no_laptop_detected;
        uniqueKey = 'cameraSetup.no_laptop_detected';
      } else if (message.status_code == 163) {
        instructionMsg = ui.translations.cameraSetup.stop_position;
        uniqueKey = 'cameraSetup.stop_position';
      }
      if (instructionMsg) {
        let Element: HTMLElement | null = null;
        if (cameraName == 'S_CAM') {
          Element = ui.id('thinkX_side_videoOverlayMsg_cameraSetup');
        } else if (cameraName == 'B_CAM') {
          Element = ui.id('thinkX_back_videoOverlayMsg_cameraSetup');
        } else if (cameraName == 'F_CAM') {
          Element = ui.id('thinkX_front_videoOverlayMsg_cameraSetup');
        }
        if (Element) {
          ui.innerText(Element, instructionMsg);
        }
        utility.log('Camera Setup Instruction:', message.status_code);
        this.showTextAndAudio(instructionMsg, true, this.socketuserID, 'cam_setup_audioText', uniqueKey);
      }
    }
  }
  showCameraSetupValidation(message: Record<string, any>, cameraName: string) {
    if (this.preAiStatusResponse !== message.status_code) {
      this.preAiStatusResponse = message.status_code;
      let validationMsg = '';
      let uniqueKey = '';
      if (message.status_code == 170) {
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
        let Element: HTMLElement | null = null;
        if (cameraName == 'S_CAM') {
          Element = ui.id('thinkX_side_videoOverlayMsg_cameraSetup');
        } else if (cameraName == 'B_CAM') {
          Element = ui.id('thinkX_back_videoOverlayMsg_cameraSetup');
        } else if (cameraName == 'F_CAM') {
          Element = ui.id('thinkX_front_videoOverlayMsg_cameraSetup');
        }
        if (Element) {
          ui.innerText(Element, validationMsg);
        }
        this.showTextAndAudio(validationMsg, true, this.socketuserID, 'cam_setup_audioText', uniqueKey);
      }
    }
  }

  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    let Element: string = '';
    if (this.camType == 'S_CAM') {
      Element = 'thinkX_side_popup_qrCode';
    } else if (this.camType == 'B_CAM') {
      Element = 'thinkX_back_popup_qrCode';
    } else if (this.camType == 'F_CAM') {
      Element = 'thinkX_front_popup_qrCode';
    } else if (this.camType == 'C_CAM') {
      Element = 'thinkX_front_popup_qrCode';
    }
    stepUIManager.setGif(loaderHTML, Element);
  }

  hideLoader(): void {
    const existingLoader = ui.id('thinkX_loading');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }

  hideCameraSelectPage(camType: string) {
    if (camType == 'S_CAM') {
      ui.hide(ui.id('thinkX_side_qr_popup_dropdown')); // hide QR code img Page
      ui.show(ui.id('thinkX_side_cameraSetup_box')); //open camera frame page
    } else if (camType == 'B_CAM') {
      ui.hide(ui.id('thinkX_back_qr_popup_dropdown'));
      ui.show(ui.id('thinkX_back_cameraSetup_box'));
    } else if (camType == 'F_CAM') {
      ui.hide(ui.id('thinkX_front_qr_popup_dropdown'));
      ui.show(ui.id('thinkX_front_cameraSetup_box'));
    } else if (camType == 'C_CAM') {
      ui.hide(ui.id('thinkX_additional_qr_popup_dropdown'));
      ui.show(ui.id('thinkX_additional_cameraSetup_box'));
    }
  }

  hideCameraStreamPage(camType: string) {
    if (camType == 'S_CAM') {
      ui.show(ui.id('thinkX_side_qr_popup_dropdown')); // show QR code img Page
      ui.hide(ui.id('thinkX_side_cameraSetup_box')); //hide camera frame page
    } else if (camType == 'B_CAM') {
      ui.show(ui.id('thinkX_back_qr_popup_dropdown'));
      ui.hide(ui.id('thinkX_back_cameraSetup_box'));
    } else if (camType == 'F_CAM') {
      ui.show(ui.id('thinkX_front_qr_popup_dropdown'));
      ui.hide(ui.id('thinkX_front_cameraSetup_box'));
    } else if (camType == 'C_CAM') {
      ui.show(ui.id('thinkX_additional_qr_popup_dropdown'));
      ui.hide(ui.id('thinkX_additional_cameraSetup_box'));
    }
  }

  async cameraSetupStart(callback: Function, cameraID: string = '', camType: string = 'S_CAM') {
    if (!cameraID && LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
      utility.log('No camera selected.');
      return;
    }
    if (LiveStreamManager.PRIMARY_CAMERA_NAME === 'P_CAM') {
      try {
        const isValid = await liveStreamManager.isValidDeviceId(cameraID, 'videoinput');
        utility.log('camera revoke', isValid);
        if (!isValid) return;
        let cameraRef;
        switch (camType) {
          case 'S_CAM':
            cameraRef = LiveStreamManager.CAMERA.SIDE;
            break;
          case 'B_CAM':
            cameraRef = LiveStreamManager.CAMERA.BACK;
            break;
          case 'F_CAM':
            cameraRef = LiveStreamManager.CAMERA.FRONT;
            break;
          case 'C_CAM':
            cameraRef = LiveStreamManager.CAMERA.CUSTOM;
            break;
          default:
            cameraRef = LiveStreamManager.CAMERA.PRIMARY
        }
        if (cameraRef.stream) {
          cameraRef.stream.getTracks().forEach((track) => track.stop());
        }
        liveStreamManager.setCameraDeviceId(cameraRef, cameraID);
        cameraRef.label = cameraID;

        const stream = await liveStreamManager.requestVideo(cameraRef);

        if (!stream) {
          utility.log('Could not get stream for selected camera.');
          alert('Could not get stream for selected camera.');
          return;
        }
        cameraRef.stream = stream.stream;
        callback(stream.stream);
      } catch (err) {
        utility.log('Error during camera setup:', err);
      }
    }
  }

  showTextAndAudio(
    text: string,
    audio: boolean = true,
    socketuserID: string = '',
    modeSend: string = '',
    uniqueKey: string = '',
    direct: number = 0
  ) {
    this.clearOverlayMessage();
    utility.log('CAMERA SETUP :', text);
    this.showOverlayMessage(text, this.camType);
    if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
      let message = { mode: modeSend, text: text };
      socket.sendMessage(socketuserID, message);
    }
    if (audio) {
      textToSpeech
        .getVoiceFromAPI(text, ui.translations.language_code.code, uniqueKey, direct)
        .then(async (audio) => {
          audio.onended = function () {
            audio.pause();
          };
          await audio.play();
        })
        .catch((error) => {
          utility.error('Error getting voice from API or playing audio:', error);
        });
    }
  }

  clearOverlayMessage(): void {
    let existing: HTMLElement | null = null;
    if (this.camType == 'S_CAM') {
      existing = ui.id('thinkX_side_videoOverlayMsg_cameraSetup');
    } else if (this.camType == 'B_CAM') {
      existing = ui.id('thinkX_back_videoOverlayMsg_cameraSetup');
    } else if (this.camType == 'F_CAM') {
      existing = ui.id('thinkX_front_videoOverlayMsg_cameraSetup');
    } else if (this.camType == 'C_CAM') {
      existing = ui.id('thinkX_additional_videoOverlayMsg_cameraSetup');
    }
    if (existing) existing.remove();
  }

  showOverlayMessage(message: string, cameraName: string): void {
    let container: HTMLElement | null = null;
    if (cameraName == 'S_CAM') {
      container = ui.id('thinkX_side-cameraSetup-card-video');
    } else if (cameraName == 'B_CAM') {
      container = ui.id('thinkX_back-cameraSetup-card-video');
    } else if (cameraName == 'F_CAM') {
      container = ui.id('thinkX_front-cameraSetup-card-video');
    } else if (cameraName == 'C_CAM') {
      container = ui.id('thinkX_popup-additional-cameraSetup-card-video');
    }
    if (!container) return;

    const existing = container.querySelector('.thinkproc_side_camera_view_message');
    if (existing) existing.remove();

    const overlayWrapper = document.createElement('div');
    overlayWrapper.className = 'thinkproc_side_camera_view_message';

    const span = document.createElement('span');

    if (cameraName == 'S_CAM') {
      span.id = 'thinkX_side_videoOverlayMsg_cameraSetup';
    } else if (cameraName == 'B_CAM') {
      span.id = 'thinkX_back_videoOverlayMsg_cameraSetup';
    } else if (cameraName == 'F_CAM') {
      span.id = 'thinkX_front_videoOverlayMsg_cameraSetup';
    } else if (cameraName == 'C_CAM') {
      span.id = 'thinkX_additional_videoOverlayMsg_cameraSetup';
    }
    span.textContent = message;

    overlayWrapper.appendChild(span);
    container.appendChild(overlayWrapper);
  }

  getCameraKeyName() {
    if (this.camType == 'S_CAM') {
      return 'SIDE';
    } else if (this.camType == 'B_CAM') {
      return 'BACK';
    } else if (this.camType == 'F_CAM') {
      return 'FRONT';
    } else if (this.camType == 'C_CAM') {
      return 'CUSTOM';
    } else {
      return '';
    }
  }
  retryHeadingName() {
    if (this.additionalCameraDismiss === true) {
      // flag true means camera dismissed
      if (this.camType == 'S_CAM') {
        return 'additionalSideCameraDismiss';
      } else if (this.camType == 'B_CAM') {
        return 'additionalBackCameraDismiss';
      } else if (this.camType == 'F_CAM') {
        return 'additionalFrontCameraDismiss';
      } else {
        return 'additionalCameraDismiss';
      }
    } else {
      if (this.camType == 'S_CAM') {
        return 'additionalSideCameraDisconnect';
      } else if (this.camType == 'B_CAM') {
        return 'additionalBackCameraDisconnect';
      } else if (this.camType == 'F_CAM') {
        return 'additionalFrontCameraDisconnect';
      } else {
        return 'additionalCameraDisconnect';
      }
    }
  }
  retryMessageName() {
    if (this.additionalCameraDismiss == true) {
      this.additionalCameraDismiss = false; //flag false after use
      return 'cameraDismissed'; //camera dismissed
    } else {
      return 'cameraDisconnected';
    }
  }

  checkExternalCamStream() {
    let sideStream = LiveStreamManager.CAMERA.SIDE.stream;
    let backStream = LiveStreamManager.CAMERA.BACK.stream;
    let frontStream = LiveStreamManager.CAMERA.FRONT.stream;
    let customStream = LiveStreamManager.CAMERA.CUSTOM.stream;
    const sideEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
    const backEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
    const frontEnable =
      configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
    const customEnable =
      configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
    if (!sideStream?.active && sideEnable) {
      return 'SIDE';
    } else if (!backStream?.active && backEnable) {
      return 'BACK';
    } else if (!frontStream?.active && frontEnable) {
      return 'FRONT';
    }else if (!customStream?.active && customEnable) {
      return 'CUSTOM';
    } else {
      return '';
    }
  }
  getQrStepName(): string {
    let alias: string = '';
    if (this.camType == 'S_CAM') {
      alias = 'Side_Camera';
    } else if (this.camType == 'B_CAM') {
      alias = 'Back_Camera';
    } else if (this.camType == 'F_CAM') {
      alias = 'Front_Camera';
    } else if (this.camType == 'C_CAM') {
      alias = 'Custom_Camera';
    }
    return alias;
  }

  startInternalCamMonitering(cameraName: string): void {
    let cameraEnable = 0;
    let stream = null;
    if (cameraName == 'S_CAM') {
      stream = LiveStreamManager.CAMERA.SIDE.stream;
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
      if (stream != null && LiveStreamManager.CAMERA.SIDE.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
        this.sideCamAiMonitering();
      }
    } else if (cameraName == 'B_CAM') {
      stream = LiveStreamManager.CAMERA.BACK.stream;
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
      if (stream != null && LiveStreamManager.CAMERA.BACK.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
        this.backCamAiMonitering();
      }
    } else if (cameraName == 'F_CAM') {
      stream = LiveStreamManager.CAMERA.FRONT.stream;
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
      if (stream != null && LiveStreamManager.CAMERA.FRONT.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
        this.frontCamAiMonitering();
      }
    }else if (cameraName == 'C_CAM') {
      stream = LiveStreamManager.CAMERA.CUSTOM.stream;
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
      if (stream != null && LiveStreamManager.CAMERA.CUSTOM.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
      }
    }
  }
  externalCameraMonitoring(): void {
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
      this.sideCamAiMonitering();
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
      this.backCamAiMonitering();
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
      this.frontCamAiMonitering();
    }
  }

  startSnapAndRecording(cameraName: string) {
    let key = '';
    if (cameraName == 'S_CAM') {
      key = 'SIDE';
    } else if (cameraName == 'B_CAM') {
      key = 'BACK';
    } else if (cameraName == 'F_CAM') {
      key = 'FRONT';
    } else if (cameraName == 'C_CAM') {
      key = 'CUSTOM';
    } else {
      key = 'PRIMARY';
    }
    // if (configrationManager.image_recording == 1) {
    //   regularSnap.takeSnapImage(LiveStreamManager.CAMERA[key]);
    // }
    if (configrationManager.video_recording == 1) {
      liveStreamManager.record(LiveStreamManager.CAMERA[key]);
    }
  }

  uniqueUfmObject(camType: string) {
    const data = configrationManager.valueMap.ufm.data;
    if (camType == 'SIDE') {
      const keys = this.ufmSide.ALL_UFM;
      for (const key of keys) {
        if (data[key]?.value == 1) {
          (this.ufmSide as any)[key] = true;
        }
      }
      this.ufmSide.CHAIR = 100;
      this.ufmSide.PHONE = 2;
      this.ufmSide.FM = false;
    } else if (camType == 'BACK') {
      const keys = this.ufmBack.ALL_UFM;
      for (const key of keys) {
        if (data[key]?.value == 1) {
          (this.ufmBack as any)[key] = true;
        }
      }
      this.ufmBack.CHAIR = 100;
      this.ufmBack.PHONE = 2;
      this.ufmBack.FM = false;
    } else if (camType == 'FRONT') {
      const keys = this.ufmFront.ALL_UFM;
      for (const key of keys) {
        if (data[key]?.value == 1) {
          (this.ufmFront as any)[key] = true;
        }
      }
      this.ufmFront.CHAIR = 100;
      this.ufmFront.PHONE = 2;
      this.ufmFront.FM = false;
    } else {
      const keys = this.ufm.ALL_UFM;
      for (const key of keys) {
        utility.log(key, data[key]?.value);
        if (data[key]?.value == 1) {
          (this.ufm as any)[key] = true;
        }
      }
      this.ufm.CHAIR = 100;
    }
  }

  async sideCamAiMonitering(): Promise<any> {
    return new Promise((resolve) => {
      this.uniqueUfmObject('SIDE');
      const stream = LiveStreamManager.CAMERA.SIDE.stream;
      if (stream) {
        const video = this.setStream(stream);
        video.play();

        let lastCode: number | null = null;
        let repeatCount = 0;
        utility.log('Starting monitering AI for side camera');
        ai.secondaryCameraSideMonitoring(video, (message: any, image: any) => {
          utility.log(message, 'Side monitering AI');
          let code = message.status_code;
          if(code == 180){
              code = 168; // treat no laptop/monitor detected same
          }
          // ---- Check for repeat codes ----
          if (code === lastCode) {
            repeatCount++;
          } else {
            repeatCount = 1; // reset
            lastCode = code;
          }
          if (code == 168) { // no laptop detected
            //this.speakAI(message);
            if (repeatCount >= 5) {
              this.cameraReSetup('SIDE');
              repeatCount = 0; // reset after action
              lastCode = null;
            }
          } else if (code === 165 || code === 166 || code === 167) {
            this.logUfmData(message, image, 'S_CAM');
          }
        });
      }
    });
  }

  async backCamAiMonitering() {
    return new Promise((resolve) => {
      this.uniqueUfmObject('BACK');
      const stream = LiveStreamManager.CAMERA.BACK.stream;
      if (stream) {
        const video = this.setStream(stream);
        video.play();
        
          let lastCode: number | null = null;
          let repeatCount = 0;
          utility.log('Starting monitering AI for Back camera');
          ai.secondaryCameraBackMonitoring(video, (message: any, image: any) => {
            utility.log(message, 'Back monitering AI');
            let code = message.status_code;
            if(code == 180){
              code = 168; // treat no laptop/monitor detected same
            }
            // ---- Check for repeat codes ----
            if (code === lastCode) {
              repeatCount++;
            } else {
              repeatCount = 1; 
              lastCode = code;
            }
            if (code == 168) {  // no laptop detected
              //this.speakAI(message);
              if (repeatCount >= 5) {
                this.cameraReSetup('BACK');
                repeatCount = 0; 
                lastCode = null;
              }
            } else if (code === 165 || code === 166 || code === 167) {
              this.logUfmData(message, image, 'B_CAM');
            }
          });
      }
    });
  }
  async frontCamAiMonitering() {
    return new Promise((resolve) => {
      this.uniqueUfmObject('FRONT');
      const stream = LiveStreamManager.CAMERA.FRONT.stream;
      if (stream) {
        const video = this.setStream(stream);
        video.play();
          let lastCode: number | null = null;
          let repeatCount = 0;
          utility.log('Starting monitering AI for Front camera');
          ai.secondaryCameraFrontMonitoring(video, (message: any, image: any) => {
            utility.log(message, 'Front monitering AI');
            let code = message.status_code;
            if(code == 180){
              code = 168; // treat no laptop/monitor detected same
            }
            // ---- Check for repeat codes ----
            if (code === lastCode) {
              repeatCount++;
            } else {
              repeatCount = 1; // reset
              lastCode = code;
            }
            if (
              // code == 156 ||
              // code == 157 ||
              // code == 158 ||
              // code == 159 ||
              // code == 160 ||
              // code == 161 ||
              code == 168) {
              //this.speakAI(message);
              if (repeatCount >= 5) {
                this.cameraReSetup('FRONT');
                repeatCount = 0; // reset after action
                lastCode = null;
              }
              //Go closer, Get away, Move left, Move right, Move up, Move down,
              // no laptop detected
            } else if (code === 165 || code === 166 || code === 167) {
              this.logUfmData(message, image, 'F_CAM');
            }
          });
      }
    });
  }

  speakAI(message: any): void {
    let instructionMsg1 = message.message + ' ' + JSON.stringify(message.detections);
    this.showTextAndAudio(instructionMsg1, true, this.socketuserID, 'cam_setup_audioText');
  }

  async logUfmData(message: any, image: any, cameraName: string): Promise<void> {
    //165 - secondary camera monitoring violation: invalid object(s) detected
    //166 - violation: invalid position
    //167 - no person detected
  //  let instructionMsg2 = message.message + ' ' + JSON.stringify(message.detections);
  //  this.showTextAndAudio(instructionMsg2, true, this.socketuserID, 'cam_setup_audioText');
   image =  await utility.convertBase64PngToCompressedBase64Jpg(image);
    const imageBlob = utility.base64ToBlob(image);

    if (cameraName == 'S_CAM') {
      this.ufmSide.log(
        message.detections,
        this.envAlias,
        1,
        cameraName,
        imageBlob,
        message.status_code
      );
    } else if (cameraName == 'B_CAM') {
      this.ufmBack.log(
        message.detections,
        this.envAlias,
        1,
        cameraName,
        imageBlob,
        message.status_code
      );
    } else if (cameraName == 'F_CAM') {
      this.ufmFront.log(
        message.detections,
        this.envAlias,
        1,
        cameraName,
        imageBlob,
        message.status_code
      );
    }
  }

  cameraReSetup(CAM_KEY: string): void {
    if (configrationManager.currentStepObject) {
      if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
        this.additionalCameraDismiss = true;
        LiveStreamManager.CAMERA[CAM_KEY].stream = null;
        configrationManager.currentStepObject.cameraRevoke();
      } else {
        let message = { mode: 'additional_camera_dismiss', text: 'additional camera dismiss' };
        socket.sendMessage(this.socketuserID, message);
        stepUIManager.closeApplicationUI();
      }
    }
  }

  stopSnap(camType: string): void {
    if (configrationManager.image_recording == 1) {
      if (camType == 'all') {
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SIDE.name);
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.BACK.name);
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.FRONT.name);
      } else {
        if (camType == 'P_CAM') {
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);
        }
        if (camType == 'S_CAM') {
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SIDE.name);
        }
        if (camType == 'B_CAM') {
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.BACK.name);
        }
        if (camType == 'F_CAM') {
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.FRONT.name);
        }
        if (camType == 'C_CAM') {
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.CUSTOM.name);
        }
      }
    }
  }
  stopRecording(camType: string): void {
    if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
      if (camType == 'all') {
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SIDE);
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.BACK);
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.FRONT);
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.CUSTOM);
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
      } else {
        if (camType == 'P_CAM') {
          liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
        }
        if (camType == 'S_CAM') {
          liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SIDE);
        }
        if (camType == 'B_CAM') {
          liveStreamManager.stopRecord(LiveStreamManager.CAMERA.BACK);
        }
        if (camType == 'F_CAM') {
          liveStreamManager.stopRecord(LiveStreamManager.CAMERA.FRONT);
        }
        if (camType == 'C_CAM') {
          liveStreamManager.stopRecord(LiveStreamManager.CAMERA.CUSTOM);
        }
        if (camType == 'SR_CAM') {
          liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
        }
        this.recordingCamStarted = false;
      }
    }
  }

  stopAiMonitoring(): void {
    ai.stopSecondaryCameraSideMonitoring((msg: any) => utility.log(msg, 'stop_side_Monitoring AI'));
    ai.stopSecondaryCameraBackMonitoring((msg: any) => utility.log(msg, 'stop_back_Monitoring AI'));
    ai.stopSecondaryCameraFrontMonitoring((msg: any) =>
      utility.log(msg, 'stop_front_Monitoring AI')
    );
    ai.stopExamination((msg: any) => utility.log(msg, 'stop_examination_Monitoring AI'));
    this.stopAllUfm();
  }

  stopAllUfm(): void {
    utility.wait(1000).then(() => {
      const data = configrationManager.valueMap.ufm.data;
      const keys = this.ufm.ALL_UFM;
      for (const key of keys) {
        (this.ufm as any)[key] = false;
        (this.ufmSide as any)[key] = false;
        (this.ufmBack as any)[key] = false;
        (this.ufmFront as any)[key] = false;
        utility.log(key, (this.ufm as any)[key]);
      }
    });
  }

  // Play/restart all UFM features based on config values
  playAllUfm(): void {
    if (this.isExamPaused == true) {
      return;
    }
    const data = configrationManager.valueMap.ufm.data;
    const keys = this.ufm.ALL_UFM;
    for (const key of keys) {
      if (data[key]?.value === 1) {
        (this.ufm as any)[key] = true; // 👈 bypasses TypeScript checks
        (this.ufmSide as any)[key] = true;
        (this.ufmBack as any)[key] = true;
        (this.ufmFront as any)[key] = true;
        utility.log(key, (this.ufm as any)[key]);
      }
    }
  }

  startInternalCamAI() {
    let cameraEnable = 0;
      cameraEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
      if (LiveStreamManager.CAMERA.SIDE.external === false && cameraEnable) {
        this.sideCamAiMonitering();
      }
      cameraEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
      if (LiveStreamManager.CAMERA.BACK.external === false && cameraEnable) {
        this.backCamAiMonitering();
      }
      cameraEnable = configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
      if (LiveStreamManager.CAMERA.FRONT.external === false && cameraEnable) {
        this.frontCamAiMonitering();
      }
  }

  startExternalSnapAndRecording(): void {
    let key = '';
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
      key = 'SIDE';
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
      key = 'BACK';
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
      key = 'FRONT';
    }else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
      key = 'CUSTOM';
    } else {
      key = 'PRIMARY';
    }
    if (configrationManager.image_recording == 1) {
      regularSnap.takeSnapImage(LiveStreamManager.CAMERA[key]);
    }
    if (configrationManager.video_recording == 1) {
      liveStreamManager.record(LiveStreamManager.CAMERA[key]);
    }
  }

  startInternalCamSnapAndRecording(cameraName: string): void {
    let cameraEnable = 0;
    if (cameraName == 'S_CAM') {
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam;
      if (LiveStreamManager.CAMERA.SIDE.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
      }
    } else if (cameraName == 'B_CAM') {
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam;
      if (LiveStreamManager.CAMERA.BACK.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
      }
    } else if (cameraName == 'F_CAM') {
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam;
      if (LiveStreamManager.CAMERA.FRONT.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
      }
    }else if (cameraName == 'C_CAM') {
      cameraEnable =
        configrationManager.valueMap.additional_cam.data.live_custom_cam.value;
      if (LiveStreamManager.CAMERA.CUSTOM.external === false && cameraEnable) {
        this.startSnapAndRecording(cameraName);
      }
    }
  }

  async primaryCameraAiMonitoring(): Promise<void> {
    this.uniqueUfmObject('PRIMARY');
    utility.log('Starting monitering AI for Primary camera');
    return new Promise(async (resolve) => {
      utility.log('Exam Monitor AI start');
        const stream = LiveStreamManager.CAMERA.PRIMARY.stream;
        if (stream) {
          const video = this.setStream(stream);
          video.play();
          // ai.examAI(video, async (message: any) => {
          //   utility.log(message, 'Exam Monitor AI Running...');
          //   if (message.image != '') {
          //     message.image =  await utility.convertBase64PngToCompressedBase64Jpg(message.image);
          //     const imageBlob = utility.base64ToBlob(message.image);
          //     this.ufm.log(message.od_detections, this.envAlias, 1, 'P_CAM', imageBlob, message.status_code);
          //   }
          // });
        }
    });
  }
  startStreamLoader(camType: string): void {
    if(camType == 'S_CAM'){
      this.showLoaderwithText("thinkX_side-cameraSetup-card-video");
    }else if(camType == 'B_CAM'){
      this.showLoaderwithText("thinkX_back-cameraSetup-card-video");
    }else if(camType == 'F_CAM'){
      this.showLoaderwithText("thinkX_front-cameraSetup-card-video");
    }else if(camType == 'C_CAM'){
      this.showLoaderwithText("thinkX_popup-additional-cameraSetup-card-video");
    }
  }
  showLoaderwithText(id:string): void {
      const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
      stepUIManager.setLoader(loaderHTML, id);
    }
  
  hideLoaderwithText(): void {
      const existingLoader = ui.id('thinkX_loadingwithText');
      if (existingLoader && existingLoader.parentNode) {
        existingLoader.parentNode.removeChild(existingLoader);
      }
    }
  

}

export const examCameraUi = new ExamCameraSetupUI();
