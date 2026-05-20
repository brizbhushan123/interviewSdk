import { Init } from '../ui/Init';
import { ai } from './AIManager';
import api from './APIManager';
import { configrationManager } from './ConfigrationManager';
import { ErrorDefinition, errorManager } from './ErrorManager';
import request from './RequestManager';
import { ufmM } from './UfmManager';
import utility from './Utility';
import { socket } from './SocketManager';
import { LiveStreamManager, liveStreamManager } from './LiveStreamManager';
import { secondaryCamUI } from '../ui/featuresUI/SecondaryCamUI';
import { stepManager } from './StepsManager';
import { stepUIManager } from './StepUIManager';
import { peer } from './PeerConnectionManager';
import { chat } from './ChatManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';

// Define a clean sessionInfo type
export interface SessionInfo {
  sessionToken: string;
}

export interface ThinkProctorOptions {
  api_key: string;
  sdk_token: string;
  unique_user_id: string;
  user_name: string;
  group_code: string;
  group_name: string;
  template_code: string;
  language: string;
  registration_id_url: string;
  registration_photo_url: string;
  session_token?: string
}

// Full response returned from validate()
export interface ValidatorResponse {
  sessionInfo: SessionInfo;
  config?: { [key: string]: any };
  template?: any;
  language?: string;
}

/**
 *
 */
class Authenticator {
  /**
   *
   */
  constructor() { }

  /**
   *
   * @param options
   * @param success
   * @param error
   */
  async validate(
    options: ThinkProctorOptions,
    success = (response: ValidatorResponse) => { },
    error = (error: ErrorDefinition) => { }
  ): Promise<any> {
    const { registration_id_url, registration_photo_url, api_key, group_code, unique_user_id } =
      options;

    if (api_key == '') {
      error(errorManager.getError('VALIDATION', 'MISSING_API_KEY'));
      return;
    }
    if (group_code == '') {
      error(errorManager.getError('VALIDATION', 'MISSING_GROUP_CODE'));
      return;
    }
    if (unique_user_id == '') {
      error(errorManager.getError('VALIDATION', 'MISSING_UNIQUE_USER_ID'));
      return;
    }

    if (registration_id_url !== '') {
      const isValid = await configrationManager.isValidAndReachableImageUrl(registration_id_url);
      if (!isValid) {
        utility.log('Invalid or unreachable registration_id_url');
        error(errorManager.getError('ERROR', 'INVALID_ID_IMAGES'));
        return;
      }
    }

    if (registration_photo_url !== '') {
      const isValid = await configrationManager.isValidAndReachableImageUrl(registration_photo_url);
      if (!isValid) {
        utility.log('Invalid or unreachable registration_photo_url');
        error(errorManager.getError('ERROR', 'INVALID_PHOTO_IMAGES'));
        return;
      }
    }
    if (options.session_token) {
      configrationManager.firstLogin = false;
    }

    request
      .sdkInitialize(options)
      .then(async (response) => {
        const res = response.data;
        api.setToken(res.session_token);
        const config = utility.decodeBase64(res.config);
        const configDecode: { [key: string]: any } = JSON.parse(config);
        configrationManager.setConfig(configDecode);
        configrationManager.userType = res.user_type.toString();
        configrationManager.userId = res.user_id;
        configrationManager.sessionIdRec = res.sessionId;
        configrationManager.instanceIdRec = res.instanceId;
        configrationManager.interviwerJoiningTime = res.interviwerJoiningTime;
        configrationManager.extractValueAndData(res.template);
        configrationManager.setTemplateData();
        configrationManager.setCandidateDetail(res.candidate_details);
        configrationManager.setInterviewDetails(res.interviewer_details);
        ufmM.UfmSubTypes(res.ufm_sub_type);
        ufmM.setCaptureTime(res.ufm_capture_time);
        ai.setFrameRate(res.ai_frame_rate);
        configrationManager.saveLang(res.language);
        configrationManager.socketUser(res.socketUserName);
        configrationManager.previous_instance_escalated = res.previous_instance_escalated;
        configrationManager.socketRoom(res.socketRoomName);
        configrationManager.currentCandidateName = res.user_name;
        configrationManager.candidateRegisterURL = res.candidate_registered_photo;
        configrationManager.link_status = res.link_status;
        configrationManager.transcriptCode = res.transcriptCode;
        configrationManager.currentLang = res.language;
        configrationManager.termsAndConditionsLink = res.termsLink;
        configrationManager.privacyStatementLink = res.privacyLink;
        // configrationManager.speechURL(res.speechURL);
        const data: ValidatorResponse = {
          sessionInfo: { sessionToken: res.session_token },
          config: res.config,
          template: res.template,
          language: res.language,
        };
        const init = new Init();
        await init.loadPage(res.language);
        socket.Init(configrationManager.signal_node_url, res.session_token);
        peer.Init();
        sdkEvents.on(SDK_EVENT.SOCKET_CONNECTED, () => {
          chat.join();
        });
        liveStreamManager.setSocketEvents();
        success(data);
      })
      .catch((apiError) => {
        utility.error(apiError);
        error(errorManager.getError('Error', 'SDK'));
      });
  }

