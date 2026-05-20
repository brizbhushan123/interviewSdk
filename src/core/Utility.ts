import { environment } from '../config/environment';
import ui from '../ui/UiManager';
import { configrationManager } from './ConfigrationManager';

/* Author : Prateek Jaiswal */
/**
 *
 */
class Utility {
  hiddenCanvas: HTMLCanvasElement | null = null;
  canvasContext: CanvasRenderingContext2D | null = null;
  blackStream: MediaStream | null = null;
  /**
   *
   */
  constructor() {
    // Automatically override global console.log when the logger is created
  }

  /* Logs messages to the console only in the development environment */
  /**
   *
   * @param {...any} args
   */
  public log(...args: any[]) {
    if (environment.SDK_ENV === 'development') {
      console.log('[' + environment.SDK_NAME + ']', ...args);
    }
  }

  /* Logs informational messages to the console */
  /**
   *
   * @param {...any} args
   */
  public info(...args: any[]) {
    console.info('[' + environment.SDK_NAME + ']', ...args);
  }

  /* Logs informational messages to the console */
  /**
   *
   * @param {...any} args
   */
  public warn(...args: any[]) {
    console.warn('[' + environment.SDK_NAME + ']', ...args);
  }

  /* Logs error messages to the console only in the development environment*/
  /**
   *
   * @param {...any} args
   */
  public error(...args: any[]) {
    if (environment.SDK_ENV === 'development') {
      console.error('[' + environment.SDK_NAME + ']', ...args);
    }
  }

  /**
   *
   * @param base64String
   */
  public decodeBase64(base64String: string): string {
    return atob(base64String);
  }

