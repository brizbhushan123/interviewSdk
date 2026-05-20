import utility from './Utility';
// import * as tf from "@tensorflow/tfjs";
// import ui from '../ui/UiManager';
import { environment } from '../config/environment';
import { configrationManager } from './ConfigrationManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import { LiveStreamManager } from './LiveStreamManager';
import { chat } from './ChatManager';
/**
 *
 */
class AIManager {
  frameRate: number;
  thinkAi: any = null;
  token: string =
    'HpYQSPxnv1/t312MSYJM4jbAF70h1a0BhTmdh+irLaGhKhyIb5g4bqYY7zCZf01IoAqZ+mawfFoncLf7VfxxLn453HuHb38SRTk1yMTMQ2RoAnrXi7ZG01IEWv9Ix6LL+KD6kdVG6JRMuFvaV2yfYp+ntEiCYP8K9bkEKbAaA/s=';
  /**
   *
   */
  constructor() {
    this.frameRate = 0;
  }

  /**
   *
   */
  setFrameRate(frame: number) {
    this.frameRate = frame;
  }

  /**
   *
   */
  async loaddata() {
    try {
      // await tf.setBackend('webgl').catch(err => {
      //      utility.error('Failed to set WebGL backend, falling back to CPU:', err);
      //      tf.setBackend('cpu');
      //  });
      const module = await import(`${environment.THINK_AI}?v=${Date.now()}`);
      utility.log(module);
      this.thinkAi = module.thinkXai;
      this.aiLoaded((message: any) => {
        console.log("AI Loaded Message:", message);
      });
      // utility.log(this.thinkAi);
    } catch (error) {
      utility.log(error);
    }
  }

