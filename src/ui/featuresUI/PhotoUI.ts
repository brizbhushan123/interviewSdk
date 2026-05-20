import { environment } from '../../config/environment';
import { ai } from '../../core/AIManager';
import { configrationManager } from '../../core/ConfigrationManager';
import request from '../../core/RequestManager';
import { stepManager } from '../../core/StepsManager';
import { stepUIManager } from '../../core/StepUIManager';
import utility from '../../core/Utility';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';
import { idUi } from './IdUI';

/**
 *
 */
class PhotoUi {
  ctx: CanvasRenderingContext2D | null = null;
  pendingRendering: number | null = null;
  canvasIconArray: { [key: number]: HTMLImageElement } = {};
  captureClickAinProgress: boolean = false;

  constructor() {
    // Initialize any required properties or methods here if needed
    this.ctx = null; // Initialize this.ctx to null
  }
  /**
   *
   * @param stream
   */
  setStream(stream: MediaStream): HTMLVideoElement | undefined {
    const videoDivDom = ui.id('thinkX_photo-card-video');
    if (!videoDivDom) return;

    videoDivDom.innerHTML = ''; // Clear previous content

    // Create wrapper div
    // const wrapper = document.createElement('div');
    // wrapper.style.position = 'relative';
    // wrapper.style.display = 'inline-block';

    // Create video element
    const video = ui.createVideoElement();
    video.srcObject = stream;
    video.style.display = 'block';
    video.id = 'thinkX_photo-video';

    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.id = 'faceBoxCanvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '10';
    canvas.style.pointerEvents = 'none';

    // Resize canvas when video metadata is loaded
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });

    // Append both to wrapper
    // wrapper.appendChild(video);
    // wrapper.appendChild(canvas);

    // Append wrapper to DOM
    videoDivDom.appendChild(video);
    videoDivDom.appendChild(canvas);

    return video;
  }

  showLoaderwithText(id: string): void {
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
   */
  drawFaceBox(coordinates: any[], statusCode: number, stageComing: string) {
    // Cancel any pending rendering operations
    if (this.pendingRendering) {
      cancelAnimationFrame(this.pendingRendering);
    }

    let videoIdSelector: string;
    let canvasIdSelector: string;
    if (stageComing === 'id') {
      videoIdSelector = '#thinkX_id-card-video video';
      canvasIdSelector = 'faceBoxCanvasID';
    } else {
      videoIdSelector = '#thinkX_photo-card-video video';
      canvasIdSelector = 'faceBoxCanvas';
    }

    const canvas = ui.id(canvasIdSelector) as HTMLCanvasElement | null;
    const video = ui.querySelector(videoIdSelector) as HTMLVideoElement | null;
    if (!canvas || !video) return;

    // Clear the canvas immediately
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      utility.error('❌ Failed to get canvas context');
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Store the current rendering state
    const renderingState = {
      coordinates,
      statusCode,
      stageComing,
      video,
      canvas,
      dpr,
      ctx,
    };

    // Use requestAnimationFrame to throttle rendering
    this.pendingRendering = requestAnimationFrame(() => {
      this.drawFaceBoxInternal(renderingState);
    });
  }

  drawFaceBoxInternal(state: {
    coordinates: any[];
    statusCode: number;
    stageComing: string;
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    dpr: number;
    ctx: CanvasRenderingContext2D;
  }) {
    const { coordinates, statusCode, stageComing, video, canvas, dpr, ctx } = state;

    const displayWidth = video.clientWidth;
    const displayHeight = video.clientHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.scale(dpr, dpr);

    const widthRatio = video.videoWidth / displayWidth;
    const heightRatio = video.videoHeight / displayHeight;

    const statusMessagesMap: { [key: number]: { label: string; color: string; icon: string } } = {
      0: {
        label:
          stageComing === 'id'
            ? ui.translations.ai_label.id_not_present
            : ui.translations.ai_label.face_not_present,
        color: '#cc4441',
        icon: `${environment.UI_BASE_URL}images/error.svg`,
      },
      100: {
        label:
          stageComing === 'id'
            ? ui.translations.ai_label.id_not_present
            : ui.translations.ai_label.face_not_present,
        color: '#cc4441',
        icon: `${environment.UI_BASE_URL}images/error.svg`,
      },
      101: {
        label: ui.translations.ai_label.multiple_face,
        color: '#cc4441',
        icon: `${environment.UI_BASE_URL}images/error.svg`,
      },
      102: {
        label: ui.translations.ai_label.aligned,
        color: '#4C946A',
        icon: `${environment.UI_BASE_URL}images/info-tick.svg`,
      },
      103: {
        label: ui.translations.ai_label.come_closer,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      104: {
        label: ui.translations.ai_label.not_a_valid_id,
        color: '#cc4441',
        icon: `${environment.UI_BASE_URL}images/error.svg`,
      },
      105: {
        label: ui.translations.ai_label.aligned,
        color: '#4C946A',
        icon: `${environment.UI_BASE_URL}images/info-tick.svg`,
      },
      106: {
        label: ui.translations.ai_label.come_closer,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      107: {
        label: ui.translations.ai_label.move_to_right,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      108: {
        label: ui.translations.ai_label.move_to_left,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      109: {
        label: ui.translations.ai_label.move_down,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      110: {
        label: ui.translations.ai_label.move_up,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      150: {
        label: ui.translations.ai_label.go_away,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      151: {
        label: ui.translations.ai_label.look_into_camera,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      152: {
        label: ui.translations.ai_label.adjust_lighting,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      153: {
        label: ui.translations.ai_label.adjust_face_lighting,
        color: '#E8A13A',
        icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      },
      // 200: {
      //   label: ui.translations.ai_label.please_wait,
      //   color: '#FFD700',
      //   icon: `${environment.UI_BASE_URL}images/info-circle.svg`,
      // },
    };

    const drawRoundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    };

    const getCanvasIcon = (iconCode: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (this.canvasIconArray[iconCode]) return resolve(this.canvasIconArray[iconCode]);
        const labelIcon = new Image();
        labelIcon.src = statusMessagesMap[iconCode].icon;
        labelIcon.onload = () => {
          this.canvasIconArray[iconCode] = labelIcon;
          resolve(labelIcon);
        };
        labelIcon.onerror = () => reject(new Error('Failed to load icon'));
      });
    };

    const drawLabel = async (
      x: number,
      y: number,
      boxWidth: number,
      boxHeight: number,
      labelText: string,
      color: string,
      iconCode: number
    ) => {
      try {
        const labelIcon = await getCanvasIcon(iconCode);
        const iconSize = 16;
        const paddingX = 14;
        const paddingY = 10;
        const spacing = 10;

        if (!ctx || !canvas) return;

        ctx.font = 'bold 16px Arial';
        const textWidth = ctx.measureText(labelText).width;
        const labelBoxWidth = iconSize + spacing + textWidth + paddingX * 2;
        const labelBoxHeight = iconSize + paddingY * 2;

        const canvasW = canvas.width / dpr;
        const canvasH = canvas.height / dpr;

        let labelX = x;
        let labelY = y - labelBoxHeight - 10;

        if (labelY < 0) labelY = y + boxHeight + 10;
        if (labelY + labelBoxHeight > canvasH) labelY = y - labelBoxHeight - 10;
        if (labelX + labelBoxWidth > canvasW) labelX = canvasW - labelBoxWidth - 10;
        if (labelX < 0) labelX = 10;

        ctx.fillStyle = color;
        const cornerRadius = stageComing === 'id' ? 6 : 4;
        drawRoundedRect(ctx, labelX, labelY, labelBoxWidth, labelBoxHeight, cornerRadius);

        ctx.drawImage(labelIcon, labelX + paddingX, labelY + paddingY, iconSize, iconSize);
        ctx.fillStyle = 'white';
        ctx.fillText(
          labelText,
          labelX + paddingX + iconSize + spacing,
          labelY + paddingY + iconSize - 3
        );
      } catch (error) {
        utility.error('Error drawing label:', error);
      }
    };

    // Clear the canvas again before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawRoundedBox = (x: number, y: number, width: number, height: number, color: string) => {
      if (!ctx) return;
      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      const cornerRadius = stageComing === 'id' ? 6 : 4;
      ctx.roundRect(x, y, width, height, cornerRadius);
      ctx.stroke();
    };

    if (Array.isArray(coordinates) && coordinates.length > 0) {
      this.hideLoaderwithText();
      coordinates.forEach((face: any) => {
        const x = face._x / widthRatio;
        const y = face._y / heightRatio;
        const width = face._width / widthRatio;
        const height = face._height / heightRatio;

        const faceStatusCode = face._statusCode || statusCode;
        const faceStatusInfo = statusMessagesMap[faceStatusCode] || statusMessagesMap[0];

        drawRoundedBox(x, y, width, height, faceStatusInfo.color);
        drawLabel(x, y, width, height, faceStatusInfo.label, faceStatusInfo.color, faceStatusCode);
      });
    } else {
      if (statusCode === 200 || statusCode === 220) {
        const idName = stageComing === 'id' ? 'thinkx_proc_video_wrap_id' : 'thinkx_proc_video_wrap_photo';
        this.showLoaderwithText(idName);
        return;
      } else {
        this.hideLoaderwithText();
        const w = video.clientWidth;
        const h = video.clientHeight;
        const x = 2 * (w / 6);
        const y = h / 5;
        const width = 2 * (w / 6);
        const height = 3 * (h / 5);

        const fallbackStatusInfo = statusMessagesMap[statusCode] || statusMessagesMap[0];
        drawRoundedBox(x, y, width, height, fallbackStatusInfo.color);
        drawLabel(
          x,
          y,
          width,
          height,
          fallbackStatusInfo.label,
          fallbackStatusInfo.color,
          statusCode
        );

      }

    }
  }

  /**
   *
   * @param message
   */
  setMessage(message: string) {
    const resultDiv = ui.id('photo-card-message');
    if (resultDiv) {
      ui.innerText(resultDiv, `${message}`);
    }
  }

  /**
   *
   */
  showButton() {
    ui.show(ui.id('thinkX_photo-card-retry'));
    ui.show(ui.id('thinkX_photo-card-next'));
    ui.hide(ui.id('thinkX_photo-card-capture'));
  }

  /**
   *
   */
  hideButon(attempNumber: number) {
    ui.hide(ui.id('thinkX_photo-card-retry'));
    ui.hide(ui.id('thinkX_photo-card-next'));
    ui.show(ui.id('thinkX_photo-card-capture'));
    if (
      configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1
    ) {
      const phtoAteemptCount =
        configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture_attempt
          .value;
      ui.hide(ui.id('thinkX_photoAttempt')); // hide interview
      stepUIManager.insertText('thinkX_attempNumber', attempNumber.toString());
      stepUIManager.insertText('thinkX_id_attemp_count_photo', '/' + phtoAteemptCount.toString());
    }
  }

  /**
   *
   */
  getCaptureBtnEnable(
    captureBtn: HTMLButtonElement | null,
    video: HTMLVideoElement,
    envAlias: string,
    stageComing: string
  ) {
    if (captureBtn) {
      captureBtn.disabled = true; // 🚫 disable by default
      captureBtn.classList.add('thinkproc-disable'); // optional: add a disabled style class

      captureBtn.onclick = async () => {
        video.pause();
        // ai.stopPhotoAndID((message: any) => {
        //   utility.log(message);
        // });
        this.captureClickAinProgress = true;
        if (stageComing === 'id') {
          idUi.showButton(); // Show the buttons for ID stage
          this.clearCanvas('faceBoxCanvasID');
        } else {
          this.clearCanvas('faceBoxCanvas');
          this.showButton(); // Show the buttons
        }

        const { blob: imageBlob, base64 } = await utility.takeSnapshot(video);

        if (!imageBlob || !base64) {
          utility.error('Failed to capture image from video.');
          return;
        }

        if (stageComing !== 'id') {
          configrationManager.base64Snapshot = base64;
        }
        // const imageBlob = utility.base64ToBlob(image);

        request
          .uploadIdAndPhoto({ environment: envAlias }, imageBlob)
          .then((response) => {
            utility.log('✅ Photo Uploaded success', response);
            if (stageComing === 'id') {
              stepUIManager.insertText('thinkX_id-card-next', ui.translations.idVerification.nextBtn);
              this.removeDisableBtn('thinkX_id-card-next');
            } else {
              stepUIManager.insertText('thinkX_photo-card-next', ui.translations.photoVerification.nextBtn);
              this.removeDisableBtn('thinkX_photo-card-next');
            }
          })
          .catch((error) => {
            utility.log('❌ Photo Uploaded failed', error);
          });

        captureBtn.disabled = true; // optional: disable again after capture
        captureBtn.classList.add('thinkproc-disable');
      };
    }
  }

  clearCanvas(id: string) {
    const canvasDiv = ui.id(id) as HTMLCanvasElement;
    this.ctx = canvasDiv.getContext('2d');
    if (!this.ctx) {
      utility.error('❌ Failed to get canvas context');
      return;
    }
    let self = this;
    utility.wait(1000).then(() => {
      if (self.ctx) self.ctx.clearRect(0, 0, self.ctx.canvas.width, self.ctx.canvas.height); // Clear the canvas
    });
  }

  addDisableBtn(id: string) {
    const addClass = ui.id(id);
    if (addClass) {
      ui.addClass(addClass, 'thinkproc-disable');
    }
  }

  removeDisableBtn(id: string) {
    const addClass = ui.id(id);
    if (addClass) {
      ui.removeClass(addClass, 'thinkproc-disable');
    }
  }
}

export const photoUi = new PhotoUi();
