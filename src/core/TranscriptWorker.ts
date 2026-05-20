// src/audio-worklet.ts

// These declarations satisfy TypeScript for browser globals
declare interface AudioWorkletProcessor {
    port: MessagePort;
    process?(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}

declare var AudioWorkletProcessor: {
    prototype: AudioWorkletProcessor;
    new(options: AudioWorkletNodeOptions): AudioWorkletProcessor;
};
declare var currentFrame: number;
declare var sampleRate: number;
declare function registerProcessor(name: string, processorCtor: any): void;


class AudioStreamProcessor extends AudioWorkletProcessor {
    private TARGET_SAMPLE_RATE: number = 16000;
    private SAMPLE_RATE: number;

    constructor(options: AudioWorkletNodeOptions) {
        super(options);
        this.SAMPLE_RATE = sampleRate; // Global AudioWorklet variable
    }

    private downsample(buffer: Float32Array, originalRate: number, targetRate: number): Float32Array {
        const ratio = originalRate / targetRate;
        const newLength = Math.round(buffer.length / ratio);
        const result = new Float32Array(newLength);
        let offsetResult = 0;
        for (let i = 0; i < newLength; i++) {
            const offsetBuffer = Math.round(i * ratio);
            result[offsetResult++] = buffer[offsetBuffer];
        }
        return result;
    }

    private to16BitPCM(input: Float32Array): Int16Array {
        const output = new Int16Array(input.length);
        for (let i = 0; i < input.length; i++) {
            let s = Math.max(-1, Math.min(1, input[i]));
            output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        return output;
    }

    // inputs: [ [ChannelData1, ChannelData2, ...] ]
    process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean {
        const input = inputs[0];
        
        if (input.length === 0) return true;

        const inputData = input[0];
        
        const resampledData = this.SAMPLE_RATE === this.TARGET_SAMPLE_RATE
            ? inputData
            : this.downsample(inputData, this.SAMPLE_RATE, this.TARGET_SAMPLE_RATE);
        
        const pcmData = this.to16BitPCM(resampledData);

        // Send the raw 16-bit PCM buffer to the main thread
        this.port.postMessage(pcmData.buffer, [pcmData.buffer]);

        return true; 
    }
}

// Register the processor with a unique name
registerProcessor('audio-stream-processor', AudioStreamProcessor);