  /**
   *
   * @param video
   * @param callback
   */
  idVerify(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.faceDetection(video, 'id', this.token, function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param video
   * @param callback
   */
  photoVerify(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.faceDetection(video, 'profile', this.token, function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param video
   * @param callback
   */
  roomVerify(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.roomScan(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }

  /**
   *
   * @param video
   * @param callback
   */
  leftProfile(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.leftProfile(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }

  /**
   *
   * @param video
   * @param callback
   */
  rightProfile(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.rightProfile(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }

  /**
   *
   * @param video
   * @param callback
   */
  handGesture(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.handGesture(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }

  deskScan(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.deskScan(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }

  examAI(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.examination(
      video,
      this.token,
      configrationManager.base64Snapshot,
      function (message: any) {
        callback(message);
      }
    );
  }

  stopExamination(callback: Function) {
    return this.thinkAi.stopExamination(function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param callback
   */
  stopPhotoAndID() {
    return new Promise((resolve)=>{
      let resolved = false;
        this.thinkAi.stopFaceDetection(function (message: any) {
           if(message?.status_code == 200){
              resolved = true;
              resolve(message);
           }
        });
        utility.wait(2000).then(() => {
          if (!resolved) {
            resolve({status_code: 200, message: 'Stopped successfully'});
          }
        });
    });
  }

  /**
   *
   * @param callback
   */
  stopRoomScan(callback: Function) {
    return this.thinkAi.stopRoomScan(function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param callback
   */
  stopLeftProfile(callback: Function) {
    return this.thinkAi.stopLeftProfile(function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param callback
   */
  stopRightProfile(callback: Function) {
    return this.thinkAi.stopRightProfile(function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param callback
   */
  stopHandGesture(callback: Function) {
    return this.thinkAi.stopHandGesture(function (message: any) {
      callback(message);
    });
  }

  /**
   *
   * @param callback
   */
  stopDeskScan(end: number = 0, callback: Function) {
    return this.thinkAi.stopDeskScan(end, function (message: any) {
      callback(message);
    });
  }

  secondaryCameraPosition(video: HTMLVideoElement, cameraName: string, callback: Function) {
    return this.thinkAi.secondaryCameraPosition(
      video,
      this.token,
      this.frameRate,
      cameraName,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }
  stopSecondaryCameraPosition(callback: Function) {
    return this.thinkAi.stopSecondayCameraPosition(function (message: any) {
      callback(message);
    });
  }
  secondaryCameraPositionValidate(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.secondaryCameraPositionValidate(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }
  stopSecondaryCameraPositionValidate(callback: Function) {
    return this.thinkAi.stopSecondaryCameraPositionValidate(function (message: any) {
      callback(message);
    });
  }

  //Smart Proctor AI start
  getUFMCode(ufmType: string, codeArr: number[]): Promise<number> {
    return new Promise((resolve) => {
      let i = 0;
      if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
        if (ufmType == "MFD") {
          resolve(254); // MFD always 254 
          return;
        }
        if (ufmType == "FNP") {
          resolve(253); // FNP always 253
          return;
        }
        if (ufmType == "OD") {
          resolve(259); // OD always 259
          return;
        }
      }

      if (codeArr == undefined) {
        resolve(0); // no match found
        return;
      }

      const next = () => {
        if (Array.isArray(codeArr) && i >= codeArr.length) {
          resolve(0); // no match found
          return;
        }
        let code = null;
        if (Array.isArray(codeArr)) {
          code = codeArr[i++];
        } else {
          code = codeArr;
          resolve(code);
          return;
        }

        this.thinkAi.master_ufm(code, (message: any) => {
          if (message && message.UFM === ufmType) {
            resolve(code); // match found, resolve Promise
          } else {
            next(); // keep looping until match or end
          }
        });
      };

      next();
    });
  }

  getSmartProctorUFM(data: any) {
    const token = this.token;
    const candidate_name = configrationManager.currentCandidateName; //configrationManager.candidateName;
    const ufm_code = data.ufm_code;
    const msg_type = data.status;
    const cs_value = data.cs_score;
    const suspension_score_value = data.suspension_score;
    const termination_score_value = data.termination_score;
    const deduction_point = data.deduction_point;
    const language = configrationManager.language;
    //utility.log("getSmartProctorUFMFunction=============",data, LiveStreamManager.PRIMARY_CAMERA_NAME, configrationManager.previous_instance_escalated, configrationManager.smartProctorEnable)
    const object_array = data.ufm_subtype;
    if (ufm_code != 0 || msg_type == 'welcome_msg' || msg_type == 'relogin') {
      try {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
          && configrationManager.previous_instance_escalated == false
          && configrationManager.smartProctorEnable == 1) {
          utility.log("smart_proctor_ufm_request=============", data)
          this.thinkAi.smart_proctor_ufm_response(
            token,
            candidate_name,
            ufm_code,
            msg_type,
            language,
            cs_value,
            suspension_score_value,
            termination_score_value,
            deduction_point,
            object_array,
            (response: any) => {
              //resolve(responseCode); // success
              utility.log("smart_proctor_ufm_response=============", response)
              sdkEvents.trigger(SDK_EVENT.SMART_PROCTOR_MSG, response);
            }
          );
        } else if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM'
          && configrationManager.previous_instance_escalated == false
          && configrationManager.smartProctorEnable == 1) {
          sdkEvents.trigger(SDK_EVENT.SECONDARY_CAM_UFM, data);
        }
      } catch (err) { }
    }
  }

  getSmartProctorCandidateMsg(msg: string) {
    const token = this.token;
    try {
      this.thinkAi.smart_proctor_candidate_query_msg(
        token,
        msg,
        (response: any) => {
          //resolve(responseCode); // success
          utility.log("smart_proctor_candidate_query_msg=============", response)
          sdkEvents.trigger(SDK_EVENT.SMART_PROCTOR_MSG, response);
        }
      );
    } catch (err) { }
  }
  //Smart Proctor AI END

  // Monitering Side AI strat
  secondaryCameraSideMonitoring(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.secondaryCameraSideMonitoring(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }
  stopSecondaryCameraSideMonitoring(callback: Function) {
    return this.thinkAi.stopSecondaryCameraSideMonitoring(function (message: any) {
      callback(message);
    });
  }

  // Monitering Back AI strat
  secondaryCameraBackMonitoring(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.secondaryCameraBackMonitoring(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }

  stopSecondaryCameraBackMonitoring(callback: Function) {
    return this.thinkAi.stopSecondaryCameraBackMonitoring(function (message: any) {
      callback(message);
    });
  }

  //Monitering Front AI strat
  secondaryCameraFrontMonitoring(video: HTMLVideoElement, callback: Function) {
    return this.thinkAi.secondaryCameraFrontMonitoring(
      video,
      this.token,
      this.frameRate,
      function (message: any, image: any) {
        callback(message, image);
      }
    );
  }
  stopSecondaryCameraFrontMonitoring(callback: Function) {
    return this.thinkAi.stopSecondaryCameraFrontMonitoring(function (message: any) {
      callback(message);
    });
  }

  aiLoaded(callback: Function) {
    return this.thinkAi.load_models(function (message: any) {
      callback(message);
    });
  }
  // Monitering AI end

}

export const ai = new AIManager();
