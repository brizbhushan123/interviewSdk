import { environment } from '../../config/environment';
import { configrationManager } from '../../core/ConfigrationManager';
import { liveStreamManager, LiveStreamManager } from '../../core/LiveStreamManager';
import { socket } from '../../core/SocketManager';
import { stepUIManager } from '../../core/StepUIManager';
import utility from '../../core/Utility';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

class InterviewMoniterUI {
  interviewerStreamData: { [key: string]: MediaStream } = {};
  interviewerVoiceData: { [key: string]: MediaStream } = {};
  interviewerLevels: Record<string, number> = {};
  lastSpeakerSwitch = 0;
  SPEAKER_THRESHOLD = 50;
  SWITCH_DELAY = 4000; // ms
  audioCtx?: AudioContext;
  activeInterviewer: string = '';
  leftSideSwap: boolean = false;
  audioAnimationIds: Record<string, number> = {};
  audioSources: Map<string, MediaStreamAudioSourceNode> = new Map();


  setAdditionalCameraStream(stream: MediaStream, user_name: string) {
    this.showAdditionalWaitingOverlay();
    let video: HTMLVideoElement | null = null;
    ui.show(ui.id('thinkproc-additional-cam-section'));
    stepUIManager.insertText(
      'thinkproc-interviewCustom-video-label-name',
      ui.translations.interviewLobby.custom_camera
    );
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      video = ui.id('thinkInterview_mainVideo_additional_cam') as HTMLVideoElement;
    }

    if (!video) {
      throw new Error('No valid video element found for the selected camera.');
    }

