import { stepUIManager } from '../../core/StepUIManager';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

/**
 *
 */
class NetworkUI {
  /**
   *
   */
  removeRetry() {
    const existingRetryDiv = ui.id('thinkX_retryClose');
    existingRetryDiv?.remove();
    ui.show(ui.id('thinkX_networkError'));
    const retryBtnId = 'thinkX_networkRetry';
    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, retryBtnId),
      'thinkX_networkSuccess'
    );
  }

  /**
   *
   */
  removeClass() {
    const existingRetryDiv1 = ui.id('thinkX_retryClose');
    existingRetryDiv1?.remove();
    ui.hide(ui.id('thinkX_networkError'));
    ui.show(ui.id('thinkX_networkStatic'));
    ui.hide(ui.id('thinkX_networkErrorImg'));
    ui.show(ui.id('thinkX_networkCheckText'));
  }

  /**
   *
   */
  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_networkSuccess');
  }

  /**
   *
   */
  hideLoader(): void {
    ui.hide(ui.id('thinkX_networkCheckText'));
    ui.hide(ui.id('thinkX_networkStatic'));
    ui.show(ui.id('thinkX_networkErrorImg'));
    this.loader();
  }

  /**
   *
   */
  hideAndShowIcon() {
    ui.hide(ui.id('thinkX_networkStatic'));
    ui.show(ui.id('thinkX_networkCheck'));
    ui.show(ui.id('thinkX_networkChecking'));
    ui.hide(ui.id('thinkX_networkErrorImg'));
    this.loader();
  }

  /**
   *
   */
  loader() {
    const existingLoader = ui.id('thinkX_loading');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }

  errorMsgShow() {
    ui.show(ui.id('thinkX_networkError'));
    const retryBtnId = 'thinkX_networkRetry';
    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, retryBtnId),
      'thinkX_networkSuccess'
    );
  }
}
export const networkUI = new NetworkUI();
