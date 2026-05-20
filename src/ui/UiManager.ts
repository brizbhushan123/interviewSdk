import { uiEvents } from './UiEvents';
import { environment } from '../config/environment';
import { LocalizedHTMLProcessor, Translations } from '../core/LocalizedHTMLProcessor';
import { UiComponents } from './UiComponents';
import utility from '../core/Utility';
import { liveStreamManager } from '../core/LiveStreamManager';
import { DragElement } from './DragElement';
import { configrationManager } from '../core/ConfigrationManager';

/**
 *
 */
class UiManager {
  mainDiv: HTMLDivElement;
  translations: Translations;
  hideClass: string;

  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  dataArray: Uint8Array<ArrayBuffer>;
  bufferLength: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  animationFrameId: number | null;
  verticalPadding = 20;
  cameraPopup: NodeJS.Timeout | undefined;
  micPopup: NodeJS.Timeout | undefined;
  /**
   *
   */
  constructor() {
    this.mainDiv = document.createElement('div');
    this.translations = JSON.parse('{}');
    this.hideClass = 'd-none';

    this.audioContext = null;
    this.analyser = null;
    this.bufferLength = 0;
    this.dataArray = new Uint8Array(0);
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    this.ctx = context;

    this.animationFrameId = null;
  }

  /**
   *
   * @param lang
   */
  async Init(lang: string, secondary: boolean = false) {
    const processor = new LocalizedHTMLProcessor();
    const enviroment_url = environment.UI_BASE_URL;
    this.translations = await processor.downloadLanguageJson(
      environment.UI_BASE_URL + 'lang/' + lang + '.json'
    );
    let pageHtml = 'page.html';
    if (secondary) {
      pageHtml = 'page.html';
    }

    const html = await processor.fetchAndReplaceHTML(
      environment.UI_BASE_URL + pageHtml,
      this.translations,
      enviroment_url
    );

    ui.exportDiv(html);
    const el = ui.id('thinkpro_draggableBox');
    if (el) {
      DragElement.set(
        el,
        {
          drag: true,
          position: 'topLeft',
          // position: { x: 500, y: 500 },
          allowNearestCorner: false,
          width: 200,
        },
        'rectangle'
      );
    }
    const chat_Icon = ui.id('thinkproc_chatIcon');
    if (chat_Icon) {
      this.click(chat_Icon, () => {
        alert('Click');
        this.toggleChatAndShiftIfBottomRight();
      });
    }
  }

  toggleChatAndShiftIfBottomRight() {
    const chatIcon = ui.id('thinkproc_chatIcon');
    const chatBox = ui.id('thinkproc_chat');
    const draggableBox = ui.id('thinkpro_draggableBox');

    if (!chatIcon || !chatBox || !draggableBox) {
      console.error('Element(s) not found!');
      return;
    }

    chatIcon.addEventListener('click', function () {
      const isChatOpen = chatBox.classList.toggle('show');

      // Viewport size
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Position of draggable box
      const boxRect = draggableBox.getBoundingClientRect();
      const boxBottom = Math.round(boxRect.bottom);
      const boxRight = Math.round(boxRect.right);

      const tolerance = 5; // pixel tolerance

      const atBottomRight =
        Math.abs(boxBottom - viewportHeight) <= tolerance &&
        Math.abs(boxRight - viewportWidth) <= tolerance;

      if (isChatOpen && atBottomRight) {
        const chatBoxWidth = chatBox.offsetWidth;
        const newLeft = boxRect.left - (chatBoxWidth + 30);

        draggableBox.style.position = 'fixed';
        draggableBox.style.left = `${newLeft}px`;
        draggableBox.style.right = 'auto'; // unset right
      }
    });
  }

  /**
   *
   * @param id
   */
  id(id: string): HTMLElement | null {
    return this.mainDiv.querySelector<HTMLElement>('#' + id);
  }


  /**
   *
   * @param class
   */
  class(class_name: string): HTMLCollectionOf<Element> {
    return this.mainDiv.getElementsByClassName(class_name);
  }

  /**
   *
   * @param selector
   */
  all<T>(selector: string): NodeListOf<Element> {
    return this.mainDiv.querySelectorAll<Element>(selector);
  }

  /**
   *
   * @param container
   * @param id
   */
  domId(container: Element, id: string): HTMLElement | null {
    return container.querySelector<HTMLElement>('#' + id);
  }

