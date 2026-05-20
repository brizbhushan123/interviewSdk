import { ai } from '../core/AIManager';
import { configrationManager } from '../core/ConfigrationManager';
import { SDK_EVENT } from '../core/InternalEventManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import { peer } from '../core/PeerConnectionManager';
import { regularSnap } from '../core/RegularSnap';
import request from '../core/RequestManager';
import { socket } from '../core/SocketManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepManager } from '../core/StepsManager';
import { stepUIManager } from '../core/StepUIManager';
import { Ufm } from '../core/UFM';
import { ufmM } from '../core/UfmManager';
import utility from '../core/Utility';
import { chatUi } from '../ui/ChatUi';
import { roomUI } from '../ui/featuresUI/RoomUI';
import ui from '../ui/UiManager';

/**
 *
 */
class DeskScan extends StepInterface {
  envAlias: string = 'Desk_Check';
  ufm: Ufm;
  detectionTimeout: NodeJS.Timeout | undefined;
  onBed: boolean = false;
  socketuserID: string;
  selectedCameraId: string = '';
  selectCameraLabel: string = '';
  apiCode = { revoke: 2305, userEScalte: 2107, error: 2309 };
  bedRetryDialog: HTMLElement | null = null;
  cameraRevokePopup: HTMLElement | null = null;
  recordingCamStarted: boolean = false;
  proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
  additionalCameraProceed: boolean = false;
  streamDeskInterval: ReturnType<typeof setInterval> | null = null;
  ntwDisconnect: boolean = false;
  /**
   *
   */
  constructor() {
    super();
    this.ufm = new Ufm();
    this.socketuserID = '';
    this.cameraAllowClick = this.cameraAllowClick.bind(this);
    this.streamCallback = this.streamCallback.bind(this);
    this.proctorAssignTimeout = null;
  }

