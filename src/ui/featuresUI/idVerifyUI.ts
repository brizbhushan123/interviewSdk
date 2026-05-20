import { configrationManager } from '../../core/ConfigrationManager';
import { stepUIManager } from '../../core/StepUIManager';
import utility from '../../core/Utility';
import ui from '../UiManager';

/**
 *
 */
class IdVerifyUI {
  /**
   *
   * @param id
   * @param text
   * @param matchType
   */
  setFailIcon(
    id: any, // register photo, register id and capture id image url2
    mainDiv: string, // register photo, register id and capture id  main div show
    addImgID: string, // register photo, register id and capture id candidate image show
    showErrorIcon: string, // register photo, register id and capture id candidate error icon show
    statusID: string, // register photo, register id and capture id candidate error status
    successID: string // register photo, register id and capture id candidate success icon show
  ) {
    ui.show(ui.id('thinkX_rescanBtn'));
    ui.show(ui.id(mainDiv));
    ui.addClass(ui.id(mainDiv), 'thinkx_error');
    ui.show(ui.id(showErrorIcon));
    ui.hide(ui.id(successID));
    stepUIManager.insertText(statusID, ui.translations.status.FM);
    if (id.url_2) stepUIManager.srcInsert(addImgID, id.url_2);
    // this.showFailIcon(id.url_2, mainDiv, addImgID, showErrorIcon, statusID, successID);
  }

  /**
   *
   * @param text
   * @param matchType
   */
  setSuccessIcon(id: string, showID: string = '', statusID: string = '', removeID: string) {
    ui.show(ui.id(id));
    ui.show(ui.id(showID));
    ui.hide(ui.id(removeID));
    stepUIManager.insertText(statusID, ui.translations.status.matched);
  }

  /**
   *
   */
  resetCompareView() {
    ui.show(ui.id('thinkX_imgContainer')); // register photo, register id and capture id image show
    ui.hide(ui.id('thinkX_verifyWrap')); // loader / icon div hide
    const id = ui.id('thinkproc_body_compare');
    ui.removeClass(id, 'h100');
    if (
      configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1
    ) {
      ui.show(ui.id('thinkX_idVerifyWarning')); // attempt div show
    }
    ui.show(ui.id('thinkX_profileContainer')); // capture photo image show
    ui.show(ui.id('thinkX_rescan')); // rescan button show
  }

  /**
   *
   */
  addCompareView(attemptNo: number) {
    stepUIManager.srcInsert(
      'thinkX_verify_registerPhoto_photo',
      'https://lowcars.net/wp-content/uploads/2017/02/userpic.png'
    );
    stepUIManager.srcInsert(
      'thinkX_verify_registerPhoto_ID',
      'https://i.pinimg.com/564x/d6/13/26/d61326de60f9a03c8e5a6fd12ff006d0.jpg'
    );
    stepUIManager.srcInsert(
      'thinkX_verify_captureID_id',
      'https://i.pinimg.com/564x/d6/13/26/d61326de60f9a03c8e5a6fd12ff006d0.jpg'
    );
    if (
      configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1
    ) {
      const phtoAttemptCount =
        configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture_attempt
          .value;
      let remainingAttempt = phtoAttemptCount - attemptNo;
      const messageTemplate = ui.translations.status.idNotVerify;
      const attemptNumber = `${remainingAttempt.toString()}`;
      const message = utility.replacePlaceholders(messageTemplate, { number: attemptNumber });
      stepUIManager.insertText('thinkX_attemptVerify', message);
    }
  }

  /**
   *
   * @param url1
   * @param url2
   */
  // showFailIcon(
  //   url_2 = '',
  //   id: string,
  //   addImgID: string,
  //   showErrorIcon: string,
  //   statusID: string,
  //   successID: string
  // ) {
  //   ui.show(ui.id(id));
  //   ui.addClass(ui.id(id), 'error');
  //   ui.show(ui.id(showErrorIcon));
  //   ui.hide(ui.id(successID));
  //   stepUIManager.insertText(statusID, ui.translations.status.FM);
  //   if (url_2) stepUIManager.srcInsert(addImgID, url_2);
  // }

  /**
   *
   * @param url1
   * @param url2
   */
  showSuccessIcon(id: string, url2 = '', addImgID: string) {
    ui.addClass(ui.id(id), 'thinkx_success');
    if (url2) stepUIManager.srcInsert(addImgID, url2);
  }

  setCapturePhoto(url: string) {
    if (url) stepUIManager.srcInsert('thinkX_candidateImgContainer', url);
  }

  registerPhotoError(response: any) {
    const { register_photo } = response.data;

    this.setFailIcon(
      register_photo,
      'thinkX_verify_registerPhoto',
      'thinkX_verify_registerPhoto_photo',
      'thinkX_verify_registerPhoto_error',
      'thinkX_verify_registerPhoto_status',
      'thinkX_verify_registerPhoto_success'
    );
    this.setCapturePhoto(register_photo.url_1);
  }

