import { StepInterface, StepResult } from '../core/StepInterface';
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
declare class Lobby extends StepInterface {
    envAlias: string;
    recordingStarted: boolean;
    recordingCamStarted: boolean;
    cameraType: string;
    cameraRevokePopup: HTMLElement | null;
    camType: string;
    isJoined: boolean;
    /**
     *
     */
    constructor();
    getCameraStream(): Promise<MediaStream | null>;
    /**
     *
     */
    start(): void;
    lobbyStart(): Promise<void>;
    bindInterviewerUiEvents(): void;
    startCamera(): Promise<void>;
    setStream(stream: MediaStream): HTMLVideoElement;
    cameraDisable(video: HTMLVideoElement, stream: MediaStream): void;
    cameraEnable(video: HTMLVideoElement): void;
    joinLobby: () => void;
    showJoinBtn(): void;
    showLoaderwithText(id: string): void;
    hideLoaderwithText(): void;
    allowCandiateSession(): void;
    roomSocketmode(mode: string, text: string, message: Record<string, any>, from: string, cameraName: string): void;
    proceedLobby: () => void;
    proceedInterviewLobby: () => void;
    /**
     *
     */
    result(): StepResult;
    cameraRevoke(): void;
    suscribeSocketEvent(): void;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
    stopRecording(): void;
    modeSelector(mode: string, camtype: string): void;
    populateCandidateCriteria(data: CriteriaData): void;
    muteInterviewerVideoStreamLobby(): void;
    unMuteInterviewerVideoStreamLobby(): void;
}
export declare const lobby: Lobby;
export {};
