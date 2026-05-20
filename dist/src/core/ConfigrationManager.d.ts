import { LiveStreamManager } from './LiveStreamManager';
import { StepInterface } from './StepInterface';
interface UserData {
    videoStream: MediaStream | null;
    audioMute: boolean;
    videoMute: boolean;
    name: string;
    feedback_required?: boolean;
    feedback_given?: boolean;
}
/**
 *
 */
declare class ConfigrationManager {
    config: {
        [key: string]: any;
    };
    flattenedTemplate: {
        [key: string]: any;
    };
    liveStreamManager: LiveStreamManager | null;
    url?: string;
    signal_node_url: string;
    appEnv: string;
    recording_node_url?: string;
    turn_url: string;
    stun_url: string;
    stun_password: string;
    stun_username: string;
    turn_password: string;
    turn_username: string;
    socketUserName: string;
    socketRoomName: string;
    language: string;
    speechUrl: string;
    recordingUrl: string;
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
    recording: number;
    video_recording: number;
    image_recording: number;
    speakerAttempt: number;
    maxRoomAttempt: number;
    isMobile: boolean;
    CameraSetupInstruction: boolean;
    base64Snapshot: string | null;
    cameraSetupStep: number;
    currentStep: string;
    currentStepObject: StepInterface | null;
    currentStepAlias: string;
    currentProctor: string;
    currentCandidateName: string;
    completeExam: Function;
    firstLogin: boolean;
    sentFirstLoginMsg: boolean;
    smartProctorEnable: number;
    previous_instance_escalated: boolean;
    userEscaltedPara: number;
    qrId: string;
    candidateNameMsg: string;
    isTerminated: boolean;
    isSubmited: string;
    reCameraRevoke: string;
    alreadySpeechCalled: {
        [key: string]: HTMLAudioElement;
    };
    interviewCandidateName: string;
    interviewCandidateSocketName: string;
    interviewNames: string[];
    intervierData: {
        [key: string]: UserData;
    };
    interviewSocketNames: string[];
    userType: string;
    behaviourSkills: Array<{
        id: number;
        name: string;
    }>;
    functionalSkills: Array<{
        id: number;
        name: string;
    }>;
    skillsData: {
        behaviour: Array<{
            id: number;
            name: string;
        }>;
        functional: Array<{
            id: number;
            name: string;
        }>;
    };
    jobName: string;
    candidateRegisterURL: string;
    sessionIdRec: number;
    instanceIdRec: number;
    link_status: string;
    userId: number;
    video_mute: boolean;
    audio_mute: boolean;
    interviwerJoiningTime: number;
    activeInterviewer: string;
    interviewerAudioMute: {
        [key: string]: boolean;
    };
    interviewerVideoMute: {
        [key: string]: boolean;
    };
    totalInterviwerCount: number;
    transcriptCode: string;
    isScreenStreamEnding: boolean;
    currentLang: string;
    termsAndConditionsLink: string;
    privacyStatementLink: string;
    socketRealUserName: string;
    /**
     *
     */
    constructor();
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
    }): void;
    /**
     *
     * @param template
     */
    extractValueAndData(template: any): {
        [key: string]: any;
    };
    setTemplateData(): void;
    loadRecordingWebWorker(): void;
    /**
     *
     * @param socketUserName
     */
    socketUser(socketUserName: string): void;
    /**
     *
     * @param socketUserName
     */
    socketRoom(socketRoomName: string): void;
    /**
     *
     */
    get valueMap(): {
        [key: string]: any;
    };
    /**
     *
     * @param lang
     */
    saveLang(lang: string): void;
    /**
     *
     * @param url
     */
    speechURL(url: string): void;
    /**
     *
     * @param url
     */
    isValidAndReachableImageUrl(url: string): Promise<boolean>;
    setCandidateDetail(candidate_details: Array<{
        name: string;
        socket_name: string;
    }>): void;
    setInterviewDetails(interview_details: Array<{
        name: string;
        socket_name: string;
        feedback_required?: boolean;
        feedback_given?: boolean;
    }>): void;
}
export declare const configrationManager: ConfigrationManager;
export {};
