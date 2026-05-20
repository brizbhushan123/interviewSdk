import utility from './Utility';

export const SDK_EVENT = {
  SECOND_STREAM: 'second_stream',
  SECOND_STREAM_DISCONNET: 'second_stream_disconnect',
  SECOND_STREAM_RETRY: 'second_stream_retry',
  RECEIVE_MESSAGE: 'receive_message',
  USER_LEFT: 'user_left',
  USER_RECONNECT: 'user_reconnect',
  UFM_SUSPEND: 'ufm_suspend',
  UFM_TERMINATE: 'ufm_terminate',
  CHAT_MESSAGE: 'chatMessage',
  STREAM_INFO_REQUEST:"stream_info_request",
  STREAM_REQUEST:"stream_request",
  SMART_PROCTOR_MSG:"smart_proctor_message",
  SOCKET_CONNECTED: 'socket_connected',
  AUDIO_STREAM: 'audio_stream',
  USER_ESCALTED: 'user_escalted',
  NETWORK_DISCONNECT:'network_disconnect',
  NETWORK_CONNECT:'network_connect',
  SECONDARY_CAM_UFM:'second_cam_ufm',
  ON_BLUR:'on_blur',
  ON_FOCUS:'on_focus',
} as const; // 👈 Important: 'as const' makes the string literals literal types

// 2. Define an interface that maps event names (from the constant) to their callback signatures
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
  [SDK_EVENT.STREAM_REQUEST]: (camera:string,from:string) => void;
  [SDK_EVENT.SMART_PROCTOR_MSG]:(response:any)=>void;
  [SDK_EVENT.SOCKET_CONNECTED]: () => void;
  [SDK_EVENT.AUDIO_STREAM]: (user: string, stream: MediaStream) => void;
  [SDK_EVENT.USER_ESCALTED]: (response: any) => void;
  [SDK_EVENT.NETWORK_DISCONNECT]: () => void;
  [SDK_EVENT.NETWORK_CONNECT]: () => void;
  [SDK_EVENT.SECONDARY_CAM_UFM]:(data:any)=>void;
  [SDK_EVENT.ON_BLUR]:() => void;
  [SDK_EVENT.ON_FOCUS]:() => void;
}
/**
 *
 */
class InternalEventManager {
  eventList: { [K in (typeof SDK_EVENT)[keyof typeof SDK_EVENT]]?: Function[] } = {};
  /**
   *
   */

  constructor() {
    // this.eventList = {};
  }

  /**
   *
   * @param eventName
   * @param fn
   */
  on<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName: K, fn: SdkEventCallbacks[K]) {
    // If the event name is not already registered, initialize it with an empty array
    if (!this.eventList.hasOwnProperty(eventName)) {
      this.eventList[eventName] = [];
    }
    // Add the callback function to the list of listeners for the event
    (this.eventList[eventName] as Function[]).push(fn);
  }

  /**
   * Triggers an event, executing all registered callbacks with type-safe parameters.
   * @param eventName The name of the event to trigger.
   * @param params The parameters to pass to the event callbacks, type-checked against SdkEventCallbacks.
   */
  trigger<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(
    eventName: K,
    ...params: Parameters<SdkEventCallbacks[K]> // Type-safe parameters
  ) {
    // Check if the event exists in the event list
    if (!this.eventList.hasOwnProperty(eventName)) {
      utility.warn(`Attempted to trigger unknown event: ${eventName}`);
      return;
    }

    // Retrieve the listeners. Cast to the specific array type for type safety during iteration.
    const listeners = this.eventList[eventName] as SdkEventCallbacks[K][];

    // Call each registered function with the provided parameters
    listeners.forEach((fn) => {
      // Use the spread operator to pass parameters.
      // Type safety is enforced by 'Parameters<SdkEventCallbacks[K]>'.
      (fn as (...args: Parameters<SdkEventCallbacks[K]>) => void)(...params);
    });
  }

  /**
   * Removes a specific callback function from an event.
   * @param eventName The name of the event.
   * @param fn The specific function to remove, type-checked against SdkEventCallbacks.
   */
  off<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(
    eventName: K,
    fn: SdkEventCallbacks[K]
  ) {
    // Check if the event exists in the event list
    if (!this.eventList.hasOwnProperty(eventName)) {
      return; // Event doesn't exist, nothing to remove
    }

    // Get the array of listeners for this event. Cast for type safety.
    const listeners = this.eventList[eventName] as SdkEventCallbacks[K][];

    // Find the index of the function to remove
    // Type assertion 'as any' might be needed if strict equality for functions
    // (which `indexOf` uses) is causing type mismatches between a specific function
    // type and the general `Function` type in `eventList`.
    const index = listeners.indexOf(fn);

    // If the function was found, remove it
    if (index !== -1) {
      listeners.splice(index, 1);
      utility.log(`Removed listener for event '${eventName}'.`);
    } else {
      utility.log(`Listener not found for event '${eventName}'.`);
    }

    // If no more listeners for this event, remove the event property to clean up
    if (listeners.length === 0) {
      delete this.eventList[eventName];
      utility.log(`No more listeners for '${eventName}', event property removed.`);
    }
  }
}

export const sdkEvents = new InternalEventManager();
