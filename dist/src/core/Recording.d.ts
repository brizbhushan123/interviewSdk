export declare const RecordMod: {
    readonly START: "start";
    readonly STREAM: "stream";
};
export interface RecordMessage {
    token: string;
    date: string;
    camera: string;
    environment: string;
    environment_url: string;
    stepEnv: string;
    sessionId: number;
    instanceId: number;
    mime: string;
    data: {
        mode: (typeof RecordMod)[keyof typeof RecordMod];
        info?: any;
    };
}
/**
 *
 */
export declare class Recording {
    private serverUrl;
    private stream;
    private camera;
    private ws;
    recordId: string;
    mediaRecorder: MediaRecorder | null;
    reconnectInterval: number;
    maxRetries: number;
    retryCount: number;
    token: string;
    token_date: string;
    mimeType: string;
    recordingWorker: Worker | null;
    useWorker: boolean;
    workderWSState: number;
    private chunkBuffer;
    VIDEO_BITS_PER_SECOND: number;
    AUDIO_BITS_PER_SECOND: number;
    stopTrigger: boolean;
    /**
     *
     * @param server
     * @param stream
     * @param camera
     * @param worker
     */
    constructor(server: string, stream: MediaStream, camera: string, worker: Worker);
    /**
     *
     */
    connect(): WebSocket;
    /**
     *
     * @param stream
     */
    setStream(stream: MediaStream): this;
    /**
     *
     */
    setRecorder(): void;
    /**
     *
     */
    start(): this;
    /**
     *
     */
    pause(): boolean;
    /**
     *
     */
    stop(): Promise<void>;
    /**
     *
     */
    recordMessage(mode: (typeof RecordMod)[keyof typeof RecordMod], info?: any): RecordMessage;
    sendRecordMessage(mode: (typeof RecordMod)[keyof typeof RecordMod], info?: any): void;
    arrayBufferToBase64(buffer: ArrayBuffer): string;
    getMimeType(): {
        mimeType: string;
        videoBitsPerSecond: number;
        audioBitsPerSecond: number;
    };
}
