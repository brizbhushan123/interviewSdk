/**
 * Utility class for safely rendering HTML strings to prevent XSS attacks.
 */
export declare class SafeHtmlRenderer {
    /**
     * Cleans an HTML string using DOMPurify and sets it directly to the element.
     *
     * @param element The container element to inject the HTML into.
     * @param html The raw HTML string.
     */
    static render(element: HTMLElement | null, html: string): void;
    /**
     * Sanitizes and returns an HTML string.
     *
     * @param html The raw HTML string.
     * @returns The sanitized HTML string.
     */
    static sanitize(html: string): string;
}
