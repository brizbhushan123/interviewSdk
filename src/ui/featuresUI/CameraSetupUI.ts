import { string } from "@tensorflow/tfjs";
import { configrationManager } from "../../core/ConfigrationManager";
import { liveStreamManager, LiveStreamManager } from "../../core/LiveStreamManager";
import request from "../../core/RequestManager";
import { socket } from "../../core/SocketManager";
import { stepUIManager } from "../../core/StepUIManager";
import { textToSpeech } from "../../core/TextToSpeech";
import utility from "../../core/Utility";
import { UiComponents } from "../UiComponents";
import { uiEvents } from "../UiEvents";
import ui from "../UiManager";


class CameraSetupUI {

  cameraSetupDivID:string = 'thinkX_cameraSetup-card-video';
  private qrStatusInterval: any = null;

  async showQrPage(allowclickCallback: Function, step: string, camType: string) {
    ui.hide(ui.id('thinkX_cameraSetup_Instruction'));
    ui.hide(ui.id('thinkX_cameraSetup_box'));
    ui.show(ui.id('thinkX_QR_camSetup'));

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
    const select = ui.id('thinkX_CameraSetupSelect') as HTMLSelectElement;
    const allowBtn = ui.id('thinkX_CameraSetupAllowBtn') as HTMLButtonElement;
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
        allowclickCallback(select);
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
          const container = ui.id('thinkX_qrCode_camSetup');
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
      const customDeviceId = LiveStreamManager.CAMERA.CUSTOM.videoDeviceIN;
      const devices = await liveStreamManager.getMediaDevices();
      const secRetryIcon = ui.id('thinkX_SetUpCameraRetryIcon');
      const allowBtn = ui.id('thinkX_CameraSetupAllowBtn') as HTMLButtonElement;

      if (devices && typeof devices !== 'boolean') {
        const videoDevices = devices.video;
        const secondaryDevices = videoDevices.filter(
          (device) =>
            device.deviceId !== frontDeviceId &&
            device.deviceId !== backDeviceId &&
            device.deviceId !== sideDeviceId &&
            device.deviceId !== currentDeviceId &&
            device.deviceId !== customDeviceId
        );

        ui.show(ui.id('thinkproc-setUpCameraSelectWrap'));

        const options = secondaryDevices.map((cam: MediaDeviceInfo, i: number) => ({
          value: cam.deviceId || `${i}`,
          label: cam.label || `Camera Device ${i + 1}`,
        }));
        utility.log(options.length, 'option length1');
        if (options.length > 0) {
          stepUIManager.initAndUpdateCustomSelectById(
            'thinkX_CameraSetupSelect',
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
            'thinkX_CameraSetupSelect',
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
              secRetryIcon.dataset.binded = 'true';
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
    try {
      const { PRIMARY, SIDE, FRONT, BACK, CUSTOM } = LiveStreamManager.CAMERA;
      const currentDeviceId = PRIMARY.videoDeviceIN;
      const sideDeviceId = SIDE.videoDeviceIN;
      const frontDeviceId = FRONT.videoDeviceIN;
      const backDeviceId = BACK.videoDeviceIN;
      const customDeviceId = CUSTOM.videoDeviceIN;

      const devices = await liveStreamManager.getMediaDevices();
      const reloadIconSecCam = ui.id('thinkX_reloadIconCamSetup');
      const secRetryIcon = ui.id('thinkX_SetUpCameraRetryIcon');
      const allowBtn = ui.id('thinkX_CameraSetupAllowBtn') as HTMLButtonElement;

      if (reloadIconSecCam) {
        ui.addClass(reloadIconSecCam, 'iconRotate');
      }

      if (devices && typeof devices !== 'boolean') {
        const videoDevices = devices.video || [];

        const secondaryDevices = videoDevices.filter(
          (device) =>
            ![currentDeviceId, sideDeviceId, frontDeviceId, backDeviceId, customDeviceId].includes(device.deviceId)
        );

        const options = secondaryDevices.map((cam: MediaDeviceInfo, i: number) => ({
          value: cam.deviceId || `${i}`,
          label: cam.label || `Camera Device ${i + 1}`,
        }));

        utility.log(options.length, 'Secondary camera options found');

        if (options.length > 0) {
          uiEvents.setOptions('thinkX_CameraSetupSelect', options, options[0].value);
          if (secRetryIcon) ui.hide(secRetryIcon);
          if (allowBtn) {
            allowBtn.disabled = false;
            ui.removeClass(allowBtn, 'thinkproc-disable');
          }
        } else {
          uiEvents.setOptions(
            'thinkX_CameraSetupSelect',
            [{ value: '', label: ui.translations.status.no_camera_found }],
            ''
          );
          if (secRetryIcon) ui.show(secRetryIcon);
        }
      } else {
        uiEvents.setOptions(
          'thinkX_CameraSetupSelect',
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
        'thinkX_CameraSetupSelect',
        [{ value: '', label: ui.translations.status.cameraAccessDenied }],
        ''
      );
    }
  }

  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_qrCode_camSetup');
  }

  hideLoader(): void {
    const existingLoader = ui.id('thinkX_loading');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }

  hideCameraSelectPage() {
    ui.hide(ui.id('thinkX_QR_camSetup')); // hide QR code img Page
    ui.show(ui.id('thinkX_cameraSetup_box')); //open camera frame page
  }
  hideCameraStreamPage() {
    ui.show(ui.id('thinkX_QR_camSetup')); // hide QR code img Page
    ui.hide(ui.id('thinkX_cameraSetup_box')); //open camera frame page
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
          case 'C_CAM':
            cameraRef = LiveStreamManager.CAMERA.CUSTOM;
            break;  
          default:
            cameraRef = LiveStreamManager.CAMERA.FRONT;
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
    this.showOverlayMessage(text);
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
    const existing = document.getElementById('thinkX_videoOverlayMsg_cameraSetup');
    if (existing) existing.remove();
  }

  showOverlayMessage(message: string): void {
    const container = document.getElementById(this.cameraSetupDivID);
    if (!container) return;

    const existing = container.querySelector('.video-overlay-message');
    if (existing) existing.remove();

    const overlayWrapper = document.createElement('div');
    overlayWrapper.className = 'video-overlay-message';

    const span = document.createElement('span');
    span.id = 'thinkX_videoOverlayMsg_cameraSetup';
    span.textContent = message;

    overlayWrapper.appendChild(span);
    container.appendChild(overlayWrapper);
  }

  setAttemptData(attemptNo: number, step: number) {
    this.stopQrStatusCheck();
    if (step == 1) {
      const addClass = ui.id('thinkX_sideCameraSetup_Start');
      if (addClass) {
        ui.addClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
        ui.show(ui.id('sideCamIcon'));
      }
    }
    if (step == 2) {
      const addClass = ui.id('thinkX_backCameraSetup_Start');
      if (addClass) {
        ui.addClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
        ui.hide(ui.id('sideCamIcon'));
        ui.show(ui.id('backCamIcon'));
      }
    }
    if (step == 3) {
      const addClass = ui.id('thinkX_frontCameraSetup_Start');
      if (addClass) {
        ui.addClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
        ui.hide(ui.id('sideCamIcon'));
        ui.hide(ui.id('backCamIcon'));
        ui.show(ui.id('frontCamIcon'));
      }
    }
    if (step == 4) {
      const addClass = ui.id('thinkX_additionalCameraSetup_Start');
      if (addClass) {
        ui.removeClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
        ui.hide(ui.id('sideCamIcon'));
        ui.hide(ui.id('backCamIcon'));
        ui.hide(ui.id('frontCamIcon'));
      }
    }
  }

  setStream(stream: MediaStream) {
    const videoDivDom = ui.id(this.cameraSetupDivID);
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

  setPageTitle(title: string) {
    const Element1 = ui.id('thinkX-additionalCamName');
    if (Element1) {
      ui.innerText(Element1, title);
    }
    const Element2 = ui.id('thinkX-cameraSetup-title');
    if (Element2) {
      ui.innerText(Element2, title);
    }
  }

  hideCountLabelInMobile() {
      ui.hide(ui.id('thinkX_sideCameraSetup_Start'));
      ui.hide(ui.id('thinkX_backCameraSetup_Start'));
      ui.hide(ui.id('thinkX_frontCameraSetup_Start'));
      ui.hide(ui.id('thinkX_step_count_area'));
  }
  hideInactiveCameraLabel() {
    if(configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_side_view_cam == 0){
      ui.hide(ui.id('thinkX_sideCameraSetup_Start'));
    }
    if(configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_back_view_cam == 0){
      ui.hide(ui.id('thinkX_backCameraSetup_Start'));
    }
    if(configrationManager.valueMap.additional_cam.data.ai_enable.data.ai_front_view_cam == 0){
      ui.hide(ui.id('thinkX_frontCameraSetup_Start'));
    }
    configrationManager.cameraSetupStep++;
    stepUIManager.insertText('thinkX_cameraStepupCount', configrationManager.cameraSetupStep.toString());
  }
  cameraSetupAudioText(message: any){
    ui.show(ui.id('thinkX_videoOverlayMsg_cameraSetup'));
    stepUIManager.insertText(
        'thinkX_videoOverlayMsg_cameraSetup',
        message.text
      );
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
  showSecondInstruction(callback: () => void) {
    const page = ui.id('thinkX_cameraInstructionPopup');
    const nextBtn = ui.id('thinkX_cameraInstructionPopup_next');

    if (page) ui.show(page);

    if (nextBtn) {
      ui.click(nextBtn, () => {
        ui.hide(page);
        callback();
      });
    }
  }
  

}

export const cameraSetup = new CameraSetupUI();