  async secondaryCameraConnect(
    session_token: string,
    camera: string,
    step: string,
    current_env_alias: string,
    link_data: string
  ) {
    await utility.wait(this.getRandomDelay());
    return new Promise((resolve, reject) => {
      api.setToken(session_token);
      let data = {
        camera_type: camera,
        link_data: link_data
      };
      configrationManager.qrId = link_data;
      request
        .secondaryCameraConnect(data)
        .then(async (response) => {
          const res = response.data;
          const config = utility.decodeBase64(res.config);
          const configDecode: { [key: string]: any } = JSON.parse(config);
          configrationManager.setConfig(configDecode);
          configrationManager.userType = res.user_type.toString();
          configrationManager.userId = res.user_id;
          configrationManager.interviwerJoiningTime = res.interviwerJoiningTime;
          configrationManager.sessionIdRec = res.sessionId;
          configrationManager.instanceIdRec = res.instanceId;
          configrationManager.extractValueAndData(res.template);
          configrationManager.setTemplateData();
          ufmM.UfmSubTypes(res.ufm_sub_type);
          ufmM.setCaptureTime(res.ufm_capture_time);
          ai.setFrameRate(res.ai_frame_rate);
          configrationManager.saveLang(res.language);
          configrationManager.socketUser(res.socketUserName);
          configrationManager.socketRoom(res.socketRoomName);
          configrationManager.candidateNameMsg = 'candidate_camera';
          configrationManager.transcriptCode = res.transcriptCode;
          const init = new Init();
          await init.loadPage(res.language, true);

          LiveStreamManager.PRIMARY_CAMERA_NAME = camera;
          ai.loaddata();
          stepManager.beforeUnload();
          stepManager.blur();
          stepManager.onFocus();
          stepUIManager.init(stepManager);
          stepManager.offTabCamera(camera, step, current_env_alias);
          socket.Init(configrationManager.signal_node_url, res.session_token);
          peer.Init();
          sdkEvents.on(SDK_EVENT.SOCKET_CONNECTED, () => {
            chat.join();
          });
          liveStreamManager.setCameraRevokeCallback(function () {
            stepManager.getCurrentStepObject().cameraRevoke();
          });
          liveStreamManager.setSocketEvents();
          utility.wait(2000).then(() => {
            stepManager.next();
          });
          // let stream ;
          // if(camera == 'RS_CAM'){
          //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.ROOM_CAMERA, 'enviroment');
          // }else if(camera == 'B_CAM'){
          //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.BACK, 'enviroment');
          // }else if(camera == 'F_CAM'){
          //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.FRONT, 'enviroment');
          // }else if(camera == 'S_CAM'){
          //   stream = await liveStreamManager.getCameraStream(LiveStreamManager.CAMERA.SIDE, 'enviroment');
          // }
          // if (typeof stream == 'boolean' || stream == null) {
          //    // Show error Message
          // }else{
          //   let video = secondaryCamUI.setStream(stream.stream);
          //   video?.play();
          // }

          sdkEvents.on(SDK_EVENT.USER_LEFT, function (user_name: string) {
            // if additional camera is open and candidate left from the session then close additional camera 
            const socketUserName = utility.extractPrefix(
              configrationManager.socketUserName,
              LiveStreamManager.PRIMARY_CAMERA_NAME
            );
            if (user_name == socketUserName && LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
              stepManager.closeApplication();
              utility.log('close additional camera');
            }
          });

          resolve(res);
        })
        .catch((apiError) => {
          utility.error(apiError);
          reject(errorManager.getError('Error', 'SDK_SECONDARY_CAMERA_CONNECT'));
          stepManager.closeApplication();
        });
    });
  }

  getRandomDelay(): number {
    const min = 1000;
    const max = 5000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export const authenticator = new Authenticator();
