import { liveStreamManager, LiveStreamManager } from './LiveStreamManager';
import { StepInterface } from './StepInterface';
import utility from './Utility';

interface UserData {
  videoStream: MediaStream | null;
  audioMute: boolean;
  videoMute: boolean;
  name: string;
  feedback_required?: boolean;
  feedback_given?: boolean;
}

// type ValueAndData = {
//   value?: any;
//   data?: any;
// };

/**
 *
 */
class ConfigrationManager {
  config: { [key: string]: any };
  flattenedTemplate: { [key: string]: any } = {};
  liveStreamManager: LiveStreamManager | null = null;

  // Declare the config keys as properties (optional, but good for clarity & TS)
  url?: string;
  signal_node_url: string;
  appEnv: string;
  recording_node_url?: string;
  turn_url: string = '';
  stun_url: string = '';
  stun_password: string = '';
  stun_username: string = '';
  turn_password: string = '';
  turn_username: string = '';
  socketUserName: string;
  socketRoomName: string;
  language: string;
  speechUrl: string;
  recordingUrl: string = '';
  roomAttemptNo: number;
  browserMobileEnable: number;
  speakerEnable: number;
  initComplete: number;
  compatibilityComplete: number;
  compatibilityStarted: number;
  compatibilityCompleteCallback: Function;
  launchComplete: number;
  isPaused: boolean;
  isPlay: boolean;
  photoAttemptNo: number;
  sharedScreen: number;
  recording: number = 0;
  video_recording: number = 0;
  image_recording: number = 0;
  speakerAttempt: number;
  maxRoomAttempt: number;
  isMobile: boolean = false;
  CameraSetupInstruction: boolean = true;
  base64Snapshot: string | null = null;
  cameraSetupStep: number = 0;

  currentStep: string = '';
  currentStepObject: StepInterface | null = null;
  currentStepAlias: string = '';
  currentProctor: string = '';
  currentCandidateName: string = '';
  completeExam: Function = () => { };

  firstLogin: boolean = true;
  sentFirstLoginMsg: boolean = false;
  smartProctorEnable: number;
  previous_instance_escalated: boolean;
  userEscaltedPara: number = 1;
  qrId: string = '';
  candidateNameMsg: string = 'candidate';
  isTerminated: boolean = false;
  isSubmited: string = '';
  reCameraRevoke: string = '';
  alreadySpeechCalled: { [key: string]: HTMLAudioElement } = {};
  interviewCandidateName: string = '';
  interviewCandidateSocketName: string = '';
  interviewNames: string[] = [];
  intervierData: { [key: string]: UserData } = {};
  interviewSocketNames: string[] = [];
  userType: string = '';
  behaviourSkills: Array<{ id: number; name: string }> = [];
  functionalSkills: Array<{ id: number; name: string }> = [];
  skillsData: { behaviour: Array<{ id: number; name: string }>; functional: Array<{ id: number; name: string }> } = {
    behaviour: [],
    functional: [],
  };
  jobName: string = '';
  candidateRegisterURL: string = '';
  sessionIdRec: number = 0;
  instanceIdRec: number = 0;
  link_status: string = '';
  userId: number = 0;
  video_mute: boolean = false;
  audio_mute: boolean = false;
  interviwerJoiningTime: number = 0;
  activeInterviewer: string = '';
  interviewerAudioMute: { [key: string]: boolean } = {};
  interviewerVideoMute: { [key: string]: boolean } = {};
  totalInterviwerCount: number = 0;
  transcriptCode: string = '';
  isScreenStreamEnding: boolean = false;
  currentLang: string = 'en';
  termsAndConditionsLink: string = '';
  privacyStatementLink: string = '';
  socketRealUserName: string = '';
  /**
   *
   */
  constructor() {
    this.config = {};
    this.signal_node_url = '';
    this.appEnv = 'local_interview';
    this.socketUserName = '';
    this.socketRoomName = '';
    this.language = 'en';
    this.speechUrl = '';
    this.roomAttemptNo = 0;
    this.browserMobileEnable = 0;
    this.speakerEnable = 0;
    this.compatibilityComplete = 0;
    this.compatibilityStarted = 0;
    this.compatibilityCompleteCallback = () => { };
    this.initComplete = 0;
    this.launchComplete = 0;
    this.isPaused = false;
    this.isPlay = false;
    this.photoAttemptNo = 0;
    this.sharedScreen = 0;
    this.speakerAttempt = 0;
    this.maxRoomAttempt = 0;
    this.CameraSetupInstruction = true;
    this.currentProctor = '';
    this.smartProctorEnable = 0;
    this.previous_instance_escalated = false;
    this.alreadySpeechCalled = {};
  }

