import { environment } from '../config/environment';
import { socket } from '../core/SocketManager';
import { StepInterface, StepResult } from '../core/StepInterface';
import utility from '../core/Utility';
import { networkUI } from '../ui/featuresUI/NetworkUI';
import ui from '../ui/UiManager';

/**
 *
 */
class NetworkCheck extends StepInterface {
  envAlias: string = 'Network_Check';

  pkt_config: {
    packetCount: number;
    minSize: number;
    maxSize: number;
    testUrl: string;
    minTestTime: number;
    maxTestTime: number;
  } = {
    packetCount: 0,
    minSize: 0,
    maxSize: 0,
    testUrl: '',
    minTestTime: 0,
    maxTestTime: 0,
  };

  min_download: number;
  min_upload: number;
  config: any;

  /**
   *
   */
  constructor() {
    super();
    this.min_download = 1000;
    this.min_upload = 1000;
  }

  /**
   *
   */
  start(): void {
    this.pkt_config = {
      packetCount: 15, // Number of packets for averaging
      minSize: 100 * 1024, // 100 KB
      maxSize: 5 * 1024 * 1024, // 5 MB
      testUrl: environment.NETWORK_URL,
      minTestTime: 10 * 1000, // Minimum 10 seconds per test
      maxTestTime: 10 * 1000, // Maximum test time (failsafe)
    };
    this.runSpeedTest();
  }

  /**
   *
   */
  getRandomSize() {
    return (
      Math.floor(Math.random() * (this.pkt_config.maxSize - this.pkt_config.minSize + 1)) +
      this.pkt_config.minSize
    );
  }

  /**
   *
   */
  async testDownloadSpeed() {
    // var uiM = this.monitor.uiManager;
    const speeds = [];

    const startOverall = performance.now();
    let packetSize = this.pkt_config.minSize; // Start small

    while (performance.now() - startOverall < this.pkt_config.minTestTime) {
      const startTime = performance.now();
      try {
        const response = await Promise.race([
          fetch(`${this.pkt_config.testUrl}/${packetSize}`),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), this.pkt_config.maxTestTime)
          ),
        ]);

