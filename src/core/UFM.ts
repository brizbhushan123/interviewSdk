import { ExamMonitor } from '../features/ExamMonitor';
import { ai } from './AIManager';
import { configrationManager } from './ConfigrationManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import request from './RequestManager';
import { socket } from './SocketManager';
import { stepManager } from './StepsManager';
import { ufmM } from './UfmManager';
import utility from './Utility';

export class Ufm {
  private mfd: any[] = [];
  private od: any[] = [];

  private odLabels = [
    'chair',
    'tv-monitor',
    'laptop',
    'cell phone',
    'book',
    'headphone',
    'earphone- neck_band',
    'earphone- true_wireless',
    'earphone- wired',
    'ring',
    'watch',
  ];

  ALL_UFM = ['MFD', 'FM', 'FNP', 'OD', 'VD', 'SFL', 'PR', 'LA'] ;
  INFORMATIVE_UFM_CODE = [258, 260, 261, 266, 261, 262, 263];

  MFD: boolean = false;
  FNP: boolean = false;
  FM: boolean = false;
  OD: boolean = false;
  VD: boolean = false;
  SFL: boolean = false;
  PR: boolean = false;
  LA: boolean = false;

  PHONE: number = 0;
  CHAIR: number = 0;

  log(data: any, elias: string, attempt_no: number, camera: string = '',imageBlob?: Blob, status_code?: any) {
    if (Array.isArray(data)){ 

      const detections = data;

      const personCount = detections.filter((item: string) => item === 'person').length;

      const otherCount = detections.filter((item: string) => item === 'other_person').length;

      const lookingAway = detections.filter((item: string) => item === 'looking_away').length;
      const statusCode = status_code;

      const ufmLogEntry = {
        Detection: detections,                                   // from data
        code: Array.isArray(statusCode) ? statusCode : [statusCode] // ensure always an array
      };
      
      //check INFORMATIVE UFM CODE 
      if(statusCode != undefined && statusCode != null && statusCode != ''){
        this.checkCodeIsInformative(Array.isArray(statusCode) ? statusCode : [statusCode],data);
      }

      // For Multi Face detect  - MFD
      if (this.MFD && personCount > 1) {
        ai.getUFMCode("MFD", statusCode).then((code) => {
          this.getUfmApiCall('MFD', elias, attempt_no, camera,'',imageBlob, data, code,ufmLogEntry);
        });
      }

      // For No Face detect  - FNP
      if (this.FNP && personCount == 0) {
        ai.getUFMCode("FNP", statusCode).then((code) => {
          this.getUfmApiCall('FNP', elias, attempt_no, camera,'',imageBlob, data, code,ufmLogEntry);
        });
      }
      
      if (this.FM && personCount == 1 && otherCount > 0) {
        ai.getUFMCode("FM", statusCode).then((code) => {
          this.getUfmApiCall('FM', elias, attempt_no, camera,'',imageBlob, data, code,ufmLogEntry);
        });
      }

      if (this.LA && lookingAway > 0) {
        ai.getUFMCode("LA", statusCode).then((code) => {
          this.getUfmApiCall('LA', elias, attempt_no, camera,'',imageBlob, data, code,ufmLogEntry);
        });
      }

      const hasODLabel = detections.some((item: string) => this.odLabels.includes(item));
     
      if (this.OD && hasODLabel) {
        const chair = detections.filter((item: string) => item === 'chair').length;
        const headphone = detections.filter((item: string) => item === 'headphone').length;
        const laptop = detections.filter((item: string) => item === 'laptop').length;
        const phone = detections.filter((item: string) => item === 'cell phone').length;
        const book = detections.filter((item: string) => item === 'book').length;
        const ring = detections.filter((item: string) => item === 'ring').length;
        const watch = detections.filter((item: string) => item === 'watch').length;
        const tv = detections.filter((item: string) => item === 'tv-monitor').length;

        if (chair > this.CHAIR) {
          ai.getUFMCode("OD", statusCode).then((code) => {
            this.getUfmApiCall('OD', elias, attempt_no, camera, 'chair',imageBlob, data, code,ufmLogEntry);
          });
          return;
        }
        if (headphone > 0 && this.VD) {
          ai.getUFMCode("OD", statusCode).then((code) => {
            this.getUfmApiCall('OD', elias, attempt_no, camera, 'headphone',imageBlob, data, code,ufmLogEntry);
          });
          return;
        }

        if (laptop + tv > 1) {
          if (laptop > 1) {
            ai.getUFMCode("OD", statusCode).then((code) => {
              this.getUfmApiCall('OD', elias, attempt_no, camera, 'laptop',imageBlob, data, code,ufmLogEntry);
            });
            return;
          }
          if (tv > 1) {
            ai.getUFMCode("OD", statusCode).then((code) => {
              this.getUfmApiCall('OD', elias, attempt_no, camera, 'tv_monitor',imageBlob, data, code,ufmLogEntry);
            });
            return;
          }
          if (tv == 1 && laptop == 1) {
            ai.getUFMCode("OD", statusCode).then((code) => {
              this.getUfmApiCall('OD', elias, attempt_no, camera, 'tv_monitor',imageBlob, data, code,ufmLogEntry);
            });
            return;
          }
        }
        if (phone > this.PHONE) {
          ai.getUFMCode("OD", statusCode).then((code) => {
            this.getUfmApiCall('OD', elias, attempt_no, camera, 'cell_phone',imageBlob, data, code,ufmLogEntry);
          });
          return;
        }
        if (book > 0) {
          ai.getUFMCode("OD", statusCode).then((code) => {
            this.getUfmApiCall('OD', elias, attempt_no, camera, 'book',imageBlob, data, code,ufmLogEntry);
          });
          return;
        }
        if (ring > 0) {
          ai.getUFMCode("OD", statusCode).then((code) => {
            this.getUfmApiCall('OD', elias, attempt_no, camera, 'ring',imageBlob, data, code,ufmLogEntry);
          });
          return;
        }
        if (watch > 0) {
          ai.getUFMCode("OD", statusCode).then((code) => {
            this.getUfmApiCall('OD', elias, attempt_no, camera, 'watch',imageBlob, data, code,ufmLogEntry);
          });
          return;
        }
        // if (tv > 0) {
        //     this.getUfmApiCall('OD', imageBlob, elias, attempt_no, "", ufmM.objectId.tv);
        // }
      }
    } else if (typeof data === 'string') {
        const ufmLogEntry = {
          Detection: data,
          code: Array.isArray(status_code) ? status_code : [status_code]
        };
        if (this.SFL && data == 'SFL') {
          this.getUfmApiCall('SFL', elias, attempt_no, camera,'', imageBlob, data, 276,ufmLogEntry);
          return;
        }

        if (this.VD && data == 'VD') {
          this.getUfmApiCall('VD', elias, attempt_no, camera,'', imageBlob, data, 275,ufmLogEntry);
          return;
        }

        if (this.PR && data == 'PR') {
          // Ensure code is always a number
          const normalizedCode = Array.isArray(status_code) ? status_code[0] : status_code;
          this.getUfmApiCall('PR', elias, attempt_no, camera,'', imageBlob, data, normalizedCode, ufmLogEntry);
          return;
        }
    }
  }