  /**
   *
   * @param data
   * @param data.url
   * @param data.signal_node_url
   * @param data.recording_node_url
   * @param data.turn_url
   * @param data.stun_url
   * @param data.stun_password
   * @param data.stun_username
   * @param data.turn_password
   * @param data.turn_username
   * @param data.env
   * @param data.speechURL
   */
  setConfig(data: {
    url?: string;
    signal_node_url?: string;
    recording_node_url?: string;
    turn_url?: string;
    stun_url?: string;
    stun_password?: string;
    stun_username?: string;
    turn_password?: string;
    turn_username?: string;
    env?: string;
    speechURL?: string;
  }) {
    this.config = { ...data };

    if (data.url !== undefined) this.url = data.url;
    if (data.signal_node_url !== undefined) this.signal_node_url = data.signal_node_url;
    if (data.recording_node_url !== undefined) this.recording_node_url = data.recording_node_url;
    if (data.turn_url !== undefined) this.turn_url = data.turn_url;
    if (data.stun_url !== undefined) this.stun_url = data.stun_url;
    if (data.stun_password !== undefined) this.stun_password = data.stun_password;
    if (data.stun_username !== undefined) this.stun_username = data.stun_username;
    if (data.turn_password !== undefined) this.turn_password = data.turn_password;
    if (data.turn_username !== undefined) this.turn_username = data.turn_username;
    if (data.env !== undefined) this.appEnv = data.env;
    if (data.speechURL !== undefined) this.speechUrl = data.speechURL;
    if (data.recording_node_url !== undefined) this.recordingUrl = data.recording_node_url;

    // utility.log("Config set in ConfigrationManager", this);
  }

  /**
   *
   * @param template
   */
  extractValueAndData(template: any) {
    const result: { [key: string]: any } = {};
    for (const key in template) {
      if (template.hasOwnProperty(key)) {
        const obj = template[key];
        if (obj && typeof obj === 'object') {
          // Preserve both value and data keys as-is if present
          result[key] = {};
          if ('value' in obj) result[key].value = obj.value;
          if ('data' in obj) result[key].data = obj.data;
        } else {
          result[key] = obj;
        }
      }
    }
    this.flattenedTemplate = result;
    return result;
  }

