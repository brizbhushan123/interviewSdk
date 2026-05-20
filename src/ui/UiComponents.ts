// Add "thinkproc-disable" class for disable the button

import { environment } from '../config/environment';

/**
 *
 */
export class UiComponents {
  /**
   *
   * @param text
   */
  static getMicSelect(text: string, selectMic: string): string {
    return `
      <select id="thinkpro-get-mic-value" class="thinkproc-custom-select-default" placeholder="${selectMic}"></select>
      <button role="button" data-target="thinkpro-get-mic-value" id="thinkX_allowMic" class="thinkpro-btn">${text}</button>
    `;
  }

  /**
   *
   * @param text
   */
  static getCameraSelect(text: string, selectCamera: string): string {
    return `
      <select id="thinkpro-get-camera-value" class="thinkproc-custom-select-default" placeholder="${selectCamera}"></select>
      <button role="button" data-target="thinkpro-get-camera-value" id="thinkX_allowCamera" class="thinkpro-btn">${text}</button>
    `;
  }

  /**
   *
   */
  static getDialogInnerHtml(icon:boolean = true): string {
    let iconData = `<div class="icon">
                      <img src="${environment.UI_BASE_URL}images/danger_triangle.svg" alt="{{popup_imgs.dangerTriangle}}">
                    </div>`;
    if(icon == false){
      iconData = "";
    }                
    return `<div class="thinkproc-external-popup-innerbody">
                  <div class="thinkproc-external-popup-box">
                      <div class="thinkproc-external-popup-description">
                          <div class="think_popupIconWrap">
                            ${iconData}
                            <span id="dialog-header">{{popup_text.additionalCameraDisconnect}}}</span>
                          </div>
                          <p id="dialog-msg">{{popup_text.cameraDisconnected}}</p>
                      </div>
                      <div class="thinkproc-external-popup-btn-div">
                          <button class="thinkpro-btn" id="btn-retry">{{popup_buttons.retry}}</button>
                      </div>
                  </div>
              </div>
    `;
  }

  static getInfoInnerHtml(): string {
    return `<div class="thinkproc-external-popup-overlay thinkX_InfoPopup">
            <div class="thinkproc-external-popup-innerbody">
                <div class="thinkproc-external-popup-box">
                    <div class="thinkproc-external-popup-hdng-div">
                        <div class="icon">
                            <img src="${environment.UI_BASE_URL}images/info.svg" alt="">
                        </div>
                        <span id="thinkX_InfoTitle">{{infoPopup.infoPopupTitle}}</span>
                    </div>
                    <div class="thinkproc-external-popup-description">
                      <div class="thinkproc-external-popup-subhdng-div" id="thinkX_InfoSubtitle">{{infoPopup.infoPopupSubTitle}}:</div> 
                      <p class="mt-20" id="thinkX_InfoPopupText">{{infoPopup.infoPopupText}}</p>    
                    </div>
                    <div class="thinkproc-external-popup-btn-div">
                        <button class="thinkpro-btn" id="thinkX_infoDesk">{{infoPopup.infoPopupBtn}}</button>
                    </div>
                </div>
            </div>
          </div> `;
  }

  /**
   *
   * @param text
   * @param id
   */
  static retryCloseBtn(text: string, id: string): string {
    return `
      <div id="thinkX_retryClose" class="mt-20">
        <button role="button" data-target="thinkpro-close-btn" class="thinkpro-btn outline" id="${id}">${text}</button>
      </div>
    `;
  }

  /**
   *
   * @param text
   */
  static loading(): string {
    return `
      <div id="thinkX_loading" class="loading_gifdiv mt-20">
        <div class="thinkproc_loader"></div>
      </div>
    `;
  }

  /**
   *
   * @param text
   */
  static getCameraSelectPopup(selectCamera: string): string {
    return `
      <select id="thinkX_avilableCameras" class="thinkproc-custom-select-default" placeholder="${selectCamera}"></select>
    `;
  }

  /**
   *
   * @param text
   */
  static getMicSelectPopup(selectMic: string): string {
    return `
      <select id="thinkX_avilableMicrophones" class="thinkproc-custom-select-default" placeholder="${selectMic}"></select>
    `;
  }

  static loadingwithtext(loadingText: string): string {
    return `
      <div id="thinkX_loadingwithText" class="loading_gifdiv thinkX_loading_withText">
          <div class="thinkproc_loader"></div>
          <span>${loadingText}</span>
      </div>
    `;
  }
}
