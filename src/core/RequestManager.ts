import { data } from '@tensorflow/tfjs';
import api, { Files } from './APIManager';
import { ThinkProctorOptions } from './AuthenticatorManager';

/* Author : Prateek Jaiswal */

/**
 *
 */
class RequestManager {
  /* Sends a GET request to fetch data. */

  /**
   *
   */
  getExample(): Promise<any> {
    return api.get('/candidate/xyz');
  }

  /* Sends a POST request to submit data. */

  /**
   *
   * @param data
   */
  postExample(data: any): Promise<any> {
    return api.post('/candidate/postdata', data);
  }

  /* Sends a PUT request to update existing data. */

  /**
   *
   * @param data
   */
  putExample(data: any): Promise<any> {
    return api.put('/candidate/putdata', data);
  }

  /* Sends a DELETE request to remove data */

  /**
   *
   * @param data
   */
  deleteExample(): Promise<any> {
    return api.delete('/candidate/xyz');
  }

  /**
   *
   * @param data
   */
  sdkInitialize(data: ThinkProctorOptions): Promise<any> {
    return api.post('/initialize', data);
  }

  /**
   *
   * @param data
   */
  secondaryCameraConnect(data: { camera_type: string }): Promise<any> {
    return api.post('/autoLoginOnMobile', data);
  }

  /**
   *
   * @param data
   * @param data.environment
   */
  stageStart(data: { environment: string }): Promise<any> {
    return api.post('/stageStart', data);
  }

  /**
   *
   * @param data
   * @param data.environment
   * @param data.log
   */
  stageEnd(data: { environment: string; log: any }): Promise<any> {
    return api.post('/stageEnd', data);
  }

  /**
   *
   * @param data
   * @param data.environment
   * @param file
   */
  uploadIdAndPhoto(data: { environment: string }, file: Blob): Promise<any> {
    const image: Files = { name: 'file', File: file };
    const files = [image];

    return api.file('/capturePhotoIdentityCard', data, files);
  }

  /**
   *
   * @param data
   * @param data.attempt_no
   */
  compareIdAndPhoto(data: { attempt_no: number }) {
    return api.post('/verifyPhotoAndRegistrationId', data);
  }

  /**
   *
   * @param data
   * @param data.ufm_type
   * @param data.environment
   * @param data.attempt_no
   * @param file
   */
  ufmLog(
    data: {
      ufm_type: string;
      environment: string;
      attempt_no: number;
      cameraAngle: string;
      ufm_subtype: number;
      code: number;
      ufm_data: any;
      ufmLogEntry?: any;
    },
    file?: Blob
  ): Promise<any> {
    if (file) {
      const image: Files = { name: 'file', File: file };
      const files = [image];

      return api.file('/examUfmLog', data, files);
    } else {
      return api.post('/examUfmLog', data);
    }
  }

  regualarUfmLog(
    data: {
      environment: string;
      cameraAngle: string;
    },
    file?: Blob
  ): Promise<any> {
    if (file) {
      const image: Files = { name: 'file', File: file };
      const files = [image];

      return api.file('/regularSnapStart', data, files);
    } else {
      return api.post('/regularSnapStart', data);
    }
  }

  /**
   *
   * @param data
   * @param data.environment
   * @param data.attempt_no
   */
  getRoomUfmList(data: { environment: string; attempt_no: number,requestufmOnly: number  }): Promise<any> {
    return api.post('/getRoomUfmList', data);
  }

  getAudio(data: { text: string; language_code: string, unique_key: string, direct: number }): Promise<any> {
    return api.post('/tts/synthesize', data);
  }

  QRCode(data: { camera_type: string; environment: string }) {
    return api.post('/generateCameraQrCode', data);
  }

  endExam(data: { environment: string }) {
    return api.post('/session/markCompleted', data);
  }

  checkSessionStatus(): Promise<any> {
    return api.get('/sessionStatusCandidate');
  }

  clearEscalation(): Promise<any> {
    return api.get('/clearEscalation');
  }

  getChat(): Promise<any> {
    return api.get('/chat');
  }

  sendChat(data: { is_message: number; message: string; environment: string; userType?: string }) {
    return api.post('/chat', data);
  }

  qrInactive(data: { link_data: string }){
    return api.post('/qrInactive', data);
  }

  checkCurrentQRstatus(data: { camera_type: string; environment: string }) {
    return api.post('/checkQrStatus', data);
  }

  deskOption(){
    return api.get('/deskOption');
  }

  updateDeskOption(data: { desk_option_id: number; desk_reason: string }) {
    return api.post('/updateDeskOption', data);
  }

  getFeedbackSkill() {
    return api.get('/getFeedbackList');
  }
  postFeedbackSkill(data: { functional: object; behavioural: object, description: string }) {
    return api.post('/saveFeedback', data);
  }

  getIdVerification(){
    return api.get('/getIdVerification');
  }

  getUfmList(){
    return api.get('/getUfmList');
  }

  updateIDEscalation(data: {is_approved : number}){
    return api.post('/sessionEcalationUpdate', data);
  }
}

const request = new RequestManager();

export default request;
