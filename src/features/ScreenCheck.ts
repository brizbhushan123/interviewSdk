import { configrationManager } from '../core/ConfigrationManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import { screenUI } from '../ui/featuresUI/ScreenUI';
import ui from '../ui/UiManager';
/**
 *
 */
class ScreenCheck extends StepInterface {
  envAlias: string = 'Screen_Check';
  /**
   *
   */
  constructor() {
    super();
  }

  /**
   *
   */
  start(): void {
    this.checkScreen();
  }

  /**
   *
   */
  checkScreen() {
    screenUI.showLoader();
    utility.wait(2000).then(() => {
      const width = screen.width;
      const height = screen.height;
      this.resultData.info['width'] = width;
      this.resultData.info['height'] = height;

      if (
        ((width < 1280 || height < 720) && configrationManager.browserMobileEnable == 1) || // Desktop only
        (width < 320 && configrationManager.browserMobileEnable == 2) // all devices PC/Mobile/Tablet
      ) {
        this.resultData.status = false;
        const messageTemplate = ui.translations.status.screenSize;
        const resolutionStr = `${width}×${height}`;
        const message = utility.replacePlaceholders(messageTemplate, { width: resolutionStr });
        this.resultData.error.push(message);
        // this.resultData.error.push(ui.translations.status.screenSize);
        this.end();
        this.onError(() => {
          this.screenRetry();
        });
      } else {
        screenUI.hideLoader();
        screenUI.showIcon();
        stepUIManager.screenResolution(this.resultData.info);
        stepUIManager.insertText('thinkX_checkingScreen', ui.translations.status.screenSuccess);
        this.end();
      }

      // if screen resolution check
      // {
      //     const messageTemplate = ui.translations.status.checking_screen_fail;
      //     const resolutionStr = `${width}×${height}`;
      //     const message = utility.replacePlaceholders(messageTemplate,{resolution:resolutionStr} );
      //     this.resultData.error.push(message);

      // }

      // liveStreamManager.screenShare(()=>{
      //         screenUI.hideLoader();
      //         screenUI.showIcon();
      //         stepUIManager.insertText("checkingScreen",ui.translations.status.screenSuccess);
      //         this.end();
      //     },(message)=>{
      //         this.resultData.status =false;
      //         this.resultData.error.push(message);
      //         this.screenRetry();
      //         this.end();
      //     });
    });
  }

  /**
   *
   */
  screenRetry() {
    screenUI.hideLoader();
    screenUI.removeRetry();

    const button = ui.id('thinkX_screenRetry') as HTMLElement;

    if (button) {
      ui.click(button, () => {
        screenUI.removeClass();
        this.resultData.status = true;
        this.resultData.error = [];
        this.checkScreen();
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
  cameraRevokeRetry() {}
  /**
   *
   */
  micRevokeRetry() {}
}

export const screenCheck = new ScreenCheck();