  /**
   *
   *@param ufmType
   *@param imageBlob
   *@param elias
   *@param attempt_no
   */
  async getUfmApiCall(
    ufmType: string,
    elias: string,
    attempt_no: number,
    cameraAngle: string,
    ufm_subtype: string = '' ,
    imageBlob?: Blob,
    data?: any,
    code?: number,
    ufmLogEntry?: any
  ) {
    let objectId = 0;
    if (ufmM.objectId.hasOwnProperty(ufm_subtype)) {
      objectId = ufmM.objectId[ufm_subtype as keyof typeof ufmM.objectId];

      let time = ufmM.track[ufm_subtype as keyof typeof ufmM.track];
      let newtime = new Date();

      const diffInSeconds = (newtime.getTime() - new Date(time).getTime()) / 1000;

      if (diffInSeconds > ufmM.captureTime) {
        ufmM.track[ufm_subtype as keyof typeof ufmM.track] = newtime;
      } else {
        return;
      }
    }

    if (ufmM.track.hasOwnProperty(ufmType)) {
      let time = ufmM.track[ufmType as keyof typeof ufmM.track];
      let newtime = new Date();

      const diffInSeconds = (newtime.getTime() - new Date(time).getTime()) / 1000;

      if (diffInSeconds > ufmM.captureTime) {
        ufmM.track[ufmType as keyof typeof ufmM.track] = new Date();
      } else {
        return;
      }
    }


    const ufmLogEntryToSend = ufmLogEntry || []; // default empty array
    const response = await this.sendUfmData(
      ufmType,
      elias,
      attempt_no,
      cameraAngle,
      objectId,
      code,
      imageBlob,
      data,
      ufmLogEntryToSend
    );
    
    let obj = configrationManager.currentStepObject;
    if (configrationManager.currentStepAlias === 'Exam_Session') {
      if (response.code === 2105) {
        sdkEvents.trigger(SDK_EVENT.UFM_SUSPEND, response);
      }
      if (response.code === 2106) {
        sdkEvents.trigger(SDK_EVENT.UFM_TERMINATE, response);
      }
      if(response.code === 2107){
        sdkEvents.trigger(SDK_EVENT.USER_ESCALTED, response);
      }

      if(response.code === 2000){
        configrationManager.userEscaltedPara = 1;
      }

      if(response.data.cs_score != ""){
        let msg = { mode: 'credibility_update', text: response.data.cs_score };
        socket.sendRoomMessage(msg);
      }

      if(response.data && !Array.isArray(response.data) && 
        response.data.status && response.data.status !== ""){
        
        const res = response.data;
        ai.getSmartProctorUFM({
          status: res.status,
          ufm_type: res.ufm_type,
          ufm_code: res.ufm_code,              // use from API response if available
          cs_score: res.cs_score,
          suspension_score: res.suspension_score,
          termination_score: res.termination_score,
          deduction_point: res.score_deduct,
          object_array : data,
          ufm_subtype: [ufm_subtype]
        });
        
      }
    }
  }

