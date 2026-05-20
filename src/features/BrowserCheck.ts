import { configrationManager } from '../core/ConfigrationManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import { browserUI } from '../ui/featuresUI/BrowserUI';
import ui from '../ui/UiManager';

/**
 *
 */
class BrowserCheck extends StepInterface {
  envAlias: string = 'Browser_Check';
  min_IE_version: number;
  min_chrome_version: number;
  min_firefox_version: number;
  min_safari_version: number;
  min_edge_version: number;
  /**
   *
   */
  constructor() {
    super();
    this.min_IE_version = 11;
    this.min_chrome_version = 109.0;
    this.min_firefox_version = 139.0;
    this.min_safari_version = 16.0;
    this.min_edge_version = 128.0;
  }

  /**
   *
   */
  start(): void {
    browserUI.showLoader();
    utility.wait(2000).then(() => {
      const data = this.getDeviceInfo();
      let browserValid = true;
      const https = this.checkHTTPS();
      if (!https.browserSupport) {
        browserUI.hideLoader();
        browserValid = false;
        this.resultData.error.push(https.browserMsg);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (data.browser == 'Firefox') {
        browserUI.hideLoader();
        browserValid = false;
        this.resultData.error.push(ui.translations.status.firefoxDisable);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (configrationManager.browserMobileEnable == 1 && data.device != 'PC') {
        browserUI.hideLoader();
        browserValid = false;
        this.resultData.error.push(ui.translations.status.mobileEnable);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (data.browser === 'Internet Explorer' && parseInt(data.version) <= this.min_IE_version) {
        browserUI.hideLoader();
        browserValid = false;
        const message = browserUI.browserVersionMessage({
          browser: data.browser,
          oldVersion: data.version,
          newVersion: this.min_IE_version,
        });
        this.resultData.error.push(message);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (
        browserValid &&
        data.browser === 'Chrome' &&
        parseInt(data.version) < this.min_chrome_version
      ) {
        browserUI.hideLoader();
        browserValid = false;
        const message = browserUI.browserVersionMessage({
          browser: data.browser,
          oldVersion: data.version,
          newVersion: this.min_chrome_version,
        });
        this.resultData.error.push(message);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (
        browserValid &&
        data.browser === 'Firefox' &&
        parseInt(data.version) < this.min_firefox_version
      ) {
        browserUI.hideLoader();
        browserValid = false;
        const message = browserUI.browserVersionMessage({
          browser: data.browser,
          oldVersion: data.version,
          newVersion: this.min_firefox_version,
        });
        this.resultData.error.push(message);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (
        browserValid &&
        data.browser === 'Safari' &&
        parseInt(data.version) < this.min_safari_version
      ) {
        browserUI.hideLoader();
        browserValid = false;
        const message = browserUI.browserVersionMessage({
          browser: data.browser,
          oldVersion: data.version,
          newVersion: this.min_safari_version,
        });
        this.resultData.error.push(message);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      if (
        browserValid &&
        data.browser === 'Edge' &&
        parseInt(data.version) < this.min_edge_version
      ) {
        browserUI.hideLoader();
        browserValid = false;
        const message = browserUI.browserVersionMessage({
          browser: data.browser,
          oldVersion: data.version,
          newVersion: this.min_edge_version,
        });
        this.resultData.error.push(message);
        this.end();
        this.onError(() => {
          browserUI.retryCloseBtn();
        });
      }

      this.resultData.status = browserValid;
      if (browserValid == true) {
        browserUI.hideLoader();
        browserUI.browserSuccess();
        stepUIManager.insertText('thinkX_checkingBrowser', ui.translations.status.browserSuccess);
        this.resultData.info = data;
        configrationManager.isMobile = data.device !== 'PC';
      }
      this.end();
    });
  }

  /**
   *
   */
  get_browser(): { name: string; version: string } {
    const ua = navigator.userAgent;
    let tem: RegExpExecArray | null = null;
    const match = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);

    if (match && match.length > 2) {
      if (/trident/i.test(match[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua);
        return { name: 'IE', version: tem?.[1] || '' };
      }

      if (match[1] === 'Chrome') {
        const edgeOrOpera = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (edgeOrOpera && edgeOrOpera.length > 2) {
          return { name: edgeOrOpera[1] === 'OPR' ? 'Opera' : 'Edge', version: edgeOrOpera[2] };
        }
      }

      tem = /version\/(\d+)/i.exec(ua);
      if (tem && tem.length > 1) {
        match[2] = tem[1];
      }

      return { name: match[1], version: match[2] };
    }

    return { name: 'Unknown', version: '0' };
  }

  /**
   *
   * @param userAgent
   */
  getBrowserName(userAgent: string = navigator.userAgent): string {
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg') && !userAgent.includes('OPR')) {
      return 'Chrome';
    } else if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
      return 'Internet Explorer';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
      return 'Safari';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      return 'Opera';
    } else if (userAgent.includes('Edg')) {
      return 'Edge';
    } else {
      return 'Unknown Browser';
    }
  }

  /**
   *
   * @param userAgent
   */
  getOS(userAgent: string): string {
    if (userAgent.includes('Win')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux') && !userAgent.includes('Android')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('like Mac')) return 'iOS';
    return 'Unknown OS';
  }

  /**
   *
   * @param userAgent
   */
  getDeviceType(userAgent: string): string {
    const ua = userAgent.toLowerCase();
    const isTablet = /ipad|android(?!.*mobi)|tablet/.test(ua);
    const isMobile = /mobi|iphone|ipod|android/.test(ua);

    if (isTablet) return 'Tablet';
    else if (isMobile) return 'Mobile';
    else return 'PC';
  }

  /**
   *
   */
  getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const browserInfo = this.get_browser();

    return {
      browser: this.getBrowserName(userAgent),
      os: this.getOS(userAgent),
      device: this.getDeviceType(userAgent),
      userAgent,
      version: browserInfo.version,
    };
  }

  /**
   *
   */
  checkHTTPS() {
    let msg = '';
    let status = true;

    if (location.protocol === 'http:') {
      status = false;
      msg = 'Please use HTTPs for proceeding further.';
    }

    return { browserSupport: status, browserMsg: msg };
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
  cameraRevokeRetry() { }
  /**
   *
   */
  micRevokeRetry() { }
}

const browserCheck = new BrowserCheck();

export default browserCheck;
