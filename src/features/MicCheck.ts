import { config } from 'process';
import { configrationManager } from '../core/ConfigrationManager';
import { LiveStreamManager, liveStreamManager } from '../core/LiveStreamManager';
import request from '../core/RequestManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import { stepUIManager } from '../core/StepUIManager';
import { textToSpeech } from '../core/TextToSpeech';
import utility from '../core/Utility';
import { micUI } from '../ui/featuresUI/MicUI';
import { UiComponents } from '../ui/UiComponents';
import ui from '../ui/UiManager';

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

/**
 *
 */
class MicCheck extends StepInterface {
  micFailedAttempt: number = 0;
  speakerFlag: number = 0;
  envAlias: string = 'Mic_Check';
  recognition: any = null;
  speakerGet: number = 0;
  speechRecorgFailed: boolean = false;
  /**
   *
   */
  constructor() {
    super();
    this.speakerGet = 0;
  }

  /**
   *
   */
  async start(): Promise<void> {
    this.checkSpeaker();
  }

  /**
   *
   */
  async checkSpeaker() {
    const timeoutMicPermission = setTimeout(() => {
      ui.show(ui.id('thinkX_speakerStatic'));
      ui.hide(ui.id('thinkX_speaker-check-text2'));
      ui.show(ui.id('thinkX_micPopupEnable'));
    }, 1500);
    await liveStreamManager.getAudioList(true);
    ui.hide(ui.id('thinkX_speakerStatic'));
    ui.show(ui.id('thinkX_speaker-check-text2'));
    ui.hide(ui.id('thinkX_micPopupEnable'));
    clearTimeout(timeoutMicPermission);
    liveStreamManager.checkSpeakerAvailable().then((hasSpeaker) => {
      if (hasSpeaker) {
        this.speakerGet = 1;
        micUI.speakerCheckHtml();
        setTimeout(() => {
          this.micStart();
        }, 3000);
      } else {
        this.speakerGet = 0;
        const message = ui.translations.status.noSpeaker;

        if (configrationManager.speakerEnable == 1) {
          this.resultData.status = false;
          this.resultData.error.push(message);
          this.end();
          this.onError(() => {
            micUI.retryBtnRemove();
            ui.show(ui.id('thinkX_speakerCheck-error'));
            this.retrySpeaker();
          });
        } else {
          ui.show(ui.id('thinkX_speakerCheck-error'));
          stepUIManager.insertText(
            'thinkX_speakerError-check-text',
            `${ui.translations.status.speaker_not_found}`
          );
          setTimeout(() => {
            this.micStart();
          }, 3000);
        }
      }
    });
  }

