// Import styles (if you're using bundler that supports CSS)
import './ui/Init.css';
import { EVENT, EventCallbacks, events } from './core/EventManager';
import { stepManager } from './core/StepsManager';

import {
  authenticator,
  ValidatorResponse,
  ThinkProctorOptions,
  SessionInfo,
} from './core/AuthenticatorManager';
import { ErrorDefinition, errorManager } from './core/ErrorManager';
import { ai } from './core/AIManager';
import { LiveStreamManager, liveStreamManager } from './core/LiveStreamManager';
import { peer } from './core/PeerConnectionManager';
import { configrationManager } from './core/ConfigrationManager';
import utility from './core/Utility';
import { lobby } from './features/Lobby';
import { ExamMonitor, examMonitor } from './features/ExamMonitor';
import { regularSnap } from './core/RegularSnap';
import { socket } from './core/SocketManager';
import { SDK_EVENT, sdkEvents } from './core/InternalEventManager';
import { chat } from './core/ChatManager';

const ThinkProctor = {
  async init(options: ThinkProctorOptions): Promise<SessionInfo> {
    configrationManager.liveStreamManager = liveStreamManager;
    // utility.log('ThinkProc initialized with', options);
    const validatePromise = new Promise<SessionInfo>(async (resolve, revoke) => {
      authenticator.validate(
        options,
        async (response: ValidatorResponse) => {
          if (configrationManager.initComplete === 1) {
            const error = errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_INIT');
            revoke(error);
            return;
          }
          const sessionInfo = response.sessionInfo;
          configrationManager.initComplete = 1;
          resolve(sessionInfo);
        },
        (error: ErrorDefinition) => {
          revoke(error);
        }
      );
    });
    return validatePromise;
  },

  on<K extends (typeof EVENT)[keyof typeof EVENT]>(event: K, fn: EventCallbacks[K]) {
    events.register(event, fn);
  },

  async checkCompatibility(): Promise<any> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        if (configrationManager.initComplete !== 1) {
          const error = errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT');
          reject(error);
          return;
        }

        if (configrationManager.compatibilityComplete === 1) {
          const error = errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_COMPATIBILITY');
          reject(error);
          return;
        }

        if (configrationManager.compatibilityStarted === 1) {
          const error = errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_COMPATIBILITY');
          reject(error);
          return;
        }

        stepManager.init();
        ai.loaddata();

        liveStreamManager.setCameraRevokeRetryCallback(function () {
          stepManager.getCurrentStepObject().cameraRevokeRetry();
        });

        liveStreamManager.setMicRevokeRetryCallback(function () {
          stepManager.getCurrentStepObject().micRevokeRetry();
        });

        liveStreamManager.setCameraRevokeCallback(function () {
          stepManager.getCurrentStepObject().cameraRevoke();
        });

        liveStreamManager.setMicRevokeCallback(function () {
          stepManager.getCurrentStepObject().micRevoke();
        });

        liveStreamManager.setScreenRevokeCallback(function () { 
          stepManager.getCurrentStepObject()?.screenRevoke();
        });

        liveStreamManager.setScreenRevokeRetryCallback(function () {
          stepManager.getCurrentStepObject()?.screenRevokeRetry();
        });

        configrationManager.compatibilityStarted = 1;

        configrationManager.compatibilityCompleteCallback = resolve;
      } catch (err) {
        reject('Some error occured');
        utility.error(err);
      }
    });
  },

  async launch(): Promise<any> {
    try {
      if (configrationManager.initComplete !== 1) {
        errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT');
      }

      if (configrationManager.compatibilityComplete !== 1) {
        errorManager.throwError('ERROR', 'NOT_INITIALIZE_COMPATIBILITY');
      }

      if (configrationManager.launchComplete === 1) {
        errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_LAUNCH');
      }

      configrationManager.launchComplete = 1;
      regularSnap.stopRegularSnapForCamera(LiveStreamManager.CAMERA.PRIMARY.name);

      if (LiveStreamManager.CAMERA.SIDE.external) {
        let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'S_CAM');
        let message = { mode: 'end_lobby', text: 'lobby end' };
        socket.sendMessage(socketUserName, message);
      }
      if (LiveStreamManager.CAMERA.BACK.external) {
        let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'B_CAM');
        let message = { mode: 'end_lobby', text: 'lobby end' };
        socket.sendMessage(socketUserName, message);
      }
      if (LiveStreamManager.CAMERA.FRONT.external) {
        let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'F_CAM');
        let message = { mode: 'end_lobby', text: 'lobby end' };
        socket.sendMessage(socketUserName, message);
      }
      if (LiveStreamManager.CAMERA.CUSTOM.external) {
        let socketUserName = utility.addPrefix(configrationManager.socketUserName, 'C_CAM');
        let message = { mode: 'end_lobby', text: 'lobby end' };
        socket.sendMessage(socketUserName, message);
      }
      lobby.end(0);
    } catch (error) {
      utility.error(error);
    }
  },

  complete(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (configrationManager.initComplete !== 1) {
          return reject(errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT'));
        }

        if (configrationManager.compatibilityComplete !== 1) {
          return reject(errorManager.throwError('ERROR', 'NOT_INITIALIZE_COMPATIBILITY'));
        }

        if (configrationManager.launchComplete !== 1) {
          return reject(errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_LAUNCH'));
        }

        if (configrationManager.isPaused === true) {
          return resolve(false as unknown as void); // or just resolve() if you don't care
        }

        let obj = stepManager.getCurrentStepObject();
        if (obj instanceof ExamMonitor) {
          obj.completeExam();
        }
        configrationManager.completeExam = resolve;
      } catch (err) {
        reject(err);
      }
    });
  },

  pause() {
    if (configrationManager.initComplete !== 1) {
      errorManager.throwError('ERROR', 'NOT_INITIALIZE_INIT');
    }

    if (configrationManager.compatibilityComplete !== 1) {
      errorManager.throwError('ERROR', 'NOT_INITIALIZE_COMPATIBILITY');
    }

    if (configrationManager.launchComplete !== 1) {
      errorManager.throwError('ERROR', 'ALREADY_INITIALIZE_LAUNCH');
    }

    if (configrationManager.isPaused === true) {
      return false;
    }

    configrationManager.isPaused = true;
    utility.wait(500).then(() => {
      events.trigger(EVENT.PAUSED_EXAM);
    });
    let obj = stepManager.getCurrentStepObject();
    if (obj instanceof ExamMonitor) {
      obj.pausedExam();
    }
  },

  play() {
    if (configrationManager.isPaused === false) {
      errorManager.throwError('ERROR', 'ALREADY_PLAY');
    }
    configrationManager.isPaused = false;
    utility.wait(500).then(() => {
      events.trigger(EVENT.PLAY_EXAM);
    });
    let obj = stepManager.getCurrentStepObject();
    if (obj instanceof ExamMonitor) {
      obj.playExam();
    }
  },

  async secondaryConnect(
    session_token: string,
    camera: string,
    step: string,
    current_env_alias: string,
    link_data:string
  ): Promise<any> {
    configrationManager.liveStreamManager = liveStreamManager;
    return authenticator.secondaryCameraConnect(session_token, camera, step, current_env_alias,link_data);
  },

  config() {
    utility.log('Config:', configrationManager);
  },

  joinRoom(roomId: string) {
    socket.joinOtherRoom(roomId);
    sdkEvents.on(SDK_EVENT.CHAT_MESSAGE, (user: string, message: Record<string, any>) => {
      utility.log(`Chat message from ${user}:`, message);
    });
  },
  leaveRoom() {
    socket.leaveRoom();
  },
  sendRoomMessage(message: any) {
    socket.sendRoomMessage(message);
  },
};

export default ThinkProctor;
