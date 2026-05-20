import { data, step, string } from "@tensorflow/tfjs";
import { configrationManager } from "../core/ConfigrationManager";
import { liveStreamManager, LiveStreamManager } from "../core/LiveStreamManager";
import { StepInterface, StepResult } from "../core/StepInterface";
import { stepUIManager } from "../core/StepUIManager";
import { chatUi } from "../ui/ChatUi";
import ui from "../ui/UiManager";
import { SDK_EVENT, sdkEvents } from "../core/InternalEventManager";
import { socket } from "../core/SocketManager";
import utility from "../core/Utility";
import { peer } from "../core/PeerConnectionManager";
import request from '../core/RequestManager';
import { Ufm } from "../core/UFM";
import { examCameraUi } from "../ui/featuresUI/ExamCameraSetupUI";
import { chat } from "../core/ChatManager";
import { ai } from "../core/AIManager";
import { environment } from "../config/environment";
import { monitorUi } from "../ui/featuresUI/InterviewMoitorUI";
import { socketTranscript } from "../core/SocketTranscript";

interface OriginalSize {
    screenWidth: number;
    screenHeight: number;
    innerWidth: number;
    innerHeight: number;
}


class InterviewMonitor extends StepInterface {
    envAlias: string = 'Interview_Session';
    interviewerStream: MediaStream | null = null;
    candidateStream: MediaStream | null = null;
    cameraRevokePopup: HTMLElement | null = null;
    camType: string = '';
    camStore: Record<string, Record<string, any>> = {};
    ufm: Ufm;
    aiStarted: boolean = false;
    ufmListTimeout: ReturnType<typeof setTimeout> | null = null;
    recordingStarted: boolean = false;
    recordingCamStarted: boolean = false;
    leaveCountdownTimer: ReturnType<typeof setInterval> | null = null;
    canidateLeftTimeout: ReturnType<typeof setTimeout> | null = null;
    interviewerLeftTimeout: ReturnType<typeof setTimeout> | null = null;
    sendStreamTimeout: { [key: string]: ReturnType<typeof setTimeout> } = {};
    recordingInterval: any = null;
    recordingSeconds: number = 0;
    photoIDMatchTimeout: ReturnType<typeof setTimeout> | null = null;
    ufmShown: any;
    firstUFMLoad: boolean = false;
    counterStarted: boolean = false;
    leftSideInterviewerSet: boolean = false;
    interviewerStreamArr: Record<string, MediaStream> = {};
    muteVideo: boolean = false;
    muteAudio: boolean = false;
    isUfmOpen: boolean = false;
    isReRequestingScreen = false;
    lastScreenRequestAt = 0;
    alreadyInterviewerAttendance: { [key: string]: string } = {};
    originalSize: OriginalSize | null = null;
    sizeCheckInterval: any = null;
    SIZE_THRESHOLD = 30;
    hasSflTriggered = false;

    constructor() {
        super();
        this.ufm = new Ufm();
        this.ufmShown = new Set();
        this.roomSocketmode = this.roomSocketmode.bind(this);
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
        let currentAudioStream = await liveStreamManager.requestAudio(LiveStreamManager.AUDIO.PRIMARY);
        return currentAudioStream || null;
    }

