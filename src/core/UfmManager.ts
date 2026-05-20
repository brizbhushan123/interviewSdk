import { roomUI } from '../ui/featuresUI/RoomUI';
import { configrationManager } from './ConfigrationManager';
import request from './RequestManager';
import utility from './Utility'; 
import { chat } from './ChatManager';
import { socket } from './SocketManager';

type UfmSubType = {
  id: number;
  name: string;
};

class UfmManager {
  captureTime: number;
  constructor() {
    this.captureTime = 0;
  }

  id = {
    MFD: 0,
    FNP: 0,
    FM: 0,
    OD: 0,
    VD: 0,
    SFL: 0,
    PR: 0,
    LA: 0
  };

  objectId: { [key: string]: number } = {
    tv_moniotr: 0,
    laptop: 0,
    cell_phone: 0,
    book: 0,
    headphone: 0,
    ring: 0,
    watch: 0,
    chair: 0,
  };

  track = {
    MFD: new Date(),
    FNP: new Date(),
    FM: new Date(),
    VD: new Date(),
    SFL: new Date(),
    PR: new Date(),
    LA: new Date(),
    tv_moniotr: new Date(),
    chair: new Date(),
    laptop: new Date(),
    cell_phone: new Date(),
    headphone: new Date(),
    book: new Date(),
    ring: new Date(),
    watch: new Date(),
  };

          assignNewProctorTimer: ReturnType<typeof setInterval> | null = null;
  proctorAssignTimeout: ReturnType<typeof setTimeout> | null = null;

  // syncObjectIdsFromConfig() {
  //     const allSubTypes = configrationManager.getAllSubTypes();

  //     for (const item of allSubTypes) {
  //     const normalizedName = item.name.replace(/[-\s]/g, '_');

  //     if (Object.prototype.hasOwnProperty.call(this.objectId, normalizedName)) {
  //         this.objectId[normalizedName] = item.id;
  //     }
  //     }
  // }

  UfmSubTypes(ufm_sub_type: any[]) {
    if (!Array.isArray(ufm_sub_type)) return;

    const byName: { [key: string]: UfmSubType } = {};
    const byId: { [key: number]: UfmSubType } = {};

    for (const item of ufm_sub_type) {
      if (item && typeof item === 'object' && 'id' in item && 'name' in item) {
        const normalizedName = item.name.replace(/[-\s]/g, '_'); // replaces '-' and space with '_'
        if (ufmM.objectId.hasOwnProperty(normalizedName)) {
          ufmM.objectId[normalizedName] = item.id;
        }
      }
    }
  }

  setCaptureTime(time: number) {
    this.captureTime = time;
  }

  async checkSessionStatus(): Promise<void> {
      request.checkSessionStatus().then((response) => {
          utility.log('✅ Session status checked successfully', response);
          const { remaining_time } = response.data;
          if (response.code === 2312) {
            //this.suspendCountdown(remaining_time);
          }
          if(response.data.proctor_found && response.data.proctor_user_name){
            socket.setProctor(response.data.proctor_user_name);
            if(remaining_time > 0 && remaining_time <= 60){
              chat.sendData('candidate_going_timer', remaining_time);
            }else if(remaining_time > 60){
              let nextRemindTime = remaining_time-60;
              if (this.assignNewProctorTimer !== null) {
                clearInterval(this.assignNewProctorTimer);
              }
              this.assignNewProctorTimer = setInterval(() => {
                  if (nextRemindTime > 0) {
                    nextRemindTime -= 1;
                  } else {
                    if (this.assignNewProctorTimer !== null) {
                      clearInterval(this.assignNewProctorTimer);
                    }
                    chat.sendData('candidate_going_timer', 60);
                  }
              },1000);
            }
            if(remaining_time != -1){
              if(remaining_time > 0){
                console.log("Remaining Time", remaining_time);
                this.checkStatusTimeout(remaining_time);
              }else{
                this.checkStatusTimeout(20);
              }
            }else{
              if(this.proctorAssignTimeout != null){
                clearTimeout(this.proctorAssignTimeout);
              }
            }
          }
          if(response.code === 2901){
            this.checkStatusTimeout(20);
          }
        })
        .catch((error) => {
          utility.log('❌ Failed to check session status', error);
        });
    }

    checkStatusTimeout(time:number){
      if(this.proctorAssignTimeout != null){
        clearTimeout(this.proctorAssignTimeout);
      }
      this.proctorAssignTimeout = setTimeout(() => {
        this.checkSessionStatus();
      }, time * 1000);
    }
    stopStatusCheck() {
      if (this.proctorAssignTimeout != null) {
        clearTimeout(this.proctorAssignTimeout);
      }
    }
}

export const ufmM = new UfmManager();
