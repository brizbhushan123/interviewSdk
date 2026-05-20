export const RecordMod = {
  START: 'start',
  STREAM: 'stream',
} as const;
export interface RecordMessage {
  token: string;
  date: string; // Store token with timestamp for uniqueness
  camera: string;
  environment: string;
  environment_url: string;
  stepEnv: string;
  sessionId: number;
  instanceId: number;
  mime:string;
  data: { mode: (typeof RecordMod)[keyof typeof RecordMod]; info?: any };
}

import { environment } from '../config/environment';
import api from './APIManager';
import { configrationManager } from './ConfigrationManager';
import { stepManager } from './StepsManager';
import utility from './Utility';
import { RecordingSocketMessage } from './RecordingWorker';


/**
 *
 */
export class Recording {
  private serverUrl: string;
  private stream: MediaStream;
  private camera: string;
  private ws: WebSocket | null = null;
  recordId: string = '';
  mediaRecorder: MediaRecorder | null = null;
  reconnectInterval = 2000; // 2 seconds
  maxRetries = Infinity;
  retryCount = 0;
  token: string = '';
  token_date: string = '';
  mimeType: string = '';
  recordingWorker: Worker | null = null;
  useWorker: boolean = true;
  workderWSState : number = 0; // 0=closed, 1=connecting, 2=open, 3=closing

  private chunkBuffer: any[] = []; // Buffer for unsent chunks

  VIDEO_BITS_PER_SECOND = 3000000; // 1710 kbps
  AUDIO_BITS_PER_SECOND = 100000; // 128 kbps

  stopTrigger: boolean = false;