    start(): void {
        // const keys = this.ufm.ALL_UFM;
        // for (const key of keys) { 
        //     (this.ufm as any)[key] = true; 
        // }
        // this.ufm.VD = false;
        // this.ufm.OD = false;

        let self = this;
        ui.show(ui.id('thinkproc_interview_lobby'));

        if (configrationManager.userType == '3') {
            monitorUi.interviewerUiViewHandle(); // show interviewer UI elements
            monitorUi.bindInterviewerUiEvents();

            // this.checkVerificationRequest();
            let msg = { mode: 'approve_candidate', text: "approve attendance" };
            stepUIManager.insertText('think_interview_waitingCandidate', ui.translations.interviewLobby.waitingCandidate);
            socket.sendRoomMessage(msg);
            chatUi.chatButton();
            this.ufmList(true);
            this.endCall();
            const camelCaseJobName = configrationManager.jobName
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
            stepUIManager.insertText('think_interview_designation', camelCaseJobName)

        } else {
            self.subscribe(SDK_EVENT.NETWORK_DISCONNECT, function () {
                self.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                self.stopSizeMonitoring();
                examCameraUi.stopRecording('all');
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
            });
            socketTranscript.start();
            ui.show(ui.id('thinkInterview_candidateVideoSession'));
            ui.hide(ui.id('thinkInterview_interviewerVideo'));
            ui.hide(ui.id('thinkproc-candidate-video-interview'));
            if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                examCameraUi.uniqueUfmObject('P_CAM');
                if (configrationManager.video_recording == 1 && this.recordingStarted == false) {
                    if (configrationManager.sharedScreen == 1) {
                        liveStreamManager.stopRecord(LiveStreamManager.CAMERA.SCREEN);
                        liveStreamManager.record(LiveStreamManager.CAMERA.SCREEN);
                    }
                    ui.show(ui.id('think_interview_rec'));
                    ui.show(ui.id('think_interview_rec_dot'));
                    this.startRecordingTimer();
                    this.recordingStarted = true;
                }
                chatUi.chatButton();
                this.ufmList(true);
                this.endCall();
                const camelCaseJobName = configrationManager.jobName
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                stepUIManager.insertText('think_interview_designation', camelCaseJobName);
                try {
                    this.startExamWithSFL();
                } catch (error) {
                    utility.log("error sfl", error);
                }
            } else if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'C_CAM') {
                ui.hide(ui.id('thinkproc_chat'));
                ui.hide(ui.id('thinkX_chatIcon'));
                ui.hide(ui.id('thinkX_compatibility_wrapper'));
                ui.hide(ui.id('thinkX_cameraSetup_box'));
                ui.show(ui.id('thinkpro_MobileViewBox'));
                //this.startCamera();
                examCameraUi.camType = LiveStreamManager.PRIMARY_CAMERA_NAME;
                const socketUserName = utility.extractPrefix(
                    configrationManager.socketUserName,
                    LiveStreamManager.PRIMARY_CAMERA_NAME
                );
                examCameraUi.socketuserID = socketUserName;
                peer.connect(socketUserName);

                if (configrationManager.video_recording == 1 && this.recordingCamStarted == false) {
                    liveStreamManager.record(LiveStreamManager.CAMERA.CUSTOM);
                    this.recordingCamStarted = true;
                }
            }
        }

        this.startCamera();
        this.subscribeSocketEvent();
        this.attendance();
    }

    endCall() {
        const button = ui.id("thinkproc-end-call-btn");
        let self = this;
        if (button) {
            ui.click(button, async () => {
                ui.show(ui.id("thinkproc-end-call-confirmation-popup"));
                const yesBtn = ui.id("thinkproc-endcall-yes-btn");
                if (yesBtn) {
                    ui.click(yesBtn, async () => {
                        ui.hide(ui.id("thinkproc-end-call-confirmation-popup"));
                        if (configrationManager.userType == '3') {
                            let msg = { mode: 'interviewer_leave', text: "interviewer leaving", data: configrationManager.currentCandidateName };
                            socket.sendRoomMessage(msg);
                        } else {
                            let msg = { mode: 'candidate_leave', text: "candidate leaving" };
                            socket.sendRoomMessage(msg);
                        }
                        socketTranscript.stop();
                        // examCameraUi.stopRecording('all');
                        this.stopRecordingTimer();
                        this.aiStarted = false;
                        examCameraUi.stopAiMonitoring();
                        peer.closeAll();
                        socket.leavingSocket();
                        socket.closeSocket();
                        liveStreamManager.stopStreams();
                        ui.hide(ui.id('thinkproc_chat_popup'));
                        ui.remove(this.cameraRevokePopup);
                        ui.hide(ui.id('thinkX_exam_additional_camera_setup_popup'));
                        ui.hide(ui.id('think_interview_leave_popup'));
                        self.end(0, false, true);
                    })
                }
                const cancelBtn = ui.id("thinkproc-endcall-cancel-btn");
                if (cancelBtn) {
                    ui.click(cancelBtn, async () => {
                        ui.hide(ui.id("thinkproc-end-call-confirmation-popup"));
                    })
                }
            });
        }
    }

    subscribeSocketEvent() {
        let self = this;

        if (configrationManager.userType === '3') {
            this.leaveCandidate();
        }

        this.subscribe(SDK_EVENT.SECOND_STREAM, function (user_name: string, stream: MediaStream) {
            if (configrationManager.userType == '3' && configrationManager.interviewCandidateSocketName == user_name) {// candidate stream
                const streamId = stream.id;
                const camType = self.getCamTypeForStream(user_name, streamId);
                if (camType === "P_CAM") {
                    socketTranscript.start();
                    monitorUi.setMainStream(stream);
                    monitorUi.hideCameraDisconnectIcon("P_CAM");
                    monitorUi.hideWaitingOverlay("P_CAM");
                    stepUIManager.insertText('think_interview_waitingCandidate', ui.translations.interviewLobby.candidateLeftMeeting);
                }
                else if (camType === "C_CAM") {
                    monitorUi.setAdditionalCameraStream(stream, user_name);
                    monitorUi.hideCameraDisconnectIcon("C_CAM");
                }
            }
            else if (configrationManager.userType == '3' && user_name.includes(configrationManager.interviewCandidateSocketName)) { //addtional cams
                monitorUi.setAdditionalCameraStream(stream, user_name);
                monitorUi.hideCameraDisconnectIcon("C_CAM");
            }
            else if (configrationManager.userType == '3') { // other interviewer stream
                self.interviewerStreamArr[user_name] = stream;
                monitorUi.setInterviewerRightSideStream(stream, user_name);
                if (!configrationManager.interviewerVideoMute[user_name]) {
                    monitorUi.hideInterviewerWaitingOverlay(user_name);
                }

            } else if (configrationManager.userType == '2') { // A candidate side
                if (user_name.includes(configrationManager.interviewCandidateSocketName)) { // addtional camera stream
                    const cameraName = utility.getCameraNameInUserSocket(user_name);
                    examCameraUi.camType = cameraName;
                    examCameraUi.setRoomStream(stream, 0); // If stream is comming from the mobile then stop AI in desktop and only show stream on Desktop UI.
                    liveStreamManager.updateCameraSetupStream(stream, cameraName);
                    examCameraUi.hideCameraSelectPage(cameraName);
                } else { // interviewer stream
                     if (Object.keys(configrationManager.intervierData).length <= 1) {
                        monitorUi.coverHundredPercentForInterviewer();
                    }
                    const interviewerName = configrationManager.intervierData[user_name].name;
                    self.interviewerStreamArr[user_name] = stream;
                    monitorUi.interviewerStreamData[user_name] = stream;
                    
                    utility.log("interviewer check: ", 'status: '+self.leftSideInterviewerSet, configrationManager.activeInterviewer +'=='+ user_name);
                    if (configrationManager.activeInterviewer == user_name) {
                        self.leftSideInterviewerSet = true;
                        configrationManager.activeInterviewer = user_name;
                        //monitorUi.setInterviewerLeftSideStream(stream, user_name);
                        monitorUi.setMainStream(stream);
                        if (!configrationManager.interviewerVideoMute[user_name]) {
                            monitorUi.hideMutedIconLeftSide();
                        }
                        // monitorUi.setInterviewerRightSideStream(stream, user_name);
                        // monitorUi.hideActiveInterviewerRightSection();
                    }else{
                         monitorUi.setInterviewerRightSideStream(stream, user_name);
                    }
                    

                    if (!configrationManager.interviewerVideoMute[user_name]) {
                        monitorUi.hideInterviewerWaitingOverlay(user_name);
                    }
                }

            }

            const camName = utility.getCameraNameInUserSocket(user_name);
            if (camName != 'C_CAM') {
                self.sendMyStream(user_name);
            }

        });

        this.subscribe(SDK_EVENT.AUDIO_STREAM, function (user_name: string, stream: MediaStream) {

            if (configrationManager.userType == '3' && configrationManager.interviewCandidateSocketName == user_name) {// candidate stream
                self.setAudioStream(stream);
                ui.show(ui.id('think_interview_userAudioHeartbeat'));
            } else if (configrationManager.userType == '3') { // other interviewer stream
                self.setDynamicInterviewerStream(stream, user_name);
            } else if (configrationManager.userType == '2') { // interviewer stream
                monitorUi.interviewerVoiceData[user_name] = stream;
                if (configrationManager.activeInterviewer == user_name) {
                    self.setAudioStream(stream);
                }
                self.setDynamicInterviewerStream(stream, user_name);
                monitorUi.initAudioHeartbeatInterview(stream, user_name);

                if (configrationManager.interviewerAudioMute[user_name] == false && configrationManager.activeInterviewer == user_name) {
                    ui.show(ui.id('think_interview_userAudioHeartbeat'));
                }
                ui.show(ui.id('think_interview_userAudioHeartbeat_candidate'));
                liveStreamManager.addRemoteUserAudio(user_name, stream.getAudioTracks()[0]);
            }
            const camName = utility.getCameraNameInUserSocket(user_name);
            if (camName != 'C_CAM') {
                self.sendMyStream(user_name);
            }
        });

        this.subscribe(SDK_EVENT.SECOND_STREAM_DISCONNET, function (user_name: string) {
            utility.log('second stream disconnect: ', user_name);
            if (configrationManager.intervierData[user_name] != null) {
                monitorUi.muteInterviewerVideoStream(user_name);
                return false;
            }
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            if (cameraName == 'S_CAM') {
                self.permissionRevoke(280);
            } else if (cameraName == 'B_CAM') {
                self.permissionRevoke(279);
            } else if (cameraName == 'F_CAM') {
                self.permissionRevoke(277);
            } else if (cameraName == 'C_CAM') {
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

            if (self.cameraRevokePopup == null) {
                if (
                    LiveStreamManager.CAMERA[keyName].external == true &&
                    LiveStreamManager.CAMERA[keyName].stream == null
                ) {

                    LiveStreamManager.CAMERA[keyName].external = false;
                    utility.log('camera revoke alert', cameraName);

                    examCameraUi.stopSnap(cameraName);
                    examCameraUi.stopRecording(cameraName);

                    examCameraUi.stopAiMonitoring();
                    self.stopSizeMonitoring();
                    //chat.sendData('stop_monitor_ai', 'stop monitor ai');
                    let streamInfo = liveStreamManager.getAllStreamsId();
                    chat.sendData('cam_disconnect', streamInfo);
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
            }
        });

        this.subscribe(SDK_EVENT.USER_LEFT, function (user_name: string) {
            self.checkUserLeft(user_name);
        });

        this.subscribe(SDK_EVENT.RECEIVE_MESSAGE, function (user_name: string, message: Record<string, any>) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            examCameraUi.modeSelector(message.mode, message, cameraName);
            self.singleSocketmode(message.mode, message.text, message, user_name, cameraName);
        });

        this.subscribe(SDK_EVENT.CHAT_MESSAGE, function (user_name: string, message: Record<string, any>) {
            const cameraName = utility.getCameraNameInUserSocket(user_name);
            self.roomSocketmode(message.mode, message.text, message, user_name, cameraName);
        });

        // Sleep/Wake Recovery: Completely tear down hanging peers locally and request resharing
        this.subscribe(SDK_EVENT.NETWORK_CONNECT, function () {
            utility.log('Network connected (woke from sleep). Tearing down dead peers to force re-share.');
            peer.closeAll();

            // Reset UI booleans so streams append cleanly upon waking up
            self.leftSideInterviewerSet = false;
            self.alreadyInterviewerAttendance = {};

            // Wait 2.5 seconds before broadcasting to guarantee the server has finished adding our reconnected socket back into the interview Room!
            utility.wait(2500).then(() => {
                let msg = { mode: 'resumed_from_sleep', text: "network reconnected, sharing stream" };
                socket.sendRoomMessage(msg);

                // Send native attendance flow so UI elements reconstruct properly
                let streamInfo = liveStreamManager.getAllStreamsId();
                chat.sendData('attendance', streamInfo);
            });
        });
    }

    getCamTypeForStream(userSocket: string, streamId: string): "P_CAM" | "C_CAM" | null {
        if (!this.camStore || !this.camStore[userSocket]) return null;

        const cams = this.camStore[userSocket];

        if (cams.P_CAM === streamId) return "P_CAM";
        if (cams.C_CAM === streamId) return "C_CAM";

        return null;
    }

    leaveCandidate() {
        socketTranscript.stop();
        monitorUi.showCandidateWaitingOverlay(configrationManager.candidateRegisterURL);
        ui.hide(ui.id('thinkproc-additional-cam-section'));
        if(configrationManager.userType === '3'){
            ui.hide(ui.id('thinkproc_primary_cam_revoke'));
            const videoElement = ui.id('thinkInterview_mainVideo') as HTMLVideoElement | null;
            if (videoElement) {
                videoElement.srcObject = null;
            }
        }
    }

    checkUserLeft(user_name: string) {
         const getCamName = utility.getCameraNameInUserSocket(user_name);
        if (configrationManager.userType === '3' && getCamName == 'C_CAM') {
             monitorUi.additionalCameraDisconnectCheck();
        }else if (configrationManager.userType === '3' && configrationManager.interviewCandidateSocketName == user_name) {
            let msg = { mode: 'check_candidate_left', text: "check candidate left" };
            socket.sendRoomMessage(msg);
            this.canidateLeftTimeout = setTimeout(() => {
                this.leaveCandidate();
            }, 2000);
        } else {
            if(LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                let msg = { mode: 'check_interviewer_left', text: "check interviewer left" };
                socket.sendRoomMessage(msg);
                this.interviewerLeftTimeout = setTimeout(() => {
                    this.leaveInterviwer(user_name);
                }, 2000);
            }
        }
    }

    showWaitingOverlay(imageUrl?: string, message?: string): void {
        const overlay = ui.id('thinkproc-waiting-overlay') as HTMLElement | null;
        const img = ui.id('waitingCandidateImg') as HTMLImageElement | null;
        const text = overlay?.querySelector('.waiting-text') as HTMLElement | null;

        if (!overlay || !img || !text) return;

        if (imageUrl) img.src = imageUrl;
        // if (message) text.textContent = message;

        overlay.classList.remove('d-none');
        overlay.style.opacity = '1';
        overlay.style.transition = 'opacity 0.3s ease';
    }

    async startCamera(): Promise<void> {
        utility.log(liveStreamManager.getAllStreamsId());
        const stream = await this.getCameraStream();
        if (stream) {
            const video = this.setStream(stream);
            video.play();
            if (configrationManager.userType == '3') {
                stepUIManager.insertText('thinkinterviewUser', configrationManager.currentCandidateName);
            } else {
                stepUIManager.insertText('thinkinterviewUser', configrationManager.currentCandidateName);
            }
        }
        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            const audioStream = await this.getAudioStream();
            if (audioStream) {
                if (configrationManager.userType == '3') {
                    monitorUi.initAudioHeartbeat(audioStream, 'think_interview_audioHeartbeat');
                } else {
                    monitorUi.initAudioHeartbeat(audioStream, 'think_interview_userAudioHeartbeat_candidate');
                }
            }
        }
    }

    setStream(stream: MediaStream): HTMLVideoElement {
        let video: HTMLVideoElement | null = null;

        if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
            if (configrationManager.userType == '3') {
                video = ui.id('thinkInterview_interviewerVideo') as HTMLVideoElement;
            } else {
                video = ui.id('thinkInterview_candidateVideoSession') as HTMLVideoElement;
                stepUIManager.insertText('thinkproc-interview-video-label-name-candidate', configrationManager.currentCandidateName);
            }
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
        if (stream) {
            video.srcObject = stream;
        }
        return video;
    }

    setAudioStream(stream: MediaStream) {
        monitorUi.initAudioHeartbeat(stream, 'think_interview_userAudioHeartbeat');
    }

    setDynamicInterviewerStream(stream: MediaStream, socketName: string) {
        monitorUi.initAudioHeartbeat(stream, 'think_interview_audioHeartbeat_' + socketName);
    }

    attendance() {
        // this function will be run only one time when candidate join the interview session
        let streamInfo = liveStreamManager.getAllStreamsId();
        // let msg = { mode: 'attendance', text: "send attendance" ,data:streamInfo};
        // socket.sendRoomMessage(msg);
        chat.sendData('attendance', streamInfo);
        this.attendanceReply(1000);
    }
    attendanceReply(delay: number = 0) {
        utility.wait(delay).then(async () => {
            let msg = {
                mode: 'attendance_reply', text: "attendance reply",
                data: { 'video_mute': configrationManager.video_mute, 'audio_mute': configrationManager.audio_mute }
            };
            socket.sendRoomMessage(msg);
        });
    }

    roomSocketmode(mode: string, text: string, message: Record<string, any>, from: string, cameraName: string) {
        switch (mode) {
            case 'attendance':
                // pass cameraDetails objects (or enum values) as separate arguments instead of a string array
                this.setCameraStream(from, message.data);
                if (cameraName == 'C_CAM') {
                    if (configrationManager.userType == '3') {
                        let msg = { mode: 'send_addtional_cam_stream', text: "send addtional camera stream" };
                        socket.sendRoomMessage(msg);
                    }
                } else {
                    // const camName = utility.getCameraNameInUserSocket(user_name);
                    if (cameraName != 'C_CAM') {
                        if (configrationManager.userType == '3') {
                            let streamInfo = liveStreamManager.getAllStreamsId();
                            chat.sendData('stream_update', streamInfo);
                            this.attendanceReply(0);
                            utility.wait(1000).then(async () => {
                                this.sendMyStream(from);
                            });
                        } else {
                            let streamInfo = liveStreamManager.getAllStreamsId();
                            chat.sendData('stream_update', streamInfo);
                            utility.wait(1000).then(() => {
                                this.sendMyStream(from);
                            });
                        }
                    }
                }
                break;
            case 'cam_disconnect':
                if (configrationManager.userType == "3") {
                    this.cameraDisconnectCheck(from, message.data)
                } else {
                    monitorUi.camDisconnectInterviewer(from);
                }
                break;
            case 'additional_cam_disconnect':
                if (configrationManager.userType == "3") {
                    monitorUi.additionalCameraDisconnectCheck();
                }
                break;
            case 'stream_update':
                this.setCameraStream(from, message.data);
                break;
            case 'request_proctor_timeZone':
                let msg1 = { mode: 'send_candidate_proctor_timeZone', text: "send proctor timeZone to candidate", data: configrationManager.interviwerJoiningTime };
                socket.sendRoomMessage(msg1);
                break;
            case 'request_verify_photo_verification':
                if (configrationManager.socketUserName == message.data) {
                    this.checkVerificationRequest();
                }
                break;
            case 'send_interview_allow':
                // pass cameraDetails objects (or enum values) as separate arguments instead of a string array
                let msg = { mode: 'approve_candidate', text: "approve attendance" };
                socket.sendRoomMessage(msg);
                stepUIManager.insertText('think_interview_waitingCandidate', ui.translations.interviewLobby.waitingCandidate);
                break;
            case 'interviewer_leave':
                this.leaveInterviwer(from);
                break;
            case 'candidate_leave':
                this.leaveCandidate();
                break;
            case 'check_candidate_left':
                if (configrationManager.userType === '2' && LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    let msg = { mode: 'candidate_here', text: "candidate here" };
                    socket.sendRoomMessage(msg);
                }
                break;
            case 'candidate_here':
                if (configrationManager.userType === '3' && this.canidateLeftTimeout) {
                    clearTimeout(this.canidateLeftTimeout);
                    this.canidateLeftTimeout = null;
                }
                break;
            case 'check_interviewer_left':
                if (configrationManager.userType === '3') {
                    let msg = { mode: 'interviewer_here', text: "candidate here" };
                    socket.sendRoomMessage(msg);
                }
                break;
            case 'interviewer_here':
                if (configrationManager.userType === '2' && this.interviewerLeftTimeout) {
                    clearTimeout(this.interviewerLeftTimeout);
                    this.interviewerLeftTimeout = null;
                }
                break;
            case "send_addtional_cam_stream":
                if (LiveStreamManager.PRIMARY_CAMERA_NAME != "P_CAM" && configrationManager.userType == '2') { // Candidate addtional cams
                    this.sendMyStream(from);
                }
                break;
            case "mic_disconnect":
                if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
                    ui.hide(ui.id('think_interview_userAudioHeartbeat'));
                }
                if (configrationManager.userType === '2') {
                    liveStreamManager.removeRemoteUserAudio(from);
                }
                if (configrationManager.userType === '3') {
                    ui.show(ui.id('think_interview_left_audio_muted'));
                }
                break;
            case "photo_verify_done":
            case "photo_reject":
                ui.hide(ui.id('thinkproc-id-varification-popup'));
                break;
            case "attendance_reply":
                this.attendanceReplyHandler(from, message);
                break;
            case "mute_video_stream":
                configrationManager.interviewerVideoMute[from] = true;
                monitorUi.muteInterviewerVideoStream(from);
                break;
            case "unmute_video_stream":
                configrationManager.interviewerVideoMute[from] = false;
                monitorUi.unMuteInterviewerVideoStream(from);
                break;
            case "mute_audio_stream":
                configrationManager.interviewerAudioMute[from] = true;
                monitorUi.muteInterviewerAudioStream(from);

                break;
            case "unmute_audio_stream":
                configrationManager.interviewerAudioMute[from] = false;
                monitorUi.unMuteInterviewerAudioStream(from);

                break;
            case "resumed_from_sleep":
                // If the remote user woke up from sleep, quietly wipe our hanging peer object for them.
                utility.log('Remote user woke from sleep. Tearing down their peer cleanly.');
                peer.close(from);

                // Allow the Candidate DOM to re-append their incoming interview streams
                this.leftSideInterviewerSet = false;
                delete this.alreadyInterviewerAttendance[from];

                // We do NOTHING else. They will immediately send an 'attendance' event right after this,
                // which structurally forces a perfect, natively synchronized peer.connect() and UI refresh!
                break;
             case "screen_disconnect":
                ui.show(ui.id("thinkproc_screen_share_revoke"));
                break;
            case "screen_reconnect":
                ui.hide(ui.id("thinkproc_screen_share_revoke"));
                break;
            default:
                utility.warn(`Unknown room socket mode: ${mode}`);
                break;
        }
    }
    singleSocketmode(mode: string, text: string, message: Record<string, any>, from: string, cameraName: string) {
        switch (mode) {
            case "resend_stream":
                this.sendMyStream(from);
                break;
            default:
                utility.warn(`Unknown room socket mode: ${mode}`);
                break;
        }
    }

    attendanceReplyHandler(from: string, message: any) {
        configrationManager.interviewerVideoMute[from] = message.data.video_mute;
        configrationManager.interviewerAudioMute[from] = message.data.audio_mute;
        if (configrationManager.userType == '2') {
            const getCamName = utility.getCameraNameInUserSocket(from);
            if(getCamName && getCamName == 'C_CAM'){
                return;
            }
            this.createInterviewerVideoElement(from);
        } else {
            if (configrationManager.interviewCandidateSocketName == from) {
                return;
            } else {
                const stream = this.interviewerStreamArr[from];
                monitorUi.createDynamicInterviewer(stream, from);
                if (configrationManager.interviewerVideoMute[from]) {
                    monitorUi.muteInterviewerVideoStream(from);
                }
                if (configrationManager.interviewerAudioMute[from]) {
                    monitorUi.muteInterviewerAudioStream(from);
                }
            }
        }

    }

    createInterviewerVideoElement(user_name: string) {
        if (this.alreadyInterviewerAttendance[user_name] !== undefined) return;

        // ✅ Decide active only once
        if (!configrationManager.activeInterviewer) {
            configrationManager.activeInterviewer = user_name;

            monitorUi.singleInterviewerModeUIAdjustments(user_name);

            if (configrationManager.interviewerAudioMute[user_name]) {
                monitorUi.muteAudioLeftSideInterviewer();
            }

            monitorUi.showMutedIconLeftSide(user_name);
        } else {
            monitorUi.multiInterviewerModeUIAdjustments();
        }

        const stream = this.interviewerStreamArr[user_name];
        monitorUi.createDynamicInterviewer(stream, user_name);

        if (configrationManager.interviewerAudioMute[user_name]) {
            monitorUi.muteInterviewerAudioStream(user_name);
        }

        monitorUi.muteInterviewerVideoStream(user_name);

        // ✅ CORE LOGIC: hide only active interviewer from right side
        if (configrationManager.activeInterviewer === user_name) {
            ui.id("interviewer_" + user_name)?.classList.add('d-none');
        } else {
            ui.id("interviewer_" + user_name)?.classList.remove('d-none');
        }

        this.alreadyInterviewerAttendance[user_name] = user_name;
    }

    cameraDisconnectCheck(user_name: string, data: any) {
        const oldStream = this.camStore?.[user_name];
        if (oldStream && typeof oldStream === 'object') {
            if (oldStream['C_CAM'] === undefined) {
                monitorUi.showCameraDisconnectIcon('P_CAM', user_name);
            } else {
                Object.keys(oldStream).forEach((key) => {
                    if (data?.[key] == '') {
                        monitorUi.showCameraDisconnectIcon(key, user_name);
                    }
                });
            }
        }
    }

    setCameraStream(userName: string, data: Record<string, any>) {
        const from = utility.extractPrefix(userName, 'C_CAM');
        this.camStore = this.camStore || {};
        this.camStore[from] = this.camStore[from] || {};

        Object.keys(data).forEach((key) => {
            if (this.camStore && this.camStore[from]
                && this.camStore[from][key] && this.camStore[from][key] !== data[key]) {
                let msg = { mode: 'resend_stream', text: "resend stream" };
                socket.sendMessage(from, msg);
            }
            this.camStore[from][key] = data[key];
        });
        utility.log("this.camStore:", this.camStore);
    }


    leaveInterviwer(user_name: string) {
        if (configrationManager.userType == '3') {
            const stream = this.interviewerStreamArr[user_name];
            if (stream && Object.keys(this.interviewerStreamArr).length > 0) {
                stream.getTracks().forEach(t => t.stop());
                delete this.interviewerStreamArr[user_name];
                delete this.alreadyInterviewerAttendance[user_name];
                delete monitorUi.interviewerStreamData[user_name];
                monitorUi.removeDynamicInterviewer(user_name);
            }
        } else {
            const stream = this.interviewerStreamArr[user_name];
            if (stream && Object.keys(this.interviewerStreamArr).length > 0) {
                stream.getTracks().forEach(t => t.stop());
                delete this.interviewerStreamArr[user_name];
                delete this.alreadyInterviewerAttendance[user_name];
                delete monitorUi.interviewerStreamData[user_name];
                delete monitorUi.interviewerVoiceData[user_name];
                this.leftSideInterviewerSet = false;
                monitorUi.removeDynamicInterviewer();
                if (Object.keys(this.interviewerStreamArr).length <= 1) {
                    monitorUi.coverHundredPercentForInterviewer();
                }
                
                for (const socketName in this.interviewerStreamArr) {
                    
                    const interviewerName = configrationManager.intervierData[socketName].name;
                    if (!this.leftSideInterviewerSet) {
                        this.leftSideInterviewerSet = true;
                        configrationManager.activeInterviewer = socketName;
                        //utility.log("interviewer stream: ", this.interviewerStreamArr[socketName]);
                        monitorUi.setMainStream(this.interviewerStreamArr[socketName]);
                        monitorUi.initAudioHeartbeat(monitorUi.interviewerVoiceData[socketName], 'think_interview_userAudioHeartbeat');
                        // monitorUi.changeInterviewerWaitingOverlayId(this.interviewerStreamArr[socketName], socketName);
                        if (configrationManager.interviewerAudioMute[socketName]) {
                            monitorUi.muteAudioLeftSideInterviewer();
                        }
                        if (configrationManager.interviewerVideoMute[socketName]) {
                            monitorUi.showMutedIconLeftSide(socketName);
                        }
                        stepUIManager.insertText('thinkproc-interview-video-label-name', interviewerName);
                    }

                    monitorUi.createDynamicInterviewer(this.interviewerStreamArr[socketName], socketName);
                    if (configrationManager.interviewerAudioMute[socketName]) {
                        monitorUi.muteInterviewerAudioStream(socketName);
                    }
                    if (configrationManager.interviewerVideoMute[socketName]) {
                        monitorUi.muteInterviewerVideoStream(socketName);
                    }
                    monitorUi.setInterviewerRightSideStream(stream, socketName);
                    monitorUi.initAudioHeartbeat(monitorUi.interviewerVoiceData[socketName], 'think_interview_audioHeartbeat_' + socketName);
                }
                //monitorUi.hideActiveInterviewerRightSection();
            } else {
                if (Object.keys(this.interviewerStreamArr).length == 0) {
                    examCameraUi.stopAiMonitoring();
                    ui.show(ui.id('think_interview_leave_popup'));
                    this.startLeaveCountdown();
                }
            }
        }
    }

    startLeaveCountdown(): void {

        if (this.counterStarted == true) {
            return;
        }
        this.counterStarted = true;
        ui.remove(this.cameraRevokePopup);
        ui.hide(ui.id('thinkX_exam_additional_camera_setup_popup'));
        const popup = ui.id('think_interview_leave_popup');
        const circle = ui.id('thinkinterview_leavecount') as SVGCircleElement | null;
        const timeText = ui.id('thinkX_leaveMin');

        if (!popup || !circle || !timeText) return;

        const totalSeconds = 5;
        let remainingSeconds = totalSeconds;

        const CIRC = 232; // your circumference

        ui.removeClass(popup, 'd-none');
        ui.show(popup);

        const updateUI = () => {
            const min = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
            const sec = (remainingSeconds % 60).toString().padStart(2, "0");
            timeText.textContent = `${min}:${sec}`;

            const ratio = remainingSeconds / totalSeconds;
            const offset = CIRC * (1 - ratio);

            circle.style.strokeDashoffset = offset.toString();
        };

        updateUI();

        if (this.leaveCountdownTimer) {
            clearInterval(this.leaveCountdownTimer);
        }

        this.leaveCountdownTimer = setInterval(() => {
            remainingSeconds--;

            if (remainingSeconds <= 0) {
                clearInterval(this.leaveCountdownTimer!);
                this.leaveCountdownTimer = null;
                timeText.textContent = "00:00";
                circle.style.strokeDashoffset = CIRC.toString();
                this.closeInterviewPopup();
                return;
            }

            updateUI();
        }, 1000);
    }

    closeInterviewPopup(): void {
        ui.hide(ui.id('think_interview_leave_popup'));
        socketTranscript.stop();
        liveStreamManager.stopStreams();
        // examCameraUi.stopRecording('all');
        this.stopRecordingTimer();
        this.stopSizeMonitoring();
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        ui.hide(ui.id('thinkproc_chat_popup'));
        peer.closeAll();
        socket.leavingSocket();
        socket.closeSocket();
        this.end(0, false, true);
    }

    sendMyStream(user_name: string) {
        if (this.sendStreamTimeout && this.sendStreamTimeout[user_name]) {
            clearTimeout(this.sendStreamTimeout[user_name]);
        }
        this.sendStreamTimeout[user_name] = setTimeout(() => {
            const camName = utility.getCameraNameInUserSocket(user_name);
            if (camName == 'C_CAM') {
                peer.connect(user_name, LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM);
            } else {
                peer.connect(user_name, LiveStreamManager.CAMERA.PRIMARY, LiveStreamManager.CAMERA.CUSTOM, LiveStreamManager.AUDIO.PRIMARY);
            }
        }, 1000);
    }

    checkVerificationRequest() {
        request.getIdVerification()
            .then((response) => {
                utility.log('✅ ID Verification status fetched successfully', response);

                if (response.code === 2000 && response.status === true) {
                    const data = response.data.id_verification;
                    ui.show(ui.id('thinkproc-id-varification-popup'));
                    const {
                        auth_reg_id: { value: auth_reg_id },
                        auth_reg_photo: { value: auth_reg_photo },
                        auth_capture_id: { value: auth_capture_id },
                    } = configrationManager.valueMap.candidate_authentication.data;

                    // Candidate photo
                    monitorUi.setCandidateImage(data.candidate_photo?.image, 'thinkInterview_captured_photo');
                    ui.show(ui.id('thinkproc-capturePhoto'));

                    // Capture ID
                    if (auth_capture_id == 1) {
                        monitorUi.setCandidateImage(data.capture_id?.image, 'thinkInterview_captured_id');
                        monitorUi.setPercentage(data.capture_id?.ai_match, 'thinkInterview_captured_id_percentage');
                        ui.show(ui.id('thinkproc-captureID'));
                    }

                    // Registration ID
                    if (auth_reg_id == 1) {
                        monitorUi.setCandidateImage(data.registration_id?.image, 'thinkInterview_register_id');
                        monitorUi.setPercentage(data.registration_id?.ai_match, 'thinkInterview_register_id_percentage');
                        ui.show(ui.id('thinkproc-registerID'));
                    }

                    // Registration photo
                    if (auth_reg_photo == 1) {
                        monitorUi.setCandidateImage(data.registration_photo?.image, 'thinkInterview_register_photo');
                        monitorUi.setPercentage(data.registration_photo?.ai_match, 'thinkInterview_register_photo_percentage');
                        ui.show(ui.id('thinkproc-registerPhoto'));
                    }

                    this.allowVerficaion();
                    this.rejectVerification();
                }
            })
            .catch((error) => {
                utility.log('❌ Failed to fetch ID Verification status', error);
            });
    }

    allowVerficaion() {
        ui.click(ui.id('thinkInterview_allow_verification') as HTMLElement, async () => {
            ui.hide(ui.id('thinkproc-id-varification-popup'));
            let msg = { mode: 'photo_verify_done', text: "verification allow" };
            socket.sendRoomMessage(msg);
            request.updateIDEscalation({ is_approved: 1 })
                .then((response) => utility.log('escaltion allow updated successfully', response))
                .catch((error) => utility.log('Error updating escalaion issue fix:', error));
        });
    }

    // rejectVerification(){
    //     ui.click(ui.id('thinkInterview_reject_verification') as HTMLElement, async () => {
    //         ui.hide(ui.id('thinkproc-id-varification-popup'));
    //         let msg = { mode: 'photo_reject', text: "Photo and id verification reject" };
    //         socket.sendRoomMessage(msg);
    //         request.updateIDEscalation({ is_approved : 0 })
    //           .then((response) => utility.log('escaltion reject updated successfully', response))
    //           .catch((error) => utility.log('Error updating escalaion issue fix:', error));
    //     });
    // }

    rejectVerification(): void {

        const allowBtn = ui.id('thinkInterview_allow_verification') as HTMLButtonElement;
        const rejectBtn = ui.id('thinkInterview_reject_verification') as HTMLButtonElement;
        const backdrop = ui.id('thinkinterview_allowNoteBackdrop') as HTMLElement;
        const textarea = ui.id('noteText') as HTMLTextAreaElement;
        const charCount = ui.id('thinkproc-allowCharCount') as HTMLElement;
        const confirmBtn = ui.id('thinkInterview_allowBtnID') as HTMLButtonElement;
        const errorBox = ui.id('thinkproc-allowErrorMessage') as HTMLElement;
        const closeBtn = ui.id('thinkproc_noteCloseBtn') as HTMLButtonElement;

        // 🔁 Prevent duplicate listeners
        textarea.oninput = null;
        confirmBtn.onclick = null;
        rejectBtn.onclick = null;

        // Show popup
        ui.click(rejectBtn, () => {
            ui.show(backdrop);

            rejectBtn.disabled = true;
            allowBtn.disabled = true;

            textarea.value = '';
            charCount.innerText = '0 / 100';
            confirmBtn.disabled = true;

            ui.hide(errorBox);
            errorBox.innerText = '';
        });

        // Live counter + validation
        textarea.addEventListener('input', () => {
            if (textarea.value.length > 100) {
                textarea.value = textarea.value.substring(0, 100); // hard limit
            }

            const count = textarea.value.length;
            charCount.innerText = `${count} / 100`;

            if (count === 0) {
                confirmBtn.disabled = true;
                ui.hide(errorBox);
                return;
            }

            confirmBtn.disabled = false;
            ui.hide(errorBox);
            errorBox.innerText = '';
        });

        // Confirm Reject
        ui.click(confirmBtn, () => {
            const text = textarea.value.trim();

            if (!text) {
                errorBox.innerText = ui.translations.idVerification.rejectionReason;
                ui.show(errorBox);
                confirmBtn.disabled = true;
                return;
            }

            ui.hide(errorBox);
            errorBox.innerText = '';

            // TODO: your API call here

            ui.hide(backdrop);

            // 🔓 Re-enable main buttons
            rejectBtn.disabled = false;
            allowBtn.disabled = false;

            ui.hide(ui.id('thinkproc-id-varification-popup'));
            let msg = { mode: 'photo_reject', text: text };
            socket.sendRoomMessage(msg);
            request.updateIDEscalation({ is_approved: 0 })
                .then((response) => utility.log('escaltion reject updated successfully', response))
                .catch((error) => utility.log('Error updating escalaion issue fix:', error));
        });

        ui.click(closeBtn, () => {
            ui.hide(ui.id('thinkinterview_allowNoteBackdrop'));
            rejectBtn.disabled = false;
            allowBtn.disabled = false;
        });
    }

    getVideoFromStream(stream: MediaStream): HTMLVideoElement | null {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.width = 640;
        video.height = 480;
        video.play().catch(() => { });
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

                // Start AI monitoring
                if (!this.aiStarted) {
                    try {
                        ai.examAI(video, async (message: any) => {
                            this.aiStarted = true;
                            utility.log(message, 'Exam Monitor AI');
                            if (message.image != '') {
                                message.image = await utility.convertBase64PngToCompressedBase64Jpg(message.image);
                                const imageBlob = utility.base64ToBlob(message.image);
                                examCameraUi.ufm.log(message.od_detections, this.envAlias, 1, 'P_CAM', imageBlob, message.status_code);
                            }
                        });
                    } catch (error) {
                        utility.log("ai error");
                    }
                }

                // Handle SFL (screen focus loss=) monitoring
                if (configrationManager.valueMap.ufm.data.SFL.value == 1) {
                    this.startSizeMonitoring();
                    window.addEventListener('blur', () => {
                        const now = Date.now();
                        if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
                            utility.log('🔕 Blur ignored (screen permission flow)');
                            return;
                        }
                        this.handleFocusLost('window-blur');
                    });

                    document.addEventListener('visibilitychange', () => {
                        const now = Date.now();

                        if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
                            return;
                        }
                        if (document.visibilityState === 'hidden') {
                            this.handleFocusLost('tab_hidden');
                        }
                    });

                }
                resolve(); // ✅ Exam setup complete
            } catch (error) {
                reject(error);
            }
        });
    }

    async handleFocusLost(reason: string): Promise<void> {
        try {

            const now = Date.now();
            if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
                utility.log('🔕 Blur ignored (screen permission flow)');
                return;
            }
            let camera = LiveStreamManager.CAMERA.PRIMARY;

            if (configrationManager.sharedScreen === 1) {
                camera = LiveStreamManager.CAMERA.SCREEN;
            }

            if (!camera.stream) return;

            const video = this.getVideoFromStream(camera.stream);
            if (!video) {
                utility.error('Video element not found for snapshot on focus lost');
                return;
            }

            await utility.wait(1000);

            const snapshot = this.takeSnapshots_sfl(video, false, false);
            const blob = utility.base64ToBlob(snapshot);

            this.ufmTrigger('SFL', 276, blob);

        } catch (error) {
            utility.error('Error during focus lost capture: ' + error);
        }
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

    ufmTrigger(ufmType: string, code: number = 0, blob?: Blob): void {
        try {
            let codeArr = null;
            if (code != 0) {
                codeArr = [code]
            }
            const response = examCameraUi.ufm.log(ufmType, this.envAlias, 1, 'P_CAM', blob, codeArr);
            utility.log(`${ufmType} UFM uploaded successfully`, response);
        } catch (error) {
            utility.log(`❌ ${ufmType} UFM upload failed`, error);
        }
    }

    permissionRevoke(code: number): void {
        if (configrationManager.valueMap.ufm.data.PR.value == 1) {
            this.ufmTrigger('PR', code);
        }
    }

    cameraRevoke(): void {
        if (LiveStreamManager.PRIMARY_CAMERA_NAME != 'P_CAM') {
            this.manager().closeApplication();
            return;
        }
        if (LiveStreamManager.CAMERA.PRIMARY.stream == null) {
            this.permissionRevoke(281);
        }

        let self = this;
        let cameraName = '';
        if (configrationManager.userType == "2") {
            cameraName = examCameraUi.getRevokeCameraName();
        }
        utility.log(cameraName, 'camera revoke alert show');
        if (this.cameraRevokePopup == null && cameraName != '') {
            if (cameraName != '' &&
                LiveStreamManager.CAMERA[cameraName].external == false &&
                LiveStreamManager.CAMERA[cameraName].stream == null
            ) {
                this.camType = LiveStreamManager.CAMERA[cameraName].name;
                if (cameraName == 'SIDE' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(280);
                } else if (cameraName == 'BACK' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(279);
                } else if (cameraName == 'FRONT' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(277);
                } else if (cameraName == 'CUSTOM' && cameraName != configrationManager.reCameraRevoke) {
                    this.permissionRevoke(280);
                }

                if (cameraName == configrationManager.reCameraRevoke) {
                    configrationManager.reCameraRevoke = '';
                }
                examCameraUi.camType = this.camType;

                // examCameraUi.stopSnap(this.camType);
                examCameraUi.stopRecording(this.camType);

                this.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
                let streamInfo = liveStreamManager.getAllStreamsId();
                chat.sendData('additional_cam_disconnect', streamInfo);

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
            } else {
                this.aiStarted = false;
                examCameraUi.stopAiMonitoring();
                chat.sendData('stop_monitor_ai', 'stop monitor ai');
            }
        } else {
            this.aiStarted = false;
            examCameraUi.stopAiMonitoring();
            chat.sendData('stop_monitor_ai', 'stop monitor ai');
            let streamInfo = liveStreamManager.getAllStreamsId();
            if (configrationManager.userType == "3") {
                monitorUi.muteInterviewerVideoStream(configrationManager.socketUserName);
            } else {
                monitorUi.muteCandidateVideoStream();
            }
            chat.sendData('cam_disconnect', streamInfo);

        }
    }
    async cameraRevokeRetry() {
        socketTranscript.start();
        examCameraUi.updateStream();
        if (configrationManager.userType == "3") {
            monitorUi.unMuteInterviewerVideoStream(configrationManager.socketUserName);
        } else {
            monitorUi.unMuteCandidateVideoStream();
        }
        const stream = await this.getCameraStream();
        if (stream) {
            this.setStream(stream);
            examCameraUi.primaryCameraAiMonitoring();
        }
        // Notify room about updated streams so remote peers (candidates) can reconnect
        try {
            const streamInfo = liveStreamManager.getAllStreamsId();
            chat.sendData('stream_update', streamInfo);
            // also send a room message as a fallback for listeners relying on socket events
           // socket.sendRoomMessage({ mode: 'stream_update', text: 'stream re-added', data: streamInfo });
        } catch (e) {
            utility.log('Error broadcasting stream_update after camera retry', e);
        }
    }

    micRevoke(): void {
        this.permissionRevoke(278);
        socketTranscript.stop();
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
        ui.hide(ui.id('think_interview_audioHeartbeat'));
        chat.sendData('mic_disconnect', 'mic disconnect');

    }
    async micRevokeRetry() {
        const audioStream = await this.getAudioStream();
        if (audioStream) {
            monitorUi.initAudioHeartbeat(audioStream, 'think_interview_audioHeartbeat');
        }
        ui.show(ui.id('think_interview_audioHeartbeat'));
        examCameraUi.updateStream();
        examCameraUi.primaryCameraAiMonitoring();
        socketTranscript.start();
        // Notify room about updated audio stream so remote peers reconnect
        try {
            const streamInfo = liveStreamManager.getAllStreamsId();
            chat.sendData('stream_update', streamInfo);
            //socket.sendRoomMessage({ mode: 'stream_update', text: 'audio re-added', data: streamInfo });
        } catch (e) {
            utility.log('Error broadcasting stream_update after mic retry', e);
        }
    }

    ufmList(initClick = true) {
        if (initClick) {
            const ufmBtn = ui.id('thinkinterview_UFM') as HTMLElement;
            if (!ufmBtn) return;

            ui.click(ufmBtn, async () => {
                const ufmPanel = ui.id('think_interview_ufmList');
                const ufmText = ui.id('thinkInterview_blueUFMText');

                if (!ufmPanel) return;

                if (!this.isUfmOpen) {
                    // 🔓 OPEN UFM
                    if (!this.firstUFMLoad) {
                        monitorUi.showLoaderwithText('think_interview_ufmList');
                    }

                    ui.hide(ui.id('thinkInterview_StaticUFMIcon'));
                    ui.show(ui.id('thinkInterview_blueUFMIcon'));
                    ui.show(ufmPanel);
                    ui.hide(ui.id('thinkproc_chat_popup'));

                    if (ufmText) {
                        ufmText.style.color = "rgba(47, 77, 219, 1)";
                    }

                    this.closeUFM();       // keep X working
                    this.ufmList(false);  // load data
                    this.isUfmOpen = true;

                    // reset chat icon state
                    ui.hide(ui.id('thinkInterview_blueMsg'));
                    ui.show(ui.id('thinkInterview_StaticMsg'));

                    const chatText = ui.id('thinkInterviewMsgText');
                    if (chatText) {
                        chatText.style.color = "#000000";
                    }

                } else {
                    // 🔒 CLOSE UFM
                    this.hideUfmPanel();
                }
            });

            return; // prevent rebinding
        }

        // ============================
        // 🔽 Your existing API logic
        // ============================

        let self = this;

        request.getUfmList()
            .then((response) => {
                utility.log("UFM Response", response);

                if (!this.firstUFMLoad) {
                    monitorUi.hideLoaderwithText();
                }

                this.firstUFMLoad = true;

                if (self.ufmListTimeout !== null) {
                    clearTimeout(self.ufmListTimeout);
                    self.ufmListTimeout = null;
                }

                self.ufmListTimeout = setTimeout(() => {
                    self.ufmList(false);
                }, 10000);

                if (response.code === 2000 && response.status === true) {
                    const data = response.data.candidate_ufm;
                    const container = ui.id('think_interview_ufmList')
                        ?.querySelector('.thinkproc-ufm-list') as HTMLElement;

                    if (!container) return;
                    container.innerHTML = '';

                    if (!data || data.length === 0) {
                        ui.hide(ui.id('thinkproc-ufm-list'));
                        ui.show(ui.id('think_interview_no_ufmList'));
                        return;
                    } else {
                        ui.show(ui.id('thinkproc-ufm-list'));
                        ui.hide(ui.id('think_interview_no_ufmList'));
                    }

                    this.ufmShown = new Set();
                    data.reverse();

                    data.forEach((ufm: any) => {
                        let iconSrc = '';
                        let title = '';
                        let description = '';

                        const isFirst = !this.ufmShown.has(ufm.ufm_alias);
                        if (isFirst) this.ufmShown.add(ufm.ufm_alias);

                        const red = isFirst ? '_red' : '';
                        const titleColor = isFirst ? 'style="color:#CC4441;"' : '';
                        const discriptionColor = isFirst ? 'style="color:#000000;"' : '';

                        switch (ufm.ufm_alias) {
                            case 'MFD':
                                iconSrc = environment.UI_BASE_URL + `images/multiFaceDetected${red}.svg`;
                                title = ui.translations.interviewLobby.MFD;
                                description = ui.translations.interviewLobby.ufm_multiFaceDetected;
                                break;
                            case 'SFL':
                                iconSrc = environment.UI_BASE_URL + `images/screenFocusLost${red}.svg`;
                                title = ui.translations.interviewLobby.SFL;
                                description = ui.translations.interviewLobby.ufm_screenFocusLost;
                                break;
                            case 'LA':
                                iconSrc = environment.UI_BASE_URL + `images/lookingAway${red}.svg`;
                                title = ui.translations.interviewLobby.LA;
                                description = ui.translations.interviewLobby.ufm_lookingAway;
                                break;
                            case 'PR':
                                iconSrc = environment.UI_BASE_URL + `images/permissionRevoked${red}.svg`;
                                title = ui.translations.interviewLobby.PR;
                                description = ui.translations.interviewLobby.ufm_permissionRevoke;
                                break;
                            case 'FNP':
                                iconSrc = environment.UI_BASE_URL + `images/faceNotPresent${red}.svg`;
                                title = ui.translations.interviewLobby.FNP;
                                description = ui.translations.interviewLobby.ufm_faceNotPresent;
                                break;
                            case 'FM':
                                iconSrc = environment.UI_BASE_URL + `images/face_mismatch${red}.svg`;
                                title = ui.translations.interviewLobby.FM;
                                description = ui.translations.interviewLobby.ufm_faceMismatch;
                                break;
                            default:
                                iconSrc = environment.UI_BASE_URL + `images/multiFaceDetected${red}.svg`;
                                title = ufm.ufm_name || 'Unknown Event';
                                description = 'Unexpected UFM activity detected.';
                                break;
                        }

                        const item = document.createElement('div');
                        item.className = isFirst
                            ? 'thinkproc-ufm-item active'
                            : 'thinkproc-ufm-item';

                        item.innerHTML = `
                <img src="${iconSrc}" alt="${title}">
                <div class="thinkproc-ufm-content">
                <div class="thinkproc-now-time">
                    <h4 ${titleColor}>${title}</h4>
                    <span>${ufm.ufm_time || ''}</span>
                </div>
                <p ${discriptionColor}>${description}</p>
                </div>
            `;

                        container.prepend(item);
                    });
                }
            })
            .catch((error) => {
                utility.log("Error loading UFM list:", error);

                if (!this.firstUFMLoad) {
                    monitorUi.hideLoaderwithText();
                }

                this.firstUFMLoad = true;
            });
    }

    hideUfmPanel(): void {
        ui.hide(ui.id('think_interview_ufmList'));
        ui.show(ui.id('thinkInterview_StaticUFMIcon'));
        ui.hide(ui.id('thinkInterview_blueUFMIcon'));

        if (this.ufmListTimeout !== null) {
            clearTimeout(this.ufmListTimeout);
            this.ufmListTimeout = null;
        }

        const ufmText = ui.id('thinkInterview_blueUFMText');
        if (ufmText) {
            ufmText.style.color = "#000000";
        }

        this.isUfmOpen = false;
    }


    closeUFM() {
        const closeBtn = ui.id('think_interview_ufm_close') as HTMLElement;
        if (!closeBtn) return;

        ui.click(closeBtn, async () => {
            this.hideUfmPanel();
        });
    }

    startRecordingTimer(): void {
        const timerEl = document.querySelector('.thinkproc-interview-lobby-timer') as HTMLElement;
        if (!timerEl) return;

        timerEl.classList.remove('d-none');

        this.recordingSeconds = 0;

        this.recordingInterval = setInterval(() => {
            this.recordingSeconds++;

            const min = String(Math.floor(this.recordingSeconds / 60)).padStart(2, '0');
            const sec = String(this.recordingSeconds % 60).padStart(2, '0');

            timerEl.textContent = `${min}:${sec}`;
        }, 1000);
    }

    stopRecordingTimer(): void {
        clearInterval(this.recordingInterval);
        this.recordingInterval = null;
    }

    result(): StepResult {
        return this.resultData;
    }

    screenRevoke(): void {
        chat.sendData('screen_disconnect', 'screen disconnect');
        configrationManager.isScreenStreamEnding = true;
        this.lastScreenRequestAt = Date.now();
        this.permissionRevoke(282);
        this.aiStarted = false;
        examCameraUi.stopAiMonitoring();
        chat.sendData('stop_monitor_ai', 'stop monitor ai');
        setTimeout(() => {
            configrationManager.isScreenStreamEnding = false;
        }, 5000);
    }

    screenRevokeRetry(): void {
        chat.sendData('screen_reconnect', 'screen reconnect');
        this.isReRequestingScreen = true;
        this.lastScreenRequestAt = Date.now();

        this.aiStarted = false;
        this.start();
        //examCameraUi.playAllUfm();
        chat.sendData('start_monitor_ai', 'start monitor ai');

        setTimeout(() => {
            this.isReRequestingScreen = false;
        }, 5000);
    }

    startSizeMonitoring(): void {
        if (this.originalSize) return;

        this.originalSize = {
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
        };

        this.sizeCheckInterval = setInterval(() => {
            this.checkSizeChange();
        }, 5000);
    }

    checkSizeChange(): void {
        if (!this.originalSize) return;

        const now = Date.now();

        // ✅ ADD THIS
        if (configrationManager.isScreenStreamEnding || this.isReRequestingScreen || now - this.lastScreenRequestAt < 5000) {
            return;
        }

        const changed =
            window.screen.width < this.originalSize.screenWidth - this.SIZE_THRESHOLD ||
            window.screen.height < this.originalSize.screenHeight - this.SIZE_THRESHOLD ||
            window.innerWidth < this.originalSize.innerWidth - this.SIZE_THRESHOLD ||
            window.innerHeight < this.originalSize.innerHeight - this.SIZE_THRESHOLD;

        // 🔴 Trigger SFL once per shrink
        if (changed) {
            utility.warn('🚨 UFM SFL → Screen size reduced');

            this.handleFocusLost('size-issue'); // your UFM hook
            return;
        }

        // ✅ Reset only when size is restored
        if (!changed && this.hasSflTriggered) {
            this.hasSflTriggered = false;
            utility.log('✅ Screen size restored to normal');
        }
    }

    stopSizeMonitoring(): void {
        if (this.sizeCheckInterval) {
            clearInterval(this.sizeCheckInterval);
            this.sizeCheckInterval = null;
        }

        this.originalSize = null;
        this.hasSflTriggered = false;
    }

}

export const interviewMonitor = new InterviewMonitor();