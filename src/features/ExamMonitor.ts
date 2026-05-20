import { env, step } from '@tensorflow/tfjs';
import { ai } from '../core/AIManager';
import { configrationManager } from '../core/ConfigrationManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import { regularSnap } from '../core/RegularSnap';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import ui from '../ui/UiManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import { examCameraUi } from '../ui/featuresUI/ExamCameraSetupUI';
import { peer } from '../core/PeerConnectionManager';
import { socket } from '../core/SocketManager';
import { chat } from '../core/ChatManager';
import request from '../core/RequestManager';
import { chatUi } from '../ui/ChatUi';
import { EVENT, events } from '../core/EventManager';

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}
/**
 *
 */
export class ExamMonitor extends StepInterface {
  envAlias: string = 'Exam_Session';
  recognition: any = null;
  vdClearTimeout: ReturnType<typeof setTimeout> | null;
  isAudioDetectionPaused: boolean = false;
  isBlurListenerAdded: boolean = false;
  imageTypeSnap: number = 10;
  regularSnapTimeout: ReturnType<typeof setTimeout> | null;
  suspendCountdownTimer: ReturnType<typeof setInterval> | null = null;
  recordingStarted: boolean = false;
  recordingCamStarted: boolean = false;
  aiStarted: boolean = false;
  cameraRevokePopup: HTMLElement | null = null;
  camType: string = '';
  socketuserID: string;
  isRecognitionActive: boolean = false;
  proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
  assignNewProctorTimer: ReturnType<typeof setInterval> | null = null;