  async getCameraStream(): Promise<MediaStream | null> {
    const currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.ROOM);
    return currentStream?.stream || null;
  }

  /**
   *
   */
  start(): void {
    const keys = this.ufm.ALL_UFM;
    for (const key of keys) { 
        (this.ufm as any)[key] = true; 
    }
    this.ufm.FNP = false;
    this.ufm.FM = false;
    this.ufm.CHAIR = 100;
    let self = this;
    this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function (){
      self.ntwDisconnect = true;
      ai.stopDeskScan(1,(message: any) => {});
      self.recordingStop();
    });
  
    roomUI.deskScanHeader();
    utility.wait(2000).then(() => {
      this.cameraSelect();
    });
  }

  async cameraSelect() {
    this.subscribeShow();

    this.recieveMessage();
    this.recieveProctorMessage();
    this.proctorLeft();
    if (
      LiveStreamManager.CAMERA.ROOM.stream == null &&
      LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM'
    ) {
      roomUI.showQrPage(this.cameraAllowClick, this.envAlias);
      return;
    }
    
    let self = this;

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      // IF Page is opned on Desktop
      const stream = await this.getCameraStream();
      if (stream) {
        if (LiveStreamManager.CAMERA.ROOM.external == false) {
          this.deskScan(stream);
        } else {
          this.deskScan(stream, 0);
        }
      }
    } else {
      // if Page is opend in mobile from QR SCAN
      try {
        const stream = await liveStreamManager.getCameraStream(
          LiveStreamManager.CAMERA.ROOM,
          'environment'
        );
        const socketUserName = utility.extractPrefix(configrationManager.socketUserName, 'RS_CAM');
        this.socketuserID = socketUserName;
        let message = { mode: 'request_attempt', text: 'requesting attempt' };
        socket.sendMessage(this.socketuserID, message);
        let message2 = { mode: 'request_onBed', text: 'requesting onBed' };
        socket.sendMessage(this.socketuserID, message2);
        if (stream) this.deskScan(stream.stream);

        this.subscribe(SDK_EVENT.USER_LEFT, (user_name: string) => {
          if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM' && user_name == self.socketuserID) {
            // For mobile if Main system goes offline then disconnect the stream.
            LiveStreamManager.CAMERA.ROOM.stream = null;
            if (self.cameraRevokePopup == null) {
              if (LiveStreamManager.CAMERA.ROOM.external == false) {
                self.cameraRevokePopup = ui.alertDialog(
                  ui.translations.status.sessionExpire,
                  ui.translations.status.sessionExpireText,
                  ui.translations.status.sessionExpireBtn,
                  function (dialog: HTMLElement) {
                    ui.remove(dialog);
                    self.cameraRevokePopup = null;
                    self.sessionExpire();
                  }
                );
              }
            }
          }
        });

        // request
        // .qrInactive({
        //   link_data: configrationManager.qrId,
        // })
        // .then((response) => {
        let message1 = { mode: 'sending_stream', text: 'sending stream' };
        socket.sendMessage(this.socketuserID, message1);
          peer.connect(socketUserName, LiveStreamManager.CAMERA.ROOM);
          // utility.wait(2000).then(() => {
          //   peer.streamAdd(socketUserName, LiveStreamManager.CAMERA.ROOM); // Send mobile stream to Desktop . it will be recived in subscribe events.
          // });
        // }).catch((error) => {
        //   DeskScan.stepManager.closeApplication();
        // });
      } catch (error) {
        utility.log('error', error);
        ui.alertDialog(
          ui.translations.popup_text.additionalCameraDisconnect,
          ui.translations.popup_text.cameraDisconnected,
          ui.translations.popup_buttons.retry,
          function (dialog: HTMLElement) {
            ui.remove(dialog);
            ui.hide(ui.id('thinkX_threeSixtyRoomScan'));
            ui.hide(self.bedRetryDialog);
            if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
              let message = { mode: 'desk_restart', text: 'desk restart' };
              socket.sendMessage(self.socketuserID, message);
            }
          }
        );
      }
    }
  }

  sessionExpire() {
    ai.stopDeskScan(1,(message: any) => {});
    window.location.reload();
  }

  subscribeShow() {
    let self = this;

    this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name: string, stream: MediaStream) {
      user_name == user_name;
      self.deskScan(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
      liveStreamManager.updateRoomRemoteStream(stream);
      roomUI.hideCameraSelectPage(); 
      roomUI.deskScanHeader();
      clearInterval(self.streamDeskInterval!);
    });
    this.subscribe(SDK_EVENT.SECOND_STREAM_RETRY, function (user_name: string) {
      utility.log('second stream retry', user_name);
      peer.connect(user_name, LiveStreamManager.CAMERA.ROOM);
      // utility.wait(2000).then(() => {
      //   peer.streamAdd(user_name, LiveStreamManager.CAMERA.ROOM); // Send mobile stream to Desktop . it will be recived in subscribe events.
      // });
    });
    let blurTime: number | null = null;
    this.subscribe(SDK_EVENT.ON_BLUR, function(){
      utility.log('blur trigger');
      blurTime = Date.now();
    });
    this.subscribe(SDK_EVENT.ON_FOCUS, function(){
      utility.log('focus trigger');
      const focusTime = Date.now();

      if(blurTime){
        const diffInSeconds = (focusTime - blurTime) / 1000;

        if (diffInSeconds >= 30) {
          if(LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM'){
            window.location.reload();
          }
        }

        // reset blur time after checking
        blurTime = null;
      }
    });
    this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
      utility.log('second stream disconnected', user_name);
      LiveStreamManager.CAMERA.ROOM.stream = null;
      if (self.cameraRevokePopup == null) {
        if (LiveStreamManager.CAMERA.ROOM.external == true) {
          self.cameraRevokePopup = ui.alertDialog(
            ui.translations.popup_text.additionalCameraDisconnect,
            ui.translations.popup_text.cameraDisconnected,
            ui.translations.popup_buttons.retry,
            function (dialog: HTMLElement) {
              ui.remove(dialog);
              self.cameraRevokePopup = null;
              ui.hide(ui.id('thinkX_deskPopup'));
              if(configrationManager.roomAttemptNo > configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san_attempt.value){
                ui.hide(ui.id('thinkX_room-card-video'));
                roomUI.showHeaderAndLoader(ui.translations.status.all_Attempt);
                ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
                ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
                let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
                if (closeBtn) {
                  ui.click(closeBtn, () => {
                    self.closeBtn();
                  });
                }
                return;
              }
              ui.hide(ui.id('thinkX_threeSixtyRoomScan'));
              ui.hide(self.bedRetryDialog);
              roomUI.showQrPage(self.cameraAllowClick, self.envAlias);
            }
          );
        }
      }
    });
  }

  recieveMessage() {
    let self = this;
    this.subscribe(
      SDK_EVENT.RECEIVE_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        self.modeSelector(message.mode, message,user_name);
      }
    );
  }

  async deskScan(stream: MediaStream, aiStart = 1) {
    // const stream = await this.getCameraStream();
    roomUI.showLoaderwithText('thinkX_room-card-video');
    if (stream) {
      const video = roomUI.setStream(stream);
      if (aiStart == 0) {
        video.onplaying = () => {
            roomUI.hideLoaderwithText();
        }
      }
      video.play();
      
      if (aiStart == 1) {
        if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
          liveStreamManager.record(LiveStreamManager.CAMERA.ROOM);
          this.recordingCamStarted = true;
        }

        setTimeout(() => {
          // roomUI.hideLoaderwithText();
          // let message = { mode: 'loader_hide', text: 'loader hide' };
          // socket.sendMessage(this.socketuserID, message);
          if (this.onBed == false) {
            roomUI.showTextAndAudio(
              ui.translations.desk.show_desk,
              true,
              this.socketuserID,
              'desk_Audio',
              'desk.show_desk'
            );
          } else {
            roomUI.showTextAndAudio(
              ui.translations.desk.show_laptop,
              true,
              this.socketuserID,
              'desk_Audio',
              'desk.show_laptop'
            );
          }
        }, 2000);

        let deskDetected = true;
        let chairDetected = false;
        let laptopDetected = false;

        // this.detectionTimeout = setTimeout(() => {
        //   this.deskScanDetectionComplete(deskDetected, chairDetected, laptopDetected, video, true);
        // }, 30000);

        ai.deskScan(video, async (message: any, image: any) => {

          if(message.status_code == 136){
            roomUI.hideLoaderwithText();
            let message = { mode: 'loader_hide', text: 'loader hide' };
            socket.sendMessage(this.socketuserID, message);
            this.detectionTimeout = setTimeout(() => {
              this.deskScanDetectionComplete(deskDetected, chairDetected, laptopDetected, video, true);
            }, 30000);
          }

          if(this.ntwDisconnect == true){
            return;
          }
          utility.log(message.detections, 'prateek', message.od_result);

          if (message?.detections && Array.isArray(message.detections)) {
            const lowerDetections = message.detections.map((d: string) => d.toLowerCase());

            if (lowerDetections.includes('table')) deskDetected = true;
            if (lowerDetections.includes('chair')) chairDetected = true;
            if (lowerDetections.includes('laptop') || lowerDetections.includes('tv-monitor'))
              laptopDetected = true;
          }

          if (image != null) {
            image =  await utility.convertBase64PngToCompressedBase64Jpg(image);
            const imageBlob = utility.base64ToBlob(image);
            this.ufm.log(
              message.detections,
              this.envAlias,
              configrationManager.roomAttemptNo,
              'RS_CAM',
              imageBlob
            );
          }

          this.deskScanDetectionComplete(deskDetected, chairDetected, laptopDetected, video);
        });
      }
    } else {
      roomUI.showQrPage(this.cameraAllowClick, this.envAlias);
    }
  }

  async cameraAllowClick(select: HTMLSelectElement) {
    this.additionalCameraProceed = true;
    const removeClass = ui.id('thinkproc_body_room');
    if (removeClass) {
      ui.removeClass(removeClass, 'h100');
    }
    const selectedDeviceId = select.value;
    const selectCameraLabel = select?.selectedOptions[0]?.text || '';
    if (selectedDeviceId) {
      roomUI.hideCameraSelectPage();
      this.selectedCameraId = selectedDeviceId;
      this.selectCameraLabel = selectCameraLabel;
      await roomUI.roomStart360(this.streamCallback, this.selectedCameraId);
    } else {
      utility.log('Please select a camera first.');
    }
  }

  streamCallback(stream?: MediaStream) {
    if (stream == undefined) {
      let self = this;
      if (this.cameraRevokePopup == null) {
        if (LiveStreamManager.CAMERA.ROOM.external == false) {
          regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.ROOM.name);
          this.cameraRevokePopup = ui.alertDialog(
            ui.translations.popup_text.additionalCameraDisconnect,
            ui.translations.popup_text.cameraDisconnected,
            ui.translations.popup_buttons.retry,
            function (dialog: HTMLElement) {
              ui.remove(dialog);
              ui.hide(ui.id('thinkX_threeSixtyRoomScan'));
              ui.hide(self.bedRetryDialog);
              self.cameraRevokePopup = null;
              let message = { mode: 'session_terminate', text: 'session_terminate' };
              socket.sendMessage(self.socketuserID + '_RS_CAM', message);
              roomUI.showQrPage(self.cameraAllowClick, self.envAlias);
            }
          );
        }
      }
    } else {
      this.deskScan(stream);
    }
  }

  deskScanDetectionComplete(
    deskDetected: boolean,
    chairDetected: boolean,
    laptopDetected: boolean,
    video: HTMLVideoElement,
    end: boolean = false
  ) {
    if ((this.onBed || (deskDetected && chairDetected)) && laptopDetected) {
      ai.stopDeskScan(1,(message: any) => {
        video.pause();
      });
      clearTimeout(this.detectionTimeout);
      this.showUFM(true); // in case of all three desired object detected
      // ufm list
    } else if (end) {
      ai.stopDeskScan(0,(message: any) => {
        video.pause();
      });
      this.showUFM(false); // in case of all three desired object not detected
    }
  }

  showUFM(allDetect: boolean,requestufmOnly: number = 0) {
    if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
      let message = { mode: 'desk_ufmList', text: 'show ufm list', data: { allDetect: allDetect } };
      socket.sendMessage(this.socketuserID, message);
    }

    request
      .getRoomUfmList({ environment: this.envAlias, attempt_no: configrationManager.roomAttemptNo,requestufmOnly: requestufmOnly })
      .then((response) => {
        const { code, data } = response;

        if (
          (code === this.apiCode.error ||
            code === this.apiCode.revoke ||
            code === this.apiCode.userEScalte) &&
          data?.count > 0
        ) {
          //if ufm detected
          roomUI.hideVideoDiv('thinkX_DeskScan');
          roomUI.showUfmDiv();
          stepUIManager.insertText(
            'thinkX_issueFound',
            ui.translations.status.issueFound + ' (' + response.data.count + ')'
          );
          if (Array.isArray(response.data.url)) {
            roomUI.createUfmImg(response.data.url);
          }
          if (code === this.apiCode.revoke) {
            const revokeClass = ui.id('thinkX_threeSixtyRoomScan');
            if (revokeClass) {
              ui.addClass(revokeClass, 'thinkproc-roomScanFail');
            }
            roomUI.showHeaderAndLoader(ui.translations.status.firstStepRoomFail);
            this.closeBtn();
          } else if (code === this.apiCode.userEScalte) {
            const revokeClass = ui.id('thinkX_threeSixtyRoomScan');
            if (revokeClass) {
              ui.addClass(revokeClass, 'thinkproc-roomScanFail');
            }
            roomUI.showHeaderAndLoader(ui.translations.status.escalatedProctor);
            ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
            this.escaltedToProctor();
          } else {
            configrationManager.roomAttemptNo++;
            this.rescan(1);
          }
        } else if (
          data.count > 0 &&
          configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san.value == 0
        ) {
          roomUI.hideVideoDiv('thinkX_DeskScan');
          roomUI.showUfmDiv();
          stepUIManager.insertText(
            'thinkX_issueFound',
            ui.translations.status.issueFound + ' (' + response.data.count + ')'
          );
          if (Array.isArray(response.data.url)) {
            roomUI.createUfmImg(response.data.url);
          }

          ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
          ui.hide(ui.id('thinkX_threeSixtyCloseBtn'));

          utility.wait(4000).then(() => {
            roomUI.showWaitLoader(ui.translations.desk.deskWait);
            utility.wait(4000).then(() => {
              DeskScan.stepManager.turnOff('bodyScan');
              regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.ROOM.name);
              this.recordingStop();
              this.end();
            });
          });
        } else {
          // if no ufm detected
          if (allDetect == true) {
            if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
              let message = { mode: 'desk_greenTick', text: 'complete' };
              socket.sendMessage(this.socketuserID, message);
            }

            if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM' || this.selectedCameraId != '') {
              // either mobile or desktop with secondary camera
              this.completeDesk();
            }
          } else {
            if (this.onBed == false) {
              this.noDeskPopup();
            } else {
              let self = this;
              let retry = true;
              if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM' && self.selectedCameraId == '') {
                retry = false;
              }

              if (self.bedRetryDialog) {
                ui.remove(self.bedRetryDialog);
              }

              if (
                configrationManager.valueMap.room_sanitization_enabled.data
                  .ai_revoke_room_san_attempt.value == configrationManager.roomAttemptNo
              ) {
                roomUI.hideVideoDiv('thinkX_DeskScan');
                roomUI.showUfmDiv();

                ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
                ui.show(ui.id('thinkX_threeSixtyCloseBtn'));

                roomUI.showcloseLoader(ui.translations.status.firstStepRoomFail);

                if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                  let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
                  if (closeBtn) {
                    ui.click(closeBtn, () => {
                      self.closeBtn();
                      let message = { mode: 'desk_close_browser', text: 'close' };
                      socket.sendMessage(self.socketuserID, message);
                    });
                  }

                  // start again
                  // send to socket to close the popup
                } else if (LiveStreamManager.CAMERA.ROOM.external == false) {
                  let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
                  if (closeBtn) {
                    ui.setCloseApplicationButton(closeBtn);
                  }
                  // start again
                }
              } else {
                self.bedRetryDialog = ui.alertDialog(
                  ui.translations.status.noLaptop,
                  ui.translations.status.noDetection,
                  ui.translations.popup_buttons.retry,
                  function (dialog: HTMLElement) {
                    if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                      self.rescanTrigger();

                      let message = { mode: 'desk_rescan', text: 'rescan' };
                      socket.sendMessage(self.socketuserID, message);
                      // start again
                      // send to socket to close the popup
                    } else if (LiveStreamManager.CAMERA.ROOM.external == false) {
                      self.rescanTrigger();
                      // start again
                    }
                    ui.remove(dialog);
                  },
                  retry
                );
              }
            }
          }
        }
      })
      .catch((error) => {
        utility.log('error', error);
      });
  }

  escaltedToProctor() {
    // this.checkSessionStatus()
    //   .then((response) => {
    //     if (response.code == 2313) {
    //       if (this.proctorAssignTimeout !== null) {
    //         clearTimeout(this.proctorAssignTimeout);
    //       }
    //       if (response.data.proctor_found == true) {
    //         socket.setProctor(response.data.proctor_user_name);
    //       }
    //     }
    //     if (response.code == 2901) {
    //       this.proctorAssignTimeout = setTimeout(() => {
    //         this.escaltedToProctor();
    //       }, 10000);
    //     }
    //   })
    //   .catch((error) => {
    //     utility.log('❌ Failed to check session status', error);
    //   });
    ufmM.checkSessionStatus();
  }

  completeDesk(log: boolean = true) {
    ui.show(ui.id('thinkX_roomSuccess'));
    stepUIManager.insertText('thinkX_roomScanFinish', ui.translations.status.deskScanFinish);
    stepUIManager.insertText('thinkX_proceeding', ui.translations.status.bodyScanproceedingTo);
    const videoElComplete = document.querySelector(
      '#thinkX_room-card-video video'
    ) as HTMLVideoElement | null;
    if (videoElComplete) {
      videoElComplete.pause();
    }
    roomUI.hideOverlayMessage();
    const threeSixtyStart = ui.id('thinkX_DeskScan');
    if (threeSixtyStart) {
      ui.removeClass(threeSixtyStart, 'threeSixtyStart');
      ui.removeClass(threeSixtyStart, 'ufmRoom');
      ui.addClass(threeSixtyStart, 'complete');
    }

    let self = this;
    // roomUI.clearOverlayMessage();

    utility.wait(1000).then(() => {
      
      if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
        ui.hide(ui.id('thinkX_roomSuccess'));
        ui.alertInfoBox(
          ui.translations.infoPopup.infoPopupTitle,
          ui.translations.infoPopup.infoPopupSubTitle,
          ui.translations.infoPopup.infoPopupText,
          ui.translations.infoPopup.infoPopupBtn,
          function (dialog: HTMLElement) {
            ui.hide(dialog);
            let message = { mode: 'desk_end', text: 'end' };
            socket.sendMessage(self.socketuserID, message);
            regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.ROOM.name);
            self.recordingStop();
            self.end(0, false, log);
          }
        );
      } else if (this.selectedCameraId != '') {
        ui.hide(ui.id('thinkX_roomSuccess'));
        // P_CAM secondary cam
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.ROOM.name);
        this.recordingStop();
        self.end(0, false, log);
      }
    });
  }

  modeSelector(mode: string, message: Record<string, any>,user_name:string) {
    switch (mode) {
      case 'desk_Audio':
        roomUI.showTextAndAudio(message.text, false, this.socketuserID, 'desk_Audio');
        break;
      case 'desk_ufmList':
        this.showUFM(message.data.allDetect,1);
        break;
      case 'desk_rescan':
        this.rescanTrigger();
        break;
      case 'desk_greenTick':
        this.completeDesk(false);
        break;
      case 'desk_popup':
        this.noPopupTrigger();
        break;
      case 'desk_end':
        ui.hide(ui.id('thinkX_roomSuccess'));
        this.end(0, false, true);
        break;
      case 'desk_popup_data':
        roomUI.setPopupData(message);
        break;
      case 'desk_close_browser':
        this.closeBtn();
        break;
      case 'desk_restart':
        roomUI.showQrPage(this.cameraAllowClick, this.envAlias);
        break;
      case 'session_terminate':
        this.sessionExpire();
        break;
      case 'request_attempt':
        this.setAttemptNo(user_name);
        break;
      case 'recieved_attempt':
        this.recievedAttemptNo(message.data);
        break;
      case 'sending_stream':
        this.streamDeskInterval = setInterval(() => { 
          let message1 = { mode: 'getting_stream', text: 'getting stream' };
          socket.sendMessage(user_name, message1);
        }, 5000);
        break;
      case 'getting_stream':
        peer.close(user_name);
        peer.connect(user_name, LiveStreamManager.CAMERA.ROOM);
        break;
      case 'request_onBed':
        this.setOnBed(user_name);
        break;
      case 'recieved_OnBed':
        this.recievedOnBed(message.data);
        break;
      case 'loader_hide':
        roomUI.hideLoaderwithText();
        break;
      default:
        utility.log('Unknown mode:', mode);
    }
  }

  setAttemptNo(user_name:string){
    let message = { mode: 'recieved_attempt', text: 'requesting attempt', data:configrationManager.roomAttemptNo };
    socket.sendMessage(user_name, message);
  }

  setOnBed(user_name:string){
    let message = { mode: 'recieved_OnBed', text: 'requesting OnBed', data:this.onBed };
    socket.sendMessage(user_name, message);
  }

  recievedOnBed(data:any){
    this.onBed = data;
  }

  recievedAttemptNo(data:any){
    roomUI.updateAttempt(data);
    configrationManager.roomAttemptNo = data;
  }

  closeBtn() {
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
    DeskScan.stepManager.closeApplication();
    utility.log('close');
  }

  rescan(rescanAttempt: number = 0) {
    const button = ui.id('thinkX_threeSixtyRescanBtn') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        this.rescanTrigger(rescanAttempt);
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
          let message = { mode: 'desk_rescan', text: 'rescan' };
          socket.sendMessage(this.socketuserID, message);
        }
      });
    }
  }

  rescanTrigger(rescanAttempt: number = 0) {
    if (this.bedRetryDialog) {
      ui.hide(this.bedRetryDialog);
      this.bedRetryDialog = null;
    }
    if (rescanAttempt == 1) {
      
    }
    roomUI.resetDiv();
    roomUI.updateAttempt(configrationManager.roomAttemptNo);
    this.start();
  }

  noDeskPopup() {
    ui.show(ui.id('thinkX_deskPopup'));
    request.deskOption().then((response) => {

      if (response.code === 3001 && response.data) {
      const deskData = response.data; // array of objects from API

      // Set text dynamically for each option
      deskData.forEach((item: any) => {
        let spanId = '';
        let text = '';

        switch (item.fldValue) {
          case 'ON_BED':
            spanId = 'thinkX_deskInssue1';
            text = ui.translations.desk.deskpopupListItem1;
            break;
          case 'ON_FLOOR':
            spanId = 'thinkX_deskInssue2';
            text = ui.translations.desk.deskpopupListItem2;
            break;
          case 'OTH':
            spanId = 'thinkX_deskInssue3';
            text = ui.translations.desk.deskpopupListItem3;
            break;
        }

        if (spanId && text) {
          const span = ui.querySelector(`label[for="${spanId}"] span`);
          if (span) {
            span.textContent = text;
            span.setAttribute('data-value', item.fldValue); // logical value
            span.setAttribute('data-id', item.fldCandidateSeatingLocationId.toString()); // actual ID
          }
        }
      });
    } else {
        console.warn("Desk options not found or invalid response");
      }

      const button = ui.id('thinkX_micRetryDesk') as HTMLElement;

      if (button) {
        ui.click(button, async () => {
          this.noPopupTrigger();
          const selectedRadio = document.querySelector<HTMLInputElement>(
            'input[name="deskIssue"]:checked'
          );

          if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            let message = { mode: 'desk_popup', text: 'popup' };
            socket.sendMessage(this.socketuserID, message);
          }

          let desk_option_id: number | null = null;

          if (selectedRadio) {
            const label = document.querySelector<HTMLLabelElement>(
              `label[for="${selectedRadio.id}"]`
            );
            if (label) {
              const span = label.querySelector<HTMLSpanElement>('span');
              if (span) {
                const idStr = span.getAttribute('data-id');
                desk_option_id = idStr ? parseInt(idStr, 10) : null;
              }
            }
          }

          const reasonEl = ui.id('thinkX_deskDesc') as HTMLTextAreaElement;
          const desk_reason = reasonEl ? reasonEl.value.trim() : '';

          if (desk_option_id === null) {
            utility.log('No desk option selected');
          } else {
            request.updateDeskOption({ desk_option_id, desk_reason })
              .then((response) => utility.log('Desk issue updated:', response))
              .catch((error) => utility.log('Error updating desk issue:', error));
          }
        });
        roomUI.validateDeskIssueForm();
        if (
          LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM' ||
          LiveStreamManager.CAMERA.ROOM.external == false
        ) {
          let text = ui.id('thinkX_deskDesc');
          let count = ui.id('thinkproc_textCount'); // live count element
          const maxLength = 200;
          if (text) {
            ui.keyup(text, () => {
              const textInput = text as HTMLInputElement | HTMLTextAreaElement;
              // send to socket
              // enforce 200 character limit
              if (textInput.value.length > maxLength) {
                textInput.value = textInput.value.substring(0, maxLength);
              }

              // update character count
              if (count) {
                count.textContent = textInput.value.length.toString();
              }
              this.sendPopupData();
              roomUI.validateDeskIssueForm(); // ✅ validate on text input
            });
          }

          let radioList = ui.querySelectorAll(`input[name="deskIssue"]`);
          if (radioList) {
            radioList.forEach((radio) => {
              ui.change(radio, () => {
                // send to socket
                this.sendPopupData();
                roomUI.validateDeskIssueForm(); // ✅ validate on text input
              });
            });
          }
        } else if (LiveStreamManager.CAMERA.ROOM.external == true) {
          const text = ui.id('thinkX_deskDesc');
          if (text) {
            (text as HTMLInputElement | HTMLTextAreaElement).disabled = true;
          }

          // ✅ Disable all radio inputs
          const radioList = ui.querySelectorAll(`input[name="deskIssue"]`);
          if (radioList) {
            radioList.forEach((radio) => {
              (radio as HTMLInputElement).disabled = true;
            });
          }

          // ✅ Hide "Scan Now" button
          const scanBtn = ui.id('thinkX_micRetryDesk'); // replace with actual ID of your button
          if (scanBtn) {
            scanBtn.style.display = 'none'; // or scanBtn.classList.add('hidden');
          }
          // text area diable and radio disable and hide scan now button
        }
      }
    }).catch((error) => {
      utility.log('error', error);
    });
  }

  sendPopupData() {
    let textdata = roomUI.getDeskIssueDescription();
    let radioData = roomUI.deskBedPopupResult();
    let textCount = roomUI.deskTextCount();

    let message = {
      mode: 'desk_popup_data',
      text: 'popup',
      data: { text: textdata, radio: radioData, textCount: textCount },
    };
    socket.sendMessage(this.socketuserID, message);
  }

  noPopupTrigger() {
    // configrationManager.roomAttemptNo++;
    roomUI.hideDeskPopup();
    this.onBed = true;
    this.start();
  }

  /**
   *
   */
  result(): StepResult {
    return this.resultData;
  }

  cameraRevoke(): void {
    this.recordingStop();
    let self = this;
    ai.stopDeskScan(1,(message: any) => {});
    if (this.cameraRevokePopup == null) {
      if (
        LiveStreamManager.CAMERA.ROOM.external == false &&
        LiveStreamManager.CAMERA.ROOM.stream == null && 
        this.additionalCameraProceed == true
      ) {
        socket.cameraRevoke('RS_CAM');
        regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.ROOM.name);
        this.cameraRevokePopup = ui.alertDialog(
          ui.translations.popup_text.additionalCameraDisconnect,
          ui.translations.popup_text.cameraDisconnected,
          ui.translations.popup_buttons.retry,
          function (dialog: HTMLElement) {
            ui.remove(dialog);
            self.cameraRevokePopup = null;
            ui.hide(ui.id('thinkX_threeSixtyRoomScan'));
            ui.hide(self.bedRetryDialog);
            let message = { mode: 'session_terminate', text: 'session_terminate' };
            socket.sendMessage(self.socketuserID + '_RS_CAM', message);
            roomUI.showQrPage(self.cameraAllowClick, self.envAlias);
          }
        );
      }
    }
  }

  // async checkSessionStatus() {
  //   return await request.checkSessionStatus();
  // }

  recordingStop(): void {
    if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
      liveStreamManager.stopRecord(LiveStreamManager.CAMERA.ROOM);
      this.recordingCamStarted = false;
    }
  }

  verifyByProctor() {
    // roomUI.completeView();
    setTimeout(() => {
      roomUI.completeView(
        ui.translations.status.deskScanFinish,
        ui.translations.status.proceedingToNextStep
      );

      ui.show(ui.id('thinkX_room-card-video'));
      ui.hide(ui.id('thinkproc-room-scan-data'));
      this.resultData.status = true;
      this.resultData.info = 'Desk Scan Approved by Proctor';
      this.manager().turnOff('bodyScan');
      stepUIManager.stepTabDeactive('bodyScan');
      chatUi.initCloseButton();
      configrationManager.currentProctor = "";
      this.end();
    }, 1000);
  }

  rejectByProctor(message: string) {
    ufmM.stopStatusCheck();
    roomUI.rejectView(message);
    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
    chatUi.initCloseButton();
    const removeClass = ui.id('thinkX_threeSixtyRoomScan');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkpro_roomFullHeight');
    } 
    let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
    if (closeBtn) {
      ui.click(closeBtn, () => {
        this.closeBtn();
      });
    }
  }

  recieveProctorMessage() {
    let self = this;
    this.subscribe(
      SDK_EVENT.CHAT_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        self.candiateSocketmode(message.mode, message.text, message,user_name);
      }
    );
  }

  showRoomVideo() {
    roomUI.clearOverlayMessage();
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    ui.show(ui.id('thinkX_room-card-video'));
    ui.hide(ui.id('thinkproc-room-scan-data'));
    const videoEl = document.querySelector(
      '#thinkX_room-card-video video'
    ) as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.play();
    }
    // ui.show(ui.id('thinkproc_chat'));
  }

  proctorLeft() {
    let self = this;
    this.subscribe(SDK_EVENT.USER_LEFT, function (user_name: string) {
      if (user_name == configrationManager.currentProctor) {
        self.escaltedToProctor();
      }
    });
  }

  showUFMPage(from:string) {
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    ui.hide(ui.id('thinkX_room-card-video'));
    ui.show(ui.id('thinkproc-room-scan-data'));
    const videoEl = document.querySelector(
      '#thinkX_room-card-video video'
    ) as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.pause();
    }
    peer.close(from);
    chatUi.initCloseButton();
  }

  candiateSocketmode(mode: string, text: string, message: Record<string, any>,from: string) {
    switch (mode) {
      case 'room_verify_done':
        this.verifyByProctor();
        break;
      case 'room_reject':
        this.rejectByProctor(text);
        break;
      case 'room_video_show':
        this.showRoomVideo();
        break;
      case 'proctor_trigger_back':
        this.showUFMPage(from);
        break;
      default:
        utility.log('Unknown mode:', mode);
    }
  }

  /**
   *
   */
  cameraRevokeRetry() {}
  /**
   *
   */
  micRevokeRetry() {}
}

export const deskScan = new DeskScan();
