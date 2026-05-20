import browserCheck from '../features/BrowserCheck';
import { screenCheck } from '../features/ScreenCheck';
import { cameraCheck } from '../features/CameraCheck';
import { micCheck } from '../features/MicCheck';
import { networkCheck } from '../features/NetworkCheck';
import { photoCheck } from '../features/PhotoCheck';
import { idCheck } from '../features/IdCheck';
import { roomCheck } from '../features/RoomCheck';
import { addCamFrontView } from '../features/AddCamFrontView';
import { examMonitor } from '../features/ExamMonitor';
import { addCamSideView } from '../features/AddCamSideView';
import { addCamBackView } from '../features/AddCamBackView';
import { addCamCustomView } from '../features/AddCamCustomView';
import utility from './Utility';
import { stepUIManager } from './StepUIManager';
import { configrationManager } from './ConfigrationManager';
import request from './RequestManager';
import { StepInterface } from './StepInterface';
import { idVerify } from '../features/IdVerify';
import { LiveStreamManager, liveStreamManager } from './LiveStreamManager';
import ui from '../ui/UiManager';
import { bodyScan } from '../features/RoomBodyScan';
import { lobby } from '../features/Lobby';
import { deskScan } from '../features/DeskScan';
import { peer } from './PeerConnectionManager';
import { EVENT, events } from './EventManager';
import { uiEvents } from '../ui/UiEvents';
import { Ufm } from './UFM';
import { regularSnap } from './RegularSnap';
import { completeExam } from '../features/Complete';
import { socket } from './SocketManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import { interviewMonitor } from '../features/InterviewMonitor';
import { interviewFeedback } from '../features/InterviewFeedback';
import { thankYou } from '../features/ThankYou';

/**
 *
 */
export class StepManager {
  steps: { [key: string]: StepInterface };
  stepsOrder: string[];
  stepSwitch: { [key: string]: boolean };
  currentStep: number;
  currentStepName: string = '';
  nextStep: number;
  ufm: Ufm;

  /**
   *
   */
  constructor() {
    this.ufm = new Ufm();
    this.currentStep = -1;
    this.nextStep = 0;
    this.steps = {
      browser: browserCheck,
      screen: screenCheck,
      camera: cameraCheck,
      mic: micCheck,
      network: networkCheck,
      photoCheck: photoCheck,
      idCheck: idCheck,
      idVerify: idVerify,
      // roomCheck: roomCheck,
      // deskScan: deskScan,
      // bodyScan: bodyScan,
      // addCamSideView: addCamSideView,
      // addCamBackView: addCamBackView,
      // addCamFrontView: addCamFrontView,
      addCamCustomView: addCamCustomView,
      lobby: lobby,
      // examMonitor: examMonitor,
      interviewMonitor: interviewMonitor,
      interviewFeedback: interviewFeedback,
      thankYou: thankYou,
      completeExam: completeExam,
    };

    this.stepsOrder = [
      'browser',
      'screen',
      'camera',
      'mic',
      'network',
      'photoCheck',
      'idCheck',
      'idVerify',
      // 'roomCheck',
      // 'deskScan',
      // 'bodyScan',
      // 'addCamSideView',
      // 'addCamBackView',
      // 'addCamFrontView',
      'addCamCustomView',
      'lobby',
      // 'examMonitor',
      'interviewMonitor',
      'interviewFeedback',
      'thankYou',
      'completeExam',
    ];

    this.stepSwitch = {
      browser: true,
      screen: true,
      camera: true,
      mic: true,
      network: true,
      photoCheck: true,
      idCheck: true,
      idVerify: true,
      // roomCheck: false,
      // deskScan: false,
      // bodyScan: false,
      // addCamSideView: false,
      // addCamBackView: false,
      // addCamFrontView: false,
      addCamCustomView: true,
      lobby: true,
      //examMonitor: false,
      interviewMonitor: true,
      interviewFeedback: true,
      thankYou: true,
      completeExam: true,
    };
  }
  /**
   *
   * @param stepName
   */
  turnOff(stepName: string) {
    this.stepSwitch[stepName] = false;
  }
  /**
   *
   * @param stepName
   */
  turnOn(stepName: string) {
    this.stepSwitch[stepName] = true;
  }