  /**
   *
   * @param template
   */
  replacePlaceholders(template: string, values: { [key: string]: string }): string {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
      return values[key.trim()] ?? '';
    });
  }

  /**
   *
   * @param template
   * @param base64
   */
  base64ToBlob(base64: string) {
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  }

  convertBase64PngToCompressedBase64Jpg(base64Png:string, quality:number = 0.8):  Promise<string> {
    return new Promise((resolve) => {
      // 1. Decode the base64 string back into an Image object
      const img = new Image();
      img.onload = () => {
        // 2. Create a canvas element to draw and manipulate the image
        if (!this.hiddenCanvas || !this.canvasContext) {
          this.hiddenCanvas = document.querySelector('canvas');
          if (this.hiddenCanvas) {
            this.canvasContext = this.hiddenCanvas.getContext('2d');
          }
        }
        if( !this.hiddenCanvas || !this.canvasContext) {
          resolve(base64Png);
          return;
        }
        const canvas = this.hiddenCanvas
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = this.canvasContext
        
        // PNG supports transparency (alpha channel), which JPEG does not. 
        // Set the background to white to handle the transparency gracefully.
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the PNG image onto the canvas
        ctx.drawImage(img, 0, 0);

        // 3. Convert the canvas content to a base64 JPEG string with compression
        // The 'image/jpeg' format inherently applies lossy compression.
        // The second argument (quality) controls the level of compression (0.0 to 1.0).
        const base64Jpg = canvas.toDataURL('image/jpeg', quality);

        resolve(base64Jpg);
      };

      // Set the source of the Image object to the base64 PNG data
      img.src = base64Png;
  });
  }

  /**
   *
   * @param time
   */
  wait(time: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  async takeSnapshot(
    video: HTMLVideoElement
  ): Promise<{ blob: Blob | null; base64: string | null }> {
    if (!this.hiddenCanvas || !this.canvasContext) {
      this.hiddenCanvas = document.querySelector('canvas');
      if (this.hiddenCanvas) {
        this.canvasContext = this.hiddenCanvas.getContext('2d');
      }
    }
    if (!this.hiddenCanvas || !this.canvasContext) {
      return { blob: null, base64: null };
    }
    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) return { blob: null, base64: null };

    this.hiddenCanvas.width = width;
    this.hiddenCanvas.height = height;

    this.canvasContext.drawImage(video, 0, 0, width, height);

    // Store base64 string
    const base64Image = this.hiddenCanvas.toDataURL('image/jpeg');

    // Convert to blob and return as Promise
    return new Promise((resolve) => {
      this.hiddenCanvas!.toBlob((blob) => {
        resolve({ blob: blob ?? null, base64: base64Image });
      });
    });
  }

  audioConstraints = (deviceId?: any) => {
    return {
      deviceId: deviceId ? { exact: deviceId } : undefined,
      echoCancellation: true,
      noiseSuppression: true,
      suppressLocalAudioPlayback: true,
    };
  };

  extractPrefix(socketUserName: string, suffix: string) {
    // Remove the suffix if it exists at the end
    if (socketUserName.endsWith(suffix)) {
      let prefix = socketUserName.slice(0, -suffix.length);
      // Remove trailing underscore if it exists
      if (prefix.endsWith('_')) {
        prefix = prefix.slice(0, -1);
      }
      return prefix;
    }
    return socketUserName;
  }

  addPrefix(socketUserName: string, suffix: string) {
    if (socketUserName && suffix) {
      return socketUserName + '_' + suffix;
    }
    return socketUserName;
  }
  getCameraNameInUserSocket(username: string): string {
    if (username != '') {
      let parts = username.split('_');
      let cam = parts.slice(-2).join('_'); // last two parts
      this.log(cam); // example: S_CAM, B_CAM, F_CAM
      return cam;
    } else {
      this.log('socket user name not found');
      return '';
    }
  }

  getCameraKeyName(camType: string) {
    if (camType == 'S_CAM') {
      return 'SIDE';
    } else if (camType == 'B_CAM') {
      return 'BACK';
    } else if (camType == 'F_CAM') {
      return 'FRONT';
    } else if (camType == 'C_CAM') {
      return 'CUSTOM';
    } else {
      return '';
    }
  }

  generateNameAvatar(overlay: HTMLElement | null, name: string, prepend: number = 0, size:string = '60', fontSize: string = '20') {
    if(!overlay) return;
    const initials = this.getInitials(name);
    const meetColor = this.getMeetAvatarColor();
    const oldAvatar = overlay.querySelector('.avatar-circle');
    if (oldAvatar) {
      oldAvatar.remove();
    }
    const avatar = document.createElement('div');
    avatar.className = 'avatar-circle';
    avatar.textContent = initials;
    avatar.title = name;
    avatar.style.background = meetColor.bg;
    avatar.style.boxShadow = `0 4px 18px ${meetColor.shadow}55`; // soft shadow
    avatar.style.width = size+'px';
    avatar.style.height = size+'px';
    avatar.style.borderRadius = '50%';
    avatar.style.color = '#fff';
    avatar.style.display = 'flex';
    avatar.style.alignItems = 'center';
    avatar.style.justifyContent = 'center';
    avatar.style.fontSize = fontSize+'px';
    avatar.style.fontWeight = 'bold';
    avatar.style.margin = '0 auto';
    avatar.style.cursor = 'pointer';
    if(prepend) {
      overlay.prepend(avatar);
    }else{
      overlay.append(avatar);
    }
    overlay.classList.remove('d-none');
    overlay.style.opacity = '1';
    overlay.style.transition = 'opacity 0.3s ease';
  }
  getMeetAvatarColor(): { bg: string; shadow: string } {
    const colors = [
      { bg: '#F28B82', shadow: '#D56A63' }, // Red
      { bg: '#F7A75C', shadow: '#D98B45' }, // Orange
      { bg: '#FDD663', shadow: '#D9B24D' }, // Yellow
      { bg: '#81C995', shadow: '#5DA872' }, // Green
      { bg: '#78D3D5', shadow: '#55B3B6' }, // Teal
      { bg: '#8AB4F8', shadow: '#648DE0' }, // Blue
      { bg: '#AECBFA', shadow: '#8CA7E4' }, // Soft Blue
      { bg: '#C58AF9', shadow: '#A46AD9' }, // Purple
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }
   getInitials(fullName: string): string {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    let initials = parts[0][0].toUpperCase(); // first name initial

    if (parts.length > 1) {
      initials += parts[parts.length - 1][0].toUpperCase(); // last name initial
    }
    return initials;
  }
  removeAvatarSvgImage(overlay: HTMLElement | null): void {
    if (!overlay) return;
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.classList.add('d-none');
          const avatar = overlay.querySelector('.avatar-circle');
          if (avatar) avatar.remove();
        }, 100);
  }

  getBlackStream(): MediaStream {
        if (this.blackStream) return this.blackStream;
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 1;
          canvas.height = 1;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          // captureStream may not exist in some environments; fall back to an empty MediaStream
          const stream = (canvas as any).captureStream ? (canvas as any).captureStream(25) as MediaStream : new MediaStream();
          this.blackStream = stream;
          return stream;
        } catch (e) {
          // fallback: empty MediaStream
          this.blackStream = new MediaStream();
          return this.blackStream;
        }
  }


}

const utility = new Utility();

export default utility;
