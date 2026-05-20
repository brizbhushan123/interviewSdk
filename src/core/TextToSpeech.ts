import { configrationManager } from './ConfigrationManager';
import request from './RequestManager';
import utility from './Utility';

/**
 *
 */
class TextToSpeech {
  // private synth: SpeechSynthesis;
  synth: SpeechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  isVoiceLoaded: boolean = false; // private inputForm: HTMLFormElement;
  commonAudio: HTMLAudioElement | null = null; // Common audio element for playback
  // private inputTxt: HTMLInputElement;
  // private voiceSelect: HTMLSelectElement;

  /**
   *
   */
  constructor() {
    this.synth = window.speechSynthesis;
    if (window.speechSynthesis) {
      // Load voices when available
      this.synth.onvoiceschanged = () => {
        this.voices = this.synth.getVoices();
        this.isVoiceLoaded = true;
      };

      // Preload voices if available immediately
      this.voices = this.synth.getVoices();
      if (this.voices.length > 0) {
        this.isVoiceLoaded = true;
      }
    }
  }

  /**
   *
   * @param text
   * @param languageName
   * @param onend
   */
  public speak(text: string, languageName: string = 'english', onend: Function = () => {}): void {
    if (!this.isVoiceLoaded) {
      utility.warn('Voices not loaded yet. Trying again...');
      setTimeout(() => this.speak(text, languageName), 100);
      return;
    }

    const langCode = configrationManager.language;
    const voice = this.voices.find((v) => v.lang.toLowerCase().startsWith(langCode));

    if (!voice) {
      utility.warn(`No voice found for language: ${languageName} (${langCode}), using default.`);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice || this.voices[0];
    utterance.onend = () => {
      onend();
    };
    this.synth.speak(utterance);
  }

  /**
   *
   * @param language
   */
  private mapLanguageNameToCode(language: string): string {
    const lang = language.toLowerCase();
    if (lang.includes('english')) return 'en';
    if (lang.includes('german')) return 'de';
    if (lang.includes('french')) return 'fr';
    if (lang.includes('hindi')) return 'hi';
    if (lang.includes('arabic')) return 'ar';
    if (lang.includes('spanish')) return 'es';
    if (lang.includes('chinese')) return 'zh';
    // Add more as needed
    return 'en'; // default fallback
  }

  getVoiceFromAPI(text: string, langCode: string, uniqueKey?: string, direct?: number): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {

      if(configrationManager.alreadySpeechCalled[uniqueKey??'']) {
        
        const base64Audio = configrationManager.alreadySpeechCalled[uniqueKey??''];
        const audio = new Audio('data:audio/mpeg;base64,' + base64Audio);
        if(this.commonAudio){
          this.commonAudio.pause();
        }
        this.commonAudio = audio;
        resolve(audio);
      }else{
      request.getAudio({ text: text, language_code: langCode, unique_key: uniqueKey ?? '', direct: direct ?? 0 })
        .then((response) => {
          if (response.status === true && response.message === 'Success') {
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
              const base64Audio = response.data[0];
              if(direct==0){
                configrationManager.alreadySpeechCalled[uniqueKey??''] = base64Audio;
              }

              const audio = new Audio('data:audio/mpeg;base64,' + base64Audio);
              if (this.commonAudio) {
                try {
                  this.commonAudio.pause(); // Pause any currently playing audio
                } catch (e) {
                  utility.error('Error pausing common audio:', e);
                }
              }
              this.commonAudio = audio; // Store the audio element for future use
              
              resolve(audio); // ✅ Return audio to the caller
            } else {
              reject('No audio data found in response.');
            }
          } else {
            reject('Failed to get audio: ' + response.message);
          }
        })
        .catch((error) => {
          reject('Error fetching audio: ' + error);
        });
      }
    });
  }
}

export const textToSpeech = new TextToSpeech();
