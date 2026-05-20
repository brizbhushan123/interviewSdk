import { configrationManager } from '../../core/ConfigrationManager';
import { liveStreamManager, LiveStreamManager } from '../../core/LiveStreamManager';
import { regularSnap } from '../../core/RegularSnap';
import request from '../../core/RequestManager';
import { socket } from '../../core/SocketManager';
import { stepManager } from '../../core/StepsManager';
import { stepUIManager } from '../../core/StepUIManager';
import { textToSpeech } from '../../core/TextToSpeech';
import utility from '../../core/Utility';
import { UiComponents } from '../UiComponents';
import { uiEvents } from '../UiEvents';
import ui from '../UiManager';

/**
 *
 */
class RoomUI {
  /**
   *
   * @param stream
   */
  private qrStatusInterval: any = null;
  setStream(stream: MediaStream) {
    const videoDivDom = ui.id('thinkX_room-card-video');
    const video = ui.createVideoElement();
    video.srcObject = stream;
    // video.muted = true;
    if (videoDivDom) {
      const existingVideos = videoDivDom.querySelectorAll('video');
      existingVideos.forEach((v) => v.remove());
    }

    videoDivDom?.append(video);
    return video;
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
  /**
   *
   * @param message
   */
  setMessage(message: string) {
    const resultDiv = ui.id('room-card-message');
    if (resultDiv) {
      ui.innerText(resultDiv, `${message}`);
    }
  }

  /**
   *
   *
   */
  hideVideoDiv(id: string) {
    const removeClass = ui.id(id);
    if (removeClass) {
      ui.removeClass(removeClass, 'threeSixtyStart');
      ui.removeClass(removeClass, 'complete');
      ui.addClass(removeClass, 'ufmRoom');
    }
    ui.hide(ui.id('thinkX_room-card-video'));
  }

  /**
   *
   *
   */
  showUfmDiv() {
    ui.show(ui.id('thinkX_threeSixtyUfm'));
    ui.show(ui.id('thinkproc-room-scan-data'));
    ui.show(ui.id('thinkX_threeSixtyRescanBtn'));
    const rescanID = ui.id('thinkX_threeSixtyRescanBtn');
    if (LiveStreamManager.CAMERA.ROOM.external == true && configrationManager.currentStepAlias !== 'Body_Scan_Check') {
      if (rescanID) {
        ui.addClass(rescanID, 'thinkproc-disable');
      }
    } else {
      if (rescanID) {
        ui.removeClass(rescanID, 'thinkproc-disable');
      }
    }
    ui.show(ui.id('thinkX_issueFound'));
    ui.hide(ui.id('room-card-message'));
  }

  /**
   *
   *@param imageUrls
   */
  createUfmImg(imageData: { path: string; ufm_name: string }[]): void {
    const container = ui.id('thinkX_ufmContainer');

    if (!container) {
      utility.error('UFM container not found.');
      return;
    }

    container.innerHTML = '';

    imageData.forEach((item) => {
      const wrapper = document.createElement('div');

      const imgWrap = document.createElement('div');
      imgWrap.className = 'thinkpro-issue-image-wrap';

      const img = document.createElement('img');
      img.src = item.path;
      img.alt = 'Room UFM Image';

      const label = document.createElement('div');
      label.className = 'thinkproc-room-issue-name';
      label.textContent = item.ufm_name || 'No Name';

      imgWrap.appendChild(img);
      wrapper.appendChild(imgWrap);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

    ui.show(ui.id('thinkX_ufmContainer'));
  }

  /**
   *
   *@param message
   */
  showOverlayMessage(message: string): void {
    const container = ui.id('thinkX_room-card-video');
    if (!container) return;

    const existing = container.querySelector('.video-overlay-message');
    if (existing) existing.remove();

    const overlayWrapper = document.createElement('div');
    overlayWrapper.className = 'video-overlay-message';

    const span = document.createElement('span');
    span.id = 'thinkX_videoOverlayMsg';
    span.textContent = message;

    overlayWrapper.appendChild(span);
    container.appendChild(overlayWrapper);
  }

  clearOverlayMessage(): void {
    const existing = ui.id('thinkX_videoOverlayMsg');
    if (existing) existing.remove();
  }

  /**
   *
   */
  hideOverlayMessage(): void {
    const overlay = ui.id('thinkX_videoOverlayMsg');
    if (overlay) overlay.remove();
  }

  /**
   *
   */
  resetDiv() {
    ui.show(ui.id('thinkX_room-card-video'));
    ui.hide(ui.id('thinkX_threeSixtyUfm'));
    ui.hide(ui.id('thinkproc-room-scan-data'));
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.hide(ui.id('thinkX_issueFound'));
  }

  async loadSecondaryCamerasOnly(): Promise<void> {
    try {
      const currentDeviceId = LiveStreamManager.CAMERA.PRIMARY.videoDeviceIN;
      const devices = await liveStreamManager.getMediaDevices();
      const secRetryIcon = ui.id('thinkX_secondaryCamRetryIcon');
      const allowBtn = ui.id('thinkX_roomCameraAllowBtn') as HTMLButtonElement;

      if (devices && typeof devices !== 'boolean') {
        const videoDevices = devices.video;
        const secondaryDevices = videoDevices.filter(
          (device) => device.deviceId !== currentDeviceId
        );

        ui.show(ui.id('thinkproc-roomCamereSelectWrap'));

        const options = secondaryDevices.map((cam: MediaDeviceInfo, i: number) => ({
          value: cam.deviceId || `${i}`,
          label: cam.label || `Camera Device ${i + 1}`,
        }));

        utility.log(options.length, 'option length1111');
        if (options.length > 0) {
          stepUIManager.initAndUpdateCustomSelectById(
            'thinkX_roomCameraSelect',
            options,
            options[0]?.value
          );

          if (secRetryIcon) {
            ui.hide(secRetryIcon);
          }

          if (allowBtn) {
            allowBtn.disabled = false;
            ui.removeClass(allowBtn, 'thinkproc-disable');
          }
        } else {
          stepUIManager.initAndUpdateCustomSelectById(
            'thinkX_roomCameraSelect',
            [{ value: '', label: ui.translations.status.no_camera_found }],
            ''
          );

          if (secRetryIcon) {
            ui.show(secRetryIcon);

            // Prevent attaching the click multiple times
            if (!secRetryIcon.dataset.binded) {
              ui.click(secRetryIcon, async () => {
                await this.retryRoomSecCamera();
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

  async retryRoomSecCamera(): Promise<void> {
    try {
      const currentDeviceId = LiveStreamManager.CAMERA.PRIMARY.videoDeviceIN;
      const devices = await liveStreamManager.getMediaDevices();

      const secRetryIcon = ui.id('thinkX_secondaryCamRetryIcon');
      const reloadIconSecCam = ui.id('thinkX_reloadIconSecCam');
      const allowBtn = ui.id('thinkX_roomCameraAllowBtn') as HTMLButtonElement;
      if (reloadIconSecCam) {
        ui.addClass(reloadIconSecCam, 'iconRotate');
      }

      if (devices && typeof devices !== 'boolean') {
        const videoDevices = devices.video;
        const secondaryDevices = videoDevices.filter(
          (device) => device.deviceId !== currentDeviceId
        );

        const options = secondaryDevices.map((cam: MediaDeviceInfo, i: number) => ({
          value: cam.deviceId || `${i}`,
          label: cam.label || `Camera Device ${i + 1}`,
        }));

        utility.log(options.length, 'option length2222');
        if (options.length > 0) {
          uiEvents.setOptions('thinkX_roomCameraSelect', options, options[0]?.value);
          utility.log(options.length, 'option lengthss3333');
          if (secRetryIcon) {
            ui.hide(secRetryIcon);
          }
          if (allowBtn) {
            allowBtn.disabled = false;
            ui.removeClass(allowBtn, 'thinkproc-disable');
          }
        } else {
          uiEvents.setOptions(
            'thinkX_roomCameraSelect',
            [{ value: '', label: ui.translations.status.no_camera_found }],
            ''
          );

          if (secRetryIcon) {
            ui.show(secRetryIcon);
          }
        }
      } else {
        uiEvents.setOptions(
          'thinkX_roomCameraSelect',
          [{ value: '', label: ui.translations.status.cameraAccessDenied }],
          ''
        );
      }

      if (reloadIconSecCam) {
        utility.wait(3000).then(() => {
          ui.removeClass(reloadIconSecCam, 'iconRotate');
        });
      }
    } catch (err) {
      utility.error('Retry failed to load secondary camera devices:', err);
      uiEvents.setOptions(
        'thinkX_roomCameraSelect',
        [{ value: '', label: ui.translations.status.cameraAccessDenied }],
        ''
      );
    }
  }

  showCameraSelectPage() {
    ui.hide(ui.id('thinkX_instruction_start'));
    ui.show(ui.id('thinkX_QR_dropdown'));
    ui.hide(ui.id('thinkX_threeSixtyRoomScan'));
    const addClass = ui.id('thinkproc_body_room');
    if (addClass) {
      ui.addClass(addClass, 'h100');
    }
  }

  hideCameraSelectPage() {
    ui.hide(ui.id('thinkX_QR_dropdown'));
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
  }

  resizeBase64Image(base64Str: string, newWidth = 640, newHeight = 480): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const resizeCanvas = document.createElement('canvas');
        resizeCanvas.width = newWidth;
        resizeCanvas.height = newHeight;

        const ctx = resizeCanvas.getContext('2d');
        if (!ctx) {
          reject('Unable to get canvas context');
          return;
        }

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const resizedBase64 = resizeCanvas.toDataURL('image/png');
        resolve(resizedBase64);
      };

      img.onerror = (err) => reject('Image load failed: ' + err);
      img.src = base64Str;
    });
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
          img.className = 'thinkproc-qrimg';
          img.style.maxWidth = '100%'; // Optional styling

          // Append to the container with ID "thinkproc-qrimage"
          const container = ui.id('thinkX_qrCode');
          if (container) {
            container.innerHTML = ''; // Clear previous content
            container.appendChild(img);
          } else {
            utility.log('❌ QR image container not found');
          }
          this.hideLoader();
        } else {
          utility.log('❌ QR code generation failed or SVG missing', response);
        }
      })
      .catch((error) => {
        utility.log('❌ QR code request failed', error);
      });
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
    utility.log('TEXT SHOWING 1', text);
    roomUI.showOverlayMessage(text);
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

  setAttemptData(attemptNo: number, step: number) {
    this.stopQrStatusCheck();
    if (step == 1) {
      const addClass = ui.id('thinkX_threeSixtyStart');
      if (addClass) {
        ui.addClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
      }
    }
    if (step == 2) {
      const addClass = ui.id('thinkX_DeskScan');
      if (addClass) {
        ui.addClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
      }
    }
    if (step == 3) {
      const addClass = ui.id('thinkX_BodyScan');
      if (addClass) {
        ui.addClass(addClass, 'threeSixtyStart');
        ui.removeClass(addClass, 'complete');
        ui.removeClass(addClass, 'ufmRoom');
      }
    }
    this.updateAttempt(attemptNo);
  }

  updateAttempt(attemptNo: number) {
    if (configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san_attempt.value > 1) {
      const roomAttemptCount =
        configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san_attempt
          .value;
      ui.show(ui.id('thinkX_roomRight'));
      stepUIManager.insertText('thinkX_roomAttempt', attemptNo.toString());
      stepUIManager.insertText('thinkX_maxRoomAttempt', '/' + roomAttemptCount.toString());
    }
  }

  showHeaderAndLoader(text: string) {
    const roomScanBody = ui.id('thinkX_threeSixtyRoomScan');
    if (roomScanBody) {
      ui.addClass(roomScanBody, 'thinkproc-roomScanFail');
    }
    ui.hide(ui.id('thinkX_roomScanHeader'));
    ui.show(ui.id('thinkX_roomfail'));
    ui.show(ui.id('thinkproc-room-scan-data'));
    ui.show(ui.id('thinkX_roomErrorFail'));
    stepUIManager.insertText('thinkX_verification', text);
  }

  showHeaderAndLoaderProctor(text: string) {
    ui.hide(ui.id('thinkX_roomScanHeader'));
    ui.show(ui.id('thinkX_roomfail'));
    ui.show(ui.id('thinkX_loadingEscalted'));
    stepUIManager.insertText('thinkX_verification', text);
  }

  showWaitLoader(text: string) {
    const roomScanBody = ui.id('thinkX_threeSixtyRoomScan');
    if (roomScanBody) {
      ui.addClass(roomScanBody, 'thinkpro_roomFullHeight');
    }
    ui.hide(ui.id('thinkX_threeSixtyUfm'));
    ui.hide(ui.id('thinkX_roomScanHeader'));
    ui.show(ui.id('thinkX_roomfail'));
    ui.show(ui.id('thinkX_wait'));
    stepUIManager.insertText('thinkX_verification', text);
  }

  showcloseLoader(text: string) {
    const roomScanBody = ui.id('thinkX_threeSixtyRoomScan');
    if (roomScanBody) {
      ui.addClass(roomScanBody, 'thinkproc-roomScanFail');
    }
    ui.show(ui.id('thinkX_threeSixtyUfm'));
    ui.hide(ui.id('thinkX_roomScanHeader'));
    ui.show(ui.id('thinkX_roomfail'));
    ui.show(ui.id('thinkX_roomErrorFail'));
    ui.hide(ui.id('thinkX_roomUFMList'));
    stepUIManager.insertText('thinkX_verification', text);
  }

  bodyScanHeader() {
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    const retryBtn = ui.id('thinkX_threeSixtyRescanBtn');
    const closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
    if (retryBtn) {
      ui.removeClass(retryBtn, 'thinkproc-disable');
    }
    if (closeBtn) {
      ui.removeClass(closeBtn, 'thinkproc-disable');
    }
    stepUIManager.insertText('thinkX-roomTitle', ui.translations.roomSanitization.bodyScan);
    stepUIManager.insertText('thinkX-roomSubTitle', ui.translations.roomSanitization.bodySubtitle);
    stepUIManager.insertText('thinkX_roomStep', '3');
    this.setAttemptData(configrationManager.roomAttemptNo, 3);
  }

  deskScanHeader() {
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    stepUIManager.insertText('thinkX-roomTitle', ui.translations.desk.desktitle);
    stepUIManager.insertText('thinkX-roomSubTitle', ui.translations.desk.deskSubTitle);
    stepUIManager.insertText('thinkX_roomStep', '2');
    this.setAttemptData(configrationManager.roomAttemptNo, 2);
  }

  hideDeskPopup() {
    ui.hide(ui.id('thinkX_micRetryDesk'));
    ui.hide(ui.id('thinkX_deskPopup'));
  }

  async showQrPage(allowclickCallback: Function, step: string) {
    roomUI.resetDiv();
    let camType = 'RS_CAM';
    roomUI.getQRData(camType, step);

    if (this.qrStatusInterval) {
      clearInterval(this.qrStatusInterval);
    }
    // Set interval to check status every 5 seconds
    this.qrStatusInterval = setInterval(async () => {
      try {
        const response = await request.checkCurrentQRstatus({
          camera_type: camType,
          environment: step,
        });

        if (response.data.status === 'EXPIRE') {
          this.getQRData(camType, step);
        }
      } catch (error) {
        utility.log('QR code status request failed', error);
      }
    }, 5000);

    roomUI.showCameraSelectPage();

    await roomUI.loadSecondaryCamerasOnly();
    const select = ui.id('thinkX_roomCameraSelect') as HTMLSelectElement;
    const allowBtn = ui.id('thinkX_roomCameraAllowBtn') as HTMLButtonElement;
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
        utility.log(select, 'asdsadasd');
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

  async roomStart360(callback: Function, cameraID: string = '') {
    if (!cameraID && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      utility.log('No camera selected.');
      return;
    }
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      liveStreamManager.isValidDeviceId(cameraID, 'videoinput').then(async (response) => {
        utility.log('camera revoke', response);
        if (response == true) {
          liveStreamManager.setCameraDeviceId(LiveStreamManager.CAMERA.ROOM, cameraID);
          LiveStreamManager.CAMERA.ROOM.label = cameraID;
          const stream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.ROOM);
          if (configrationManager.image_recording == 1) {
            regularSnap.takeSnapImage(LiveStreamManager.CAMERA.ROOM);
          }

          // const stream = await this.getStreamByDeviceId(this.selectedCameraId);
          if (!stream) {
            utility.log('Could not get stream for selected camera.');
            return;
          } else {
            callback(stream.stream);
          }
        } else {
          callback();
        }
      });
    } else if (LiveStreamManager.CAMERA.ROOM.stream) {
      callback(LiveStreamManager.CAMERA.ROOM.stream);
    }
  }

  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_qrCode');
  }

  hideLoader(): void {
    const existingLoader = ui.id('thinkX_loading');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }

  deskBedPopupResult() {
    const selected = ui.querySelector(`input[name="deskIssue"]:checked`);
    return selected ? selected.id : null;
  }

  getDeskIssueDescription() {
    const textarea = ui.id('thinkX_deskDesc') as HTMLTextAreaElement | null;
    return textarea ? textarea.value.trim() : '';
  }

  deskTextCount(){
    const span = ui.id('thinkproc_textCount') as HTMLSpanElement | null;
    return span ? span.textContent?.trim() || '' : '';
  }

  setPopupData(message: Record<string, any>) {
    let radio = ui.id(message?.data?.radio);
    if (radio) {
      (radio as HTMLInputElement).disabled = false;
      radio.click();
      (radio as HTMLInputElement).disabled = true;
    }

    const deskDescElem = ui.id('thinkX_deskDesc');
    if (deskDescElem && 'value' in deskDescElem) {
      (deskDescElem as HTMLTextAreaElement).value = message?.data?.text;
    }

    const deskTextCount = ui.id('thinkproc_textCount');
    if (deskTextCount) {
      deskTextCount.textContent = String(message?.data?.textCount || 0);
    }
  }

  validateDeskIssueForm() {
    const selectedRadio = ui.querySelector('input[name="deskIssue"]:checked');
    const deskDesc = (ui.id('thinkX_deskDesc') as HTMLTextAreaElement | null)?.value.trim() || '';
    const scanNowBtn = ui.id('thinkX_micRetryDesk') as HTMLButtonElement | null;

    if (scanNowBtn) {
      if (selectedRadio && deskDesc.length > 0) {
        scanNowBtn.disabled = false;
      } else {
        scanNowBtn.disabled = true;
      }
    }
  }

  rejectView(message: string) {
    const roomScanBody = ui.id('thinkX_threeSixtyRoomScan');
    if (roomScanBody) {
      ui.addClass(roomScanBody, 'thinkpro_roomFullHeight');
    }
    ui.hide(ui.id('thinkX_threeSixtyUfm'));
    ui.hide(ui.id('thinkX_roomScanHeader'));
    ui.show(ui.id('thinkX_roomfail'));
    ui.show(ui.id('thinkX_roomErrorFail'));
    ui.hide(ui.id('thinkX_loadingEscalted'));
    ui.show(ui.id('thinkX_threeSixtyUfm'));
    stepUIManager.insertText('thinkX_verification', ui.translations.status.rejectRoomText);
  }

  completeView(completeText: string, completeHeader: string) {
    ui.show(ui.id('thinkX_roomSuccess'));
    ui.hide(ui.id('thinkproc-room-scan-data'));
    stepUIManager.insertText('thinkX_roomScanFinish', completeText);
    stepUIManager.insertText('thinkX_proceeding', completeHeader);
  }

  // Room Scan Percentage
  updatePercentageCircle(value: number): void {
    ui.show(ui.id('thinkX_percentageBox'));
    const circle = ui.querySelector('.thinkproc_percentageCircle')!;
    const end = ui.querySelector('.thinkproc_percentageCircle .thinkproc_end')!;
    const percentText = ui.id('thinkproc_percentValue')!;

    if (!circle || !end || !percentText) {
      console.error("Required DOM elements not found");
      return;
    }
    let currentValue: number = parseInt(percentText.textContent || "0", 10) || 0;
    const targetValue: number = Math.floor(value);
    let animationFrame: number;

    function animate(): void {
      if (currentValue < targetValue) {
        currentValue += 1;
      } else if (currentValue > targetValue) {
        currentValue -= 1;
      } else {
        cancelAnimationFrame(animationFrame);
        return;
      }

      const angle: number = (currentValue / 100) * 360;

      circle.style.background = `conic-gradient(
        #f5f5f54d 0deg,
        #f5f5f54d ${angle}deg,
        transparent ${angle}deg,
        transparent 360deg
      )`;

      end.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
      percentText.textContent = `${currentValue}%`;

      animationFrame = requestAnimationFrame(animate);
    }

    animate();
  }
}

export const roomUI = new RoomUI();
