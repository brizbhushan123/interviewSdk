import { stepUIManager } from '../../core/StepUIManager';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

/**
 *
 */
class BrowserUI {
  /**
   *
   */
  showLoader(): void {
    const loaderHTML = UiComponents.loading();
    stepUIManager.setGif(loaderHTML, 'thinkX_browserSuccess');
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

  /**
   *
   */
  retryCloseBtn() {
    ui.hide(ui.id('thinkX_browser-check'));
    ui.hide(ui.id('thinkX_browser-static'));
    ui.show(ui.id('thinkX_browser-Error'));
    ui.hide(ui.id('thinkX_checkingBrowser'));
    stepUIManager.setRetryCloseBtn(
      UiComponents.retryCloseBtn(ui.translations.status.closeBrowser, 'thinkX_cameraClose'),
      'thinkX_browserSuccess'
    );
    const button = ui.id('thinkX_cameraClose') as HTMLElement;
    if (button) {
      ui.setCloseApplicationButton(button);
    }
  }

  /**
   *
   */
  browserSuccess() {
    ui.hide(ui.id('thinkX_browser-Error'));
    ui.hide(ui.id('thinkX_browser-static'));
    ui.show(ui.id('thinkX_browser-check'));
  }

  /**
   *@param data
   *@param data.browser
   *@param data.oldVersion
   *@param data.newVersion
   */
  replacePlaceholders(template: string, data: Record<string, string | number>): string {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
      return data[key.trim()]?.toString() ?? '';
    });
  }

  // Your final function
  browserVersionMessage(data: { browser: string; oldVersion: string; newVersion: number }): string {
    const template = ui.translations.status.browserVersion;
    return this.replacePlaceholders(template, data);
  }
}
export const browserUI = new BrowserUI();