  registerPhotoSuccess(response: any) {
    const { register_photo } = response.data;
    this.setSuccessIcon(
      'thinkX_verify_registerPhoto_success',
      'thinkX_verify_registerPhoto',
      'thinkX_verify_registerPhoto_status',
      'thinkX_verify_registerPhoto_error'
    );
    this.showSuccessIcon(
      'thinkX_verify_registerPhoto',
      register_photo.url_2,
      'thinkX_verify_registerPhoto_photo'
    );
    this.setCapturePhoto(register_photo.url_1);
  }

  registerIdError(response: any) {
    const { register_id } = response.data;
    this.setFailIcon(
      register_id,
      'thinkX_verify_registerID',
      'thinkX_verify_registerPhoto_ID',
      'thinkX_verify_registerID_error',
      'thinkX_verify_registerID_status',
      'thinkX_verify_registerID_success'
    );
    this.setCapturePhoto(register_id.url_1);
  }

  registerIdSuccess(response: any) {
    const { register_id } = response.data;
    this.setSuccessIcon(
      'thinkX_verify_registerID_success',
      'thinkX_verify_registerID',
      'thinkX_verify_registerID_status',
      'thinkX_verify_registerID_error'
    );
    this.showSuccessIcon(
      'thinkX_verify_registerID',
      register_id.url_2,
      'thinkX_verify_registerPhoto_ID'
    );
    this.setCapturePhoto(register_id.url_1);
  }

  registerIdCaptureError(response: any) {
    const { capture_id } = response.data;
    this.setFailIcon(
      capture_id,
      'thinkX_verify_captureID',
      'thinkX_verify_captureID_id',
      'thinkX_verify_captureID_error',
      'thinkX_verify_captureID_status',
      'thinkX_verify_captureID_success'
    );
    this.setCapturePhoto(capture_id.url_1);
  }

  registerIdCaptureSuccess(response: any) {
    const { capture_id } = response.data;
    this.setSuccessIcon(
      'thinkX_verify_captureID_success',
      'thinkX_verify_captureID',
      'thinkX_verify_captureID_status',
      'thinkX_verify_captureID_error'
    );
    this.showSuccessIcon('thinkX_verify_captureID', capture_id.url_2, 'thinkX_verify_captureID_id');
    this.setCapturePhoto(capture_id.url_1);
  }

  waitingForCompare() {
    ui.show(ui.id('thinkproc_body_compare'));
    ui.hide(ui.id('thinkX_candidateImgContainer'));
    ui.hide(ui.id('thinkX_rescan'));
    ui.show(ui.id('thinkX_verifyWrap'));
    ui.show(ui.id('thinkX_loaderWrap'));
    ui.show(ui.id('thinkX_loaderCompare'));
    ui.hide(ui.id('thinkX_failCompare'));
    ui.hide(ui.id('thinkX_successCompare'));
    const id = ui.id('thinkproc_body_compare');
    ui.addClass(id, 'h100');
    const registerPhoto = ui.id('thinkX_verify_registerPhoto');
    ui.removeClass(registerPhoto, 'thinkx_success');
    ui.removeClass(registerPhoto, 'thinkx_error');
    const registerId = ui.id('thinkX_verify_registerID');
    ui.removeClass(registerId, 'thinkx_success');
    ui.removeClass(registerId, 'thinkx_error');
    const captureId = ui.id('thinkX_verify_captureID');
    ui.removeClass(captureId, 'thinkx_success');
    ui.removeClass(captureId, 'thinkx_error');
    ui.hide(ui.id('thinkX_profileContainer'));
    ui.hide(ui.id('thinkX_idVerifyWarning'));
    ui.hide(ui.id('thinkX_imgContainer'));

    stepUIManager.srcBlank('thinkX_verify_registerPhoto_photo');
    stepUIManager.srcBlank('thinkX_verify_registerPhoto_ID');
    stepUIManager.srcBlank('thinkX_verify_captureID_id');
  }

  revokeView() {
    ui.show(ui.id('thinkX_imgContainer'));
    ui.show(ui.id('thinkX_verifyWrap'));
    ui.show(ui.id('thinkX_failCompare'));
    ui.hide(ui.id('thinkX_rescanBtn'));
    ui.show(ui.id('thinkX_loaderWrap'));
    ui.hide(ui.id('thinkX_profileContainer'));
    ui.hide(ui.id('thinkX_loaderCompare'));
    const id = ui.id('thinkproc_body_compare');
    ui.removeClass(id, 'h100');
    ui.hide(ui.id('thinkX_idVerifyWarning'));
    ui.show(ui.id('thinkX_closeBtn'));
    stepUIManager.insertText('thinkX_loaderWrapText', ui.translations.status.allAttemptUsed);
  }

