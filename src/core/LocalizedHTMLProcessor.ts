export type Translations = Record<string, any>;

/* Author : Jitendra Bhardwaj */

/**
 *
 */
export class LocalizedHTMLProcessor {
  /**
   * Downloads a nested language JSON file from the given URL.
   * @param url URL of the JSON file
   */
  async downloadLanguageJson(url: string): Promise<Translations> {
    const res = await fetch(url + '?v=' + new Date());
    if (res && !res.ok) {
      throw new Error(`Failed to fetch JSON: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  }

  /**
   * Fetches an HTML file and replaces {{key}} placeholders using nested translations.
   * Supports dot notation like {{tabs.system_check}}.
   * @param htmlUrl
   * @param translations
   * @param base_URL
   */
  async fetchAndReplaceHTML(
    htmlUrl: string,
    translations: Translations,
    base_URL: string
  ): Promise<string> {
    const res = await fetch(htmlUrl + '?v=' + new Date());
    if (res && !res.ok) {
      throw new Error(`Failed to fetch HTML: ${res.status} ${res.statusText}`);
    }

    let html = await res.text();

    html = html.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, keyPath: string) => {
      if (keyPath === 'enviroment_url') {
        return base_URL;
      }

      const value = this.resolveNestedKey(translations, keyPath);
      return value !== undefined ? value : `{{${keyPath}}}`;
    });

    return html;
  }

  /**
   * Replaces placeholders inside a string using dot-notation keys (e.g., "tabs.system_check").
   * @param obj The translations object
   * @param path Dot-separated key path (e.g., "tabs.system_check")
   */
  private resolveNestedKey(obj: Record<string, any>, path: string): string | undefined {
    const result = path.split('.').reduce<any>((acc: any, key: string) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);

    return typeof result === 'string' ? result : undefined;
  }

  /**
   * Injects processed HTML into the DOM container specified.
   * @param containerSelector
   * @param html
   */
  injectIntoDOM(containerSelector: string, html: string): void {
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) {
      throw new Error(`Container "${containerSelector}" not found`);
    }
    container.innerHTML = html;
  }

  /**
   * Triggers a download of the processed HTML.
   * @param filename
   * @param html
   */
  downloadHTML(filename: string, html: string): void {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
