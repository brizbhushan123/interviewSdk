declare interface AudioWorkletProcessor {
    port: MessagePort;
    process?(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}
declare var AudioWorkletProcessor: {
    prototype: AudioWorkletProcessor;
    new (options: AudioWorkletNodeOptions): AudioWorkletProcessor;
};
declare var currentFrame: number;
declare var sampleRate: number;
declare function registerProcessor(name: string, processorCtor: any): void;
declare class AudioStreamProcessor extends AudioWorkletProcessor {
    private TARGET_SAMPLE_RATE;
    private SAMPLE_RATE;
    constructor(options: AudioWorkletNodeOptions);
    private downsample;
    private to16BitPCM;
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}