  /**
   *
   * @param container
   * @param selector
   */
  domAll<T>(container: Element, selector: string): NodeListOf<Element> {
    return container.querySelectorAll<Element>(selector);
  }

  /**
   *
   * @param element
   * @param className
   */
  addClass(element: HTMLElement | null, className: string) {
    element?.classList.add(className);
  }
  /**
   *
   * @param element
   * @param className
   */
  removeClass(element: HTMLElement | null, className: string) {
    element?.classList.remove(className);
  }

  querySelector(element: string) {
    return this.mainDiv.querySelector<HTMLElement>(element);
  }

  querySelectorAll(element: string) {
    return this.mainDiv.querySelectorAll<HTMLElement>(element);
  }

  scopedQuerySelector(parent: HTMLElement, element: string): HTMLElement | null {
    return parent.querySelector<HTMLElement>(element);
  }

  /**
   *
   * @param element
   * @param text
   */
  innerText(element: HTMLElement, text: string) {
    let textNodeFound = false;
    for (const node of element.childNodes) {
      if (
        node.nodeType === Node.TEXT_NODE &&
        (node.nodeValue == null || node.nodeValue.trim() !== '')
      ) {
        textNodeFound = true;
        node.nodeValue = text;
        break;
      }
    }
    if (!textNodeFound) {
      element.innerText = text;
    }
  }

  /**
   *
   * @param element
   * @param text
   */
  innerHTML(element: HTMLElement | null, html: string) {
    if (element) element.innerHTML = html;
  }

  textColor(element: HTMLElement | null, color: string): void {
    if (element) {
      element.style.color = color;
    }
  }

  enableOnCheck(
    checkBox: HTMLInputElement | null,
    button: HTMLButtonElement | null
  ): void {
    if (!checkBox || !button) return;

    checkBox.addEventListener("change", () => {
      button.disabled = !checkBox.checked;
    });
  }

  /**
   *
   * @param element
   */
  show(element: HTMLElement | null) {
    if (element) {
      this.removeClass(element, this.hideClass);
    }
  }

  /**
   *
   * @param element
   */
  hide(element: HTMLElement | null) {
    if (element) {
      this.addClass(element, this.hideClass);
    }
  }

  /**
   *
   * @param element
   */
  remove(element: HTMLElement | null) {
    if (element) {
      element.remove();
    }
  }

  /**
   *
   * @param html
   * @param className
   */
  createDivElement(html: string, className: string = ''): HTMLElement {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    if (className != '') {
      this.addClass(tempDiv, className);
    }
    return tempDiv;
  }

  /**
   *
   */
  createVideoElement(): HTMLVideoElement {
    let video = document.createElement('video');
    video.setAttribute('muted', '');
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true; // Important for mobile browsers
    return video;
  }

  /**
   *
   * @param element
   * @param fn
   */
  click(element: HTMLElement, fn: Function) {
    if (element) {
      element.onclick = () => {
        fn();
      };
    }
  }

  change(element: HTMLElement, fn: Function) {
    if (element) {
      element.onchange = () => {
        fn();
      };
    }
  }

  keyup(element: HTMLElement, fn: Function) {
    if (element) {
      element.onkeyup = () => {
        fn();
      };
    }
  }

  triggerEventById(elementId: string, eventName = 'click') {
    const element = document.getElementById(elementId);
    if (element) {
      const event = new Event(eventName, { bubbles: true, cancelable: true });
      element.dispatchEvent(event);
    }
  }

  /**
   *
   * @param header
   * @param message
   * @param button_txt
   */
  alert(header: string, message: string, button_txt: string) {
    alert(message);
  }

  /**
   *
   * @param html
   */
  public exportDiv(html: string): HTMLElement {
    this.mainDiv.className = 'thinkproc-popup-wrapper';
    this.mainDiv.innerHTML = html;
    document.body.appendChild(this.mainDiv);
    uiEvents.init(this.mainDiv);
    uiEvents.handleResponsiveLayoutSetup();
    return this.mainDiv;
  }

  /**
   *
   */
  public getMainDiv(): HTMLDivElement {
    return this.mainDiv;
  }

  /**
   *
   */
  public removeMainDiv(): void {
    if (this.mainDiv && this.mainDiv.parentNode) {
      this.mainDiv.parentNode.removeChild(this.mainDiv);
    } else {
      utility.warn('Main div not found or already removed.');
    }
  }

