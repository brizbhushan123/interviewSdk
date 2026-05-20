import { configrationManager } from '../../core/ConfigrationManager';
import { LiveStreamManager, liveStreamManager } from '../../core/LiveStreamManager';
import { regularSnap } from '../../core/RegularSnap';
import { stepUIManager } from '../../core/StepUIManager';
import utility from '../../core/Utility';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

/**
 *
 */
class CameraUI {
  /**
   * Appends the given HTML content inside a container element identified by its ID.
   * Also attaches event listeners to the newly inserted content.
   *
   * @param html - The HTML string to insert into the container.
   * @param containerId - The ID of the target container element.
   * @param cameraCallback - A callback function to be used when attaching event listeners (e.g., for camera setup).
   * @returns The container element if found, otherwise null.
   */

  /**
   *
   * @param html
   * @param containerId
   * @param cameraCallback
   */
  cameraAppendHtmlInsideContainer(
    html: string,
    containerId: string,
    cameraCallback: Function,
    errorCallback: Function
  ): HTMLElement | null {
    const container = ui.id(containerId);

    if (!container) {
      utility.warn(`Container with id "${containerId}" not found.`);
      return null;
    }

    // container.innerHTML = html;

    this.attachListenersOn(container, cameraCallback, errorCallback);

    return container;
  }

  /**
   * Attaches click event listeners to all buttons with a "data-target" attribute inside the given container.
   * When clicked, the button triggers camera selection logic using the associated <select> element.
   *
   * @param container - The parent HTML element that contains the target buttons.
   * @param cameraCallback - Callback function to be invoked with the selected camera details if a valid device is selected.
   */

  /**
   *
   * @param container
   * @param cameraCallback
   */
  attachListenersOn(
    container: HTMLElement,
    cameraCallback: Function,
    errorCallback: Function
  ): void {
    const buttons = ui.domAll<HTMLButtonElement>(container, 'button[data-target]');

    buttons.forEach((buttonEl) => {
      const button = buttonEl as HTMLButtonElement;

      ui.click(button, async () => {
        const addClass = ui.id('thinkX_cameraDropdown');
        if (addClass) {
          ui.addClass(addClass, 'thinkproc-disable');
        }
        const targetId = button.getAttribute('data-target');
        if (!targetId) return;

        const select = ui.id(targetId) as HTMLSelectElement | null;
        const selectedDeviceLabel = select?.value || '';
        const selectedDeviceText = select?.selectedOptions[0]?.text || '';

        if (!selectedDeviceLabel) {
          ui.translations.status.select_camera;
          return;
        }

        liveStreamManager
          .isValidDeviceId(selectedDeviceLabel, 'videoinput')
          .then(async (response) => {
            if (response == true) {
              liveStreamManager.setCameraDeviceId(
                LiveStreamManager.CAMERA.PRIMARY,
                selectedDeviceLabel
              );
              LiveStreamManager.CAMERA.PRIMARY.label = selectedDeviceText;
              const camera = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
              cameraCallback({
                id: selectedDeviceLabel,
                label: selectedDeviceText,
                width: camera?.settings.width,
                height: camera?.settings.height,
                deviceId: camera?.settings.deviceId,
                groupId: camera?.settings.groupId,
                frameRate: camera?.settings.frameRate,
              });
            } else {
              this.showLoader();
              errorCallback(ui.translations.status.webCamEnable);
              // errorManager.throwError("Error", "CAMERA_NOT_FOUND");
            }
          })
          .catch((e) => {
            this.showLoader();
            errorCallback(ui.translations.status.webCamEnable);
          });
      });
    });
  }

  /**
   *
   */
  removeAndAddDisableClass() {
    const existingRetryDiv = ui.id('thinkX_retryClose');
    existingRetryDiv?.remove();

    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, 'thinkX_cameraRetryBtn'),
      'thinkX_webCamSuccess'
    );
    const addClass = ui.id('thinkX_cameraDropdown');
    if (addClass) {
      ui.addClass(addClass, 'thinkproc-disable');
    }
  }

  /**
   *
   */
  removeDisable() {
    const removeClass = ui.id('thinkX_cameraDropdown');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkproc-disable');
      const existingRetryDiv1 = ui.id('thinkX_retryClose');
      existingRetryDiv1?.remove();
      ui.hide(ui.id('thinkX_webCamError'));
    }
  }

  /**
   *
   */
  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_webCamSuccess');
  }

  /**
   *
   */
  hideLoader(): void {
    const existingLoader = ui.id('thinkX_loading');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }

  cameraPermission(message: string) {
    ui.show(ui.id('thinkX_webCamError'));
    ui.show(ui.id('thinkX_cameraDropdown'));
    const addClass = ui.id('thinkX_cameraDropdown');
    if (addClass) {
      ui.addClass(addClass, 'thinkproc-disable');
    }
    stepUIManager.insertText('thinkX_webCamError', message);
    let selectlist = UiComponents.getCameraSelect(
      ui.translations.status.allow_btn,
      ui.translations.status.selectCamera
    );
    const container = ui.id('thinkproc-camera-select');
    if (container) {
      // container.innerHTML = selectlist;
      stepUIManager.initAndUpdateCustomSelectById(
        'thinkpro-get-camera-value',
        [{ value: '', label: ui.translations.status.no_camera_found }],
        ''
      );
    }
  }
}

export const cameraUI = new CameraUI();