  fullMatchView() {
    ui.show(ui.id('thinkX_imgContainer'));
    ui.show(ui.id('thinkX_verifyWrap'));
    ui.show(ui.id('thinkX_loaderWrap'));
    ui.hide(ui.id('thinkX_loaderCompare'));
    const id = ui.id('thinkproc_body_compare');
    ui.removeClass(id, 'h100');
    ui.show(ui.id('thinkX_successCompare'));
    ui.hide(ui.id('thinkX_rescan'));
    ui.hide(ui.id('thinkX_profileContainer'));
    ui.hide(ui.id('thinkX_idVerifyWarning'));
    ui.hide(ui.id('thinkX_verify_registerPhoto_error'));
    ui.hide(ui.id('thinkX_verify_registerID_error'));
    ui.hide(ui.id('thinkX_verify_captureID_error'));
    stepUIManager.insertText('thinkX_loaderWrapText', ui.translations.status.verifySuccess);
  }

  completeView() {
    const {
      auth_reg_id: { value: auth_reg_id },
      auth_reg_photo: { value: auth_reg_photo },
      auth_capture_id: { value: auth_capture_id },
    } = configrationManager.valueMap.candidate_authentication.data;
    this.fullMatchView();
    ui.addClass(ui.id('thinkX_verify_registerPhoto'), 'thinkx_success');
    ui.removeClass(ui.id('thinkX_verify_registerPhoto'), 'thinkx_error');
    ui.show(ui.id('thinkX_verify_registerPhoto_success'));
    ui.show(ui.id('thinkX_verify_registerPhoto'));
    stepUIManager.insertText('thinkX_verify_registerPhoto_status', ui.translations.status.matched);
    ui.addClass(ui.id('thinkX_verify_registerID'), 'thinkx_success');
    ui.removeClass(ui.id('thinkX_verify_registerID'), 'thinkx_error');
    ui.show(ui.id('thinkX_verify_registerID_success'));
    stepUIManager.insertText('thinkX_verify_registerID_status', ui.translations.status.matched);
    ui.addClass(ui.id('thinkX_verify_captureID'), 'thinkx_success');
    ui.removeClass(ui.id('thinkX_verify_captureID'), 'thinkx_error');
    ui.show(ui.id('thinkX_verify_captureID_success'));
    // ui.hide(ui.id('thinkX_verify_registerID_error'));
    stepUIManager.insertText('thinkX_verify_captureID_status', ui.translations.status.matched);
    if (auth_reg_id == 0) {
      ui.hide(ui.id('thinkX_verify_registerID'));
    }
    if (auth_reg_photo == 0) {
      ui.hide(ui.id('thinkX_verify_registerPhoto'));
    }
    if (auth_capture_id == 0) {
      ui.hide(ui.id('thinkX_verify_captureID'));
    }
  }

  rejectView(message: string) {
    this.fullMatchView();
    ui.hide(ui.id('thinkX_successCompare'));
    ui.show(ui.id('thinkX_failCompare'));
    ui.show(ui.id('thinkX_verify_captureID_error'));
    ui.show(ui.id('thinkX_rejectReason'));
    ui.hide(ui.id('thinkX_verify_captureID_success'));
    ui.removeClass(ui.id('thinkX_verify_captureID'), 'thinkx_success');
    ui.addClass(ui.id('thinkX_verify_captureID'), 'thinkx_error');
    // ui.show(ui.id('thinkX_verify_registerID_error'));
    const registerPhotoEl = ui.id('thinkX_verify_registerPhoto');
    if (registerPhotoEl && registerPhotoEl.classList.contains('thinkx_error')) {
      ui.show(ui.id('thinkX_verify_registerPhoto_error'));
    }
    const registerIDEl = ui.id('thinkX_verify_registerID');
    if (registerIDEl && registerIDEl.classList.contains('thinkx_error')) {
      ui.show(ui.id('thinkX_verify_registerID_error'));
    }
    stepUIManager.insertText('thinkX_loaderWrapText', ui.translations.status.rejectText);
    stepUIManager.insertText('thinkX_verify_captureID_status', ui.translations.status.FM);
    stepUIManager.insertText('thinkX_rejectReason', message);
    ui.show(ui.id('thinkX_closeBtn'));
  }

  capturePhotoCaptureSuccess(image: any) {
    this.setSuccessIcon(
      'thinkX_verify_capturePhoto_success',
      'thinkX_verify_capturePhoto',
      'thinkX_verify_capturePhoto_status',
      'thinkX_verify_capturePhoto_error'
    );
    this.showSuccessIcon('thinkX_verify_capturePhoto', image, 'thinkX_verify_capturePhoto_id');
    this.setCapturePhoto(image);
    ui.removeClass(ui.id('thinkX_verify_capturePhoto'), 'thinkx_success');
  }
}

export const idVerifyUI = new IdVerifyUI();
