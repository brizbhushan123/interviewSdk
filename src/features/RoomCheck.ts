import { ai } from '../core/AIManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import request from '../core/RequestManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import utility from '../core/Utility';
import { roomUI } from '../ui/featuresUI/RoomUI';
import ui from '../ui/UiManager';
import { configrationManager } from '../core/ConfigrationManager';
import { stepUIManager } from '../core/StepUIManager';
import { Ufm } from '../core/UFM';
import { textToSpeech } from '../core/TextToSpeech';
import { SDK_EVENT, sdkEvents } from '../core/InternalEventManager';
import { peer } from '../core/PeerConnectionManager';
import { socket } from '../core/SocketManager';
import { regularSnap } from '../core/RegularSnap';
import { chat } from '../core/ChatManager';
import { data } from '@tensorflow/tfjs';
import { stepManager } from '../core/StepsManager';
import { chatUi } from '../ui/ChatUi';
import { ufmM } from '../core/UfmManager';

/**
 *
 */
class RoomCheck extends StepInterface {
  envAlias: string = 'Room_Sanitization_360';
  ufm: Ufm;
  selectedCameraId: string = '';
  selectCameraLabel: string = '';
  previousPercentage: number | null;
  stagnantTimer: ReturnType<typeof setTimeout> | null;
  socketuserID: string;
  apiCode = { revoke: 2305, userEScalte: 2107, error: 2309 };
  cameraRevokePopup: HTMLElement | null = null;
  recordingStarted: boolean = false;
  recordingCamStarted: boolean = false;
  proctorAssignTimeout: ReturnType<typeof setTimeout> | null;
  additionalCameraProceed: boolean = false;
  streamInterval: ReturnType<typeof setInterval> | null = null;
  ntwDisconnectRoom: boolean = false;
  /**
   *
   */
  constructor() {
    super();
    this.ufm = new Ufm();
    this.previousPercentage = null;
    this.stagnantTimer = null;
    this.socketuserID = '';
    this.cameraAllowClick = this.cameraAllowClick.bind(this);
    this.streamCallback = this.streamCallback.bind(this);
    this.proctorAssignTimeout = null;
  }

  /**
   *
   */
  async getCameraStream(): Promise<MediaStream | null> {
    const currentStream = await liveStreamManager.requestVideo(LiveStreamManager.CAMERA.PRIMARY);
    return currentStream?.stream || null;
  }

