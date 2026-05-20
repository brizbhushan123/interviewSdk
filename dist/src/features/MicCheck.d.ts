import { StepInterface, StepResult } from '../core/StepInterface';
/**
 *
 */
declare class MicCheck extends StepInterface {
    micFailedAttempt: number;
    speakerFlag: number;
    envAlias: string;
    recognition: any;
    speakerGet: number;
    speechRecorgFailed: boolean;
    /**
     *
     */
    constructor();
    /**
     *
     */
    start(): Promise<void>;
    /**
     *
     */
    checkSpeaker(): Promise<void>;
    /**
     *
     */
    retrySpeaker(): void;
    /**
     *
     */
    micStart(): Promise<void>;
    /**
     *
     */
    retryMic(): void;
    audioCallback: (data: {
        id: any;
        label: any;
    }) => Promise<void>;
    micErrorCallback: (message: string) => void;
    /**
     *
     */
    getSpeechRecongnition(): any;
    isEdgeOnMacOS(): boolean;
    /**
     *
     * @param mediaStream
     */
    microphoneCheckStatus(mediaStream: MediaStream, audioChannelCount: number): void;
    /**
     *
     * @param mediaStream
     */
    microphoneMachineDetect(mediaStream: MediaStream, audioChannelCount: number): void;
    /**
     *
     * @param string1
     * @param string2
     */
    calculateSimilarityPercentage(string1: string, string2: string): number;
    /**
     *
     * @param string1
     * @param string2
     */
    levenshteinDistance(string1: string, string2: string): number;
    /**
     *
     */
    result(): StepResult;
    /**
     *
     */
    cameraRevokeRetry(): void;
    /**
     *
     */
    micRevokeRetry(): void;
    startMediaRecorderFallback(mediaStream: MediaStream, audioChannelCount: number): void;
    startMediaRecorderFallbackAudio(mediaStream: MediaStream, audioChannelCount: number, staticText: string): void;
}
export declare const micCheck: MicCheck;
export {};