  /**
   *
   */
  init() {
    if (configrationManager.userType == '3') {
      ui.hide(ui.id('thinkproc_step_photo'));
      ui.hide(ui.id('thinkproc_step_id'));
      ui.hide(ui.id('thinkproc_step_camera'));
    }
    stepUIManager.init(this);
    this.offTab();

    const browserData = browserCheck.getDeviceInfo();

    if (browserData.device != 'PC') {
      ui.show(ui.id('think_interviewDeviceChange'));
      this.exitBtn();
    }

    if ((configrationManager.sharedScreen == 1 || configrationManager.video_recording == 1) && configrationManager.userType == '2') {
      ui.show(ui.id('thinkX_screenSharePopup'));
      ui.hide(ui.id('thinkX_screenShareErrorPopup'));
      liveStreamManager.screenShare(
        () => {
          ui.hide(ui.id('thinkX_screenSharePopup'));
          if (this.currentStep == -1) {
            this.next();
          }
        },
        (message) => {
          this.shareRetry();
          ui.show(ui.id('thinkX_screenShareErrorPopup'));
          ui.hide(ui.id('thinkX_screenSharePopup'));
          stepUIManager.insertText('thinkX_screenShareError', message);
        }
      );
    } else {
      this.next();
    }
    this.beforeUnload();
    this.blur();
    this.onFocus();
  }
  beforeUnload() {
    let self = this;
    uiEvents.beforeuloadEvent(() => {
      // Handle beforeunload event to prevent accidental navigation
      utility.log('Application is closing');
      self.closeApplication(true);
    });
  }

  blur() {
    let self = this;
    uiEvents.blurEvent(() => {
      // Handle beforeunload event to prevent accidental navigation
      utility.log('Window lost focus!');
      sdkEvents.trigger(SDK_EVENT.ON_BLUR);
    });
  }

  onFocus() {
    let self = this;
    uiEvents.onFocusEvent(() => {
      // Handle beforeunload event to prevent accidental navigation
      utility.log('window onfocus');
      sdkEvents.trigger(SDK_EVENT.ON_FOCUS);
    });
  }

  shareRetry() {
    const button = ui.id('thinkX_ScreenShareRetry') as HTMLElement;

    if (button) {
      ui.click(button, () => {
        this.init();
      });
    }
  }

  exitBtn() {
    ui.click(ui.id('think_interviewDeviceChange') as HTMLElement, async () => {
      this.closeApplication();
    });
  }

  /**
   *
   */
  offTab() {
    // Retrieve whether room sanitization step is enabled from configuration
    const roomEnable = configrationManager.valueMap.room_sanitization_enabled.value;

    // Retrieve whether candidate ID capture (authentication) step is enabled
    const idEnable =
      configrationManager.valueMap.candidate_authentication.data.capture_id_enabled.value;

    // Retrieve whether additional camera setup step is enabled
    const additionalCameraEnable = configrationManager.valueMap.additional_cam.value;

    const {
      auth_reg_id: { value: auth_reg_id },
      auth_reg_photo: { value: auth_reg_photo },
      auth_capture_id: { value: auth_capture_id },
    } = configrationManager.valueMap.candidate_authentication.data;

    // If room sanitization is disabled, deactivate the corresponding tab
    if (roomEnable == 0) {
      this.turnOff('roomCheck');
      stepUIManager.stepTabDeactive('roomCheck');
      this.turnOff('deskScan');
      stepUIManager.stepTabDeactive('deskScan');
      this.turnOff('bodyScan');
      stepUIManager.stepTabDeactive('bodyScan');
    }

    // If ID capture is disabled, deactivate the corresponding tab
    if (idEnable == 0) {
      this.turnOff('idCheck');
      //stepUIManager.stepTabDeactive('idCheck');
    }


    const liveCustomCam = configrationManager.valueMap.additional_cam.data.live_custom_cam.value;

    if (liveCustomCam == 0) {
      this.turnOff('addCamCustomView');
    }

    if (liveCustomCam == 0) {
      stepUIManager.stepTabDeactive('addCamFrontView');
    }
    if (configrationManager.userType == '3') {
      this.turnOff('addCamCustomView');
    }


    if (auth_reg_photo == 0 && auth_reg_id == 0 && auth_capture_id == 0) {
      this.turnOff('idVerify');
      stepUIManager.stepTabDeactive('idVerify');
    }

    stepUIManager.setStepActiveCount(this.stepSwitch);

    const feedbackRequired = configrationManager.intervierData[configrationManager.socketRealUserName]?.feedback_required;
    const feedbackGiven = configrationManager.intervierData[configrationManager.socketRealUserName]?.feedback_given;

    // normalize values to booleans to avoid comparing boolean|undefined with numbers
    const feedbackRequiredVal = !!feedbackRequired;
    const feedbackGivenVal = !!feedbackGiven;

    if (configrationManager.userType != "3" || !feedbackRequiredVal || (feedbackRequiredVal && feedbackGivenVal)) {
      this.turnOff('interviewFeedback');
    }

    if (configrationManager.userType == '3' && configrationManager.link_status == 'interviewAlreadyEnded') {
      this.stepsOrder.forEach(step => {
        if (step != 'thankYou' && step != 'interviewFeedback') {
          this.turnOff(step);
        }
      })

    } else {
      if (configrationManager.currentStepAlias != 'Lobby' && configrationManager.currentStepAlias != 'Interview_Session') {
        ui.show(ui.id('thinkX_compatibility_wrapper'));
      }
    }

  }