  async sendUfmData(
    ufmType: string,
    env: string,
    attempt_no: number,
    camAngle: string,
    ufm_subtype: number,
    code: number = 0,
    imageBlob?: Blob,
    data?: any,
    ufmLogEntry?: any // <-- allow object/array
  
  ) {

    return await request.ufmLog(
      {
        ufm_type: ufmType,
        environment: env,
        attempt_no: attempt_no,
        cameraAngle: camAngle,
        ufm_subtype: ufm_subtype,
        code: code,
        ufm_data: data,
        ufmLogEntry: ufmLogEntry ? JSON.stringify(ufmLogEntry) : JSON.stringify([]),
      },
      imageBlob
    );
  }

  regularUfmData(env: string, camAngle: string, imageBlob?: Blob) {
    request
      .regualarUfmLog(
        {
          environment: env,
          cameraAngle: camAngle,
        },
        imageBlob
      )
      .then((response) => {
        utility.log('✅ ufm uploaded success', response);
      })
      .catch((error) => {
        utility.log('❌ ufm uploaded failed', error);
      });
  }

  endTest(env: string) {
    request
      .endExam({ environment: env })
      .then((response) => {
        utility.log('✅ Exam ended successfully', response);
      })
      .catch((error) => {
        utility.log('❌ Failed to end exam', error);
      });
  }

  async checkSessionStatus(env: string) {
    return await request.checkSessionStatus();
  }

  resetFlagsAndCounters(): void {
    this.MFD = true;
    this.FNP = true;
    this.FM = true;
    this.OD = true;
    this.VD = true;
    this.SFL = true;
    this.PR = true;

    this.PHONE = 0;
    this.CHAIR = 0;
  }

  checkCodeIsInformative(statusCodes: number[], data: any): void {
    if (configrationManager.smartProctorEnable === 1 && configrationManager.previous_instance_escalated === false) {
      // loop through all matches
      statusCodes.forEach(code => {
        if (this.INFORMATIVE_UFM_CODE.includes(code)) {  
          ai.getSmartProctorUFM({
            status: "notification",
            ufm_code: code,
            cs_score: 0,
            suspension_score: 0,
            termination_score: 0,
            deduction_point: 0,
            object_array: [],
          });
        }
      });
    }
  }
}