    video.srcObject = stream;
    video.onplaying = () => {
      this.hideWaitingOverlay('C_CAM');
    };
    video.play();
  }

  /** ✅ Hide waiting overlay with fade-out */
  hideWaitingOverlay(cameraType: string): void {
    let overlay = null as HTMLElement | null;
    if (cameraType == 'P_CAM') {
      overlay = ui.id('thinkproc-waiting-overlay') as HTMLElement | null;
    } else {
      overlay = ui.id('thinkproc-waiting-overlay-additional-cam') as HTMLElement | null;
    }
    if (!overlay) return;

    overlay.style.transition = 'opacity 0.3s ease';
    overlay.style.opacity = '0';

    // Wait for fade-out animation, then hide
    setTimeout(() => {
      overlay.classList.add('d-none');
    }, 300);
  }

  showAdditionalWaitingOverlay(imageUrl?: string, message?: string): void {
    const overlay = ui.id('thinkproc-waiting-overlay-additional-cam') as HTMLElement | null;
    const img = ui.id('waitingCameraLoadingImg') as HTMLImageElement | null;
    const text = overlay?.querySelector('.waiting-text') as HTMLElement | null;

    if (!overlay || !img || !text) return;

    if (imageUrl) img.src = imageUrl;
    if (message) text.textContent = message;

    overlay.classList.remove('d-none');
    overlay.style.opacity = '1';
    overlay.style.transition = 'opacity 0.3s ease';
  }

   showCandidateWaitingOverlay(imageUrl?: string): void {
    const overlay = ui.id('thinkproc-waiting-overlay') as HTMLElement | null;
    const img = ui.id('waitingCandidateImg') as HTMLImageElement | null;
    const contentArea = overlay?.querySelector('.waiting-content') as HTMLElement | null;
    const text = overlay?.querySelector('.waiting-text') as HTMLElement | null;

    if (!overlay || !img || !contentArea || !text) return;

    const hasImage = !!imageUrl && String(imageUrl).trim() !== '';

    if (hasImage) {
      img.src = imageUrl as string;
      img.style.display = '';
      const oldAvatar = contentArea.querySelector('.avatar-circle');
      if (oldAvatar) oldAvatar.remove();
    } else {
      img.removeAttribute('src');
      img.style.display = 'none';
      const candidateName = configrationManager.interviewCandidateName || '';
      utility.generateNameAvatar(contentArea, candidateName, 1, '120', '40');
    }

    overlay.classList.remove('d-none');
    overlay.style.opacity = '1';
    overlay.style.transition = 'opacity 0.3s ease';
  }

  showCameraDisconnectIcon(cameraName: string | '', userName: string): void {
    monitorUi.hideWaitingOverlay(cameraName);
    if(configrationManager.interviewCandidateSocketName == userName) {
      if (cameraName == 'P_CAM') {
        const video = ui.id('thinkInterview_mainVideo') as HTMLVideoElement | null;
        if (video) {
          video.srcObject = null;
        }
        ui.show(ui.id('thinkproc_primary_cam_revoke'));
      } else if (cameraName == 'C_CAM') {
        // const video = ui.id('thinkInterview_mainVideo_additional_cam') as HTMLVideoElement | null;
        // if (video) {
        //   video.srcObject = null;
        // }
        // ui.show(ui.id('thinkproc_additional_cam_revoke'));
      }
    } else {
       if (cameraName == 'P_CAM') {
        const video = ui.id('thinkInterview_interviewerVideo_' + userName) as HTMLVideoElement | null;
        if (video) {
          video.srcObject = null;
        }
        const name = configrationManager.intervierData[userName].name;
        const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName) as HTMLElement | null;
        utility.generateNameAvatar(overlay, name);
      }
    }
  }

  hideCameraDisconnectIcon(cameraName: string): void {
    if (cameraName == 'P_CAM') {
      ui.hide(ui.id('thinkproc_primary_cam_revoke'));
      ui.hide(ui.id('thinkproc-interviewer-waiting-overlay'));
    } else if (cameraName == 'C_CAM') {
      ui.hide(ui.id('thinkproc_additional_cam_revoke'));
    }
  }

  hideInterviewerWaitingOverlay(userName: string): void {
    const overlay = ui.id(
      'thinkproc-interviewer-waiting-overlay_' + userName
    ) as HTMLElement | null;
    utility.removeAvatarSvgImage(overlay);
  }

  showLoaderwithText(id: string): void {
    const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
    stepUIManager.setLoader(loaderHTML, id);
  }

  hideLoaderwithText(): void {
    const existingLoader = ui.id('thinkX_loadingwithText');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }
  singleInterviewerModeUIAdjustments(socketName: string): void {
    const rightdiv = ui.id('think_interview_video_rightdiv');
    if (rightdiv) {
      rightdiv.style.removeProperty('width'); // removes inline width
      rightdiv.style.transition = 'width 1.3s ease';
      rightdiv.style.width = '0%';
    }

    //const overlayContainer = ui.id('thinkproc-interviewer-common-video-section');
    // if (overlayContainer) {
    //   overlayContainer.querySelector('.interviewer-waiting-section')?.remove();
    //   const waitingDiv = document.createElement('div');
    //   waitingDiv.className = 'thinkproc-waiting-overlay interviewer-waiting-section d-none';
    //   waitingDiv.id = 'thinkproc-interviewer-waiting-overlay_' + socketName;
    //   overlayContainer.appendChild(waitingDiv);

    //   overlayContainer.querySelector('.interviewer-mute-section')?.remove();
    //   const audioMutedDiv = this.createMuteVoiceHtmlElement(socketName);
    //   overlayContainer.appendChild(audioMutedDiv);

    //   const stream = utility.getBlackStream();
    //   const videoDiv = this.createVideoHtmlElement(stream, socketName);
    //   overlayContainer.appendChild(videoDiv);
    // }

    const videoInner = ui.id('think_interview_video_section_inner');
    if (videoInner) {
      videoInner.style.width = '100%';
    }
    stepUIManager.insertText(
      'thinkproc-interview-video-label-name',
      configrationManager.intervierData[socketName].name
    );
  }

  multiInterviewerModeUIAdjustments(): void {
    ui.show(ui.id('think_interview_video_rightdiv'));
    const videoInner = ui.id('think_interview_video_section_inner');
    if (videoInner) {
      videoInner.style.width = 'calc(100% - 280px)';
    }
    const rightdiv = ui.id('think_interview_video_rightdiv');
    if (rightdiv) {
      rightdiv.style.removeProperty('width'); // removes inline width
      rightdiv.style.transition = 'width 1.3s ease';
      rightdiv.style.width = '280px';
    }
  }

  createDynamicInterviewer(stream: MediaStream, socketName: string): HTMLVideoElement {
    const container = ui.id('videoContainer');
    if (!container) throw new Error('videoContainer not found');

    // --- IF ALREADY EXISTS, JUST UPDATE STREAM ---
    let existingWrapper = ui.id('interviewer_' + socketName);
    if (existingWrapper) {
      //existingWrapper.classList.add("d-none");
      const existingVideo = existingWrapper.querySelector('video') as HTMLVideoElement;
      existingVideo.srcObject = stream;
      return existingVideo;
    }
    // wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'thinkproc-candidate-video thinkproc-candidate-video-interview';
    wrapper.id = 'interviewer_' + socketName; // 🔥 store socketName in div ID
    wrapper.style.backgroundColor = 'black';


    // video
    const video = this.createVideoHtmlElement(stream, socketName);

    // name label
    const labelDiv = document.createElement('div');
    labelDiv.className = 'thinkproc-candidate-label';

    // interviewer name
    const nameSpan = document.createElement('span');
    nameSpan.innerText = configrationManager.intervierData[socketName].name;
    labelDiv.appendChild(nameSpan);

    // heartbeat
    const heartbeat = document.createElement('div');
    heartbeat.className = 'thinkproc-audio-heartbeat';
    heartbeat.id = 'think_interview_audioHeartbeat_' + socketName; // 🔥 unique ID for heartbeat

    // audio muted
    const audioMutedDiv = this.createMuteVoiceHtmlElement(socketName);

    // video muted
    const waitingDiv = document.createElement('div');
    waitingDiv.className = 'thinkproc-waiting-overlay d-none';
    waitingDiv.id = 'thinkproc-interviewer-waiting-overlay_' + socketName; // 🔥 unique ID for waiting

    for (let i = 0; i < 5; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      heartbeat.appendChild(bar);
    }

    // append everything
    wrapper.appendChild(video);
    wrapper.appendChild(labelDiv);
    wrapper.appendChild(heartbeat);
    wrapper.appendChild(audioMutedDiv);
    wrapper.appendChild(waitingDiv);
    container.appendChild(wrapper);

    return video;
  }

  createMuteVoiceHtmlElement(socketName: string): HTMLElement {
    const audioMutedDiv = document.createElement('div');
    audioMutedDiv.className = 'thinkproc-audio-muted interviewer-mute-section d-none';
    audioMutedDiv.id = 'think_interview_audio_muted_' + socketName;
    const audioMutedImg = document.createElement('img');
    audioMutedImg.src = environment.UI_BASE_URL + 'images/mute_mic.svg';
    audioMutedImg.title = 'Audio Muted';
    audioMutedDiv.appendChild(audioMutedImg);
    return audioMutedDiv;
  }

  createVideoHtmlElement(stream: MediaStream, socketName: string): HTMLVideoElement {
    const video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.className = 'thinkproc_interviewerVideo';
    video.id = 'thinkInterview_interviewerVideo_' + socketName;
    video.srcObject = stream;
    return video;
  }

  interviewerUiViewHandle(): void {
    ui.show(ui.id('thinkInterview_mainVideo'));
    ui.show(ui.id('thinkproc-camera-open'));
    ui.show(ui.id('thinkproc-mic-open'));
    ui.show(ui.id('thinkinterview_UFM'));
    ui.show(ui.id('thinkproc-waiting-overlay'));
    ui.hide(ui.id('think_interview_candidateSession'));
    ui.hide(ui.id('think_interview_left_audio_muted'));
    stepUIManager.insertText(
      'thinkproc-interview-video-label-name',
      configrationManager.interviewCandidateName
    );
    const overlay = ui.id('thinkproc-candidate-video-interview');
    if (overlay) {
      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'thinkproc-waiting-overlay d-none';
      avatarDiv.id = 'thinkproc-interviewer-waiting-overlay_' + configrationManager.socketUserName;
      overlay.appendChild(avatarDiv);
    }
    if (configrationManager.video_mute == true) {
      this.muteInterviewerVideoStream(configrationManager.socketUserName);
      const imgElement = ui.id('thinkproc-camera-open')?.querySelector('img');
      if (imgElement) {
        imgElement.classList.add('mute');
        imgElement.style.backgroundColor = '#2F4DDB';
        imgElement.style.borderRadius = '50px';
        imgElement.src = environment.UI_BASE_URL + 'images/white_video_call.svg';
      }
    }
    if (configrationManager.audio_mute == true) {
      this.muteInterviewerAudioStream();
      liveStreamManager.disableAudioTracks(LiveStreamManager.AUDIO.PRIMARY);
      const imgElement = ui.id('thinkproc-mic-open')?.querySelector('img');
      if (imgElement) {
        imgElement.classList.add('mute');
        imgElement.style.backgroundColor = '#2F4DDB';
        imgElement.style.borderRadius = '50px';
        configrationManager.audio_mute = true;
        imgElement.src = environment.UI_BASE_URL + 'images/white_mic.svg';
      }
    }
  }
  bindInterviewerUiEvents(): void {
    const cameraBtn = ui.id('thinkproc-camera-open');
    if (cameraBtn) {
      ui.click(cameraBtn, () => {
        const img = cameraBtn.querySelector('img');
        if (!img) return;
        const muted = this.toggleMuteUI(img, 'white_video_call.svg', 'video_call.svg');
        configrationManager.video_mute = muted;
        if (muted) {
          liveStreamManager.disableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
          this.muteInterviewerVideoStream(configrationManager.socketUserName);
          socket.sendRoomMessage({
            mode: 'mute_video_stream',
            text: 'interviewer mute video stream',
          });
        } else {
          liveStreamManager.enableStreamTracks(LiveStreamManager.CAMERA.PRIMARY);
          this.unMuteInterviewerVideoStream(configrationManager.socketUserName);
          socket.sendRoomMessage({
            mode: 'unmute_video_stream',
            text: 'interviewer unmute video stream',
          });
        }
      });
    }
    const micBtn = ui.id('thinkproc-mic-open');
    if (micBtn) {
      ui.click(micBtn, () => {
        const img = micBtn.querySelector('img');
        if (!img) return;
        const muted = this.toggleMuteUI(img, 'white_mic.svg', 'mic_icon.svg');
        configrationManager.audio_mute = muted;
        if (muted) {
          liveStreamManager.disableAudioTracks(LiveStreamManager.AUDIO.PRIMARY);
          this.muteInterviewerAudioStream();
          socket.sendRoomMessage({
            mode: 'mute_audio_stream',
            text: 'interviewer mute audio stream',
          });
        } else {
          liveStreamManager.enableStreamTracks(LiveStreamManager.AUDIO.PRIMARY);
          this.unMuteInterviewerAudioStream();
          socket.sendRoomMessage({
            mode: 'unmute_audio_stream',
            text: 'interviewer unmute audio stream',
          });
        }
      });
    }
  }

  toggleMuteUI(img: HTMLImageElement, muteIcon: string, unmuteIcon: string): boolean {
    const isMuted = img.classList.contains('mute');
    if (!isMuted) {
      img.classList.add('mute');
      img.style.backgroundColor = '#2F4DDB';
      img.style.borderRadius = '50px';
      img.src = environment.UI_BASE_URL + 'images/' + muteIcon;
    } else {
      img.classList.remove('mute');
      img.style.backgroundColor = '';
      img.style.borderRadius = '';
      img.src = environment.UI_BASE_URL + 'images/' + unmuteIcon;
    }
    return !isMuted; // true = muted now
  }

  muteInterviewerVideoStream(userName: string): void {
    const name = configrationManager.intervierData[userName]?.name || 'Interviewer';
    if (configrationManager.activeInterviewer == userName) {
      const overlay = ui.id('thinkproc-interviewer-video-muted') as HTMLElement | null;
      utility.generateNameAvatar(overlay, name, 0, '120', '40');
    }
    const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName) as HTMLElement | null;
    utility.generateNameAvatar(overlay, name);
  }

  unMuteInterviewerVideoStream(userName?: string): void {
    if (configrationManager.activeInterviewer == userName) {
      const overlay = ui.id('thinkproc-interviewer-video-muted') as HTMLElement | null;
      utility.removeAvatarSvgImage(overlay);
    }
    const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName) as HTMLElement | null;
    utility.removeAvatarSvgImage(overlay);
  }

  muteCandidateVideoStream(): void {
    const name = configrationManager.interviewCandidateName || 'Candidate';
    const overlay = ui.id('thinkproc-candidate-video-muted') as HTMLElement | null;
    utility.generateNameAvatar(overlay, name, 0, '120', '40');
  }

  unMuteCandidateVideoStream(): void {
    const overlay = ui.id('thinkproc-candidate-video-muted') as HTMLElement | null;
    utility.removeAvatarSvgImage(overlay);
  }

  // changeInterviewerWaitingOverlayId(stream: MediaStream, socketName: string): void {
  //   const overlayContainer = ui.id('thinkproc-interviewer-common-video-section');
  //   if (overlayContainer) {
  //     overlayContainer.querySelector('.interviewer-waiting-section')?.remove();
  //     const waitingDiv = document.createElement('div');
  //     waitingDiv.className = 'thinkproc-waiting-overlay interviewer-waiting-section d-none';
  //     waitingDiv.id = 'thinkproc-interviewer-waiting-overlay_' + socketName;
  //     overlayContainer.appendChild(waitingDiv);

  //     overlayContainer.querySelector('.interviewer-mute-section')?.remove();
  //     const audioMutedDiv = this.createMuteVoiceHtmlElement(socketName);
  //     overlayContainer.appendChild(audioMutedDiv);

  //     const videoDiv = this.createVideoHtmlElement(stream, socketName);
  //     overlayContainer.appendChild(videoDiv);
  //   }
  // }

  setInterviewerLeftSideStream(stream: MediaStream, socketName: string): void {
    let existingWrapper = ui.id('thinkproc-interviewer-common-video-section');
    if (existingWrapper) {
      const existingVideo = existingWrapper.querySelector('#thinkInterview_mainVideo') as HTMLVideoElement;
      existingVideo.srcObject = stream;
    }
  }
  showMutedIconLeftSide(userName: string) {
    const overlay = ui.id('thinkproc-interviewer-video-muted') as HTMLElement | null;
    const name = configrationManager.intervierData[userName]?.name || 'Interviewer';
    utility.generateNameAvatar(overlay, name);
  }
  hideMutedIconLeftSide() {
    const overlay = ui.id('thinkproc-interviewer-video-muted') as HTMLElement | null;
    utility.removeAvatarSvgImage(overlay);
  }
  setInterviewerRightSideStream(stream: MediaStream, socketName: string): void {
    let existingWrapper = ui.id('interviewer_' + socketName);
    if (existingWrapper) {
      const existingVideo = existingWrapper.querySelector('video') as HTMLVideoElement;
      existingVideo.srcObject = stream;
    }
  }
  muteInterviewerAudioStream(socketName?: string): void {
    if (socketName) {
      if (configrationManager.activeInterviewer == socketName) {
        ui.id('think_interview_userAudioHeartbeat')?.classList.add('d-none');
        ui.id('think_interview_left_audio_muted')?.classList.remove('d-none');
      }
      ui.id('think_interview_audioHeartbeat_' + socketName)?.classList.add('d-none');
      ui.id('think_interview_audio_muted_' + socketName)?.classList.remove('d-none');
    } else {
      ui.id('think_interview_audioHeartbeat')?.classList.add('d-none');
      ui.id('think_interview_audio_muted')?.classList.remove('d-none');
    }
  }
  unMuteInterviewerAudioStream(socketName?: string): void {
    if (socketName) {
      if (configrationManager.activeInterviewer == socketName) {
        ui.id('think_interview_userAudioHeartbeat')?.classList.remove('d-none');
        ui.id('think_interview_left_audio_muted')?.classList.add('d-none');
      }
      ui.id('think_interview_audioHeartbeat_' + socketName)?.classList.remove('d-none');
      ui.id('think_interview_audio_muted_' + socketName)?.classList.add('d-none');
    } else { // interviewer side self section
      ui.id('think_interview_audioHeartbeat')?.classList.remove('d-none');
      ui.id('think_interview_audio_muted')?.classList.add('d-none');
    }
  }
  muteAudioLeftSideInterviewer(): void {
    ui.id('think_interview_userAudioHeartbeat')?.classList.add('d-none');
    ui.id('think_interview_left_audio_muted')?.classList.remove('d-none');
  }
  unMuteAudioLeftSideInterviewer(): void {
    ui.id('think_interview_userAudioHeartbeat')?.classList.remove('d-none');
    ui.id('think_interview_left_audio_muted')?.classList.add('d-none');
  }

  removeDynamicInterviewer(socketName?: string): void {
    if (socketName) {
      const wrapperId = "interviewer_" + socketName;
      const wrapper = ui.id(wrapperId);

      if (wrapper) {
        wrapper.remove();
      }

    } else {
      const container = ui.id("videoContainer");
      if (container) {
        container.innerHTML = "";
      }
    }

  }

  coverHundredPercentForInterviewer(): void {
    ui.hide(ui.id('think_interview_video_rightdiv'));
    const videoInner = ui.id('think_interview_video_section_inner');
    if (videoInner) {
      videoInner.style.removeProperty("width");  // removes inline width
      videoInner.style.transition = "width 1.3s ease";
      videoInner.style.width = "100%";
    }
  }

  initAudioHeartbeatInterview(stream: MediaStream, socketName: string) {
    if (configrationManager.totalInterviwerCount == 1) {
      (ui.id('think_interview_userAudioHeartbeat_candidate') as HTMLElement)?.style.setProperty('display', 'none', 'important');
      (ui.id('think_interview_userAudioHeartbeat') as HTMLElement)?.style.setProperty('display', 'none', 'important');
      (ui.id('think_interview_audioHeartbeat') as HTMLElement)?.style.setProperty('display', 'none', 'important');
      ui.hide(ui.id('think_interview_left_audio_muted'));
      return;
    }
    const containerId = ui.id('think_interview_audioHeartbeat_' + socketName) as HTMLVideoElement;
    if (!containerId) return;

    // if (this.audioAnimationIds[socketName]) {
    //   cancelAnimationFrame(this.audioAnimationIds[socketName]);
    // }

    const bars = Array.from(containerId.getElementsByClassName('bar')) as HTMLElement[];
    try {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      let source = this.audioSources.get(stream.id);
      if (!source) {
        source = this.audioCtx.createMediaStreamSource(stream);
        this.audioSources.set(stream.id, source);
      }

      const analyser = this.audioCtx.createAnalyser();

      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const render = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const boosted = avg * 4;
        /* ACTIVE SPEAKER DETECTION */
        //utility.log('interviewer swap 507',boosted, this.lastSpeakerSwitch, this.SPEAKER_THRESHOLD);
        if (boosted > this.SPEAKER_THRESHOLD) {
          //this.onInterviewerSpeaking(socketName);
          //utility.log('interviewer swap 510', socketName);
        }

        /* 🎵 HEARTBEAT UI */
        const normalized = Math.min(boosted / 10, 10);
        bars.forEach((bar, i) => {
          const scale = Math.max(4, Math.random() * normalized * (i % 2 ? 1.5 : 1));
          bar.style.height = `${scale * 2}px`;
        });
        this.audioAnimationIds[socketName] = requestAnimationFrame(render);
      };
      render();
    } catch (err) {
      console.error('initAudioHeartbeatInterview error:', err);
    }
  }

  onInterviewerSpeaking(socketName: string) {
    const now = Date.now();
    if (socketName !== configrationManager.activeInterviewer &&
      now - this.lastSpeakerSwitch > this.SWITCH_DELAY) {

      this.lastSpeakerSwitch = now;
      this.swapToMainInterviewer(socketName);
    }
  }

  swapToMainInterviewer(userName: string) {
    // last active interviewer show in right section
    ui.id('interviewer_' + configrationManager.activeInterviewer)?.classList.remove('d-none');
    configrationManager.activeInterviewer = userName;
    // current interviewer hide right side section 
    ui.id('interviewer_' + userName)?.classList.add('d-none');
    //current interviewer set main left section
    const audioStream = this.interviewerVoiceData[userName];
    if (audioStream) {
      this.setMainStream(this.interviewerStreamData[userName]);
      this.initAudioHeartbeat(audioStream, 'think_interview_userAudioHeartbeat');
      stepUIManager.insertText('thinkproc-interview-video-label-name', configrationManager.intervierData[userName].name);

      if (configrationManager.interviewerVideoMute[userName]) {
        this.showMutedIconLeftSide(userName);
      } else {
        this.hideMutedIconLeftSide();
      }

      if (configrationManager.interviewerAudioMute[userName]) {
        this.muteAudioLeftSideInterviewer();
      } else {
        this.unMuteAudioLeftSideInterviewer();
      }
    }

    if (Object.keys(this.interviewerStreamData).length <= 1) {
      monitorUi.coverHundredPercentForInterviewer();
    }
  }

  setMainStream(stream: MediaStream) {
    let video: HTMLVideoElement | null = null;
    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      video = ui.id('thinkInterview_mainVideo') as HTMLVideoElement;
    }
    if (!video) {
      throw new Error('No valid video element found for the selected camera.');
    }
    video.srcObject = stream;
    video.play();
  }

  hideActiveInterviewerRightSection() {
    ui.id("interviewer_" + configrationManager.activeInterviewer)?.classList.add('d-none');
  }

  initAudioHeartbeat(stream: MediaStream, containerId: string) {
    if (configrationManager.totalInterviwerCount == 1) {
      (ui.id('think_interview_userAudioHeartbeat_candidate') as HTMLElement)?.style.setProperty('display', 'none', 'important');
      (ui.id('think_interview_userAudioHeartbeat') as HTMLElement)?.style.setProperty('display', 'none', 'important');
      (ui.id('think_interview_audioHeartbeat') as HTMLElement)?.style.setProperty('display', 'none', 'important');
      ui.hide(ui.id('think_interview_left_audio_muted'));
      return;
    }
    const heartbeatEl = ui.id(containerId) as HTMLElement;
    if (!heartbeatEl) {
      utility.warn(`initAudioHeartbeat: Container '${containerId}' not found.`);
      return;
    }
    const bars = Array.from(heartbeatEl.getElementsByClassName('bar')) as HTMLElement[];
    try {
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      let source = this.audioSources.get(stream.id);
      if (!source) {
        source = this.audioCtx.createMediaStreamSource(stream);
        this.audioSources.set(stream.id, source);
      }

      const analyser = this.audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);
      const SENSITIVITY_BOOST = 4;
      function renderVisualizer() {
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        const boosted = avg * SENSITIVITY_BOOST;
        const normalized = Math.min(boosted / 10, 10);
        bars.forEach((bar, i) => {
          const scale = Math.max(
            4,
            Math.random() * normalized * (i % 2 ? 1.5 : 1)
          );
          bar.style.height = `${scale * 2}px`;
        });
        requestAnimationFrame(renderVisualizer);
      }
      renderVisualizer();
    } catch (err) {
      console.error("initAudioHeartbeat error:", err);
    }
  }

  setCandidateImage(url: string | null | undefined, id: string) {
    const element = ui.id(id);
    if (!element) return;

    if (url && url.trim() !== '') {
      stepUIManager.srcInsert(id, url);
    }
  }

  setPercentage(percentage: number | null | undefined, id: string) {
    const element = ui.id(id);
    if (!element) return;

    if (typeof percentage === 'number') {
      element.classList.remove('thinkproc-id-varification-ai-match', 'thinkproc-id-varification-ai-match-orange');
      if (percentage < 50) {
        element.classList.add('thinkproc-id-varification-ai-match-orange');
      } else {
        element.classList.add('thinkproc-id-varification-ai-match');
      }

      // Update the dot inside
      const dot = element.querySelector('span');
      if (dot) {
        dot.classList.remove('thinkproc-green-dot', 'thinkproc-orange-dot');
        dot.classList.add(percentage < 50 ? 'thinkproc-orange-dot' : 'thinkproc-green-dot');
      }
      element.innerHTML = `<span class="${percentage < 50 ? 'thinkproc-orange-dot' : 'thinkproc-green-dot'}"></span> ${percentage}% AI Match`;
    }
  }

  camDisconnectInterviewer(userName: string): void {
    const name = configrationManager.intervierData[userName]?.name || 'Interviewer';
    if (configrationManager.activeInterviewer == userName) {
      const videoElement = ui.id('thinkInterview_mainVideo') as HTMLVideoElement | null;
      if (videoElement) {
        videoElement.srcObject = null;
      }
      const overlay = ui.id('thinkproc-interviewer-video-muted') as HTMLElement | null;
      utility.generateNameAvatar(overlay, name, 0, '120', '40');
    } else {
      const videoElement = ui.id('thinkInterview_interviewerVideo_' + userName) as HTMLVideoElement | null;
      if (videoElement) {
        videoElement.srcObject = null;
      }
    }
    const overlay = ui.id('thinkproc-interviewer-waiting-overlay_' + userName) as HTMLElement | null;
    utility.generateNameAvatar(overlay, name);
  }

  additionalCameraDisconnectCheck(): void {
      const video = ui.id('thinkInterview_mainVideo_additional_cam') as HTMLVideoElement | null;
        if (video) {
          video.srcObject = null;
        }
        ui.show(ui.id('thinkproc_additional_cam_revoke'));
  }


}

export const monitorUi = new InterviewMoniterUI();
