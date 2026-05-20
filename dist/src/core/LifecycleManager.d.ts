/**
 * Utility to safely add and track DOM event listeners to prevent memory leaks.
 */
export declare class LifecycleManager {
    private listeners;
    /**
     * Add a tracked event listener to a target.
     * @param target
     * @param type
     * @param listener
     * @param options
     */
    addListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    /**
     * Remove a specific tracked event listener.
     * @param target
     * @param type
     * @param listener
     * @param options
     */
    removeListener(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    /**
     * Detach all tracked event listeners from a specific target.
     * @param target
     */
    destroyTarget(target: EventTarget): void;
    /**
     * Detach all tracked event listeners globally (for this module's instance).
     */
    destroyAll(): void;
}
export declare const lifecycleManager: LifecycleManager;