  /**
   *
   * @param id
   */
  public dropdownVal(id: string): string {
    const select = this.id(id) as HTMLSelectElement | null;
    return select?.value || '';
  }

  /**
   *
   * @param id
   */
  public initCustomSelect(id: string): void {
    uiEvents.createCustomSelectById(id);
  }

  /**
   *
   * @param id
   * @param options
   * @param defaultValue
   */
  public updateCustomSelectOptions(
    id: string,
    options: { value: string; label: string }[],
    defaultValue?: string
  ): void {
    uiEvents.setOptions(id, options, defaultValue);
  }

  /**
   *
   * @param id
   * @param options
   * @param defaultValue
   */
  public initAndUpdateCustomSelectById(
    id: string,
    options: { value: string; label: string }[],
    defaultValue?: string
  ): void {
    this.updateCustomSelectOptions(id, options, defaultValue);
    this.initCustomSelect(id);
  }

  /**
   *
   */
  public async getMicrophones(): Promise<MediaDeviceInfo[]> {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter((device) => device.kind === 'audioinput');
    } catch {
      return [];
    }
  }

  /**
   *
   */
  public async getCameras(): Promise<MediaDeviceInfo[]> {
    try {
      const deviceList = await configrationManager.liveStreamManager?.getCameraListAvaliable();

      if (deviceList === false) {
        return [];
      }

      return Array.isArray(deviceList) ? deviceList : [];
    } catch (err) {
      utility.error("getCameras failed", err);
      return [];
    }
  }

  /**
   *
   * @param mediaStream
   * @param id
   */
  initAudioVisualization(mediaStream: MediaStream, id: string) {
    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaStreamSource(mediaStream);

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    source.connect(this.analyser);

    this.canvas = ui.id(id) as HTMLCanvasElement;
    if (!this.canvas) {
      utility.error("Canvas with ID 'audioCanvas' not found.");
      return;
    }
    this.ctx = this.canvas.getContext('2d')!;
    if (!this.ctx) {
      utility.error('Could not get canvas context.');
      return;
    }

    this.draw(); // Start visualization
  }

  /**
   *
   */
  draw() {
    this.animationFrameId = requestAnimationFrame(() => this.draw());

    if (!this.ctx || !this.analyser) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const centerY = this.canvas.height / 2;
    const maxVisualHeight = this.canvas.height - 2 * this.verticalPadding;
    const barWidth = (this.canvas.width / this.bufferLength) * 1;
    let x = 0;

    this.ctx.fillStyle = '#000000';

    for (let i = 0; i < this.bufferLength; i++) {
      let barHeight = (this.dataArray[i] / 255) * maxVisualHeight;
      barHeight = Math.max(2, barHeight - (barHeight % 2));
      const y = centerY - barHeight / 2;
      const borderRadius = barWidth / 2;

      this.roundRect(this.ctx, x, y, barWidth, barHeight, borderRadius);
      x += barWidth + 5;
    }
  }

  /**
   *
   * @param ctx
   * @param x
   * @param y
   * @param width
   * @param height
   * @param radius
   */
  roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
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
  }

  /**
   *
   */
  stopAudioBar() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    // if (this.audioContext) {
    //     this.audioContext.close().then(() => {
    //         this.audioContext = null;
    //         this.analyser = null;
    //         if (this.ctx) {
    //           this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //         }
    //     });
    // }
  }

  /**
   *
   */
  stopMachineBar() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.audioContext) {
      this.audioContext.close().then(() => {
        this.audioContext = null;
        this.analyser = null;
        if (this.ctx) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      });
    }
  }

  /**
   *
   */
  showNetworkSpeed() {
    const ns = this.id('networkSpeedLoaded');
    this.show(ns);
  }

  /**
   *
   * @param speed
   * @param unit
   */
  downloadSpeed(speed: string, unit: string) {
    this.showNetworkSpeed();
    const dsDiv = this.id('thinkX_showNetwork');
    this.show(dsDiv);
    const ds = this.id('thinkX_network-download');
    if (ds) {
      ds.innerHTML = speed + unit;
    }
  }

  /**
   *
   * @param speed
   * @param unit
   */
  uploadSpeed(speed: string, unit: string) {
    this.showNetworkSpeed();

    const dsDiv = this.id('thinkX_showNetworkUpload');
    this.show(dsDiv);
    const us = this.id('thinkX_network-upload');
    if (us) {
      us.innerHTML = speed + unit;
    }
  }

  /**
   *
   * @param header
   * @param message
   * @param buttonTxt
   * @param callback
   */
  alertDialog(
    header: string,
    message: string,
    buttonTxt: string,
    callback: Function = (dialog: HTMLElement) => {},
    retry: boolean = true,
    icon:boolean = true
  ) {
    const dialog = this.createDivElement(
      UiComponents.getDialogInnerHtml(icon),
      'thinkproc-external-popup-overlay'
    );
    ui.addClass(dialog, 'thinkX_Popup');
    const parent = this.mainDiv;
    parent?.append(dialog);

    const headerDom = dialog.querySelector<HTMLElement>('#dialog-header');
    if (headerDom) {
      this.innerText(headerDom, header);
    }
    const msgDom = dialog.querySelector<HTMLElement>('#dialog-msg');
    if (msgDom) {
      this.innerText(msgDom, message);
    }

    const retrybtn = dialog.querySelector<HTMLElement>('#btn-retry');

    if (retrybtn) {
      this.innerText(retrybtn, buttonTxt);
      this.click(retrybtn, () => {
        callback(dialog);
      });
      if (retry == false) {
        this.hide(retrybtn);
      }
    }
    return dialog;
  }

  alertInfoBox(
    title: string,
    subtitle: string,
    text: string,
    buttonTxt: string,
    callback: Function = (dialog: HTMLElement) => {}
  ) {
    const dialog = this.createDivElement(UiComponents.getInfoInnerHtml());

    const parent = this.mainDiv;
    parent?.append(dialog);

    const titleDom = dialog.querySelector<HTMLElement>('#thinkX_InfoTitle');
    if (titleDom) {
      this.innerText(titleDom, title);
    }
    const subtitleDom = dialog.querySelector<HTMLElement>('#thinkX_InfoSubtitle');
    if (subtitleDom) {
      this.innerText(subtitleDom, subtitle);
    }

    const textDom = dialog.querySelector<HTMLElement>('#thinkX_InfoPopupText');
    if (textDom) {
      this.innerText(textDom, text);
    }

    const retrybtn = dialog.querySelector<HTMLElement>('#thinkX_infoDesk');

    if (retrybtn) {
      this.innerText(retrybtn, buttonTxt);
      this.click(retrybtn, () => {
        callback(dialog);
      });
    }
  }

  async cameraPermission(
    callback: Function = (
      dialog: HTMLElement,
      selectedCameraId: string,
      selectedCameraLabel: string
    ) => {}
  ) {
    const dialog = this.id('thinkX_cameraPopup') as HTMLElement;

    this.show(dialog);
    // utility.wait(500).then(() => {
    clearTimeout(this.cameraPopup);
    this.cameraPopup = setTimeout(() => {
      this.initCameraSelect();
    }, 50);
    // });

    const retryIcon = dialog.querySelector<HTMLElement>('#thinkX_retryIcon');
    if (retryIcon) {
      let self = this;
      this.click(retryIcon, () => {
        const addClass = ui.id('thinkX_reloadIconCam');
        if (addClass) {
          ui.addClass(addClass, 'iconRotate');
        }
        self.initCameraSelect(true);
      });
    }

    const retrybtn = dialog.querySelector<HTMLElement>('#thinkX_cameraRetry');

    if (retrybtn) {
      this.click(retrybtn, () => {
        const select = this.id('thinkX_avilableCameras') as HTMLSelectElement | null;
        const selectedCameraId = select?.value || '';
        const selectedCameraLabel = select?.selectedOptions[0]?.text || '';
        if (!selectedCameraId || !selectedCameraLabel) return;

        // ✅ Hide fallback image/icon under video when retry clicked
        const videoEl = document.getElementById('thinkX_cameraVideo') as HTMLVideoElement;
        if (videoEl) {
          const placeholderImg = videoEl.parentElement?.querySelector('.camera-placeholder');
          if (placeholderImg) placeholderImg.remove(); // remove fallback image

          // also show video again if hidden
          videoEl.classList.remove('d-none');
          this.hide(this.id('thinkX_cameraDisconnect'));
        }
        callback(dialog, selectedCameraId, selectedCameraLabel);
      });
    }
  }

  async micPermission(
    callback: Function = (
      dialog: HTMLElement,
      selectedMicId: string,
      selectedMicLabel: string
    ) => {}
  ) {
    const dialog = this.id('thinkX_micPopup') as HTMLElement;

    this.show(dialog);
    // utility.wait(500).then(() => {
    clearTimeout(this.micPopup);
    this.micPopup = setTimeout(() => {
      this.initMicSelect();
    }, 50);
    // });

    const retryIcon = dialog.querySelector<HTMLElement>('#thinkX_micRetryIcon');
    if (retryIcon) {
      let self = this;
      this.click(retryIcon, () => {
        const addMicClass = ui.id('thinkX_reloadIconMic');
        if (addMicClass) {
          ui.addClass(addMicClass, 'iconRotate');
        }
        self.initMicSelect(true);
      });
    }

    const retrybtn = dialog.querySelector<HTMLElement>('#thinkX_micRetry');

    if (retrybtn) {
      this.click(retrybtn, () => {
        const select = this.id('thinkX_avilableMicrophones') as HTMLSelectElement | null;
        const selectedMicId = select?.value || '';
        const selectedMicLabel = select?.selectedOptions[0]?.text || '';
        if (!selectedMicId || !selectedMicLabel) return;
        callback(dialog, selectedMicId, selectedMicLabel);
      });
    }
  }

  async initCameraSelect(isRetry: boolean = false) {
    if (!isRetry) {
      this.cameraAppendHtmlInsideContainerPopup(
        UiComponents.getCameraSelectPopup(ui.translations.status.selectCamera),
        'thinkX_selectCamera'
      );
    }

    const cams = await this.getCameras();
    const options = cams.map((cam, i) => ({
      value: cam.deviceId || `${i}`,
      label: cam.label || `Camera Device ${i + 1}`,
    }));

    if (options.length > 0) {
      uiEvents.setOptions('thinkX_avilableCameras', options, options[0]?.value);
    } else {
      uiEvents.setOptions(
        'thinkX_avilableCameras',
        [{ value: '', label: ui.translations.status.no_camera_found }],
        ''
      );
    }

    utility.wait(3000).then(() => {
      ui.removeClass(ui.id('thinkX_reloadIconCam'), 'iconRotate');
    });
  }

  async initMicSelect(isRetry: boolean = false) {
    if (!isRetry) {
      this.cameraAppendHtmlInsideContainerPopup(
        UiComponents.getMicSelectPopup(ui.translations.status.selectMic),
        'thinkX_selectMic'
      );
    }

    const mics = await this.getMicrophones();
    const options = mics.map((mic, i) => ({
      value: mic.deviceId || `${i}`,
      label: mic.label || `Mic Device ${i + 1}`,
    }));

    if (options.length > 0) {
      uiEvents.setOptions('thinkX_avilableMicrophones', options, options[0]?.value);
    } else {
      uiEvents.setOptions(
        'thinkX_avilableMicrophones',
        [{ value: '', label: ui.translations.status.no_microphone_found }],
        ''
      );
    }

    utility.wait(3000).then(() => {
      ui.removeClass(ui.id('thinkX_reloadIconMic'), 'iconRotate');
    });
  }

  /**
   *
   * @param html
   * @param containerId
   * @param cameraCallback
   */
  cameraAppendHtmlInsideContainerPopup(html: string, containerId: string): HTMLElement | null {
    const container = ui.id(containerId);

    if (!container) {
      utility.warn(`Container with id "${containerId}" not found.`);
      return null;
    }

    container.innerHTML = html;

    this.attachListenersOnPopup(container);

    return container;
  }

  attachListenersOnPopup(container: HTMLElement): void {
    const buttons = this.domAll<HTMLButtonElement>(container, 'button[data-target]');

    buttons.forEach((buttonEl) => {
      const button = buttonEl as HTMLButtonElement;

      this.click(button, async () => {
        const targetId = button.getAttribute('data-target');
        if (!targetId) return;

        const select = this.id(targetId) as HTMLSelectElement | null;
        const selectedDeviceLabel = select?.value || '';
        const selectedDeviceText = select?.selectedOptions[0]?.text || '';

        if (!selectedDeviceLabel) {
          ui.translations.status.select_camera;
          return;
        }
      });
    });
  }

  setCloseApplicationButton(container: HTMLElement) {
    container.setAttribute('data-attr', 'close-application');
  }

  /**
   *
   * @param tag
   */
  createElement(tag: string): HTMLElement {
    const tempDiv = document.createElement(tag);
    return tempDiv;
  }
  

  
}

const ui = new UiManager();

export default ui;