  /**
   *
   */
  retrySpeaker() {
    micUI.speakerRetry();
    const button = ui.id('thinkX_speakerRetry') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        micUI.retryBtnRemove();
        micUI.stopMicStream();
        this.resultData.status = true;
        this.resultData.error = [];
        this.checkSpeaker();
      });
    }
  }

  /**
   *
   */
  async micStart() {
    ui.show(ui.id('thinkX_audioDiv'));
    let selectlist = UiComponents.getMicSelect(
      ui.translations.status.allow_btn,
      ui.translations.status.selectMic
    );
    const container = ui.id('thinkproc-mic-select');
    if (container) {
      container.innerHTML = selectlist;
      stepUIManager.initAndUpdateCustomSelectById(
        'thinkpro-get-mic-value',
        [{ value: '', label: ui.translations.status.no_microphone_found }],
        ''
      );
    }
    const addClass = ui.id('thinkX_audioDiv');
    if (addClass) {
      ui.addClass(addClass, 'thinkproc-disable');
    }
    ui.hide(ui.id('thinkX_speakerAvailable'));
    ui.hide(ui.id('thinkX_speakerCheck-error'));
    ui.hide(ui.id('thinkX_micError'));
    const micPermission = await liveStreamManager.permissionEnable('microphone');
    if (micPermission == false) {
      ui.show(ui.id('thinkX_audioDiv'));
      ui.hide(ui.id('thinkX_alertMicBox'));
      let selectlist = UiComponents.getMicSelect(
        ui.translations.status.allow_btn,
        ui.translations.status.selectMic
      );
      const container = ui.id('thinkproc-mic-select');
      if (container) {
        container.innerHTML = selectlist;
        stepUIManager.initAndUpdateCustomSelectById(
          'thinkpro-get-mic-value',
          [{ value: '', label: ui.translations.status.no_microphone_found }],
          ''
        );
      }
      const message = ui.translations.status.micEnable;
      this.resultData.status = false;
      this.resultData.error.push(message);
      this.end();
      this.onError(() => {
        this.retryMic();
      });
      return;
    }
    const removeClass = ui.id('thinkX_audioDiv');
    if (removeClass) {
      ui.removeClass(removeClass, 'thinkproc-disable');
    }
    micUI.audioAppendHtmlInsideContainer(
      UiComponents.getMicSelect(ui.translations.status.allow_btn, ui.translations.status.selectMic),
      'thinkproc-mic-select',
      this.audioCallback,
      this.micErrorCallback
    );
    const audio = await liveStreamManager.getAudioList(true);
    micUI.showAudioDiv();
    if (Array.isArray(audio)) {
      ui.hide(ui.id('thinkX_alertMicBox')); // hide interview
      const options = audio.map((mic: { deviceId: any; label: any }, i: number) => ({
        value: mic.deviceId || `${i}`,
        label: mic.label || `Audio Device ${i + 1}`,
      }));
      if (options.length > 0) {
        stepUIManager.initAndUpdateCustomSelectById(
          'thinkpro-get-mic-value',
          options,
          options[0]?.value
        );
      } else {
        stepUIManager.initAndUpdateCustomSelectById(
          'thinkpro-get-mic-value',
          [{ value: '', label: ui.translations.status.no_microphone_found }],
          ''
        );
      }
    } else {
      utility.log('No audio list available.');
      let message: string;
      if (audio === false) {
        let selectlist = UiComponents.getMicSelect(
          ui.translations.status.allow_btn,
          ui.translations.status.selectMic
        );
        const container = ui.id('thinkproc-mic-select');
        if (container) {
          container.innerHTML = selectlist;
          stepUIManager.initAndUpdateCustomSelectById(
            'thinkpro-get-mic-value',
            [{ value: '', label: ui.translations.status.no_microphone_found }],
            ''
          );
        }
        message = ui.translations.status.micEnable;
      } else {
        message = ui.translations.status.noMic;
      }
      this.resultData.status = false;
      this.resultData.error.push(message);
      this.end();
      this.onError(() => {
        this.retryMic();
      });
    }
  }

  /**
   *
   */
  retryMic() {
    micUI.removeAndAddDisableClass();

    const button = ui.id('thinkX_micRetryBtn') as HTMLElement;

    if (button) {
      ui.click(button, async () => {
        micUI.removeDisable();
        this.resultData.status = true;
        this.resultData.error = [];
        this.micStart();
      });
    }
  }

  audioCallback = async (data: { id: any; label: any }) => {
    ui.hide(ui.id('thinkX_alertMicBox'));
    micUI.showLoader();
    this.resultData.info = data;

    let audioStream = LiveStreamManager.AUDIO.PRIMARY;
    if (configrationManager.speakerEnable == 1) {
      audioStream = LiveStreamManager.AUDIO.PRIMARY_NOISE;
    }
    const audioStream_noise = await liveStreamManager.requestAudio(
      audioStream
    );
    const audioChannelCount = await liveStreamManager.getAudioChannelCountFromStream(
      audioStream
    );
    if (audioStream_noise) {
      if (this.speakerGet == 1 && configrationManager.speakerEnable == 1) {
        micUI.hideLoader();
        ui.stopAudioBar();
        ui.hide(ui.id('thinkX_audioImage'));
        ui.hide(ui.id('thinkX_speakerCheck'));
        ui.show(ui.id('thinkX_speakerStatic'));
        this.micFailedAttempt = 0;
        this.microphoneMachineDetect(audioStream_noise, audioChannelCount);
      } else {
        micUI.hideLoader();
        this.micFailedAttempt = 0;
        const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
        const candidateNameSpeaker = configrationManager.currentCandidateName;
        const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });

        const messageTemplate = ui.translations.status.checking_mic;
        const message = utility.replacePlaceholders(messageTemplate, { text: CandidateMessage });
        ui.innerHTML(ui.id('thinkX_checkingMic'), message);
        ui.show(ui.id('thinkX_audioStatic'));
        this.microphoneCheckStatus(audioStream_noise, audioChannelCount);
      }
    }
  };

  micErrorCallback = (message: string) => {
    ui.hide(ui.id('thinkX_alertMicBox'));
    micUI.hideLoader();
    stepUIManager.initAndUpdateCustomSelectById(
      'thinkpro-get-mic-value',
      [{ value: '', label: ui.translations.status.no_microphone_found }],
      ''
    );
    this.resultData.status = false;
    this.resultData.error.push(message);
    this.end();
    this.onError(() => {
      this.retryMic();
    });
  };

  /**
   *
   */
  getSpeechRecongnition() {
    if (this.recognition != null) {
      this.recognition.end;
      return this.recognition;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = ui.translations.language_code.code;
    this.recognition.continuous = false; // We only need one result for this test
    this.recognition.interimResults = false; // Only interested in the final result
    return this.recognition;
  }

  isEdgeOnMacOS(): boolean {
    const ua = navigator.userAgent;
    const isMac = /Macintosh|Mac OS X/i.test(ua);
    const isEdge = /Edg/i.test(ua);
    return (isMac && isEdge) || (this.speechRecorgFailed);
  }
  /**
   *
   * @param mediaStream
   */
  microphoneCheckStatus(mediaStream: MediaStream, audioChannelCount: number): void {
    ui.initAudioVisualization(mediaStream, 'thinkX_audioCanvas'); // 👈 Add this line to trigger graph
    const staticText1 = ui.translations.status.micSentence;
    const candidateNameSpeaker = configrationManager.currentCandidateName;
    const staticText = utility.replacePlaceholders(staticText1, { candidateName: candidateNameSpeaker });

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.micFailedAttempt++;

    if (SpeechRecognition != undefined && configrationManager.isMobile == false && !this.isEdgeOnMacOS()) {
      const recognition = this.getSpeechRecongnition();
      let detectedText = '';
      let isStopped = false;
      const startTime = Date.now();
      let onerrorSpeech = false;

      recognition.onstart = () => {
        utility.log('🎙️ Speech recognition started');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        if (isStopped) return;
        const result = event.results[0][0].transcript;
        detectedText += result + ' ';
        utility.log('You said:', result);

        isStopped = true;
        recognition.stop();
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        utility.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'network') {
          utility.log('🔁 Falling back to MediaRecorder speech detection');
          recognition.abort();
          this.speechRecorgFailed = true;
          onerrorSpeech = true;
          this.startMediaRecorderFallback(mediaStream, audioChannelCount);
        }
      };

      recognition.onend = () => {
        const now = Date.now();
        const elapsed = now - startTime;

        // if (!isStopped && elapsed < 10000) {
        //   utility.log(`⏱️ Restarting recognition (${Math.round(elapsed / 1000)}s elapsed)`);
        //   recognition.start(); // Restart recognition if no voice detected yet
        //   return;
        // }

        utility.log('🛑 Final result:', detectedText.trim());
        const textsimilarityPercentage = this.calculateSimilarityPercentage(
          detectedText,
          staticText
        );
        if (onerrorSpeech == false) {
          if (detectedText.trim() == '') {
            if (this.micFailedAttempt <= 1) {
              // const resultDiv = ui.id('thinkX_checkingMic');
              // if (resultDiv) {
              const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
              const candidateNameSpeaker = configrationManager.currentCandidateName;
              const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
              const messageTemplate = ui.translations.status.micRetry;
              const message = utility.replacePlaceholders(messageTemplate, { text: CandidateMessage });
              ui.innerHTML(ui.id('thinkX_checkingMic'), message);
              this.microphoneCheckStatus(mediaStream, audioChannelCount);
              // }
            } else if (this.micFailedAttempt == 2) {
              const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
              const candidateNameSpeaker = configrationManager.currentCandidateName;
              const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
              const messageTemplate = ui.translations.status.micRetry2;
              const message = utility.replacePlaceholders(messageTemplate, { text: CandidateMessage });
              ui.innerHTML(ui.id('thinkX_checkingMic'), message);
              this.microphoneCheckStatus(mediaStream, audioChannelCount);
            } else {
              const errorDiv = ui.id('thinkX_micError');
              if (errorDiv) {
                ui.hide(errorDiv);
                // ui.hide(ui.id("thinkX_audioImage"));
                ui.hide(ui.id('thinkX_audioStatic'));
                ui.show(ui.id('thinkX_micErrorIcon'));
                // ui.innerText(errorDiv,`${ui.translations.status.micError}`);
                const message = ui.translations.status.micError;
                this.resultData.status = false;
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                  this.retrySpeaker();
                });
              }
            }
          } else {
            // const showDiv = ui.id('thinkX_checkingMic');
            // if (showDiv) {
            //   ui.innerText(showDiv, `${ui.translations.status.micCheck}`);
            stepUIManager.insertText('thinkX_audioImage', `${ui.translations.status.micCheck}`);
            // }
            setTimeout(() => {
              ui.stopAudioBar();
              ui.hide(ui.id('thinkX_audioStatic'));
              ui.show(ui.id('thinkX_audioImage'));
              this.micFailedAttempt = 0;
              this.end();
              // this.microphoneMachineDetect(mediaStream);
            }, 3000);
          }
        }
      };

      recognition.start();
    } else {
      this.startMediaRecorderFallback(mediaStream, audioChannelCount);
    }
  }

  /**
   *
   * @param mediaStream
   */
  microphoneMachineDetect(mediaStream: MediaStream, audioChannelCount: number): void {
    ui.initAudioVisualization(mediaStream, 'thinkX_machineAudio'); // 👈 Add this line to trigger graph
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.micFailedAttempt++;

    const staticText = ui.translations.language_code.text;
    if (SpeechRecognition != undefined && configrationManager.isMobile == false && !this.isEdgeOnMacOS()) {
      // if (!SpeechRecognition) throw new Error("SpeechRecognition API not supported.");

      const recognition = new SpeechRecognition();
      recognition.lang = ui.translations.language_code.code;
      recognition.continuous = true; // ✅ keep listening until TTS is done
      recognition.interimResults = false;

      let detectedText = '';
      let isStopped = false;
      const startTime = Date.now();
      let onerrorSpeechMachine = false;

      recognition.onstart = () => {
        // textToSpeech.speak(staticText, undefined, () => {
        //   utility.log('🎙️ Speech recognition started');
        // });
        setTimeout(() => {
          textToSpeech
            .getVoiceFromAPI(staticText, ui.translations.language_code.code)
            .then(async (audio) => {
              audio.onended = function () {
                recognition.stop();
              };
              await audio.play();
              utility.log('🎧 Audio playback started');
              utility.log('🎙️ Speech recognition started');
            })
            .catch((error) => {
              utility.error('Error getting voice from API or playing audio:', error);
            });
        }, 2000);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        if (isStopped) return;
        const result = event.results[0][0].transcript;
        detectedText += result + ' ';
        utility.log('You said:', result);
        isStopped = true;
        recognition.stop();
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        utility.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'network') {
          utility.log('🔁 Falling back to MediaRecorder speech detection');
          recognition.abort();
          this.speechRecorgFailed = true;
          onerrorSpeechMachine = true;
          this.startMediaRecorderFallbackAudio(mediaStream, audioChannelCount, staticText);
        }
      };

      recognition.onend = () => {
        clearTimeout(micspeakInterval);
        const now = Date.now();
        const elapsed = now - startTime;

        // if (!isStopped && elapsed < 10000) {
        //   this.micFailedAttempt++;
        //   utility.log(`⏱️ Restarting recognition (${Math.round(elapsed / 1000)}s elapsed)`);
        //   recognition.start(); // Restart recognition if no voice detected yet
        //   return;
        // }

        utility.log('🛑 Final result:', detectedText.trim());

        const textsimilarityPercentage = this.calculateSimilarityPercentage(
          detectedText,
          staticText
        );
        // if (textsimilarityPercentage <= 50.0 || detectedText == '') {
        if (onerrorSpeechMachine == false) {
          if (detectedText.trim() == '') {
            utility.log('erorr found microphone is not working properly.');
            // configrationManager.speakerAttempt
            if (this.micFailedAttempt < 3) {
              this.speakerFlag == 1;
              const resultDiv = ui.id('thinkX_speaker-check-text');
              if (resultDiv) {
                ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
                this.microphoneMachineDetect(mediaStream, audioChannelCount);
              }
            } else {
              const errorDiv = ui.id('thinkX_speakerError-check-text');
              if (errorDiv) {
                ui.hide(ui.id('thinkX_speakerStatic'));
                ui.show(ui.id('thinkX_speakerCheck-error'));
                ui.hide(ui.id('thinkX_speakerError-check-text'));
                // ui.innerText(errorDiv, ``);
                const message = ui.translations.status.speakerError;
                this.resultData.status = false;
                this.resultData.error.push(message);
                this.end();
                this.onError(() => {
                  this.retrySpeaker();
                });
              }
            }
          } else {
            const showDiv = ui.id('thinkX_speaker-check-text');
            if (showDiv) {
              ui.innerText(showDiv, `${ui.translations.status.speakerChecked}`);
            }
            ui.stopMachineBar();
            ui.show(ui.id('thinkX_speakerCheck'));
            ui.hide(ui.id('thinkX_speakerStatic'));
            this.end(3000);
          }
        }
      };
      recognition.start();
      const micspeakInterval = setTimeout(() => {
        recognition.stop();
      }, 10000);
    } else {
      this.startMediaRecorderFallbackAudio(mediaStream, audioChannelCount, staticText);
    }
  }

  // handleRecognitionFailure(mediaStream: MediaStream) {
  //     if (this.speakerFailedAttempt <= 1) {
  //         const resultDiv = ui.id("thinkX_speaker-check-text");
  //         if (resultDiv) {
  //             ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
  //             this.microphoneMachineDetect(mediaStream);
  //         }
  //     } else {
  //         const errorDiv = ui.id("thinkX_speakerError-check-text");
  //         if (errorDiv) {
  //             ui.hide(ui.id("thinkX_speakerCheck"));
  //             ui.show(ui.id("speakerCheck-error"));
  //             ui.innerText(errorDiv, ``);
  //             const message = ui.translations.status.speakerError;
  //             this.resultData.status = false;
  //             this.resultData.error.push(message);
  //             this.end();
  //         }
  //     }
  // }

  /**
   *
   * @param string1
   * @param string2
   */
  calculateSimilarityPercentage(string1: string, string2: string): number {
    const maxLength = Math.max(string1.length, string2.length);
    const distance = this.levenshteinDistance(string1, string2);
    const similarityPercentage = ((maxLength - distance) / maxLength) * 100;
    return parseFloat(similarityPercentage.toFixed(2)); // Convert to number
  }

  /**
   *
   * @param string1
   * @param string2
   */
  levenshteinDistance(string1: string, string2: string) {
    const matrix = [];

    // Initialize matrix
    for (let i = 0; i <= string1.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= string2.length; j++) {
      matrix[0][j] = j;
    }

    // Calculate Levenshtein distance
    for (let i = 1; i <= string1.length; i++) {
      for (let j = 1; j <= string2.length; j++) {
        if (string1.charAt(i - 1) === string2.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // Substitution
            matrix[i][j - 1] + 1, // Insertion
            matrix[i - 1][j] + 1 // Deletion
          );
        }
      }
    }

    return matrix[string1.length][string2.length];
  }

  /**
   *
   */
  result(): StepResult {
    return this.resultData;
  }

  /**
   *
   */
  cameraRevokeRetry() { }
  /**
   *
   */
  micRevokeRetry() {
    this.start();
  }

  startMediaRecorderFallback(
    mediaStream: MediaStream,
    audioChannelCount: number
  ) {
    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm' });
    let chunks: BlobPart[] = [];
    let isHandled = false;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      if (isHandled) return;
      isHandled = true;
      const blob = new Blob(chunks, { type: 'audio/webm' });
      chunks = [];

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Audio = (reader.result as string).split(',')[1];

        const data = {
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: ui.translations.language_code.langCode,
            audio_channel_count: audioChannelCount,
          },
          audio: {
            content: base64Audio,
          },
        };

        fetch(configrationManager.speechUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            let transcript = '';
            try {
              transcript = res.results[0].alternatives[0].transcript;
              utility.log('🧠 Google Speech API returned:', transcript);
              // const similarity = this.calculateSimilarityPercentage(transcript, staticText);
              if (transcript.trim() == '') {
                if (this.micFailedAttempt == 1) {
                  // const resultDiv = ui.id('thinkX_checkingMic');
                  // if (resultDiv) {
                  const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                  const candidateNameSpeaker = configrationManager.currentCandidateName;
                  const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                  const messageTemplate = ui.translations.status.micRetry;
                  const message = utility.replacePlaceholders(messageTemplate, {
                    text: CandidateMessage,
                  });
                  ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                  // ui.innerText(resultDiv, `${ui.translations.status.micRetry}`);
                  this.microphoneCheckStatus(mediaStream, audioChannelCount);
                  // }
                } else if (this.micFailedAttempt == 2) {
                  const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                  const candidateNameSpeaker = configrationManager.currentCandidateName;
                  const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                  const messageTemplate = ui.translations.status.micRetry2;
                  const message = utility.replacePlaceholders(messageTemplate, {
                    text: CandidateMessage,
                  });
                  ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                  this.microphoneCheckStatus(mediaStream, audioChannelCount);
                } else {
                  const errorDiv = ui.id('thinkX_micError');
                  if (errorDiv) {
                    ui.hide(ui.id('thinkX_audioStatic'));
                    ui.show(ui.id('thinkX_micErrorIcon'));
                    ui.hide(errorDiv);
                    const message = ui.translations.status.micError;
                    this.resultData.status = false;
                    this.resultData.error.push(message);
                    this.end();
                  }
                }
              } else {
                // const showDiv = ui.id('thinkX_checkingMic');
                // if (showDiv) {
                // ui.innerText(showDiv, `${ui.translations.status.micCheck}`);
                stepUIManager.insertText(
                  'thinkX_audioImage',
                  `${ui.translations.status.micCheck}`
                );
                // }
                setTimeout(() => {
                  ui.stopAudioBar();
                  ui.hide(ui.id('thinkX_audioStatic'));
                  ui.show(ui.id('thinkX_audioImage'));
                  this.micFailedAttempt = 0;
                  this.end();
                  // this.microphoneMachineDetect(mediaStream);
                  clearTimeout(stopTimeout); // Stop timeout if running
                }, 3000);
              }
            } catch {
              utility.log('No transcript found.');
              if (this.micFailedAttempt == 1) {
                // const resultDiv = ui.id('thinkX_checkingMic');
                // if (resultDiv) {
                const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                const candidateNameSpeaker = configrationManager.currentCandidateName;
                const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                const messageTemplate = ui.translations.status.micRetry;
                const message = utility.replacePlaceholders(messageTemplate, {
                  text: CandidateMessage,
                });
                ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                // ui.innerText(resultDiv, `${ui.translations.status.micRetry}`);
                this.microphoneCheckStatus(mediaStream, audioChannelCount);
                // }
              } else if (this.micFailedAttempt == 2) {
                const textDetail = `<b>${ui.translations.status.micSentence}</b>`;
                const candidateNameSpeaker = configrationManager.currentCandidateName;
                const CandidateMessage = utility.replacePlaceholders(textDetail, { candidateName: candidateNameSpeaker });
                const messageTemplate = ui.translations.status.micRetry2;
                const message = utility.replacePlaceholders(messageTemplate, {
                  text: CandidateMessage,
                });
                ui.innerHTML(ui.id('thinkX_checkingMic'), `${message}`);
                this.microphoneCheckStatus(mediaStream, audioChannelCount);
              } else {
                const errorDiv = ui.id('thinkX_micError');
                if (errorDiv) {
                  ui.hide(ui.id('thinkX_audioStatic'));
                  ui.show(ui.id('thinkX_micErrorIcon'));
                  ui.hide(errorDiv);
                  const message = ui.translations.status.micError;
                  this.resultData.status = false;
                  this.resultData.error.push(message);
                  this.end();
                }
              }
            }
          })
          .catch((err) => {
            utility.error('Google Speech API error:', err);
          });
      };
    };

    mediaRecorder.start();

    const stopTimeout = setTimeout(() => {
      if (!isHandled) {
        mediaRecorder.stop(); // Stop recording after 10 seconds if no early exit
      }
    }, 10000);
  }

  startMediaRecorderFallbackAudio(mediaStream: MediaStream, audioChannelCount: number, staticText: string) {
    const mediaRecorder = new MediaRecorder(mediaStream, { mimeType: 'audio/webm; codecs=opus' });
    let chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm; codecs=opus' });
      chunks = [];

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Audio = (reader.result as string).split(',')[1];

        const data = {
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: ui.translations.language_code.langCode,
            audio_channel_count: audioChannelCount,
          },
          audio: {
            content: base64Audio,
          },
        };

        fetch(configrationManager.speechUrl, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            let transcript = '';
            try {
              transcript = res.results[0].alternatives[0].transcript;
              utility.log('🧠 Google Speech API returned:', transcript);
              const similarity = this.calculateSimilarityPercentage(transcript, staticText);
              if (transcript.trim() == '') {
                utility.log('Error: microphone is not working properly.');
                if (this.micFailedAttempt < 3) {
                  const resultDiv = ui.id('thinkX_speaker-check-text');
                  if (resultDiv) {
                    ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
                    this.microphoneMachineDetect(mediaStream, audioChannelCount);
                  }
                } else {
                  const errorDiv = ui.id('thinkX_speakerError-check-text');
                  if (errorDiv) {
                    ui.hide(ui.id('thinkX_speakerStatic'));
                    ui.show(ui.id('thinkX_speakerCheck-error'));
                    ui.innerText(errorDiv, ``);
                    const message = ui.translations.status.speakerError;
                    this.resultData.status = false;
                    this.resultData.error.push(message);
                    this.end();
                    this.onError(() => {
                      this.retrySpeaker();
                    });
                  }
                }
              } else {
                const showDiv = ui.id('thinkX_speaker-check-text');
                if (showDiv) {
                  ui.innerText(showDiv, `${ui.translations.status.speakerChecked}`);
                }
                ui.stopMachineBar();
                ui.show(ui.id('thinkX_speakerCheck'));
                ui.hide(ui.id('thinkX_speakerStatic'));
                this.end(3000);
              }
            } catch {
              utility.log('No transcript found.');
              if (this.micFailedAttempt < 3) {
                const resultDiv = ui.id('thinkX_speaker-check-text');
                if (resultDiv) {
                  ui.innerText(resultDiv, `${ui.translations.status.speakerRetry}`);
                  this.microphoneMachineDetect(mediaStream, audioChannelCount);
                }
              } else {
                const errorDiv = ui.id('thinkX_speakerError-check-text');
                if (errorDiv) {
                  ui.hide(ui.id('thinkX_speakerStatic'));
                  ui.show(ui.id('thinkX_speakerCheck-error'));
                  ui.innerText(errorDiv, ``);
                  const message = ui.translations.status.speakerError;
                  this.resultData.status = false;
                  this.resultData.error.push(message);
                  this.end();
                  this.onError(() => {
                    this.retrySpeaker();
                  });
                }
              }
              // this.handleRecognitionFailure(mediaStream); // optional: extract common retry logic to function
            }
          })
          .catch((err) => {
            utility.error('Google Speech API error:', err);
            // this.handleRecognitionFailure(mediaStream);
          });
      };
    };

    mediaRecorder.start();

    // textToSpeech.speak(staticText, undefined, () => {
    //   utility.log('🎙️ Speech recognition started');
    //   mediaRecorder.stop();
    // });
    setTimeout(() => {
      textToSpeech
        .getVoiceFromAPI(staticText, ui.translations.language_code.code)
        .then(async (audio) => {
          audio.onended = () => {
            utility.log('📴 Audio playback ended');
            mediaRecorder.stop(); // ✅ Stop recording after speech finishes
          };
          await audio.play();
          utility.log('🎧 Audio playback started');
          utility.log('🎙️ Speech recognition started');
        })
        .catch((error) => {
          utility.error('Error getting voice from API or playing audio:', error);
        });
    }, 1000);
  }
}

export const micCheck = new MicCheck();