  /**
   *
   */
  offTabCamera(camera: string, step: string, current_env_alias: string) {
    // Retrieve whether room sanitization step is enabled from configuration
    const roomEnable = configrationManager.valueMap.room_sanitization_enabled.value;

    // Retrieve whether additional camera setup step is enabled
    const additionalCameraEnable = configrationManager.valueMap.additional_cam.value;

    const thinkproc_mainHeader = ui.id('thinkproc-main-popup');
    if (camera != 'P_CAM' && thinkproc_mainHeader) {
      ui.addClass(thinkproc_mainHeader, 'thinkproc-hide-header');
    }

    // If room sanitization is disabled, deactivate the corresponding tab
    if (camera == 'RS_CAM') {
      // Room link
      // Addition camera
      this.turnOff('addCamFrontView');
      this.turnOff('addCamSideView');
      this.turnOff('addCamBackView');
      this.turnOff('addCamCustomView');
    } else {
      // additional cameras
      this.turnOff('roomCheck');
      this.turnOff('deskScan');
      this.turnOff('bodyScan');
      stepUIManager.stepTabDeactive('deskScan');

      if (camera == 'S_CAM') {
        this.turnOff('addCamFrontView');
        this.turnOff('addCamBackView');
        this.turnOff('addCamCustomView');
      }

      if (camera == 'F_CAM') {
        this.turnOff('addCamSideView');
        this.turnOff('addCamBackView');
        this.turnOff('addCamCustomView');
      }

      if (camera == 'B_CAM') {
        this.turnOff('addCamSideView');
        this.turnOff('addCamFrontView');
        this.turnOff('addCamCustomView');
      }
      if (camera == 'C_CAM') {
        this.turnOff('addCamSideView');
        this.turnOff('addCamFrontView');
        this.turnOff('addCamBackView');
      }
    }
    // utility.log('check step',step, current_env_alias);
    if (
      step != current_env_alias &&
      current_env_alias != 'Lobby' &&
      current_env_alias == 'Interview_Session'
    ) {
      this.turnOff('lobby');
    }

    if (camera == 'RS_CAM') {
      if (step == 'Desk_Check') {
        this.turnOff('roomCheck');
      }
      this.turnOff('bodyScan');
    }

    stepUIManager.stepTabDeactive('bodyScan');
    stepUIManager.stepTabDeactive('addCamFrontView');
    this.turnOff('browser');
    this.turnOff('screen');
    this.turnOff('camera');
    this.turnOff('mic');
    this.turnOff('network');
    stepUIManager.stepTabDeactive('network');
    this.turnOff('photoCheck');
    this.turnOff('idCheck');
    stepUIManager.stepTabDeactive('idCheck');
    this.turnOff('idVerify');
    stepUIManager.stepTabDeactive('idVerify');

    if (camera == 'RS_CAM') {
      this.turnOff('lobby');
      // stepUIManager.stepTabDeactive('lobby');

      this.turnOff('examMonitor');
      // stepUIManager.stepTabDeactive('examMonitor');
    }
  }