  /**
   *
   */
  async start(): Promise<void> {
    const keys = this.ufm.ALL_UFM;
    for (const key of keys) { 
        (this.ufm as any)[key] = true; 
    }
    this.ufm.FNP = false;
    this.ufm.FM = false;
    this.ufm.CHAIR = 100;
    let self = this;

    this.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function (){
      self.ntwDisconnectRoom = true;
      ai.stopRoomScan((message: any) => {});
      if (configrationManager.video_recording == 1 && self.recordingCamStarted == true) {
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.ROOM);
        self.recordingCamStarted = false;
      }
    });

    if (configrationManager.video_recording == 1 && this.recordingStarted == false) {
      if (configrationManager.sharedScreen == 1) {
        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
        liveStreamManager.record(LiveStreamManager.CAMERA.SCREEN);
      }
      this.recordingStarted = true;
    }

    this.recieveMessage();
    this.recieveProctorMessage();
    this.proctorLeft();

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      // IF Page is opned on Desktop
      ui.show(ui.id('thinkX_instruction_start'));
      this.showInsructionPage();
    } else {
      let self = this;
      // ui.alertDialog("Start Room Scan","Click Ok to start Room Scan","Ok", async function(dialog: HTMLElement){
      //   ui.remove(dialog);
     
          // if Page is opend in mobile from QR SCAN
          try {
            ui.hide(ui.id('thinkX_instruction_start'));
            const stream = await liveStreamManager.getCameraStream(
              LiveStreamManager.CAMERA.ROOM,
              'environment'
            );
            const socketUserName = utility.extractPrefix(configrationManager.socketUserName, 'RS_CAM');
            self.socketuserID = socketUserName;
            let message = { mode: 'request_attempt', text: 'requesting attempt' };
            socket.sendMessage(self.socketuserID, message);
            if (stream) self.setRoomStream(stream.stream);
            roomUI.hideCameraSelectPage();

            self.subscribe(SDK_EVENT.USER_LEFT, (user_name: string) => {
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
            socket.sendMessage(self.socketuserID, message1);
              peer.connect(socketUserName, LiveStreamManager.CAMERA.ROOM);
              // utility.wait(2000).then(() => {
              //   peer.streamAdd(socketUserName, LiveStreamManager.CAMERA.ROOM); // Send mobile stream to Desktop . it will be recived in subscribe events.
              // });
            // }).catch((error) => {
            //   RoomCheck.stepManager.closeApplication();
            // });
          } catch (error) {
            ui.alertDialog(
              ui.translations.popup_text.additionalCameraDisconnect,
              ui.translations.popup_text.cameraDisconnected,
              ui.translations.popup_buttons.retry,
              function (dialog: HTMLElement) {
                ui.remove(dialog);
                if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                  let message = { mode: 'room_restart', text: 'room restart' };
                  socket.sendMessage(self.socketuserID, message);
                }
              }
            );
          }
      //  });
    }
  }

  sessionExpire() {
    ai.stopRoomScan((message: any) => {});
    window.location.reload();
  }

  setRoomStream(stream: MediaStream, aiStart = 1) {
    roomUI.showLoaderwithText('thinkX_room-card-video');
    roomUI.setAttemptData(configrationManager.roomAttemptNo, 1);
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
          let message = { mode: 'loader_hide', text: 'loader hide' };
            socket.sendMessage(this.socketuserID, message);
          roomUI.showTextAndAudio(
            ui.translations.status.rotate360,
            true,
            this.socketuserID,
            'room_san_audioText',
            'rotate360'
          );
        }, 2000);
       
        ai.roomVerify(video, async (message: any, image: any) => {
          try {
            // roomUI.hideLoaderwithText();
            // ui.show(ui.id('thinkX_percentageBox'));
            if(this.ntwDisconnectRoom == true){
              return;
            }
            utility.log(message, 'prateek');
            const match = message.message.match(/^([\d.]+)%/);
            if (match) {
              const currentPercentage = parseFloat(match[1]);

              // Round to 1 decimal place
              const roundedPercentage = Math.round(currentPercentage * 10) / 10;
              roomUI.updatePercentageCircle(roundedPercentage);
              roomUI.hideLoaderwithText();
              // If same as previous, do nothing — let timer run
              if (this.previousPercentage === roundedPercentage) {
                // Already waiting, do nothing
              } else {
                // Value changed — reset previous and timer
                this.previousPercentage = roundedPercentage;

                if (this.stagnantTimer) {
                  clearTimeout(this.stagnantTimer);
                  this.stagnantTimer = null;
                }

                // Start new timer
                this.stagnantTimer = setTimeout(() => {
                  setTimeout(() => {
                    roomUI.showTextAndAudio(
                      ui.translations.status.moveForward,
                      true,
                      this.socketuserID,
                      'room_san_audioText',
                      'moveForward'
                    );
                  }, 2000);
                  // Reset tracking
                  this.previousPercentage = null;
                  this.stagnantTimer = null;
                }, 8000); // 5 seconds
              }
            }
            if (image != null) {
              // const imageResize = roomUI.resizeBase64Image(image);
              image =  await utility.convertBase64PngToCompressedBase64Jpg(image);
              const imageBlob = utility.base64ToBlob(image);
              this.ufm.log(
                message.detections,
                this.envAlias,
                configrationManager.roomAttemptNo,
                '',
                imageBlob
              );
            }
            if (message.status_code == 112) {
              // setTimeout(() => {
              //   roomUI.showTextAndAudio(
              //     ui.translations.status.noOneInRoom,
              //     true,
              //     this.socketuserID,
              //     'room_san_audioText'
              //   );
              // }, 2000);
            }
            if (message.status_code == 131) {
              ai.stopRoomScan((message: any) => {});
              video.pause();
              this.showUFMList();
              if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
                let message = { mode: 'room_san_ufmList', text: 'show ufm list' };
                socket.sendMessage(this.socketuserID, message);
              }
            }
          } catch (error) {
            utility.log("room error ai",error);
          }
        });
      }
    } else {
      roomUI.showQrPage(this.cameraAllowClick, this.envAlias);
    }
  }

  showUFMList(requestufmOnly: number = 0) {
    request
      .getRoomUfmList({
        environment: this.envAlias,
        attempt_no: configrationManager.roomAttemptNo,
        requestufmOnly : requestufmOnly,
      })
      .then((response) => {
        const { code, data } = response;

        // Shared logic for 'Error' and 'revoke'
        if (
          (code === this.apiCode.error ||
            code === this.apiCode.revoke ||
            code === this.apiCode.userEScalte) &&
          data?.count > 0
        ) {
          if (this.stagnantTimer !== null) {
            clearTimeout(this.stagnantTimer);
            this.stagnantTimer = null;
          }

          roomUI.hideVideoDiv('thinkX_threeSixtyStart');
          roomUI.showUfmDiv();

          stepUIManager.insertText(
            'thinkX_issueFound',
            `${ui.translations.status.issueFound} (${data.count})`
          );

          if (Array.isArray(data.url)) {
            roomUI.createUfmImg(data.url);
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
            ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
            roomUI.showHeaderAndLoaderProctor(ui.translations.status.escalatedProctor);
            ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
            this.escaltedToProctor();
          } else {
            configrationManager.roomAttemptNo++;
            this.rescan();
          }
        } else if (
          data.count > 0 &&
          configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san.value == 0
        ) {
          roomUI.hideVideoDiv('thinkX_threeSixtyStart');
          roomUI.showUfmDiv();

          stepUIManager.insertText(
            'thinkX_issueFound',
            `${ui.translations.status.issueFound} (${data.count})`
          );

          if (Array.isArray(data.url)) {
            roomUI.createUfmImg(data.url);
          }

          ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
          ui.hide(ui.id('thinkX_threeSixtyCloseBtn'));

          utility.wait(4000).then(() => {
            roomUI.showWaitLoader(ui.translations.desk.deskWait);
            utility.wait(4000).then(() => {
              RoomCheck.stepManager.turnOff('deskScan');
              RoomCheck.stepManager.turnOff('bodyScan');
              ui.hide(ui.id('thinkX_percentageBox'));
              this.resultData.status = false;
              this.end();
            });
          });
        } else {
          // Success path
          if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            let message = { mode: 'room_san_greenTick', text: 'complete' };
            socket.sendMessage(this.socketuserID, message);
          }
          if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM' || this.selectedCameraId != '') {
            // either mobile or desktop with secondary camera
            this.completeRoom();
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
    //     utility.log('❌ Failed to chec`k session status', error);
    //   });

    ufmM.checkSessionStatus();
  }

  // async checkSessionStatus() {
  //   return await request.checkSessionStatus();
  // }

  completeRoom(log: boolean = true) {
    ai.stopRoomScan((message: any) => {
      utility.log(message);
    });
    if (this.stagnantTimer !== null) {
      clearTimeout(this.stagnantTimer);
      this.stagnantTimer = null;
    }

    ui.show(ui.id('thinkX_roomSuccess'));
    roomUI.clearOverlayMessage();

    const threeSixtyStart = ui.id('thinkX_threeSixtyStart');
    if (threeSixtyStart) {
      ui.removeClass(threeSixtyStart, 'threeSixtyStart');
      ui.removeClass(threeSixtyStart, 'ufmRoom');
      ui.addClass(threeSixtyStart, 'complete');
    }

    utility.wait(5000).then(() => {
      ui.hide(ui.id('thinkX_roomSuccess'));
      ui.hide(ui.id('thinkX_percentageBox'));
      this.end(0, false, log);
    });
  }

  /**
   *
   */
  rescan() {
    const button = ui.id('thinkX_threeSixtyRescanBtn') as HTMLButtonElement;

    if (button) {
      ui.click(button, async () => {
        roomUI.updatePercentageCircle(0);
        this.rescanTrigger();
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
          let message = { mode: 'room_san_rescan', text: 'rescan' };
          socket.sendMessage(this.socketuserID, message);
        }
      });
    }
  }

  rescanTrigger() {
    // configrationManager.roomAttemptNo++;
    roomUI.resetDiv();
    roomUI.updateAttempt(configrationManager.roomAttemptNo);
    roomUI.roomStart360(this.streamCallback, this.selectedCameraId);
  }

  closeBtn() {
    let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
    if (closeBtn) {
      ui.click(closeBtn, () => {
        this.closeTrigger();
        let message = { mode: 'room_close_browser', text: 'close' };
        socket.sendMessage(this.socketuserID, message);
      });
    }
  }

  closeTrigger() {
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
    RoomCheck.stepManager.closeApplication();
    utility.log('close');
  }

  /**
   *
   */
  async showInsructionPage() {
    const button = ui.id('thinkX_proceedNow') as HTMLButtonElement;
    let self = this;
    if (button) {
      ui.click(button, async () => {
        // After showing QR code - if URL opened then socket events will be recived from the Mobile.
        this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name: string, stream: MediaStream) {
          user_name == user_name;
          self.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
          liveStreamManager.updateRoomRemoteStream(stream);
          roomUI.hideCameraSelectPage();
          clearInterval(self.streamInterval!);
        });
        this.subscribe(SDK_EVENT.SECOND_STREAM_RETRY, function (user_name: string) {
          utility.log('second stream retry', user_name);
          peer.connect(user_name, LiveStreamManager.CAMERA.ROOM);
          // utility.wait(2000).then(() => {
          //   peer.streamAdd(user_name, LiveStreamManager.CAMERA.ROOM); // Send mobile stream to Desktop . it will be recived in subscribe events.
          // });
        });
        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
          utility.log('second stream disconnected', user_name);
          LiveStreamManager.CAMERA.ROOM.stream = null;
          if (self.cameraRevokePopup == null) {
            if (LiveStreamManager.CAMERA.ROOM.external == true) {
              socket.cameraRevoke('RS_CAM');
              self.cameraRevokePopup = ui.alertDialog(
                ui.translations.popup_text.additionalCameraDisconnect,
                ui.translations.popup_text.cameraDisconnected,
                ui.translations.popup_buttons.retry,
                function (dialog: HTMLElement) {
                  ui.remove(dialog);
                  self.cameraRevokePopup = null;
                  if(configrationManager.roomAttemptNo > configrationManager.valueMap.room_sanitization_enabled.data.ai_revoke_room_san_attempt.value){
                    ui.hide(ui.id('thinkX_room-card-video'));
                    roomUI.showHeaderAndLoader(ui.translations.status.all_Attempt);
                    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
                    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
                    self.closeBtn();
                    return;
                  }
                  roomUI.showQrPage(self.cameraAllowClick, self.envAlias);
                }
              );
            }
          }
        });
        roomUI.showQrPage(this.cameraAllowClick, this.envAlias);
      });
    }
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

  async getStreamByDeviceId(deviceId: string): Promise<MediaStream | null> {
    try {
      return await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
      });
    } catch (err) {
      utility.error('Failed to access camera:', err);
      return null;
    }
  }

  modeSelector(mode: string, message: Record<string, any>,user_name:string) {
    switch (mode) {
      case 'room_san_audioText':
        roomUI.showTextAndAudio(message.text, false, this.socketuserID, 'room_san_audioText');
        break;
      case 'room_san_ufmList':
        this.showUFMList(1);
        break;
      case 'room_san_rescan':
        this.rescanTrigger();
        break;
      case 'room_san_greenTick':
        this.completeRoom(false);
        break;
      case 'room_restart':
        roomUI.showQrPage(this.cameraAllowClick, this.envAlias);
        break;
      case 'room_close_browser':
        this.closeTrigger();
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
        this.streamInterval = setInterval(() => { 
          let message1 = { mode: 'getting_stream', text: 'getting stream' };
          socket.sendMessage(user_name, message1);
        }, 5000);
        break;
      case 'getting_stream':
        peer.close(user_name);
        peer.connect(user_name, LiveStreamManager.CAMERA.ROOM);
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

  recievedAttemptNo(data:any){
    roomUI.updateAttempt(data);
    configrationManager.roomAttemptNo = data;
  }

  streamCallback(stream?: MediaStream) {
    if (stream == undefined) {
      let self = this;
      if (self.cameraRevokePopup == null) {
        if (LiveStreamManager.CAMERA.ROOM.external == false) {
          self.cameraRevokePopup = ui.alertDialog(
            ui.translations.popup_text.additionalCameraDisconnect,
            ui.translations.popup_text.cameraDisconnected,
            ui.translations.popup_buttons.retry,
            function (dialog: HTMLElement) {
              ui.remove(dialog);
              self.cameraRevokePopup = null;
              let message = { mode: 'session_terminate', text: 'session_terminate' };
              socket.sendMessage(self.socketuserID + '_RS_CAM', message);
              roomUI.showQrPage(self.cameraAllowClick, self.envAlias);
            }
          );
        }
      }
    } else {
      this.setRoomStream(stream);
    }
  }

  cameraRevoke(): void {
    if (configrationManager.video_recording == 1 && this.recordingCamStarted == true) {
      liveStreamManager.stopRecord(LiveStreamManager.CAMERA.ROOM);
      this.recordingCamStarted = false;
    }
    let self = this;
    ai.stopRoomScan((message: any) => {});
    utility.log('camera revoke 360 alert show');
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
            let message = { mode: 'session_terminate', text: 'session_terminate' };
            socket.sendMessage(self.socketuserID + '_RS_CAM', message);
            roomUI.showQrPage(self.cameraAllowClick, self.envAlias);
          }
        );
      }
    }
  }

  verifyByProctor() {
    setTimeout(() => {
      roomUI.completeView(ui.translations.status.roomScanFinish, ui.translations.status.proceedingToNextStep);
      ui.hide(ui.id('thinkX_percentageBox'));
      ui.show(ui.id('thinkX_room-card-video'));
      ui.hide(ui.id('thinkproc-room-scan-data'));
      this.resultData.status = true;
      this.resultData.info = 'Room 360 Approved by Proctor';
      this.manager().turnOff('deskScan');
      stepUIManager.stepTabDeactive('deskScan');
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
    ui.hide(ui.id('thinkX_threeSixtyRescanBtn'));
    ui.show(ui.id('thinkX_threeSixtyCloseBtn'));
    const removeClass = ui.id('thinkX_threeSixtyRoomScan');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkpro_roomFullHeight');
    } 
    chatUi.initCloseButton();
    let closeBtn = ui.id('thinkX_threeSixtyCloseBtn');
    if (closeBtn) {
      ui.click(closeBtn, () => {
        this.closeTrigger();
      });
    }
  }

  showRoomVideo() {
    roomUI.clearOverlayMessage();
    ui.show(ui.id('thinkX_threeSixtyRoomScan'));
    ui.show(ui.id('thinkX_room-card-video'));
    ui.hide(ui.id('thinkproc-room-scan-data'));
    ui.hide(ui.id('thinkX_percentageBox'));
    const videoEl = document.querySelector(
      '#thinkX_room-card-video video'
    ) as HTMLVideoElement | null;
    if (videoEl) {
      videoEl.play();
    }
  }

  recieveProctorMessage() {
    let self = this;
    this.subscribe(
      SDK_EVENT.CHAT_MESSAGE,
      function (user_name: string, message: Record<string, any>) {
        self.candiateSocketmode(message.mode, message.text, message, user_name);
      }
    );
  }

  proctorLeft() {
    let self = this;
    this.subscribe(SDK_EVENT.USER_LEFT, function (user_name: string) {
      if (user_name == configrationManager.currentProctor) {
        self.escaltedToProctor();
      }
    });
  }

  showUFMPage(from:string){
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

  candiateSocketmode(mode: string, text: string, message: Record<string, any>, from: string) {
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
  result(): StepResult {
    return this.resultData;
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

export const roomCheck = new RoomCheck();