        // if (!response.ok) throw new Error("Download failed");
        if (response instanceof Response) {
          await response.blob();
        }
      } catch (error) {
        utility.error('Error during download test:', error);
        return false;
      }
      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const speedMbps = (packetSize * 8) / (duration * 1000000); // Convert to Mbps
      speeds.push(speedMbps);
      const s = this.formatSpeed(speedMbps);
      ui.downloadSpeed(s.speed, s.unit);

      if (performance.now() - startOverall > this.pkt_config.maxTestTime) break;

      packetSize = Math.min(packetSize * 2, this.pkt_config.maxSize); // Gradually increase size
    }

    return speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
  }

  /**
   *
   */
  async testUploadSpeed() {
    // var uiM = this.monitor.uiManager;
    const speeds = [];

    const startOverall = performance.now();
    let packetSize = this.pkt_config.minSize;

    while (performance.now() - startOverall < this.pkt_config.minTestTime) {
      let data;
      try {
        data = new Blob([new Uint8Array(packetSize)]);
      } catch (error) {
        utility.error('Memory allocation failed for upload packet:', error);
        return 0;
      }

      const startTime = performance.now();
      try {
        await Promise.race([
          fetch(`${this.pkt_config.testUrl}/${packetSize}`, {
            method: 'POST',
            body: data,
            headers: { 'Content-Type': 'application/octet-stream' },
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), this.pkt_config.maxTestTime)
          ),
        ]);
      } catch (error) {
        utility.error('Error during upload test:', error);
        return false;
      }

      const endTime = performance.now();
      const duration = (endTime - startTime) / 1000;
      const speedMbps = (packetSize * 8) / (duration * 1000000); // Convert to Mbps
      speeds.push(speedMbps);

      const s = this.formatSpeed(speedMbps);
      ui.uploadSpeed(s.speed, s.unit);

      if (performance.now() - startOverall > this.pkt_config.maxTestTime) break;
      packetSize = Math.min(packetSize * 2, this.pkt_config.maxSize); // Gradually increase size
    }

    return speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
  }

  // Socket event handlers for network tests - Download
  async runDownloadTest(): Promise<number> {
    return new Promise((resolve) => {
      utility.log('Starting download test...');
      const speeds: number[] = [];
      const startOverall = performance.now();
      let lastChunkTime = performance.now();
      let packetSize = this.pkt_config.minSize;
      let isTestRunning = true;

      socket.on('downloadChunk', (data: ArrayBuffer) => {
        if (!isTestRunning) return;

        const now = performance.now();
        const duration = (now - lastChunkTime) / 1000;
        utility.log(
          `Received download chunk of size: ${data.byteLength / 1024} KB in ${duration.toFixed(2)} seconds`
        );
        const speedMbps = (data.byteLength * 8) / (duration * 1000000);
        speeds.push(speedMbps);

        const s = this.formatSpeed(speedMbps);
        utility.log(`Download speed: ${s.speed} ${s.unit}`);

        if (performance.now() - startOverall > this.pkt_config.minTestTime) {
          isTestRunning = false;
          socket.emit('downloadEnd');
        } else {
          packetSize = Math.min(packetSize * 2, this.pkt_config.maxSize);
          utility.log(`Requesting next download chunk of size: ${packetSize / 1024} KB`);
          lastChunkTime = now;
          socket.emit('requestDownloadChunk', { packetSize: packetSize });
        }
      });

      socket.on('downloadEnd', () => {
        socket.off('downloadChunk');
        socket.off('downloadEnd');
        const avgSpeed = speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
        utility.log(
          `Final download speed: ${this.formatSpeed(avgSpeed).speed} ${this.formatSpeed(avgSpeed).unit}`
        );
        resolve(avgSpeed);
      });

      setTimeout(() => {
        if (isTestRunning) {
          isTestRunning = false;
          socket.emit('downloadEnd');
        }
      }, this.pkt_config.maxTestTime);

      socket.emit('requestDownloadChunk', { packetSize: packetSize });
    });
  }
  // Socket event handlers for network tests - Upload
  async runUploadTest(): Promise<number> {
    let self = this;
    return new Promise((resolve) => {
      utility.log('Starting upload test...');

      const speeds: number[] = [];
      const startOverall = performance.now();
      let packetSize = self.pkt_config.minSize;

      const sendChunk = () => {
        if (performance.now() - startOverall > self.pkt_config.minTestTime) {
          socket.emit('uploadEnd');
          return;
        }

        if (performance.now() - startOverall > self.pkt_config.maxTestTime) {
          utility.log('Upload test timed out.');
          socket.emit('uploadEnd');
          return;
        }

        const uploadBuffer = new ArrayBuffer(packetSize);
        const startTime = performance.now();
        utility.log(`Sending upload chunk of size: ${packetSize / 1024} KB`);
        socket.emit('uploadChunk', { uploadBuffer: uploadBuffer }, '', (ackTime: number) => {
          const now = performance.now();
          const serverAckDuration = ackTime - startTime; // This is a rough measure of RTT
          utility.log(`ACK received. RTT was ${serverAckDuration.toFixed(2)} ms`);

          const duration = (now - startTime) / 1000;
          const speedMbps = (packetSize * 8) / (duration * 1000000);
          speeds.push(speedMbps);

          const s = self.formatSpeed(speedMbps);
          ui.uploadSpeed(s.speed, s.unit); // Update UI
          utility.log(`Upload speed: ${s.speed} ${s.unit}`);

          packetSize = Math.min(packetSize * 2, self.pkt_config.maxSize);
          setTimeout(sendChunk, 0);
        });
      };

      socket.emit('startUpload');
      sendChunk();

      socket.on('uploadComplete', (ack: () => void) => {
        const avgSpeed = speeds.length ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0;
        utility.log(
          `Final upload speed: ${self.formatSpeed(avgSpeed).speed} ${self.formatSpeed(avgSpeed).unit}`
        );

        if (typeof ack === 'function') {
          ack();
        }
        socket.off('uploadComplete');
        resolve(avgSpeed);
      });
    });
  }

  /**
   *
   */
  async runSpeedTest() {
    networkUI.showLoader();
    // var uiM = this.monitor.uiManager;
    // if(this.config.check_download){
    const downloadSpeed = await this.testDownloadSpeed();
    utility.log(`Final Download Speed: ${downloadSpeed} Mbps`);

    if (downloadSpeed === false) {
      networkUI.hideLoader();
      utility.log('Download speed test failed due to network issue.');
      this.resultData.status = false;
      this.resultData.error.push(ui.translations.status.network_error);
      this.end();
      this.onError(() => {
        this.networkRetry();
      });
      return;
    }

    var s = this.formatSpeed(downloadSpeed);
    ui.downloadSpeed(s.speed, s.unit);
    this.resultData.info['download'] = s;

    var speed = this.min_download / 1000; // kbps to mbps
    if (downloadSpeed < speed) {
      networkUI.hideLoader();
      this.resultData.status = false;
      const messageTemplate = ui.translations.status.networkErrorDetect;
      const speedStr = `${downloadSpeed.toFixed(2)}`;
      const message = utility.replacePlaceholders(messageTemplate, { speed: speedStr });
      this.resultData.error.push(message);
      this.end();
      this.onError(() => {
        this.networkRetry();
      });
      return;
      // this.resultData.error.push(`Download Speed is less then ${this.min_download} Kbps`);
    }
    // }

    // if(this.config.check_upload){
    //                utility.log("Testing Upload Speed...");
    const uploadSpeed = await this.testUploadSpeed();
    //                utility.log(`Upload Speed: ${uploadSpeed.toFixed(2)} Mbps`);

    if (uploadSpeed === false) {
      networkUI.hideLoader();
      utility.log('Upload speed test failed due to network issue.');
      this.resultData.status = false;
      this.resultData.error.push(ui.translations.status.network_error);
      this.end();
      this.onError(() => {
        this.networkRetry();
      });
      return;
    }

    var s = this.formatSpeed(uploadSpeed);
    ui.uploadSpeed(s.speed, s.unit);

    this.resultData.info['upload'] = s;

    // if(this.min_upload !== false){
    var speed = this.min_upload / 1000; // kbps to mbps
    if (uploadSpeed < speed) {
      networkUI.hideLoader();
      this.resultData.status = false;
      const messageTemplate = ui.translations.status.networkErrorDetect;
      const speedStr = `${uploadSpeed.toFixed(2)}`;
      const message = utility.replacePlaceholders(messageTemplate, { speed: speedStr });
      this.resultData.error.push(message);
      this.end();
      this.onError(() => {
        this.networkRetry();
      });
      return;
      // this.resultData.error.push(`Upload Speed is less then ${this.min_upload} Kbps`);
    }
    // }

    if (this.resultData.status) {
      networkUI.hideAndShowIcon();
      this.end(5000);
    } else {
      // var self = this;
      // var retry = uiM.button(self.monitor.language.audio_retry_bttn,async function(){
      //         uiM.networkRetryUI();
      //         uiM.closeDialog();
      //         self.start();
      // });
      // var closeButton = uiM.button(self.monitor.language.close_app, function () {
      //     self.end(0);
      //     self.monitor.complete(false);
      //     window.close();
      // });
      // uiM.dialog(self.monitor.language.network_check_span,
      //     self.monitor.language.no_internet_Issue
      //     ,closeButton);
    }
  }

  /**
   *
   * @param speedMbps
   */
  formatSpeed(speedMbps: number) {
    const speedKbps = speedMbps * 1000;
    const speedGbps = speedMbps / 1000;

    if (speedMbps >= 1) {
      return { speed: speedMbps.toFixed(2), unit: ` Mbps` };
    } else if (speedKbps >= 1) {
      return { speed: speedKbps.toFixed(2), unit: ` Kbps` };
    } else {
      return { speed: speedGbps.toFixed(2), unit: ` Mbps` };
    }
  }

  /**
   *
   */
  networkRetry() {
    networkUI.removeRetry();

    const button = ui.id('thinkX_networkRetry') as HTMLElement;

    if (button) {
      ui.click(button, () => {
        networkUI.removeClass();
        this.resultData.status = true;
        this.resultData.error = [];
        this.start();
      });
    }
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
  cameraRevokeRetry() {}
  /**
   *
   */
  micRevokeRetry() {}
}

export const networkCheck = new NetworkCheck();
