export declare const EVENT: {
    readonly CLOSE_APPLICATION: "close-application";
    readonly SUSPEND_EXAM: "suspend-exam";
    readonly SUSPEND_RESUME_EXAM: "suspend-resume-exam";
    readonly TERMINATE_EXAM: "terminate-exam";
    readonly PLAY_EXAM: "play-exam";
    readonly PAUSED_EXAM: "paused-exam";
    readonly NETWORK_REVOKE: "network-revoke";
    readonly NETWORK_RESTORE: "network-restore";
};
export interface EventCallbacks {
    [EVENT.CLOSE_APPLICATION]: () => void;
    [EVENT.SUSPEND_EXAM]: (suspendTime: number) => void;
    [EVENT.SUSPEND_RESUME_EXAM]: () => void;
    [EVENT.TERMINATE_EXAM]: () => void;
    [EVENT.PLAY_EXAM]: () => void;
    [EVENT.PAUSED_EXAM]: () => void;
    [EVENT.NETWORK_REVOKE]: () => void;
    [EVENT.NETWORK_RESTORE]: () => void;
}
/**
 *
 */
declare class EventManager {
    eventList: {
        [key: string]: any;
    };
    /**
     *
     */
    constructor();
    /**
     *
     * @param eventName
     * @param fn
     */
    register<K extends (typeof EVENT)[keyof typeof EVENT]>(eventName: K, fn: EventCallbacks[K]): void;
    /**
     *
     * @param eventName
     * @param params
     */
    trigger<K extends (typeof EVENT)[keyof typeof EVENT]>(eventName: K, ...params: Parameters<EventCallbacks[K]>): void;
}
export declare const events: EventManager;
export {};