  /**
   *
   * @param server
   * @param stream
   * @param camera
   * @param worker
   */
  constructor(server: string, stream: MediaStream, camera: string, worker:Worker) {
    this.recordingWorker = worker;
    this.serverUrl = server;
    this.stream = stream;
    this.camera = camera;
    this.token = api.getToken(); // Get the token from API manager
    if(this.useWorker){
      this.token_date = `${new Date().getTime()}-${Math.random().toString(36).substring(2, 9)}`; // Store token with timestamp for uniqueness
      this.recordingWorker.onmessage = (event: MessageEvent<any>) => {
        const message = event.data as RecordingSocketMessage; 
        if(message.on == "OPEN"){
          this.workderWSState = 2;
          utility.log('Status RW: Connected to WebSocket server. Sending session ID...');
          this.sendRecordMessage(RecordMod.START);
          utility.wait(1000).then(() => {
            // Send buffered chunks
            if (this.chunkBuffer.length > 0) {
              this.chunkBuffer.forEach((chunk) => {
                  this.sendRecordMessage(RecordMod.STREAM, { data: chunk });
              });
              this.chunkBuffer = [];
            }
          });
        }else if(message.on == "CLOSE"){
          this.workderWSState = 0;
          utility.log('Status RW: Disconnected from WebSocket server.');
        } else if(message.on == "ERROR"){
          this.workderWSState = 0;
          utility.log('Status RW: WebSocket error! Check console for details.');
          const self = this;
          this.recordingWorker?.postMessage({ type: 'STOP_AND_CLOSE' });
          if (this.retryCount < this.maxRetries) {
            setTimeout(() => {
              self.recordingWorker?.postMessage({ type: 'INIT', payload: { url: this.serverUrl } });
            }, this.reconnectInterval);
            this.retryCount++;
          }
        } else if(message.on == "MESSAGE"){
          // Handle other messages if needed
        }
      };
      this.recordingWorker.postMessage({ type: 'INIT', payload: { url: this.serverUrl } });
    }else{
      this.ws = this.connect();
    }
    this.setRecorder();
  }
  /**
   *
   */
  connect(): WebSocket {
    const ws = new WebSocket(this.serverUrl);
    this.token_date = new Date().getTime().toString(); // Store token with timestamp for uniqueness
    ws.onopen = () => {
      utility.log('Status: Connected to WebSocket server. Sending session ID...');
      //this.ws.send(this.recordingPath); // Send the session ID as the first message
      this.sendRecordMessage(RecordMod.START);
      utility.wait(1000).then(() => {
        // Send buffered chunks
        if (this.chunkBuffer.length > 0) {
          this.chunkBuffer.forEach((chunk) => {
            this.sendRecordMessage(RecordMod.STREAM, { data: chunk });
          });
          this.chunkBuffer = [];
        }
      });
    };

    ws.onclose = () => {
      utility.log('Status: Disconnected from WebSocket server.');
    };

    ws.onerror = (error) => {
      utility.log('Status: WebSocket error! Check console for details.');
      utility.error('WebSocket Error:', error);
      const self = this;
      ws.close();
      if (this.retryCount < this.maxRetries) {
        setTimeout(() => {
          self.ws = self.connect();
        }, this.reconnectInterval);
        this.retryCount++;
      }
    };
    return ws;
  }
  /**
   *
   * @param stream
   */
  setStream(stream: MediaStream) {
    this.stop();
    this.stream = stream;
    this.ws = this.connect();
    this.setRecorder();
    return this;
  }
  /**
   *
   */
  setRecorder() {

    let mime = this.getMimeType();

    this.mediaRecorder = new MediaRecorder(this.stream, mime);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN && this.chunkBuffer.length === 0 
          || (this.useWorker && this.workderWSState === 2)) {
          let self = this;
          event.data.arrayBuffer().then((arrayBuffer) => {
             if(this.useWorker){
              self.sendRecordMessage(RecordMod.STREAM, { data: arrayBuffer }); // Send raw ArrayBuffer
            }else{
              const base64Data = self.arrayBufferToBase64(arrayBuffer);
              if (base64Data !== '') {
                self.sendRecordMessage(RecordMod.STREAM, { data: base64Data }); // Convert to base64 string for transmission
              }
              // utility.log('Sending data chunk:', event.data.size, 'bytes');
            }
          });
        } else {
          event.data.arrayBuffer().then((arrayBuffer) => {
            // Buffer the chunk if WebSocket is not open
            let self = this;
            if(this.useWorker){
              this.chunkBuffer.push(arrayBuffer);
            }else{
              const base64Data = self.arrayBufferToBase64(arrayBuffer);
              this.chunkBuffer.push(base64Data);
            }
          });
        }
      }
    };

    this.mediaRecorder.onstart = () => {
      utility.info('Status: Recording started...');
    };

    this.mediaRecorder.onstop = () => {
      utility.info('Status: Recording stopped.');

      if (this.ws && this.stopTrigger) {
        // Only disconnect if stop is triggered
        this.ws.close(); // Close WebSocket connection
      }
    };
  }
  /**
   *
   */
  start() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
      this.mediaRecorder.start(2000);
    }
    return this;
  }
  /**
   *
   */
  pause(): boolean {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.requestData();
      this.mediaRecorder.stop();
    }
    return true;
  }

  /**
   *
   */
  async stop() {
    this.stopTrigger = true; // Stop is triggered
    if (!this.pause()) {
      // if pause is not sucessfull / mediaRecorder is inactive
      if(this.useWorker){
        if(this.recordingWorker && this.stopTrigger){
          await new Promise<void>((resolve) => {
            setTimeout(() => { 
              this.recordingWorker?.postMessage({ type: 'STOP_AND_CLOSE' }); // Close WebSocket after 1 second
              resolve();
            }, 1000);
          });
        }
      }else{
        if (this.ws && this.stopTrigger) {
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              this.ws?.close(); // Close WebSocket after 1 second
              resolve();
            }, 1000);
          });
        }
      }
    }
  }

  /**
   *
   */
  recordMessage(mode: (typeof RecordMod)[keyof typeof RecordMod], info?: any): RecordMessage {
    return {
      token: this.token,
      date: this.token_date, // Store token with timestamp for uniqueness
      camera: this.camera,
      environment: configrationManager.appEnv,
      environment_url: environment.API_URL,
      stepEnv: configrationManager.currentStepAlias,
      sessionId: configrationManager.sessionIdRec,
      instanceId: configrationManager.instanceIdRec,
      mime: this.mimeType,
      data: { mode, info },
    };
  }
  sendRecordMessage(mode: (typeof RecordMod)[keyof typeof RecordMod], info?: any) {
    if(this.useWorker){
      if(this.recordingWorker && this.workderWSState === 2){
        const message = this.recordMessage(mode, info);
        if(mode == RecordMod.STREAM){
          this.recordingWorker.postMessage({ type: 'SEND_STREAM', payload: info.data });
        }else{
          this.recordingWorker.postMessage({ type: 'SEND_JSON', payload: message });
        }  
      }else{
        utility.error('Recording worker is not initialized. Cannot send record message.');
      }
    }else{
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const message = this.recordMessage(mode, info);
        this.ws.send(JSON.stringify(message));
        // utility.log('Status: Record message sent:', message);
      } else {
        utility.error('WebSocket is not open. Cannot send record message.');
      }
    }
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }


  getMimeType() { 

    let options = {mimeType: '',
              videoBitsPerSecond: this.VIDEO_BITS_PER_SECOND,
              audioBitsPerSecond: this.AUDIO_BITS_PER_SECOND
            };

    // Prefer MP4 (H.264 + AAC) if supported (Safari + some Chrome builds)
    if (MediaRecorder.isTypeSupported('video/mp4;codecs="avc1.42E01E, mp4a.40.2"')) {
      options.mimeType = 'video/mp4;codecs="avc1.42E01E, mp4a.40.2"';
      utility.info("Mime - Using MP4 (H.264 + AAC)");
      this.mimeType = "h264";
    }
    // Chrome/Edge often support H.264 in WebM container
    else if (MediaRecorder.isTypeSupported('video/webm;codecs="h264"')) {
      options.mimeType = 'video/webm;codecs="h264"';
      utility.info("Mime - Using WebM (H.264)");
      this.mimeType = "h264";
    }
    // Fallback → WebM (VP8 + Opus) → works everywhere
    else if (MediaRecorder.isTypeSupported('video/webm;codecs="vp8, opus"')) {
      options.mimeType = 'video/webm;codecs="vp8, opus"';
      utility.info("Mime - Using WebM (VP8 + Opus)");
      this.mimeType = "vp8";
    }
    // Last resort (should rarely happen)
    else {
      options.mimeType = '';
      utility.warn("Mime - Falling back to browser default MediaRecorder settings");
      this.mimeType = "default";
    }

   return options;
  }
}
