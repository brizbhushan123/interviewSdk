export const EVENT = {
  CLOSE_APPLICATION: 'close-application',
  SUSPEND_EXAM: 'suspend-exam',
  SUSPEND_RESUME_EXAM: 'suspend-resume-exam',
  TERMINATE_EXAM: 'terminate-exam',
  PLAY_EXAM: 'play-exam',
  PAUSED_EXAM: 'paused-exam',
  NETWORK_REVOKE: 'network-revoke',
  NETWORK_RESTORE: 'network-restore'
} as const; // 👈 Important: 'as const' makes the string literals literal types

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
class EventManager {
  eventList: { [key: string]: any };
  /**
   *
   */
  constructor() {
    this.eventList = {};
  }

  /**
   *
   * @param eventName
   * @param fn
   */
  register<K extends (typeof EVENT)[keyof typeof EVENT]>(eventName: K, fn: EventCallbacks[K]) {
    // If the event name is not already registered, initialize it with an empty array
    if (!this.eventList.hasOwnProperty(eventName)) {
      this.eventList[eventName] = [];
    }
    // Add the callback function to the list of listeners for the event
    this.eventList[eventName].push(fn);
  }

  /**
   *
   * @param eventName
   * @param params
   */
  trigger<K extends (typeof EVENT)[keyof typeof EVENT]>(
    eventName: K,
    ...params: Parameters<EventCallbacks[K]>
  ) {
    // If no callbacks are registered for the event, exit early
    if (!this.eventList.hasOwnProperty(eventName)) {
      return;
    }
    const listeners = this.eventList[eventName] as EventCallbacks[K][];

    // Call each registered function with the provided parameters
    listeners.forEach((fn) => {
      // Use the spread operator to pass parameters.
      // Type safety is enforced by 'Parameters<SdkEventCallbacks[K]>'.
      (fn as (...args: Parameters<EventCallbacks[K]>) => void)(...params);
    });
  }
}

export const events = new EventManager();
