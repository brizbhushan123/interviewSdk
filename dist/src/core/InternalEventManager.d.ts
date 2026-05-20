export declare const SDK_EVENT: {
    readonly SECOND_STREAM: "second_stream";
    readonly SECOND_STREAM_DISCONNET: "second_stream_disconnect";
    readonly SECOND_STREAM_RETRY: "second_stream_retry";
    readonly RECEIVE_MESSAGE: "receive_message";
    readonly USER_LEFT: "user_left";
    readonly USER_RECONNECT: "user_reconnect";
    readonly UFM_SUSPEND: "ufm_suspend";
    readonly UFM_TERMINATE: "ufm_terminate";
    readonly CHAT_MESSAGE: "chatMessage";
    readonly STREAM_INFO_REQUEST: "stream_info_request";
    readonly STREAM_REQUEST: "stream_request";
    readonly SMART_PROCTOR_MSG: "smart_proctor_message";
    readonly SOCKET_CONNECTED: "socket_connected";
    readonly AUDIO_STREAM: "audio_stream";
    readonly USER_ESCALTED: "user_escalted";
    readonly NETWORK_DISCONNECT: "network_disconnect";
    readonly NETWORK_CONNECT: "network_connect";
    readonly SECONDARY_CAM_UFM: "second_cam_ufm";
    readonly ON_BLUR: "on_blur";
    readonly ON_FOCUS: "on_focus";
};
export interface SdkEventCallbacks {
    [SDK_EVENT.SECOND_STREAM]: (user: string, stream: MediaStream) => void;
    [SDK_EVENT.SECOND_STREAM_DISCONNET]: (user: string) => void;
    [SDK_EVENT.SECOND_STREAM_RETRY]: (user: string) => void;
    [SDK_EVENT.RECEIVE_MESSAGE]: (user: string, message: Record<string, any>) => void;
    [SDK_EVENT.USER_LEFT]: (user: string) => void;
    [SDK_EVENT.USER_RECONNECT]: (user: string) => void;
    [SDK_EVENT.UFM_SUSPEND]: (response: any) => void;
    [SDK_EVENT.UFM_TERMINATE]: (response: any) => void;
    [SDK_EVENT.CHAT_MESSAGE]: (user: string, message: Record<string, any>) => void;
    [SDK_EVENT.STREAM_INFO_REQUEST]: () => void;
    [SDK_EVENT.STREAM_REQUEST]: (camera: string, from: string) => void;
    [SDK_EVENT.SMART_PROCTOR_MSG]: (response: any) => void;
    [SDK_EVENT.SOCKET_CONNECTED]: () => void;
    [SDK_EVENT.AUDIO_STREAM]: (user: string, stream: MediaStream) => void;
    [SDK_EVENT.USER_ESCALTED]: (response: any) => void;
    [SDK_EVENT.NETWORK_DISCONNECT]: () => void;
    [SDK_EVENT.NETWORK_CONNECT]: () => void;
    [SDK_EVENT.SECONDARY_CAM_UFM]: (data: any) => void;
    [SDK_EVENT.ON_BLUR]: () => void;
    [SDK_EVENT.ON_FOCUS]: () => void;
}
/**
 *
 */
declare class InternalEventManager {
    eventList: {
        [K in (typeof SDK_EVENT)[keyof typeof SDK_EVENT]]?: Function[];
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
    on<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName: K, fn: SdkEventCallbacks[K]): void;
    /**
     * Triggers an event, executing all registered callbacks with type-safe parameters.
     * @param eventName The name of the event to trigger.
     * @param params The parameters to pass to the event callbacks, type-checked against SdkEventCallbacks.
     */
    trigger<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName: K, ...params: Parameters<SdkEventCallbacks[K]>): void;
    /**
     * Removes a specific callback function from an event.
     * @param eventName The name of the event.
     * @param fn The specific function to remove, type-checked against SdkEventCallbacks.
     */
    off<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName: K, fn: SdkEventCallbacks[K]): void;
}
export declare const sdkEvents: InternalEventManager;
export {};
