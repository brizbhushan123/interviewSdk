export type Translations = Record<string, any>;
/**
 *
 */
export declare class LocalizedHTMLProcessor {
    /**
     * Downloads a nested language JSON file from the given URL.
     * @param url URL of the JSON file
     */
    downloadLanguageJson(url: string): Promise<Translations>;
    /**
     * Fetches an HTML file and replaces {{key}} placeholders using nested translations.
     * Supports dot notation like {{tabs.system_check}}.
     * @param htmlUrl
     * @param translations
     * @param base_URL
     */
    fetchAndReplaceHTML(htmlUrl: string, translations: Translations, base_URL: string): Promise<string>;
    /**
     * Replaces placeholders inside a string using dot-notation keys (e.g., "tabs.system_check").
     * @param obj The translations object
     * @param path Dot-separated key path (e.g., "tabs.system_check")
     */
    private resolveNestedKey;
    /**
     * Injects processed HTML into the DOM container specified.
     * @param containerSelector
     * @param html
     */
    injectIntoDOM(containerSelector: string, html: string): void;
    /**
     * Triggers a download of the processed HTML.
     * @param filename
     * @param html
     */
    downloadHTML(filename: string, html: string): void;
}
