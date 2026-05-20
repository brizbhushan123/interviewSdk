import { stepUIManager } from '../../core/StepUIManager';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

/**
 *
 */
class ScreenUI {
  /**
   *
   */
  removeRetry() {
    ui.show(ui.id('thinkX_errorScreen'));
    ui.show(ui.id('thinkX_screenError'));
    ui.hide(ui.id('thinkX_screenCheck'));
    ui.hide(ui.id('thinkX_screenStatic'));
    ui.hide(ui.id('thinkX_checkingScreen'));
    const existingRetryDiv = ui.id('thinkX_retryClose');
    existingRetryDiv?.remove();
    const retryBtnId = 'thinkX_screenRetry';
    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.popup_buttons.retry, retryBtnId),
      'thinkX_screenSuccess'
    );
  }

  /**
   *
   */
  removeClass() {
    const existingRetryDiv1 = ui.id('thinkX_retryClose');
    existingRetryDiv1?.remove();
    ui.hide(ui.id('thinkX_errorScreen'));
    ui.hide(ui.id('thinkX_screenError'));
    ui.show(ui.id('thinkX_screenStatic'));
    ui.show(ui.id('thinkX_checkingScreen'));
  }

  /**
   *
   */
  showIcon() {
    ui.hide(ui.id('thinkX_screenSharePopup'));
    ui.show(ui.id('thinkX_screenCheck'));
    ui.hide(ui.id('thinkX_screenStatic'));
    ui.show(ui.id('thinkX_screen_resolution'));
    ui.show(ui.id('thinkX_checkingScreen'));
    ui.hide(ui.id('thinkX_screenError'));
  }

  /**
   *
   */
  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_screenSuccess');
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
}
export const screenUI = new ScreenUI();
