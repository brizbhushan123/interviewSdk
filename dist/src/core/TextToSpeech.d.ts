/**
 *
 */
declare class TextToSpeech {
    synth: SpeechSynthesis;
    voices: SpeechSynthesisVoice[];
    isVoiceLoaded: boolean;
    commonAudio: HTMLAudioElement | null;
    /**
     *
     */
    constructor();
    /**
     *
     * @param text
     * @param languageName
     * @param onend
     */
    speak(text: string, languageName?: string, onend?: Function): void;
    /**
     *
     * @param language
     */
    private mapLanguageNameToCode;
    getVoiceFromAPI(text: string, langCode: string, uniqueKey?: string, direct?: number): Promise<HTMLAudioElement>;
}
export declare const textToSpeech: TextToSpeech;
export {};
