import { environment } from "../config/environment";
import { configrationManager } from "./ConfigrationManager";
import { LiveStreamManager } from "./LiveStreamManager";
import { socket, SocketManager } from "./SocketManager";
import utility from "./Utility";

export class SocketTranscript {
    private socket: SocketManager | null = null;
    private audioContext: AudioContext | null = null;
    private workletNode: AudioWorkletNode | null = null;
    private mediaSource: MediaStreamAudioSourceNode | null = null;
    alreadyInitialized?: boolean = false;

    private isStreaming = false;
    private TARGET_RATE = 16000;
    canSendAudio: boolean = true;
    backPressureStart: boolean = true;

    constructor() {
        //   this.audioContext = new AudioContext();
    }

    async start() {
        let self = this;

        if (this.isStreaming) return;
        this.isStreaming = true;


        this.socket = socket;

        if (this.backPressureStart == true) {
            this.backPressureStart = false;

            socket.on('stt_backpressure_pause', () => {
                console.warn("Server Backpressure: Pausing audio chunk emission.");
                this.canSendAudio = false;
            });

            // NEW HANDLER: Server told us to resume
            socket.on('stt_backpressure_resume', () => {
                console.log("Server Backpressure: Resuming audio chunk emission.");
                this.canSendAudio = true;
            });
        }
        this.canSendAudio = true;
        this.socket.emit("startTranscript", { sessionId: configrationManager.sessionIdRec, transcriptCode: configrationManager.transcriptCode });
        utility.wait(100).then(async () => {

            const stream = LiveStreamManager.AUDIO.PRIMARY.stream;
            if (!stream) {
                console.error("❌ No audio stream found.");
                return;
            }

            if (this.alreadyInitialized == false) {
                this.alreadyInitialized = true;
                this.audioContext = new AudioContext();
                const inputRate = this.audioContext.sampleRate;

                // Load worklet module (compiled JS)
                await this.audioContext.audioWorklet.addModule(environment.UI_BASE_URL + "pcm-processor.js");

            }
            // Create audio graph nodes
            if (this.audioContext) {
                this.mediaSource = this.audioContext.createMediaStreamSource(stream);
                this.workletNode = new AudioWorkletNode(
                    this.audioContext,
                    "audio-stream-processor"
                );



                // Receive raw Float32 samples from worklet
                this.workletNode.port.onmessage = (event: MessageEvent) => {
                    if (!this.isStreaming) return;

                    // const floatData = event.data;

                    // const resampled =
                    //     inputRate === this.TARGET_RATE
                    //         ? floatData
                    //         : this.downsample(floatData, inputRate, this.TARGET_RATE);

                    // const pcm16 = this.toInt16(resampled);
                    // utility.log("",pcm16.buffer,resampled,event);
                    // Send to backend
                    if (this.isStreaming && this.canSendAudio) { // CHECK FLAG HERE
                        socket.emit('audio_chunk', { chunk: event.data });
                    }
                };

                this.mediaSource.connect(this.workletNode);
                this.registerSocketEvents();
            }

        });

        setTimeout(() => {
            self.stop();
            utility.wait(100).then(() => {
                self.start();
            });
        }, 200000);

    }

    stop() {
        if (!this.isStreaming) return;
        this.isStreaming = false;

        this.socket?.emit("stop_stt_stream");

        try {
            this.workletNode?.disconnect();
            this.mediaSource?.disconnect();

            // this.audioContext?.close();
        } catch (e) {
            console.error("Stop error:", e);
        }

        this.workletNode = null;
        this.mediaSource = null;
        // this.audioContext = null;
    }
    // --------------------------------
    // Socket Event Handlers
    // --------------------------------
    private registerSocketEvents() {
        this.socket = socket;

        this.socket.on("transcription_result", (data: any) => {
            if (data.isFinal) {
                this.onFinal(data.text);
            } else {
                this.onInterim(data.text);
            }
        });

        this.socket.on("transcription_error", (msg: any) => {
            console.error("STT Error:", msg);
        });

        this.socket.on("disconnect", () => this.stop());
    }

    onInterim(text: string) { }
    onFinal(text: string) { }

    // --------------------------------
    // UTIL: Downsample Float32 → 16kHz
    // --------------------------------
    private downsample(input: Float32Array, srcRate: number, dstRate: number) {
        const ratio = srcRate / dstRate;
        const length = Math.round(input.length / ratio);
        const output = new Float32Array(length);

        for (let i = 0; i < length; i++) {
            output[i] = input[Math.floor(i * ratio)];
        }

        return output;
    }

    // --------------------------------
    // UTIL: Float32 → Int16 PCM
    // --------------------------------
    private toInt16(input: Float32Array) {
        const out = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
        }
        return out;
    }
}

export const socketTranscript = new SocketTranscript();
