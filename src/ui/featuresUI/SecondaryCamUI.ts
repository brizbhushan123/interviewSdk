import { stepUIManager } from '../../core/StepUIManager';
import { UiComponents } from '../UiComponents';
import ui from '../UiManager';

class SecondaryCamUI {
  /**
   *
   * @param stream
   */
  setStream(stream: MediaStream): HTMLVideoElement | undefined {
    const videoDivDom = ui.id('thinkX_photo-card-video');
    if (!videoDivDom) return;

    videoDivDom.innerHTML = ''; // Clear previous content

    const video = ui.createVideoElement();
    video.srcObject = stream;
    video.style.display = 'block';

    videoDivDom.appendChild(video);

    return video;
  }
}

export const secondaryCamUI = new SecondaryCamUI();