  setTemplateData() {
    this.appEnv = 'local_interview';
    this.language = 'en';
    this.maxRoomAttempt =
      this.valueMap.room_sanitization_enabled.data.ai_revoke_room_san_attempt.value;
    this.roomAttemptNo = 1;
    this.browserMobileEnable = this.valueMap.device_support.value;
    this.speakerEnable = 0;//this.valueMap.speaker_check.value;
    this.photoAttemptNo = 1;
    this.sharedScreen = 0;//this.valueMap.screen_share.value;
    this.recording = this.valueMap.session_recording.value;
    if (this.recording == 1 && this.userType == "2") {
      this.video_recording = 1;
      this.sharedScreen = 1;
    } else {
      this.video_recording = 0;
    }
    // this.video_recording =
    //   this.valueMap.session_recording.data.session_recording_type.value == 1 ? 1 : 0;
    this.image_recording = 0;
    this.speakerAttempt = 0;
    this.smartProctorEnable = 0;
    this.jobName = this.valueMap.job_name.data.job_role_name.value;

    this.behaviourSkills = [];
    this.functionalSkills = [];

    if (this.valueMap.behaviour_skill && typeof this.valueMap.behaviour_skill.data === 'object') {
      const selectedIds = this.valueMap.behaviour_skill.value
        .split(',')
        .map((id: string) => parseInt(id.trim(), 10)); // [1, 2, 3, 4, 35]

      const skillData = Object.values(this.valueMap.behaviour_skill.data);

      this.behaviourSkills = skillData
        .filter((item: any) => selectedIds.includes(item.behaviour_skill_id))
        .map((item: any) => ({
          id: item.behaviour_skill_id,
          name: item.behaviour_skill_name,
        }));
    }

    if (this.valueMap.functional_skill && typeof this.valueMap.functional_skill.data === 'object') {
      const selectedNames = this.valueMap.functional_skill.value
        .split(',')
        .map((name: string) => name.trim()); // ["JavaScript", "Python", "Java", "SEO"]

      const skillData = Object.values(this.valueMap.functional_skill.data);

      this.functionalSkills = skillData
        .filter((item: any) => selectedNames.includes(item.functional_skill_name))
        .map((item: any) => ({
          id: item.functional_skill_id,
          name: item.functional_skill_name,
        }));
    }

    // 🔹 Combine both skill sets for unified access
    this.skillsData = {
      behaviour: this.behaviourSkills,
      functional: this.functionalSkills,
    };

    this.loadRecordingWebWorker();
  }

  loadRecordingWebWorker() {
    // Load the web worker for recording
    if (this.video_recording == 1 || this.sharedScreen == 1) {
      liveStreamManager.getRecordingWorker();
    }
  }

  /**
   *
   * @param socketUserName
   */
  socketUser(socketUserName: string) {
    this.socketUserName = socketUserName;
    this.socketRealUserName = socketUserName;
  }

  /**
   *
   * @param socketUserName
   */
  socketRoom(socketRoomName: string) {
    this.socketRoomName = socketRoomName;
  }

  /**
   *
   */
  get valueMap() {
    return this.flattenedTemplate;
  }

  /**
   *
   * @param lang
   */
  saveLang(lang: string) {
    this.language = lang;
  }

  /**
   *
   * @param url
   */
  speechURL(url: string) {
    this.speechUrl = utility.decodeBase64(url);
  }

  /**
   *
   * @param url
   */
  async isValidAndReachableImageUrl(url: string): Promise<boolean> {
    try {
      const parsedUrl = new URL(url.trim());

      // Must be http or https
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        return false;
      }

      // Must end with .jpg/.jpeg/.png
      if (!/\.(jpg|jpeg|png)$/i.test(parsedUrl.pathname)) {
        return false;
      }

      // Try to load the image
      return await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true); // Successfully loaded
        img.onerror = () => resolve(false); // Failed to load (bad domain or 404)
        img.src = url;
      });
    } catch {
      return false;
    }
  }

  setCandidateDetail(candidate_details: Array<{ name: string; socket_name: string }>) {
    const firstCandidate = candidate_details[0];
    this.interviewCandidateName = firstCandidate.name;
    this.interviewCandidateSocketName = firstCandidate.socket_name;
  }

  setInterviewDetails(interview_details: Array<{ name: string; socket_name: string; feedback_required?: boolean; feedback_given?: boolean }>) {
    this.interviewNames = [];
    this.interviewSocketNames = [];

    this.totalInterviwerCount = interview_details.length;

    // ✅ Loop and store both names and socket names
    for (const detail of interview_details) {
      if (detail.name && detail.socket_name) {
        this.interviewNames.push(detail.name);
        this.interviewSocketNames.push(detail.socket_name);
        this.intervierData[detail.socket_name] = {
          videoStream: null,
          audioMute: false,
          videoMute: false,
          name: detail.name,
          feedback_required: detail.feedback_required ?? false,
          feedback_given: detail.feedback_given ?? false,
        };
      }
    }
  }
}

export const configrationManager = new ConfigrationManager();