  /**
   *
   */
  constructor() {
    super();
    this.vdClearTimeout = null;
    this.regularSnapTimeout = null;
    this.suspendCountdownTimer = null;
    this.socketuserID = '';
    this.proctorAssignTimeout = null;
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

  async getAudioStream(): Promise<MediaStream | null> {
    const audioStream_noise = await liveStreamManager.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
    return audioStream_noise || null;
  }

  sendSmartProctorUFM(){
    if(configrationManager.sentFirstLoginMsg == false && configrationManager.previous_instance_escalated == false && configrationManager.smartProctorEnable == 1){
      const UFMStatus = configrationManager.firstLogin ? "welcome_msg" : "relogin";
      ai.getSmartProctorUFM({
        status: UFMStatus,
        ufm_type: "",
        ufm_code: "", 
        cs_score: "",
        suspension_score: "",
        termination_score: "",
        deduction_point: "",
        object_array : "",
      });
      configrationManager.sentFirstLoginMsg = true;
    }
  }

  /**
   *
   */
  start(): void {
    let self = this;

    
    self.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function (){
      self.aiStarted = false;
      examCameraUi.stopAiMonitoring();
      examCameraUi.stopRecording('all');
      chat.sendData('stop_monitor_ai', 'stop monitor ai');
    })
    self.subscribe(SDK_EVENT.UFM_SUSPEND, function (response: any) {
      self.suspendPopup(response);
      self.aiStarted = false;
      examCameraUi.stopAiMonitoring();
      chat.sendData('stop_monitor_ai', 'stop monitor ai');
    });
    self.subscribe(SDK_EVENT.UFM_TERMINATE, function (response: any) {
      self.terminatePopup();
      self.aiStarted = false;
      examCameraUi.stopAiMonitoring();
      chat.sendData('stop_monitor_ai', 'stop monitor ai');
    });

    self.subscribe(SDK_EVENT.USER_ESCALTED, function (response:any){
      self.userEscalted();
    });

    self.subscribe(SDK_EVENT.SMART_PROCTOR_MSG, function (response: any) {
      if(response.status_code != 200){
        self.saveSmartProctorMsg(response);
      }
      
    });
    
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
        self.checkSessionStatus(); //check session status on start

        utility.wait(2000).then(() => {
          self.sendSmartProctorUFM(); // send smart proctor UFM on start welcome or relogin
        });
       // create unique UFM object for primary camera
        examCameraUi.uniqueUfmObject('P_CAM');
        // subscribe socket event
        this.subscribeSocketEvent();
        // side, Back, Front camera start
        this.startInternalAdditionalCam();
        // start primary camera Exam AI
        this.startExamWithSFL();
        this.proctorLeft();
        examCameraUi.startSnapAndRecording(LiveStreamManager.PRIMARY_CAMERA_NAME);
      
    } else if (
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'S_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'B_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'F_CAM' ||
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM'
    ) {
      //ui.hide(ui.id('thinkX_compatibility_wrapper'));
      ui.hide(ui.id('thinkproc_chat'));
      ui.hide(ui.id('thinkX_chatIcon'));
      ui.hide(ui.id('thinkX_cameraSetup_box'));
      ui.show(ui.id('thinkpro_MobileViewBox'));
      this.startCamera();
      examCameraUi.camType = LiveStreamManager.PRIMARY_CAMERA_NAME;
      const socketUserName = utility.extractPrefix(
        configrationManager.socketUserName,
        LiveStreamManager.PRIMARY_CAMERA_NAME
      );
      examCameraUi.socketuserID = socketUserName;
      peer.connect(socketUserName);

      this.subscribe(
        SDK_EVENT.CHAT_MESSAGE,
        function (user_name: string, message: Record<string, any>) {
          self.roomSocketmode(message.mode, message.text, message,user_name, LiveStreamManager.PRIMARY_CAMERA_NAME);
        }
      );
      
      examCameraUi.startSnapAndRecording(LiveStreamManager.PRIMARY_CAMERA_NAME);
      examCameraUi.externalCameraMonitoring();
    }
  }

  proctorLeft() {
    let self = this;
    this.subscribe(SDK_EVENT.USER_LEFT, function (user_name: string) {
      if (user_name == configrationManager.currentProctor) {
        self.checkSessionStatus();
      }
    });
  }

  startInternalAdditionalCam() {
    const cameraMappings = ['S_CAM', 'B_CAM', 'F_CAM', 'C_CAM'];
    cameraMappings.forEach((cameraName) => {
      examCameraUi.camType = cameraName;
      examCameraUi.startInternalCamMonitering(cameraName);
    });
  }

  async startCamera(): Promise<void> {
    const stream = await this.getCameraStream();
    if (stream) {
      const video = this.setStream(stream);
      video.play();
    }
  }

  getVideoFromStream(stream: MediaStream): HTMLVideoElement | null {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.muted = true;
    video.playsInline = true;
    video.width = 640;
    video.height = 480;
    video.play().catch(() => {});
    return video;
  }

  
  async startExamWithSFL(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await this.getCameraStream();
      if (!stream) {
        return reject('No camera stream found');
      }

      // Setup primary video stream
      const video = this.setStream(stream);
      video.play();

      // Start VD (voice detection)
      if (configrationManager.valueMap.ufm.data.VD.value == 1) {
        this.getAudioStream().then((mediaStream) => {
          if (mediaStream) {
            this.checkForAudioLevelsVdInBrowser(mediaStream);
          }
        });
      }

      // Start AI monitoring
      if (!this.aiStarted) {
        ai.examAI(video, async (message: any) => {
          this.aiStarted = true;
          utility.log(message, 'Exam Monitor AI');
          if (message.image != '') {
            message.image =  await utility.convertBase64PngToCompressedBase64Jpg(message.image) ;
            const imageBlob = utility.base64ToBlob(message.image);
            examCameraUi.ufm.log(message.od_detections, this.envAlias, 1, 'P_CAM', imageBlob, message.status_code);
          }
        });
      }

      // Handle SFL (screen focus loss=) monitoring
      if (configrationManager.valueMap.ufm.data.SFL.value == 1) {
        if (!this.isBlurListenerAdded) {
          ui.show(ui.id('thinkpro_draggableBox'));

          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              let camera = LiveStreamManager.CAMERA.PRIMARY;
              if (configrationManager.sharedScreen == 1) {
                camera = LiveStreamManager.CAMERA.SCREEN;
              }
              if (!camera.stream) return;

              const video = this.getVideoFromStream(camera.stream);
              if (video) {
                utility.wait(1000).then(() => {
                  const snapshot = this.takeSnapshots_sfl(video, false, false);
                  const blob = utility.base64ToBlob(snapshot);
                  this.ufmTrigger('SFL',276, blob);
                });
              } else {
                utility.error('Video element not found for snapshot on visibility change');
              }
            }
          });

          this.isBlurListenerAdded = true;
        }
      }
      resolve(); // ✅ Exam setup complete
    } catch (error) {
      reject(error);
    }
  });
}


  suspendResume() {
    const suspendBtn = ui.id('thinkX_suspend_resume') as HTMLElement;
    if (suspendBtn) {
      ui.click(suspendBtn, () => {
        examCameraUi.isExamPaused = false;
        this.isAudioDetectionPaused = false;
        this.isBlurListenerAdded = false;

        utility.wait(500).then(() => {
          events.trigger(EVENT.SUSPEND_RESUME_EXAM);
        });

        chat.sendData('start_monitor_ai', 'start monitor ai');
        let msg = { mode: 'update_escalation', text: "update escaltion" };
        socket.sendRoomMessage(msg);
        examCameraUi.playAllUfm();
        examCameraUi.primaryCameraAiMonitoring();
        
        examCameraUi.startInternalCamAI();

        ui.hide(ui.id('thinkX_suspendPopup'));
      });
    }
  }

  terminateExam() {
    configrationManager.isTerminated = true;
    this.completeExam();
    const terminateBtn = ui.id('thinkX_terminate_exit') as HTMLElement;
    if (terminateBtn) {
      ui.click(terminateBtn, () => {
        ui.hide(ui.id('thinkX_terminatePopup'));
        this.manager().closeApplication();
        configrationManager.currentStepObject?.end();
      });
    }
  }

  completeExam() {
    examCameraUi.ufm.endTest(this.envAlias);
    examCameraUi.stopSnap('all');
    examCameraUi.stopRecording('all');
    this.aiStarted = false;
    examCameraUi.stopAiMonitoring();
    configrationManager.isSubmited = 'Exam_session';
    chat.sendData('stop_monitor_ai', 'stop monitor AI');
    chat.sendData('close_additional_camera', 'close additional camera');
    peer.closeAll();
    socket.closeSocket();
    this.resultData.status = true;
    this.resultData.info = 'test terminate';
    this.end();
  }

  setStream(stream: MediaStream): HTMLVideoElement {
    let video: HTMLVideoElement | null = null;

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      video = ui.id('thinkX_cameraVideo') as HTMLVideoElement;
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

  getSpeechRecongnition() {
    if (this.recognition != null) {
      this.recognition.end;
      return this.recognition;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = ui.translations.language_code.code;
    this.recognition.continuous = false; // We only need one result for this test
    this.recognition.interimResults = false; // Only interested in the final result
    return this.recognition;
  }

  checkForAudioLevelsVdInBrowser(mediaStream: MediaStream): void {
    const self = this;

    if (this.isAudioDetectionPaused) {
      utility.log('🛑 Audio detection is paused.');
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const chunks: BlobPart[] = [];
    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.readAsDataURL(blob);

      reader.onloadend = () => {
        const base64Audio = (reader.result as string).split(',')[1];

        // ✅ CASE 1: Use Web Speech API if available
        if (SpeechRecognition) {
          const recognition = self.getSpeechRecongnition();
           recognition.stop();
          let detectedText = '';
          let isStopped = false;
          
          recognition.onstart = () => {
            
            utility.log('🎙️ Speech recognition started (VD)');
          };

          recognition.onresult = (event: SpeechRecognitionEvent) => {
            if (isStopped) return;
            const result = event.results[0][0].transcript;
            detectedText += result + ' ';
            utility.log('🔊 You said (VD):', result);
            isStopped = true;
            recognition.stop();
          };

          recognition.onend = () => {
            
            utility.log('🛑 Recognition ended (VD), Final text:', detectedText.trim());

            if (detectedText.trim().length > 0) {
              utility.log('⬆️ Uploading VD blob (Web Speech)');
              self.ufmTrigger('VD',275, blob);
            } else {
              utility.log('🚫 No speech detected (Web Speech)');
            }

            if (!self.isAudioDetectionPaused) {
              self.checkForAudioLevelsVdInBrowser(mediaStream);
            }
          };

          recognition.onerror = (e: any) => {
            utility.error('⚠️ SpeechRecognition error:', e.error);
            if (!self.isAudioDetectionPaused) {
              self.checkForAudioLevelsVdInBrowser(mediaStream);
            }
          };
        
            recognition.start();
           
          
        }

        // ✅ CASE 2: If Web Speech API is NOT available, use Google Speech API
        else {
          const data = {
            config: {
              encoding: 'WEBM_OPUS',
              sampleRateHertz: 48000,
              languageCode: ui.translations.language_code.langCode,
              audio_channel_count: 2,
            },
            audio: {
              content: base64Audio,
            },
          };

          fetch(configrationManager.speechUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((res) => {
              const transcript = res?.results?.[0]?.alternatives?.[0]?.transcript || '';
              utility.log('🧠 Google API transcript:', transcript);

              if (transcript.trim().length > 0) {
                utility.log('⬆️ Uploading VD blob (Google API)');
                self.ufmTrigger('VD',275, blob);
              } else {
                utility.log('🚫 No speech detected via Google API (VD)');
              }

              if (!self.isAudioDetectionPaused) {
                self.checkForAudioLevelsVdInBrowser(mediaStream);
              }
            })
            .catch((err) => {
              utility.error('❌ Google Speech API Error:', err);
              if (!self.isAudioDetectionPaused) {
                self.checkForAudioLevelsVdInBrowser(mediaStream);
              }
            });
        }
      };
    };

    // ⏱️ Start recording for 10 seconds
    chunks.length = 0;
    mediaRecorder.start();

    setTimeout(() => {
      if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
    }, 10000);
  }

  pausedExam() {
    examCameraUi.isExamPaused = true;
    this.isAudioDetectionPaused = true;
    this.isBlurListenerAdded = true;
    this.aiStarted = false;
    examCameraUi.stopAiMonitoring();
    chat.sendData('stop_monitor_ai', 'stop monitor ai');

    utility.log('⏸️ Audio detection paused.');
  }

  playExam() {
    examCameraUi.isExamPaused = false;
    this.isAudioDetectionPaused = false;
    this.isBlurListenerAdded = false;

    chat.sendData('start_monitor_ai', 'start monitor ai');
    examCameraUi.playAllUfm();
    this.startExamWithSFL();
    examCameraUi.startInternalCamAI();
    
    utility.log('▶️ Audio detection resumed.');
  }

  stopAI() {
    ai.stopExamination((message: any) => {});
  }

  takeSnapshots_sfl(video: HTMLVideoElement, saveActivity: boolean, takeReturn: boolean): string {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 576;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Unable to get canvas context');
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURI = canvas.toDataURL('image/jpeg', 0.8);

    return dataURI;
  }

  /**
   *
   */
  result(): StepResult {
    return this.resultData;
  }

  screenRevoke(): void {
    this.permissionRevoke(282);
    this.aiStarted = false;
    examCameraUi.stopAiMonitoring();
    chat.sendData('stop_monitor_ai', 'stop monitor ai');
  }

  cameraRevoke(): void {
    if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
      this.manager().closeApplication();
      return;
    }
    chat.sendData('cam_disconnect', 'camera disconnect');
    if(LiveStreamManager.CAMERA.PRIMARY.stream == null){
      this.permissionRevoke(281);

      // ✅ Added section — show fallback image under video
      const videoEl = ui.id('thinkX_cameraVideo') as HTMLVideoElement;
      if (videoEl) {
        ui.show(ui.id('thinkX_cameraDisconnect'));
        videoEl.classList.add('d-none');
      }
    }
    
    let self = this;
    let cameraName = examCameraUi.getRevokeCameraName();
    utility.log(cameraName, 'camera revoke alert show');
    if (this.cameraRevokePopup == null && cameraName != '') {
      if ( cameraName != '' && 
        LiveStreamManager.CAMERA[cameraName].external == false &&
        LiveStreamManager.CAMERA[cameraName].stream == null
      ) {
        this.camType = LiveStreamManager.CAMERA[cameraName].name;
        if(cameraName == 'SIDE' && cameraName != configrationManager.reCameraRevoke){
          this.permissionRevoke(280);
        }else if(cameraName == 'BACK' && cameraName != configrationManager.reCameraRevoke){
          this.permissionRevoke(279);
        }else if(cameraName == 'FRONT' && cameraName != configrationManager.reCameraRevoke){
          this.permissionRevoke(277);
        }else if(cameraName == 'CUSTOM' && cameraName != configrationManager.reCameraRevoke){
          this.permissionRevoke(280);
        }

        if( cameraName == configrationManager.reCameraRevoke){
           configrationManager.reCameraRevoke = '';
        }
        examCameraUi.camType = this.camType;

        examCameraUi.stopSnap(this.camType);
        examCameraUi.stopRecording(this.camType);

        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
        
        const envAlias = examCameraUi.getQrStepName();
        const headingKey = examCameraUi.retryHeadingName();
        const messageKey = examCameraUi.retryMessageName();
        this.cameraRevokePopup = ui.alertDialog(
          ui.translations.popup_text[headingKey],
          ui.translations.popup_text[messageKey],
          ui.translations.popup_buttons.retry,
          function (dialog: HTMLElement) {
            ui.remove(dialog);
            self.cameraRevokePopup = null;
            examCameraUi.showQrPage(examCameraUi.cameraAllowClick, envAlias, self.camType);
          }
        );
      }else{
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
      }
    }else{
      this.aiStarted = false;
      examCameraUi.stopAiMonitoring();
      chat.sendData('stop_monitor_ai', 'stop monitor ai');
    }
  }

  subscribeSocketEvent() {
    let self = this;
    this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name: string, stream: MediaStream) {
      const cameraName = utility.getCameraNameInUserSocket(user_name);
      examCameraUi.camType = cameraName;
      examCameraUi.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
      liveStreamManager.updateCameraSetupStream(stream, cameraName);
      examCameraUi.hideCameraSelectPage(cameraName);
      chat.sendData('cam_reconnect', 'camera reconnect');
    });

    this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
      utility.log('second stream disconnected', user_name);
      const cameraName = utility.getCameraNameInUserSocket(user_name);
      if(cameraName == 'S_CAM'){
          self.permissionRevoke(280);
        }else if(cameraName == 'B_CAM'){
          self.permissionRevoke(279);
        }else if(cameraName == 'F_CAM'){
          self.permissionRevoke(277);
        }else if(cameraName == 'C_CAM'){
          self.permissionRevoke(280);
        }
      examCameraUi.camType = cameraName;
      const headingKey = examCameraUi.retryHeadingName();
      const messageKey = examCameraUi.retryMessageName();
      const keyName = examCameraUi.checkExternalCamStream();
      if (!keyName || !LiveStreamManager.CAMERA[keyName]) {
        console.warn('Invalid camera key:', keyName, examCameraUi.camType);  
        return;
      }
      LiveStreamManager.CAMERA[keyName].stream = null;
      chat.sendData('cam_disconnect', 'camera disconnect');
      if (self.cameraRevokePopup == null) {
        if (
          LiveStreamManager.CAMERA[keyName].external == true &&
          LiveStreamManager.CAMERA[keyName].stream == null
        ) {
          
          LiveStreamManager.CAMERA[keyName].external = false; 
          utility.log('camera revoke alert show_652', cameraName);
          
          examCameraUi.stopSnap(cameraName);
          examCameraUi.stopRecording(cameraName);
          
          examCameraUi.stopAiMonitoring();
          chat.sendData('stop_monitor_ai', 'stop monitor ai');
          chat.sendData('cam_disconnect', 'camera disconnect');
          const envAlias = examCameraUi.getQrStepName();
          self.cameraRevokePopup = ui.alertDialog(
            ui.translations.popup_text[headingKey],
            ui.translations.popup_text[messageKey],
            ui.translations.popup_buttons.retry,
            function (dialog: HTMLElement) {
              ui.remove(dialog);
              self.cameraRevokePopup = null;
              examCameraUi.showQrPage(
                examCameraUi.cameraAllowClick,
                envAlias,
                cameraName
              );
            }
          );
        }
      }else{
        if (
          LiveStreamManager.CAMERA[keyName].external == true &&
          LiveStreamManager.CAMERA[keyName].stream == null
        ) {
          LiveStreamManager.CAMERA[keyName].external = false;
           utility.log('camera revoke alert show_682', cameraName);
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
    this.subscribe(
      SDK_EVENT.CHAT_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        const cameraName = utility.getCameraNameInUserSocket(user_name);
        self.roomSocketmode(message.mode, message.text, message,user_name,cameraName);
      }
    );
  }

  roomSocketmode(mode: string, text: string, message: Record<string, any>,from:string,  cameraName: string) {
    switch (mode) {
      case 'stop_monitor_ai':
        examCameraUi.stopAiMonitoring();
        break;
      case 'start_monitor_ai':
        examCameraUi.externalCameraMonitoring();
        examCameraUi.startExternalSnapAndRecording();
        break;
      case 'proctor_peer_close':
        peer.close(from);  
        chatUi.removeAudioTrackAdded(from);
        break;
      case 'proctor_suspend_trigger':
        this.checkSessionStatus();
        break;
      case 'proctor_terminate_trigger':
        if(LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'){
          this.terminatePopup();
        }
        break;
      case "secondary_ufm":
        if(LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'){
          ai.getSmartProctorUFM(message.data);
        }
        break;
      case "close_additional_camera":
        this.closeAdditionalCamera();
        break;
      case "primary_escalate":
        if(LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'){
          this.userEscalted();
        }
        break
      default:
        console.log('Unknown mode:', mode);
    }
  }

  closeAdditionalCamera(){
    if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
      this.manager().closeApplication();
      // utility.log(new Error("Testing close"));
      utility.log('close');
    }
  }

  micRevoke(): void {
    this.permissionRevoke(278);
    this.aiStarted = false;
    examCameraUi.stopAiMonitoring();
    chat.sendData('stop_monitor_ai', 'stop monitor ai');
    
  }

  permissionRevoke(code:number): void {
    utility.log(code,"code print");
    if (configrationManager.valueMap.ufm.data.PR.value == 1) {
      this.ufmTrigger('PR',code);
    }
  }

  ufmTrigger(ufmType: string,code:number = 0, blob?: Blob): void {
    try {
      let codeArr = null;
      if(code != 0){
        codeArr = [code]
      }
      const response = examCameraUi.ufm.log(ufmType, this.envAlias, 1, 'P_CAM', blob,codeArr);
      utility.log(`${ufmType} UFM uploaded successfully`, response);
    } catch (error) {
      utility.log(`❌ ${ufmType} UFM upload failed`, error);
    }
  }

  terminatePopup(): void {
    ui.hide(ui.id('thinkX_suspendPopup'));
    utility.wait(500).then(() => {
      events.trigger(EVENT.TERMINATE_EXAM);
    });
    if (this.suspendCountdownTimer) {
      clearInterval(this.suspendCountdownTimer);
      this.suspendCountdownTimer = null;
    }

    const popup = ui.id('thinkX_terminatePopup');

    // If popup is already visible, don't re-open
    if (popup && popup.style.display !== 'none' && popup.offsetParent !== null) {
      utility.log('Terminate popup is already open. Skipping...');
      return;
    }

    this.pausedExam();
    ui.show(popup);
    this.terminateExam();
  }

  suspendPopup(response: any): void {
    const { suspendTime, current_credit_score } = response.data;

    this.suspendCountdown(suspendTime * 60);
  }

  suspendCountdown(suspendTime: number): void {
    utility.wait(500).then(() => {
      events.trigger(EVENT.SUSPEND_EXAM, suspendTime);
    });
    const popup = ui.id('thinkX_suspendPopup');

    // If popup is already visible, don't re-open
    if (popup && popup.style.display !== 'none' && popup.offsetParent !== null) {
      utility.log('Suspend popup is already open. Skipping...');
      return;
    }

    this.pausedExam();
    ui.show(popup);

    const suspendResumeBtn = ui.id('thinkX_suspend_resume');
    if (suspendResumeBtn) {
      ui.addClass(suspendResumeBtn, 'thinkproc-disable');
    }

    let remainingSeconds = suspendTime;

    const circle = document.getElementById('thinkproc_suspend_count') as HTMLElement | null;
    const timeText = document.getElementById('thinkX_suspendMin');

    const formatTime = (totalSeconds: number) => {
      const m = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, '0');
      const s = (totalSeconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

    const totalSeconds = remainingSeconds;

    const updateUI = () => {
      if (!circle || !timeText) return;
      timeText.textContent = formatTime(remainingSeconds);

      const percent = (remainingSeconds / totalSeconds) * 100;
      circle.style.setProperty('--thinkproc_suspend_count', percent.toString());
    };

    updateUI();

    if (this.suspendCountdownTimer) {
      clearInterval(this.suspendCountdownTimer);
      this.suspendCountdownTimer = null;
    }

    this.suspendCountdownTimer = setInterval(() => {
      remainingSeconds -= 1;

      if (remainingSeconds <= 0) {
        clearInterval(this.suspendCountdownTimer as any);
        this.suspendCountdownTimer = null;

        if (timeText) timeText.textContent = '00:00';

        if (suspendResumeBtn) {
          ui.removeClass(suspendResumeBtn, 'thinkproc-disable');
        }

        this.checkSessionStatus();
        this.suspendResume();
        return;
      }

      updateUI();
    }, 1000);
  }

  async checkSessionStatus(): Promise<void> {
    examCameraUi.ufm
      .checkSessionStatus(this.envAlias)
      .then((response) => {
        utility.log('✅ Session status checked successfully', response);
        const { remaining_time } = response.data;
        if (response.code === 2312) {
          this.suspendCountdown(remaining_time);
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

  /**
   *
   */
  screenRevokeRetry(): void {
    this.start();
    //examCameraUi.playAllUfm();
    chat.sendData('start_monitor_ai', 'start monitor ai');
  }

  /**
   *
   */
  cameraRevokeRetry() {
  
    if (configrationManager.image_recording == 1) {
      regularSnap.takeSnapImage(LiveStreamManager.CAMERA.PRIMARY);
    }
    if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
      liveStreamManager.record(LiveStreamManager.CAMERA.PRIMARY);
      this.recordingCamStarted = true;
    }
    //examCameraUi.playAllUfm();
    chat.sendData('start_monitor_ai', 'start monitor ai');
    this.start();
    chat.sendData('cam_reconnect', 'camera reconnect');
    examCameraUi.primaryCameraAiMonitoring();
  }
  /**
   *
   */
  micRevokeRetry() {
    //examCameraUi.playAllUfm();
    chat.sendData('start_monitor_ai', 'start monitor ai');
    this.start();
  }

  saveSmartProctorMsg(response: any): void {
    request
      .sendChat({
        is_message: 1,
        message: response.message,
        environment: configrationManager.currentStepAlias,
        userType: 'Smart Proctor',
      })
      .then(() => {
        chatUi.showMessages();
      })
      .catch((err: any) => {
        utility.log('Message send failed:', err);
      });
  }

  userEscalted(){
    let self = this;
    if(configrationManager.userEscaltedPara == 1){
      let msg = { mode: 'update_escalation', text: "update escaltion" };
      socket.sendRoomMessage(msg);
      configrationManager.userEscaltedPara = 2;
    }
    if(LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'){
      self.checkSessionStatus();
    }else{
      let msg = { mode: 'primary_escalate', text: "primary escalate" };
      socket.sendRoomMessage(msg);
    }
  }
}

export const examMonitor = new ExamMonitor();
