import io, { Socket } from 'socket.io-client';
import { configrationManager } from './ConfigrationManager';
import utility from './Utility';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import { environment } from '../config/environment';
import { idVerify } from '../features/IdVerify';
import { liveStreamManager } from './LiveStreamManager';
import { chat } from './ChatManager';
import request from './RequestManager';
import ui from '../ui/UiManager';
import { SocketWorkterMessage } from './SocketWorker';
import { EVENT, events } from './EventManager';


export interface SocketMessage<T = unknown> {
  userType: string;
  from: string;
  to: string;
  env: string;
  api: string;
  data: T;
}

export interface ChatMessage {
  mode: string;
  text: string;
  data?: any;
}
/**
 *
 */
export class SocketManager {
  static socketUrl: string;
  private socket: null | typeof Socket;

  private roomId: string = '';
  private roomJoined: boolean = false;
  networkTimeout: NodeJS.Timeout | undefined;
  updateDashboardInterval: NodeJS.Timeout | undefined;
  networkDisconnectTimeout: NodeJS.Timeout | undefined;
  networkPopupShown: boolean = false;
  socketeventList: { [K: string]: Function[] } = {};

  workerPath = environment.UI_BASE_URL + 'socketWorker.js';
  socketWorker: Worker | null = null;
  heartbeatInterval: NodeJS.Timeout | undefined;


