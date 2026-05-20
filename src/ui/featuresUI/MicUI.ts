import { errorManager } from '../../core/ErrorManager';
import { LiveStreamManager, liveStreamManager } from '../../core/LiveStreamManager';
import { stepUIManager } from '../../core/StepUIManager';
import utility from '../../core/Utility';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

/**
 *
 */
class MicUI {
  /**
   *
   * @param html
   * @param containerId
   * @param audioCallback
   */

  allowClickTimeout :ReturnType<typeof setTimeout> | null = null;

  audioAppendHtmlInsideContainer(
    html: string,
    containerId: string,
    audioCallback: Function,
    errorCallback: Function
  ): HTMLElement | null {
    const container = ui.id(containerId);

    if (!container) {
      utility.warn(`Container with id "${containerId}" not found.`);
      return null;
    }

    // container.innerHTML = html;

    this.audioAttachListenersOn(container, audioCallback, errorCallback);

    return container;
  }

  /**
   *
   * @param container
   * @param audioCallback
   */
  audioAttachListenersOn(
    container: HTMLElement,
    audioCallback: Function,
    errorCallback: Function
  ): void {
    const buttons = ui.domAll<HTMLButtonElement>(container, 'button[data-target]');

    buttons.forEach((buttonEl) => {
      const button = buttonEl as HTMLButtonElement;

      ui.click(button, async () => {
        if(this.allowClickTimeout)
          clearTimeout(this.allowClickTimeout);
      this.allowClickTimeout = setTimeout(()=>{

        
        const targetId = button.getAttribute('data-target');
        if (!targetId) return;

        const select = ui.id(targetId) as HTMLSelectElement | null;
        const selectedDeviceLabel = select?.value || '';
        const selectedDeviceText = select?.selectedOptions[0]?.text || '';

        if (!selectedDeviceLabel) {
          ui.translations.status.select_audio;
          return;
        }

        liveStreamManager
          .isValidDeviceId(selectedDeviceLabel, 'audioinput')
          .then(async (response) => {
            if (response == true) {
              LiveStreamManager.AUDIO.PRIMARY.deviceId.deviceId = { exact: selectedDeviceLabel };
              LiveStreamManager.AUDIO.PRIMARY.label = selectedDeviceText;
              LiveStreamManager.AUDIO.PRIMARY_NOISE.deviceId.deviceId = {
                exact: selectedDeviceLabel,
              };
              LiveStreamManager.AUDIO.PRIMARY_NOISE.label = selectedDeviceText;
              await liveStreamManager.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
              const tabId = ui.id('thinkX_audioDiv');
              if (tabId) {
                ui.hide(tabId);
              }
              audioCallback({ id: selectedDeviceLabel, label: selectedDeviceText });
            } else {
              errorCallback(ui.translations.status.micEnable);
              // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
            }
          })
          .catch(() => {
            errorCallback(ui.translations.status.micEnable);
            // errorManager.throwError('Error', 'AUDIO_NOT_FOUND');
          });
        },500);
      });
      
    });
  }

  /**
   *
   */
  retryBtnRemove() {
    const existingRetryDiv = ui.id('thinkX_retryClose');
    existingRetryDiv?.remove();
  }

  /**
   *
   */
  speakerRetry() {
    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, 'thinkX_speakerRetry'),
      'thinkX_micSuccess'
    );
  }

  /**
   *
   */
  removeAndAddDisableClass() {
    this.retryBtnRemove();

    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, 'thinkX_micRetryBtn'),
      'thinkX_micSuccess'
    );
    const addClass = ui.id('thinkX_audioDiv');
    if (addClass) {
      ui.addClass(addClass, 'thinkproc-disable');
    }
  }

  /**
   *
   */
  removeDisable() {
    ui.hide(ui.id('thinkX_micError'));
    const removeClass = ui.id('thinkX_audioDiv');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkproc-disable');
      this.retryBtnRemove();
      ui.hide(ui.id('thinkX_speakerCheck-error'));
    }
  }

  /**
   *
   */
  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_micSuccess');
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

  speakerCheckHtml() {
    ui.show(ui.id('thinkX_speakerAvailable'));
    stepUIManager.insertText(
      'thinkX_speakerAvailable-check-text',
      ui.translations.status.speakerFound
    );
  }

  showAudioDiv() {
    ui.hide(ui.id('thinkX_micPopupEnable'));
    ui.show(ui.id('thinkX_audioDiv'));
  }

  stopMicStream() {
    liveStreamManager.stopAudioStream();
    ui.hide(ui.id('thinkX_speakerCheck-error'));
    ui.hide(ui.id('thinkX_micError'));
    ui.hide(ui.id('thinkX_micErrorIcon'));
  }
}

export const micUI = new MicUI();
