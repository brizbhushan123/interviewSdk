import { configrationManager } from '../core/ConfigrationManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import { regularSnap } from '../core/RegularSnap';
import { StepInterface, StepResult } from '../core/StepInterface';
import ui from '../ui/UiManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import { examCameraUi } from '../ui/featuresUI/ExamCameraSetupUI';
import utility from '../core/Utility';
import { stepUIManager } from '../core/StepUIManager';
import { socket } from '../core/SocketManager';
import { UiComponents } from '../ui/UiComponents';
import { environment } from '../config/environment';

interface Skill {
  id: number;
  name: string;
}

interface CriteriaData {
  behaviour: Skill[];
  functional: Skill[];
}

/**
 *
 */
class Lobby extends StepInterface {
  envAlias: string = 'Lobby';
  recordingStarted: boolean = false;
  recordingCamStarted: boolean = false;
  cameraType: string = 'P_CAM';
  cameraRevokePopup: HTMLElement | null = null;
  camType: string = '';
  isJoined: boolean = false;
  /**
   *
   */
  constructor() {
    super();
  }

  async getCameraStream(): Promise<MediaStream | null> {
    let currentStream = null;
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
      currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.SIDE);
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
      currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.BACK);
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
      currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.FRONT);
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
      currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.CUSTOM);
    }

    return currentStream?.stream || null;
  }

  /**
   *
   */
  start(): void {
    let self = this;
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      configrationManager.compatibilityCompleteCallback();

    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM') {
      this.subscribe(
        SDK_EVENT.RECEIVE_MESSAGE,
        function (user_name: string, message: Record<string, any>) {
          self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
        }
      );
      if (configrationManager.image_recording == 1) {
        regularSnap.takeSnapImage(LiveStreamManager.CAMERA.SIDE);
      }
      if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
        liveStreamManager.record(LiveStreamManager.CAMERA.SIDE);
        this.recordingCamStarted = true;
      }
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM') {
      this.subscribe(
        SDK_EVENT.RECEIVE_MESSAGE,
        function (user_name: string, message: Record<string, any>) {
          self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
        }
      );
      if (configrationManager.image_recording == 1) {
        regularSnap.takeSnapImage(LiveStreamManager.CAMERA.BACK);
      }
      if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
        liveStreamManager.record(LiveStreamManager.CAMERA.BACK);
        this.recordingCamStarted = true;
      }
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM') {
      this.subscribe(
        SDK_EVENT.RECEIVE_MESSAGE,
        function (user_name: string, message: Record<string, any>) {
          self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
        }
      );
      if (configrationManager.image_recording == 1) {
        regularSnap.takeSnapImage(LiveStreamManager.CAMERA.FRONT);
      }
      if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
        liveStreamManager.record(LiveStreamManager.CAMERA.FRONT);
        this.recordingCamStarted = true;
      }
    } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
      this.subscribe(
        SDK_EVENT.RECEIVE_MESSAGE,
        function (user_name: string, message: Record<string, any>) {
          self.modeSelector(message.mode, LiveStreamManager.PRIMARY_CAMERA_NAME);
        }
      );

    }

    this.subscribe(
      SDK_EVENT.CHAT_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        const cameraName = utility.getCameraNameInUserSocket(user_name);
        self.roomSocketmode(message.mode, message.text, message, user_name, cameraName);
      }
    );

    configrationManager.compatibilityComplete = 1;

    this.lobbyStart();
  }

  async lobbyStart(): Promise<void> {
    ui.show(ui.id('think_interview_lobby'));
    ui.hide(ui.id('thinkX_compatibility_wrapper'));
    ui.hide(ui.id('thinkproc_chat'));
    ui.hide(ui.id('thinkX_chatIcon'));
    const termsLink = ui.id('think_interview_termsLink') as HTMLAnchorElement;
    if (termsLink) termsLink.href = configrationManager.termsAndConditionsLink;
    const privacyLink = ui.id('think_interview_privacyLink') as HTMLAnchorElement;
    if (privacyLink) privacyLink.href = configrationManager.privacyStatementLink;
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      // ui.show(ui.id('thinkpro_draggableBox'));
      stepUIManager.insertText('thinkInterview_candidateName', configrationManager.currentCandidateName);
      this.suscribeSocketEvent();
      if (configrationManager.userType == '2') {
        const camName = examCameraUi.getRevokeCameraName();
        if (camName != '' && configrationManager.currentStepObject) {
          this.cameraRevoke();
        }
      } else {
        ui.show(ui.id('thinkinterview_camera'));
        ui.show(ui.id('thinkinterview_microphone'));
        this.bindInterviewerUiEvents();
      }

    } else if (
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM'
    ) {
      ui.show(ui.id('thinkpro_MobileViewBox'));
    }
    await this.startCamera();
    if (configrationManager.userType === '3') {
      this.joinLobby();
    } else {
      this.showJoinBtn();
    }
  }

  bindInterviewerUiEvents(): void {
    const videoImgBtn = ui.id('thinkinterview_camera')?.querySelector('img');
    if (videoImgBtn) {
      const imgElement = videoImgBtn;
      ui.click(imgElement, () => {
        if (imgElement) {
          const containClass = imgElement?.classList.contains('mute') ?? false;
          if (!containClass) {
            imgElement.classList.add('mute');
            imgElement.style.backgroundColor = '#2F4DDB';
            imgElement.style.borderRadius = '50px';
            configrationManager.video_mute = true;
            //imgElement.src = environment.UI_BASE_URL + 'images/white_video_call.svg';
            liveStreamManager.disableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
            this.muteInterviewerVideoStreamLobby();
          } else {
            imgElement.classList.remove('mute');
            imgElement.style.backgroundColor = '';
            imgElement.style.borderRadius = '';
            //imgElement.src = environment.UI_BASE_URL + 'images/video_call.svg';
            configrationManager.video_mute = false;
            liveStreamManager.enableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
            this.unMuteInterviewerVideoStreamLobby();
          }
        }
      });
    }
    const audioImgBtn = ui.id('thinkinterview_microphone')?.querySelector('img');
    if (audioImgBtn) {
      const imgElement = audioImgBtn;
      ui.click(imgElement, () => {
        if (imgElement) {
          const containClass = imgElement?.classList.contains('mute') ?? false;
          if (!containClass) {
            imgElement.classList.add('mute');
            imgElement.style.backgroundColor = '#2F4DDB';
            imgElement.style.borderRadius = '50px';
            configrationManager.audio_mute = true;
            //imgElement.src = environment.UI_BASE_URL + 'images/white_video_call.svg';
            liveStreamManager.disableAudioTracks(LiveStreamManager.AUDIO.PRIMARY);
          } else {
            imgElement.classList.remove('mute');
            imgElement.style.backgroundColor = '';
            imgElement.style.borderRadius = '';
            //imgElement.src = environment.UI_BASE_URL + 'images/video_call.svg';
            configrationManager.audio_mute = false;
            liveStreamManager.enableStreamTracks(LiveStreamManager.AUDIO.PRIMARY);
          }
        }
      });
    }
  }

  async startCamera(): Promise<void> {
    const stream = await this.getCameraStream();
    if (stream) {
      const video = this.setStream(stream);
      video.play();
      this.cameraDisable(video, stream);
    }
  }

  setStream(stream: MediaStream): HTMLVideoElement {
    let video: HTMLVideoElement | null = null;

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      video = ui.id('thinkInterview_candidateVideo') as HTMLVideoElement;
    } else if (
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM'
    ) {
      video = ui.id('thinkX_mobileCameraVideo') as HTMLVideoElement;
    }

    if (!video) {
      throw new Error('No valid video element found for the selected camera.');
    }

    video.srcObject = stream;
    return video;
  }

  cameraDisable(video: HTMLVideoElement, stream: MediaStream): void {
    // ui.show(ui.id('thinkinterview_camera'));
    ui.click(ui.id('thinkinterview_camera') as HTMLElement, async () => {
      // stream.getTracks().forEach(track => track.stop());
      video.pause();
      video.srcObject = null;
      this.cameraEnable(video);
    });
  }

  cameraEnable(video: HTMLVideoElement): void {
    ui.click(ui.id('thinkinterview_camera') as HTMLElement, async () => {
      const stream = await this.getCameraStream();
      if (stream) {
        video.srcObject = stream;
        video.play();
        this.cameraDisable(video, stream);
      }
    });
  }

  joinLobby = (): void => {
    const joinBtn = ui.id('thinkInterview_join') as HTMLButtonElement | null;
    ui.click(ui.id('thinkInterview_join') as HTMLElement, async () => {
      if (configrationManager.userType == '3') {
        if (joinBtn) {
          joinBtn.disabled = true;
        }
        ui.show(ui.id('think_interview_criteria_popup'));
        this.populateCandidateCriteria(configrationManager.skillsData);
        this.proceedInterviewLobby();
      } else {
        this.isJoined = true;
        ui.show(ui.id('thinkInterview_Proceed'));
        this.hideLoaderwithText();
        this.proceedLobby();
      }
    });
  }

  showJoinBtn() {
    ui.show(ui.id('thinkInterview_waiting'));
    ui.hide(ui.id('thinkInterview_join'));
    this.showLoaderwithText('thinkInterview_waiting');
    let msg = { mode: 'send_interview_allow', text: "send_interview_allow" };
    socket.sendRoomMessage(msg);
  }

  showLoaderwithText(id: string): void {
    const loaderHTML = UiComponents.loadingwithtext('');
    stepUIManager.setLoader(loaderHTML, id);
  }

  hideLoaderwithText(): void {
    const existingLoader = ui.id('thinkX_loadingwithText');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }

  allowCandiateSession() {
    ui.show(ui.id('thinkInterview_join'));
    ui.hide(ui.id('thinkInterview_waiting'));
    this.joinLobby();
  }

  roomSocketmode(mode: string, text: string, message: Record<string, any>, from: string, cameraName: string) {
    switch (mode) {
      case 'approve_candidate':
        // pass cameraDetails objects (or enum values) as separate arguments instead of a string array
        this.allowCandiateSession();
        break;
      case 'interviewer_leave':
        if (configrationManager.userType == '2') {
          ui.hide(ui.id('thinkInterview_join'));
          ui.show(ui.id('thinkInterview_waiting'));
        } else {
          ui.show(ui.id('thinkInterview_join'));
        }
        break;
      default:
        utility.warn(`Unknown room socket mode: ${mode}`);
        break;
    }
  }

  proceedLobby = (): void => {
    ui.click(ui.id('thinkInterviewFinalProceed') as HTMLElement, async () => {
      ui.hide(ui.id('thinkInterview_Proceed'));
      this.resultData.status = true;
      this.resultData.info = {};
      if (configrationManager.userType == "2" && LiveStreamManager.CAMERA.CUSTOM.external) {
        let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'C_CAM');
        let message = { mode: 'end_lobby', text: 'lobby end' };
        socket.sendMessage(socketUserName, message);
      }
      this.end(0);
    });
  }

  proceedInterviewLobby = (): void => {
    const proceedBtn = ui.id('think_interview_proceed') as HTMLButtonElement | null;
    ui.click(ui.id('think_interview_proceed') as HTMLElement, async () => {
      if (proceedBtn) {
        proceedBtn.disabled = true;
      }
      ui.hide(ui.id('think_interview_criteria_popup'));
      this.resultData.status = true;
      this.resultData.info = {};
      this.end(0);
    });
  }

  /**
   *
   */
  result(): StepResult {
    return this.resultData;
  }

  cameraRevoke(): void {
    this.stopRecording();
    regularSnap;
    regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);

    if (LiveStreamManager.CAMERA.PRIMARY.stream == null) {
      // ✅ Added section — show fallback image under video
      const videoEl = ui.id('thinkX_cameraVideo') as HTMLVideoElement;
      if (videoEl) {
        ui.show(ui.id('thinkX_cameraDisconnect'));
        videoEl.classList.add('d-none');
      }
    }
    let self = this;
    let cameraName = '';
    if (configrationManager.userType == '2') {
      cameraName = examCameraUi.getRevokeCameraName();
    }
    utility.log(cameraName, 'camera revoke alert show');
    if (this.cameraRevokePopup == null && cameraName != '') {
      if (
        LiveStreamManager.CAMERA[cameraName].external == false &&
        LiveStreamManager.CAMERA[cameraName].stream == null
      ) {
        this.camType = LiveStreamManager.CAMERA[cameraName].name;
        examCameraUi.camType = this.camType;
        examCameraUi.stopSnap(this.camType);
        examCameraUi.stopRecording(this.camType);
        const envAlias = examCameraUi.getQrStepName();
        const headingKey = examCameraUi.retryHeadingName();
        this.cameraRevokePopup = ui.alertDialog(
          ui.translations.popup_text[headingKey],
          ui.translations.popup_text.cameraDisconnected,
          ui.translations.popup_buttons.retry,
          function (dialog: HTMLElement) {
            ui.remove(dialog);
            self.cameraRevokePopup = null;
            examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, self.camType);
          }
        );
      }
    }
  }
  suscribeSocketEvent() {
    let self = this;
    this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name: string, stream: MediaStream) {
      const cameraName = utility.getCameraNameInUserSocket(user_name);
      examCameraUi.camType = cameraName;
      examCameraUi.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
      liveStreamManager.updateCameraSetupStream(stream, examCameraUi.camType);
      examCameraUi.hideCameraSelectPage(examCameraUi.camType);
    });

    this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
      utility.log('second stream disconnected', user_name);
      const cameraName = utility.getCameraNameInUserSocket(user_name);
      examCameraUi.camType = cameraName;
      const headingKey = examCameraUi.retryHeadingName();
      const keyName = examCameraUi.checkExternalCamStream();
      if (!keyName || !LiveStreamManager.CAMERA[keyName]) {
        console.warn('Invalid camera key:', keyName, examCameraUi.camType);
        return;
      }
      LiveStreamManager.CAMERA[keyName].stream == null;
      if (self.cameraRevokePopup == null) {
        if (LiveStreamManager.CAMERA[keyName].external == true) {
          LiveStreamManager.CAMERA[keyName].external = false;
          examCameraUi.stopSnap(cameraName);
          examCameraUi.stopRecording(cameraName);
          const envAlias = examCameraUi.getQrStepName();
          self.cameraRevokePopup = ui.alertDialog(
            ui.translations.popup_text[headingKey],
            ui.translations.popup_text.cameraDisconnected,
            ui.translations.popup_buttons.retry,
            function (dialog: HTMLElement) {
              ui.remove(dialog);
              self.cameraRevokePopup = null;
              examCameraUi.showQrPage(
                examCameraUi.cameraAllowClick,
                envAlias,
                examCameraUi.camType
              );
            }
          );
        }
      } else {
        if (LiveStreamManager.CAMERA[keyName].external == true
          && LiveStreamManager.CAMERA[keyName].stream == null) {
          LiveStreamManager.CAMERA[keyName].external = false;
        }
      }
    });

    this.subscribe(
      SDK_EVENT.RECEIVE_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        const cameraName = utility.getCameraNameInUserSocket(user_name);
        examCameraUi.modeSelector(message.mode, message, cameraName);
      }
    );
  }

  /**
   *
   */
  cameraRevokeRetry() {
    // if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
    //   liveStreamManager.record(LiveStreamManager.CAMERA.PRIMARY);
    //   this.recordingCamStarted = true;
    // }
    if (configrationManager.image_recording == 1) {
      regularSnap.takeSnapImage(LiveStreamManager.CAMERA.PRIMARY);
    }
    this.lobbyStart();
  }
  /**
   *
   */
  micRevokeRetry() {
    this.lobbyStart();
  }

  stopRecording(): void {
    if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
      liveStreamManager.stopRecord(LiveStreamManager.CAMERA.PRIMARY);
      this.recordingCamStarted = false;
    }
  }

  modeSelector(mode: string, camtype: string) {
    if (mode == 'end_lobby') {
      if (camtype == 'S_CAM') {
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.SIDE.name);
      } else if (camtype == 'B_CAM') {
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.BACK.name);
      } else if (camtype == 'F_CAM') {
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.FRONT.name);
      } else if (camtype == 'C_CAM') {
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.CUSTOM.name);
      }
      this.end(0);
    }
  }

  populateCandidateCriteria(data: CriteriaData): void {
    const functionalContainer = ui.id('functionalSkills');
    const behaviouralContainer = ui.id('behavioralSkills');

    if (!functionalContainer || !behaviouralContainer) {
      utility.error('Skill containers not found in DOM.');
      return;
    }

    // Clear old skills
    functionalContainer.innerHTML = '';
    behaviouralContainer.innerHTML = '';

    // Populate Functional Skills
    data.functional.forEach((skill: Skill) => {
      const span = document.createElement('span');
      span.textContent = skill.name;
      functionalContainer.appendChild(span);
    });

    // Populate Behavioral Skills
    data.behaviour.forEach((skill: Skill) => {
      const span = document.createElement('span');
      span.textContent = ui.translations.behaviour_skills[skill.name];
      behaviouralContainer.appendChild(span);
    });
  }

  muteInterviewerVideoStreamLobby(): void {
    const name = configrationManager.currentCandidateName || 'Interviewer';
    const overlay = ui.id('thinkproc-candidate-video-muted-lobby') as HTMLElement | null;
    utility.generateNameAvatar(overlay, name);
  }

  unMuteInterviewerVideoStreamLobby(): void {
    const overlay = ui.id('thinkproc-candidate-video-muted-lobby') as HTMLElement | null;
    utility.removeAvatarSvgImage(overlay);
  }


}

export const lobby = new Lobby();
