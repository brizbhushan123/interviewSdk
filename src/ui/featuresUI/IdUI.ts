import { configrationManager } from '../../core/ConfigrationManager';
import { stepUIManager } from '../../core/StepUIManager';
import ui from '../UiManager';

/**
 *
 */
class IdUi {
  /**
   *
   * @param stream
   */
  setStream(stream: MediaStream): HTMLVideoElement | undefined {
    const videoDivDom = ui.id('thinkX_id-card-video');
    if (!videoDivDom) return;

    videoDivDom.innerHTML = ''; // Clear previous content

    // Create wrapper div
    // const wrapper = document.createElement('div');
    // wrapper.style.position = 'relative';
    // wrapper.style.display = 'inline-block';

    // Create video element
    const video = ui.createVideoElement();
    video.srcObject = stream;
    video.style.display = 'block';
    video.id = 'thinkX_id-video';

    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.id = 'faceBoxCanvasID';
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.zIndex = '10';
    canvas.style.pointerEvents = 'none';
    canvas.style.width = 'calc(100% - 20px)';
    canvas.style.height = 'calc(100% - 20px)';
    canvas.style.transform = 'translate(-50%, -50%)';

    // Resize canvas when video metadata is loaded
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });

    // Append both to wrapper
    // wrapper.appendChild(video);
    // wrapper.appendChild(canvas);

    // Append wrapper to DOM
    videoDivDom.appendChild(video);
    videoDivDom.appendChild(canvas);

    return video;
  }

  /**
   *
   * @param message
   */
  setMessage(message: string) {
    const resultDiv = ui.id('id-card-message');
    if (resultDiv) {
      ui.innerText(resultDiv, `${message}`);
    }
  }

  /**
   *
   */
  showButton() {
    ui.show(ui.id('thinkX_id-card-retry'));
    ui.show(ui.id('thinkX_id-card-next'));
    ui.hide(ui.id('thinkX_id-card-capture-id'));
  }

  /**
   *
   */
  hideButon(attempNumber: number) {
    ui.hide(ui.id('thinkX_id-card-retry'));
    ui.hide(ui.id('thinkX_id-card-next'));
    ui.show(ui.id('thinkX_id-card-capture-id'));
    if (
      configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture.value == 1
    ) {
      const phtoAteemptCount =
        configrationManager.valueMap.candidate_authentication.data.ai_revoke_face_capture_attempt
          .value;
      ui.show(ui.id('thinkX_idAttempt'));
      stepUIManager.insertText('thinkX_attempNumberID', attempNumber.toString());
      stepUIManager.insertText('thinkX_id_attemp_count', '/' + phtoAteemptCount.toString());
    }
  }
}

export const idUi = new IdUi();
