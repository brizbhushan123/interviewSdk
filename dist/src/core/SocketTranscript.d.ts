export declare class SocketTranscript {
    private socket;
    private audioContext;
    private workletNode;
    private mediaSource;
    alreadyInitialized?: boolean;
    private isStreaming;
    private TARGET_RATE;
    canSendAudio: boolean;
    backPressureStart: boolean;
    constructor();
    start(): Promise<void>;
    stop(): void;
    private registerSocketEvents;
    onInterim(text: string): void;
    onFinal(text: string): void;
    private downsample;
    private toInt16;
}
export declare const socketTranscript: SocketTranscript;