  /**
   *
   */
  constructor() {
    this.socket = null;

    fetch(this.workerPath)
      .then(response => response.text())
      .then(workerCode => {
        // Create a Blob from the code and get an object URL
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);

        // Construct the worker using the local object URL
        this.socketWorker = new Worker(workerUrl);
        // ... proceed with postMessage
      })
      .catch(error => utility.error("Could not load worker script:", error));
  }
  /**
   *
   * @param socketUrl
   * @param authToken
   */
  Init(socketUrl: string, authToken: string) {
    SocketManager.socketUrl = socketUrl;
    // this.socket = io(socketUrl, {
    //   auth: {
    //     token: authToken, // <--- Pass the token here
    //   },
    // });

    if (this.socketWorker) {
      this.socketWorker.postMessage({ mode: 'CONNECT', data: { socketUrl: socketUrl, authToken: authToken } });
      this.socketWorker.onmessage = (event: MessageEvent<any>) => {
        const message = event.data as SocketWorkterMessage;
        if (message.type == "DATA") {
          const on = message.on;
          const payload = message.payload;
          if (this.socketeventList.hasOwnProperty(on)) {
            (this.socketeventList[on] as Function[]).forEach((fn) => fn(payload));
          }
        }
      };
    }
    this.setupSocketListeners();
  }

  /**
   *
   * @param eventName
   * @param fn
   */
  on(eventName: string, fn: Function) {
    //this.socket?.on(eventName, fn);
    this.socketWorker?.postMessage({ mode: 'ON', text: eventName });
    if (!this.socketeventList.hasOwnProperty(eventName)) {
      this.socketeventList[eventName] = [];
    }
    (this.socketeventList[eventName] as Function[]).push(fn);
  }

  /**
   *
   * @param eventName
   * @param fn
   */
  off(eventName: string) {
    // this.socket?.off(eventName);
    this.socketWorker?.postMessage({ mode: 'OFF', text: eventName });
  }

  /**
   *
   * @param eventName
   * @param params
   * @param to
   */
  emit(eventName: string, params: any = {}, to: string = '', ack?: Function) {
    // if (this.socket) this.socket.emit(eventName, this.getMessage(params, to), ack);
    this.socketWorker?.postMessage({ mode: 'EMIT', text: eventName, data: this.getMessage(params, to) });
  }

  /**
   *
   * @param msg
   * @param to
   */
  getMessage(msg: any = {}, to: string = ''): SocketMessage {
    return {
      userType: configrationManager.candidateNameMsg,
      from: configrationManager.socketUserName,
      to: to,
      env: configrationManager.appEnv,
      api: environment.API_URL,
      data: msg,
    };
  }

  /**
   *
   */
  setupSocketListeners() {
    // Basic Connection Events
    this.on('connect', () => {
      utility.log('Connected to server! Socket ID:', this.socket ? this.socket.id : null);
      this.networkReconnect();
      // On initial connect, or any connect, try to go online
      if (configrationManager.socketUserName) {
        // Only try to go online if we have a userId set
        this.userOnline();
        utility.log(`Emitting user_online for ${configrationManager.socketUserName}...`, 'system');
      }
    });

    this.on('disconnect', (reason: any) => {
      utility.log('Disconnected from server. Reason:', reason);

      if (configrationManager.isSubmited != 'Interview_Session') {
        clearTimeout(this.networkDisconnectTimeout);
        this.networkDisconnectTimeout = setTimeout(() => {
          this.networkPopup();
        }, 10000);
      }
    });

    // Reconnection Events (Crucial for maintaining online status across server restarts/network drops)
    this.on('reconnect', (attemptNumber: any) => {
      utility.log(`Reconnected to server after ${attemptNumber} attempts.`);
      // Re-emit user_online to re-establish status and userId on the server socket
      if (configrationManager.socketUserName) {
        this.userOnline();

        this.networkReconnect();
        utility.log(
          `Re-establishing online status for ${configrationManager.socketUserName}...`,
          'system'
        );
      }
    });

    this.on('reconnect_attempt', (attemptNumber: any) => {
      utility.log(`Reconnection attempt #${attemptNumber}`);
      utility.log(`Reconnection attempt #${attemptNumber}...`, 'system');
    });

    this.on('reconnect_error', (error: any) => {
      utility.error('Reconnection error:', error);
      utility.log(`Reconnection error: ${error.message}`, 'error');
    });

    this.on('reconnect_failed', () => {
      utility.error('Reconnection failed permanently.');
    });

    // --- SERVER-TO-CLIENT SPECIFIC EVENT HANDLERS ---

    this.on(
      'user_status_change',
      (payload: SocketMessage<{ status: 'online' | 'offline' | 'reconnect' }>) => {
        utility.log('User status change:', payload);
        if (payload.data.status == 'offline') {
          sdkEvents.trigger(SDK_EVENT.USER_LEFT, payload.from);
        }

        if (payload.data.status == 'reconnect') {
          sdkEvents.trigger(SDK_EVENT.USER_RECONNECT, payload.from);
        }
      }
    );

    this.on('online_users_status', (payload: SocketMessage<{ [userId: string]: boolean }>) => {
      utility.log('Online users status received:', payload);
      this.onlineUserCallback(payload.data);
    });

    this.on(
      'receive_message',
      (payload: SocketMessage<{ senderId: string; message: string; timestamp: number }>) => {
        utility.log(`[${payload.data.senderId}]: ${payload.data.message}`, 'received');
        sdkEvents.trigger(
          SDK_EVENT.RECEIVE_MESSAGE,
          payload.data.senderId,
          JSON.parse(payload.data.message)
        );
        this.emit('message_read', { senderId: payload.data.senderId });
      }
    );

    this.on('message_delivered', (payload: SocketMessage<{ receiverId: string }>) => {
      utility.log('Message delivered to:', payload.data.receiverId);
    });

    this.on('message_read', (payload: SocketMessage<{ readerId: string }>) => {
      utility.log('Message read by:', payload.data.readerId);
      utility.log(`Message read by ${payload.data.readerId}.`, 'system');
    });

    this.on('error', (payload: SocketMessage<{ message: string; code?: number }>) => {
      utility.error('Socket error:', payload);
      utility.log(
        `Error: ${payload.data.message} ${payload.data.code ? `(Code: ${payload.data.code})` : ''}`,
        'error'
      );
    });

    this.on('chatMessage', (payload: SocketMessage<{ roomId: string; message: string }>) => {
      utility.log(`[${payload.data.roomId}]: ${payload.data.message}`, 'received');
      const parsedMessage: Record<string, any> = JSON.parse(payload.data.message);
      if (
        this.internalMessages(
          parsedMessage.mode,
          parsedMessage.text,
          parsedMessage,
          payload.data.roomId,
          payload.from
        )
      ) {
        sdkEvents.trigger(SDK_EVENT.CHAT_MESSAGE, payload.from, parsedMessage);
      }
    });

    // Heartbeat for keeping connection/status alive
    // This helps prevent idle connections from being dropped by some proxies/firewalls.
    this.heartbeatInterval = setInterval(() => {
      this.heartbeat();
    }, 30000); // Every 30 seconds (adjust as needed)

  }

  /**
   *
   */
  userOnline() {
    utility.log('USER ONLINE');
    this.emit('user_online');
    sdkEvents.trigger(SDK_EVENT.SOCKET_CONNECTED);
  }

  /**
   *
   */
  heartbeat() {
    this.emit('heartbeat');
  }

  /**
   *
   */
  onlineUserCallback(userIds: { [userId: string]: boolean }) { }

  /**
   *
   * @param userIds
   */
  async onlineUsers(userIds: string[]): Promise<{ [userId: string]: boolean }> {
    this.emit('get_online_users_status', { userIds: userIds });
    return new Promise((resolve) => {
      this.onlineUserCallback = resolve;
    });
  }

  sendMessage(to: string, message: ChatMessage) {
    let messageText = JSON.stringify(message);
    this.emit('send_message', {
      receiverId: to,
      message: messageText,
    });
  }

  goingOffline() {
    utility.log('Going offline...');
    this.emit('leavingSocket');
  }

  // Room Chat Methods
  createRoom() {
    if (this.roomJoined) {
      utility.log(`Already in room: ${this.roomId}`);
      return;
    }
    this.roomId = configrationManager.socketRoomName;
    utility.log(`Creating room: ${this.roomId}`);
    this.emit('createRoom', { roomId: this.roomId });
    this.roomJoined = true;
  }

  joinRoom() {
    utility.log(`Joining room: ${this.roomId}`);
    this.emit('joinRoom', { roomId: this.roomId });
  }
  joinOtherRoom(roomId: string) {
    utility.log(`Joining room: ${roomId}`);
    this.emit('joinRoom', { roomId: roomId });
  }

  leaveRoom() {
    utility.log(`Leaving room: ${this.roomId}`);
    this.emit('leaveRoom', { roomId: this.roomId });
    this.roomJoined = false;
    this.roomId = '';
  }

  leaveOtherRoom(roomId: string) {
    utility.log(`Leaving room: ${this.roomId}`);
    this.emit('leaveRoom', { roomId: roomId });
  }

  sendRoomMessage(message: ChatMessage) {
    let messageText = JSON.stringify(message);
    utility.log(`Sending message to room ${this.roomId}: ${messageText}`);
    this.emit('chatMessage', {
      roomId: this.roomId,
      message: messageText,
    });
  }

  leavingSocket() {
    utility.log(`Sending message to room ${this.roomId}`);
    this.emit('leavingSocket');
  }

  sendOtherRoomMessage(roomId: string, message: ChatMessage) {
    let messageText = JSON.stringify(message);
    utility.log(`Sending message to room ${roomId}: ${messageText}`);
    this.emit('chatMessage', {
      roomId: roomId,
      message: messageText,
    });
  }

  sendProctorMsg(message: ChatMessage) {
    if (configrationManager.currentProctor != '')
      this.sendOtherRoomMessage(configrationManager.currentProctor, message);
  }
  setProctor(proctorId: string) {
    if (configrationManager.currentProctor == proctorId) {
      return;
    }
    if (
      configrationManager.currentProctor != '' &&
      configrationManager.currentProctor != proctorId
    ) {
      this.leavingProctor();
      this.updateProctorDashboard();
      this.leaveOtherRoom(configrationManager.currentProctor);
    }
    configrationManager.currentProctor = proctorId; // set new proctor id
    if (proctorId == '') {
      return;
    }
    this.joinOtherRoom(configrationManager.currentProctor);
    clearInterval(this.updateDashboardInterval);
    this.updateDashboardInterval = setInterval(() => {
      this.updateProctorDashboard();
    }, 5000);
  }

  leavingProctor() {
    let msg = { mode: 'leavingCandidate', text: 'leaving candidate' };
    this.sendProctorMsg(msg);
  }

  updateProctorDashboard() {
    let msg = { mode: 'updateDashboard', text: 'Get Dashboard' };
    this.sendProctorMsg(msg);
  }

  leaveProctor() {
    if (configrationManager.currentProctor != '')
      this.leaveOtherRoom(configrationManager.currentProctor);

    configrationManager.currentProctor = '';
  }

  internalMessages(
    mode: string,
    text: string,
    message: Record<string, any>,
    roomId: string,
    from: string
  ): boolean {
    switch (mode) {
      case 'candidate_info_request':
        sdkEvents.trigger(SDK_EVENT.STREAM_INFO_REQUEST);
        break;
      case 'stream_request':
        sdkEvents.trigger(SDK_EVENT.STREAM_REQUEST, text, from);
        break;
      case 'dashboardUpdated':
        clearInterval(this.updateDashboardInterval);
        break;
      default:
        return true;
    }
    return false;
  }

  cameraRevoke(cameraName: string) {
    let msg = { mode: 'camera_revoke', text: cameraName };
    socket.sendRoomMessage(msg);

    if (
      (cameraName == 'RS_CAM' &&
        (configrationManager.currentStepAlias == 'Room_Sanitization_360' ||
          configrationManager.currentStepAlias == 'Desk_Check')) ||
      (cameraName == 'P_CAM' && configrationManager.currentStepAlias == 'Body_Scan_Check')
    ) {
      request
        .clearEscalation()
        .then((response) => {
          this.leaveProctor();
          configrationManager.currentProctor = "";
        })
        .catch((error) => {
          utility.log('error', error);
        });
    }
  }

  networkPopup() {
    ui.show(ui.id("thinkX_network_popup"));

    // Reset state in case it was shown before
    const reconnecting = ui.id("thinkX_network_reconnecting");
    const closeBtn = ui.id("thinkX_network_close");

    if (reconnecting) reconnecting.classList.remove("d-none");
    if (closeBtn) closeBtn.classList.add("d-none");

    // Start 5-second timer
    clearTimeout(this.networkTimeout);
    this.networkTimeout = setTimeout(() => {
      events.trigger(EVENT.NETWORK_REVOKE);
      ui.hide(ui.id("thinkX_main_network_loader"));
      if (reconnecting) reconnecting.classList.add("d-none");
      if (closeBtn) closeBtn.classList.remove("d-none");
      this.networkPopupShown = true;
      this.closeBtnNetwork();
      if (configrationManager.userType == '3') {
        let msg = { mode: 'interviewer_leave', text: "interviewer leaving" };
        socket.sendRoomMessage(msg);
      } else {
        let msg = { mode: 'candidate_leave', text: "candidate leaving", data: configrationManager.currentStepAlias };
        socket.sendRoomMessage(msg);
      }
      this.closeSocket();
      sdkEvents.trigger(SDK_EVENT.NETWORK_DISCONNECT);
    }, 5000);
  }

  closeBtnNetwork() {
    const button = ui.id('thinkX_network_close') as HTMLButtonElement;

    if (button) {
      ui.click(button, async () => {
        configrationManager.currentStepObject?.manager().closeApplication();

      });
    }
  }

  networkReconnect() {
    if (this.networkPopupShown == false) {
      ui.hide(ui.id("thinkX_network_popup"));
    }
    events.trigger(EVENT.NETWORK_RESTORE);
    sdkEvents.trigger(SDK_EVENT.NETWORK_CONNECT);
    clearTimeout(this.networkDisconnectTimeout);
    clearTimeout(this.networkTimeout);
    this.networkTimeout = undefined;
  }

  closeSocket() {
    if (this.socketWorker) {
      utility.log("Closing socket connection...");
      this.goingOffline(); // emit user_offline before disconnecting  
      this.socketWorker.postMessage({ mode: 'DISCONNECT' });
      this.socketWorker.terminate();
      this.socketWorker = null;
      this.socket = null;
      this.roomId = '';
      this.roomJoined = false;
      configrationManager.currentProctor = '';
      clearTimeout(this.networkTimeout);
      this.networkTimeout = undefined;
      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = undefined;
      }

    }
  }
}

export const socket = new SocketManager();
