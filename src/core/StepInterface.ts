import { SDK_EVENT, SdkEventCallbacks, sdkEvents } from './InternalEventManager';
import { StepManager } from './StepsManager';
import utility from './Utility';

export interface StepResult {
  info: any;
  error: string[];
  status: boolean;
}
/**
 *
 */
export abstract class StepInterface {
  resultData: StepResult;
  completeCallback: Function;
  errorCallback: Function;
  abstract envAlias: string;
  static stepManager: StepManager;
  eventList = new Map<keyof SdkEventCallbacks, SdkEventCallbacks[keyof SdkEventCallbacks]>();

  /**
   *
   */

  /**
   *
   */
  constructor() {
    this.resultData = { status: true, info: {}, error: [] };
    this.completeCallback = () => {};
    this.errorCallback = () => {};
    // this.eventList = {};
  }

  abstract start(): void;
  abstract result(): StepResult;
  /**
   *
   * @param delay
   * @param allowNext
   */
  end(delay: number = 2000, allowNext: boolean = false, log: boolean = true) {
    this.completeCallback(delay, allowNext, log);
  }
  /**
   *
   * @param fn
   */

  /**
   *
   * @param fn
   */
  onComplete(fn: Function) {
    this.completeCallback = fn;
  }

  /**
   *
   * @param fn
   */
  onError(fn: Function) {
    this.errorCallback = fn;
  }

  /**
   *
   * @param fn
   */
  error() {
    this.errorCallback();
    this.errorCallback = () => {};
  }

  /**
   *
   */
  cameraRevokeRetry(): void {}
  /**
   *
   */
  micRevokeRetry() {}
  /**
   *
   */
  cameraRevoke() {}
  /**
   *
   */
  micRevoke() {}
  /**
   *
   */
  secondaryCameraRevoke() {}
  /**
   *
   */
  seccondaryCameraRevokeRetry() {}
  /**
   *
   */
  screenRevoke() {}
  /**
   *
   */
  screenRevokeRetry() {}
  /**
   *
   */
  closeApplication() {}

  /**
   *
   * @param manager
   */
  setManager(manager: StepManager) {
    StepInterface.stepManager = manager;
  }

  /**
   *
   */
  manager(): StepManager {
    return StepInterface.stepManager;
  }

  subscribe<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(
    eventName: K,
    fn: SdkEventCallbacks[K]
  ) {
    if (this.eventList.has(eventName)) {
      let oldfn = this.eventList.get(eventName);
      if (oldfn) {
        sdkEvents.off(eventName, oldfn as SdkEventCallbacks[K]);
      }
    }

    this.eventList.set(eventName, fn);

    sdkEvents.on(eventName, fn);
  }

  unSubscribe<K extends (typeof SDK_EVENT)[keyof typeof SDK_EVENT]>(eventName?: K) {
    if (eventName) {
      // Case 1: Unsubscribe from a specific event
      // Get the callbacks. This might be undefined.
      const callbacksToUnsubscribe = this.eventList.get(eventName);

      // Type Narrowing: Check if callbacksToUnsubscribe is defined
      if (callbacksToUnsubscribe) {
        // callbacksToUnsubscribe is a single function, not an array
        sdkEvents.off(eventName, callbacksToUnsubscribe as SdkEventCallbacks[K]);
        // Remove the event from this class's local list
        this.eventList.delete(eventName);
        utility.log(`Unsubscribed handler for '${eventName}' from this class.`);
      } else {
        utility.log(`No handlers found for '${eventName}' to unsubscribe from this class.`);
      }
    } else {
      // Case 2: Unsubscribe from all events this class has subscribed to
      utility.log('Unsubscribing all handlers from this class for all events.');
      this.eventList.forEach((callback, key) => {
        // 'callbacks' here is Array<SdkEventCallbacks[keyof SdkEventCallbacks]>
        // Cast 'callback' to the type expected by sdkEvents.off for 'key'.
        // The 'key' inside forEach is correctly inferred by TypeScript.
        sdkEvents.off(key, callback as SdkEventCallbacks[typeof key]);
      });
      // Clear all entries from this class's local list
      this.eventList.clear();
    }
  }
}
