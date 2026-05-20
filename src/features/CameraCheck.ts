import { StepInterface, StepResult } from '../core/StepInterface';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import ui from '../ui/UiManager';
import { stepUIManager } from '../core/StepUIManager';
import { UiComponents } from '../ui/UiComponents';
import { cameraUI } from '../ui/featuresUI/CameraUI';
import utility from '../core/Utility';
import { configrationManager } from '../core/ConfigrationManager';
import browserCheck from './BrowserCheck';

/**
 *
 */
class CameraCheck extends StepInterface {
  private mainDiv!: HTMLDivElement;

  envAlias: string = 'Webcam_Check';
  /**
   *
   */
  constructor() {
    super();
  }

  /**
   *
   * @param mainDiv
   */
  init(mainDiv: HTMLDivElement) {
    this.mainDiv = mainDiv;
  }

  /**
   *
   */
  async start(): Promise<void> {
    ui.show(ui.id('thinkX_cameraDropdown'));
    let selectlist = UiComponents.getCameraSelect(
      ui.translations.status.allow_btn,
      ui.translations.status.selectCamera
    );
    const container = ui.id('thinkproc-camera-select');
    if (container) {
      container.innerHTML = selectlist;
      stepUIManager.initAndUpdateCustomSelectById(
        'thinkpro-get-camera-value',
        [{ value: '', label: ui.translations.status.no_camera_found }],
        ''
      );
    }
    const addClass = ui.id('thinkX_cameraDropdown');
    if (addClass) {
      ui.addClass(addClass, 'thinkproc-disable');
    }

    const timeouCamerePermission = setTimeout(() => {
      // ui.show(ui.id('thinkX_cameraDropdown'));
      cameraUI.cameraPermission(ui.translations.status.webCamEnable);
    }, 4000);
    const cams = await liveStreamManager.getCameraList(true);
    const cameraPermission = await liveStreamManager.permissionEnable('camera');
    if (cameraPermission == false) {
      ui.show(ui.id('thinkX_cameraDropdown'));
      const message = ui.translations.status.webCamEnable;
      cameraUI.cameraPermission(message);
      this.resultData.status = false;
      this.resultData.error.push(message);
      this.end();
      this.onError(() => {
        this.cameraRetry();
      });
      return;
    }
    if (configrationManager.browserMobileEnable == 2 && configrationManager.isMobile == true) {
      const camera = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY, 'user');
      if (camera) {
        clearTimeout(timeouCamerePermission);
        ui.hide(ui.id('thinkX_webCamError'));
        ui.hide(ui.id('thinkX_cameraDropdown'));
        this.cameraCallback({
          id: '',
          label: '',
          width: camera?.settings.width || 640,
          height: camera?.settings.height || 480,
          deviceId: camera?.settings.deviceId || '',
          groupId: camera?.settings.groupId || '',
          frameRate: camera?.settings.frameRate || 15,
        });
      }
      return;
    }
    ui.hide(ui.id('thinkX_webCamError'));
    const removeClass = ui.id('thinkX_cameraDropdown');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkproc-disable');
    }
    clearTimeout(timeouCamerePermission);
    cameraUI.cameraAppendHtmlInsideContainer(
      UiComponents.getCameraSelect(
        ui.translations.status.allow_btn,
        ui.translations.status.selectCamera
      ),
      'thinkproc-camera-select',
      this.cameraCallback,
      this.cameraErrorCallback
    );
    // const cams = await liveStreamManager.getCameraList(true);
    if (Array.isArray(cams)) {
      ui.show(ui.id('thinkX_cameraDropdown'));
      const options = cams.map((cam: { deviceId: any; label: any }, i: number) => ({
        value: cam.deviceId || `${i}`,
        label: cam.label || `Camera Device ${i + 1}`,
      }));
      if (options.length > 0) {
        stepUIManager.initAndUpdateCustomSelectById(
          'thinkpro-get-camera-value',
          options,
          options[0]?.value
        );
      } else {
        stepUIManager.initAndUpdateCustomSelectById(
          'thinkpro-get-camera-value',
          [{ value: '', label: ui.translations.status.no_camera_found }],
          ''
        );
      }
    } else {
      let message: string;
      if (cams === false) {
        message = ui.translations.status.webCamEnable;
      } else {
        message = ui.translations.status.noCamera;
      }
      cameraUI.cameraPermission(message);
      // ui.show(ui.id('thinkX_webCamPopupEnable'));
      this.resultData.status = false;
      this.resultData.error.push(message);
      this.end();
      this.onError(() => {
        this.cameraRetry();
      });
    }
  }

  cameraCallback = (data: {
    id: string;
    label: string;
    width: number;
    height: number;
    deviceId: string;
    groupId: string;
    frameRate: number;
  }) => {
    cameraUI.showLoader();

    const isMobile = configrationManager.browserMobileEnable === 1;
    let errorMessage = '';

    const deviceName = browserCheck.getDeviceInfo();

    if (
      (!isMobile && (data.width < 640 || data.height < 480)) ||
      (isMobile && (data.width < 480 || data.height < 640) && deviceName.device != 'PC')
    ) {
      errorMessage = ui.translations.status.widthCheck;
    } else if (data.frameRate < 15) {
      errorMessage = ui.translations.status.frameRate;
    }

    if (errorMessage) {
      this.resultData.status = false;
      this.resultData.error.push(errorMessage);
      this.end();
      this.onError(() => {
        this.cameraRetry();
      });
      return; // stop further execution
    }

    // If no error
    this.resultData.status = true;
    this.resultData.info = data;

    cameraUI.hideLoader();
    ui.hide(ui.id('thinkX_cameraDropdown'));
    ui.show(ui.id('thinkX_cameraChecked'));

    liveStreamManager.cameraRevokeContinously(LiveStreamManager.CAMERA.PRIMARY.name);

    this.end();
  };

  /**
   *
   */
  cameraErrorCallback = (message: string) => {
    cameraUI.hideLoader();
    stepUIManager.initAndUpdateCustomSelectById(
      'thinkpro-get-camera-value',
      [{ value: '', label: ui.translations.status.no_camera_found }],
      ''
    );
    this.resultData.status = false;
    this.resultData.error.push(message);
    this.end(0);
    this.onError(() => {
      this.cameraRetry();
    });
  };

  /**
   *
   */
  cameraRetry() {
    cameraUI.hideLoader();
    cameraUI.removeAndAddDisableClass();

    const button = ui.id('thinkX_cameraRetryBtn') as HTMLElement;
    if (button) {
      ui.click(button, async () => {
        cameraUI.removeDisable();
        this.resultData.status = true;
        this.resultData.error = [];
        this.start();
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
    this.start();
  }
  /**
   *
   */
  micRevokeRetry() { }
}

export const cameraCheck = new CameraCheck();