  /* This function is used for going to next step */
  /**
   *
   * @param goStep
   */
  next(goStep?: string) {
    const index = goStep ? this.stepsOrder.indexOf(goStep) : this.currentStep + 1;
    if (index === -1 || !(index in this.stepsOrder)) {
      // end of steps
      if (configrationManager.completeExam) {
        this.closeApplication();
        utility.log('end of steps');
        utility.wait(1000).then(() => {
          configrationManager.completeExam();
          configrationManager.completeExam = () => { };
        });
        return;
      }
    }
    // let previousStepName = this.currentStep != -1?this.stepsOrder[this.currentStep]:"";
    const stepName = this.stepsOrder[index];

    if (configrationManager.userType == '3') {
      if (stepName == 'photoCheck' || stepName == 'idCheck' || stepName == 'idVerify' || stepName == 'addCamCustomView') {
        this.stepSwitch[stepName] = false;
      }
    }

    const isOn = this.stepSwitch[stepName];

    this.currentStep = index;

    this.nextStep = this.currentStep + 1;

    if (!isOn) {
      // step is off
      utility.log('Skipping step');
      this.next();
      return;
    }
    const previousStepName = this.currentStepName;
    this.currentStepName = stepName;

    const step = this.steps[stepName];
    configrationManager.currentStep = stepName;
    configrationManager.currentStepObject = step;
    configrationManager.currentStepAlias = step.envAlias;
    step.setManager(this);
    utility.log('Starting Step - ' + stepName);
    stepUIManager.updateActiveStepCount();
    stepUIManager.stepStart(stepName, previousStepName);
    step.onComplete(
      (delay: number = 2000, allowNext: boolean = false, log: boolean = true): void => {
        setTimeout(() => {
          if (log === true) {
            request.stageEnd({ environment: step.envAlias, log: step.resultData });
          }
          utility.log('Ending Step');
          if (step.resultData.status == true || allowNext) {
            this.ufm.resetFlagsAndCounters();
            step.unSubscribe();
            stepUIManager.stepEnd(stepName);
            stepManager.next();
          } else {
            stepUIManager.stepError(stepName, step.resultData.error);
            step.error();
          }
        }, delay);
      }
    );
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      request.stageStart({ environment: step.envAlias }).then(() => {
        step.start();
      });
    } else {
      step.start();
    }
  }

  /**
   *
   */
  getCurrentStepObject(): StepInterface {
    const stepName = this.stepsOrder[this.currentStep];
    const step = this.steps[stepName];

    return step;
  }

  /**
   *
   * @param goStep
   */
  jumpToStep(goStep: string) {
    this.next(goStep);
  }

  cameraRevokeRetry() { }
  micRevokeRetry() { }

  cameraRevoke() { }

  micRevoke() { }

  screenRevoke() { }

  screenRevokeRetry() { }

  isSdkClosed = false;
  closeApplication(beforeUnload: boolean = false) {
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      if (configrationManager.userType == '3') {
        let msg = { mode: 'interviewer_leave', text: "interviewer leaving" };
        socket.sendRoomMessage(msg);
      } else {
        let msg = { mode: 'candidate_leave', text: "candidate leaving", data: configrationManager.currentStepAlias };
        socket.sendRoomMessage(msg);
      }
    }
    socket.leavingSocket();
    if (this.isSdkClosed) {
      return;
    }

    //Remove main div and close all peer connections
    ui.removeMainDiv();
    // if (!beforeUnload) {
    //   peer.closeAll();
    //   // Stop all live streams
    //   liveStreamManager.stopStreams();
    // }



    // trigger close application event
    utility.wait(500).then(() => {
      events.trigger(EVENT.CLOSE_APPLICATION);
    });
    this.isSdkClosed = true;
  }
}

export const stepManager = new StepManager();
