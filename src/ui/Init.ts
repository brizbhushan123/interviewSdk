import utility from '../core/Utility';
import ui from '../ui/UiManager';

/**
 *
 */
export class Init {
  private popupElement: HTMLElement | null = null;

  /**
   *
   * @param lang
   */
  async loadPage(lang: string = 'en', secondary: boolean = false) {
    try {
      await ui.Init(lang, secondary);

      // Option 2: Download localized file
      // processor.downloadHTML('localized.html', html);
    } catch (err) {
      utility.error('Error:', err);
    }
  }
}
