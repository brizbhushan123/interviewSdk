import { chatUi } from '../ui/ChatUi';
import ui from '../ui/UiManager';
import { configrationManager } from './ConfigrationManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import request from './RequestManager';
import { ChatMessage, socket } from './SocketManager';
import { stepUIManager } from './StepUIManager';
import utility from './Utility';

class ChatManager {
  eventInitialized: boolean = false;
  constructor() { }

  async join() {
    if (!this.eventInitialized) {
      socket.createRoom();
      sdkEvents.on(SDK_EVENT.CHAT_MESSAGE, (user: string, message: Record<string, any>) => {
        chatUi.messageRecived(user, message);
        utility.log(`Chat message from ${user}:`, message);
      });
      sdkEvents.on(SDK_EVENT.AUDIO_STREAM, (user: string, stream: MediaStream) => {
        chatUi.audioTrackAdded(stream, user);
        utility.log(`Chat audio started ${user}:`, stream);
      });

      sdkEvents.on(SDK_EVENT.SECONDARY_CAM_UFM, (data: any) => {
        this.sendData("secondary_ufm", data);
      });
      this.eventInitialized = true;
      // chatUi.initChatEvents();
    } else {
      socket.joinRoom();
    }
    utility.log('ChatManager initialized');
  }
  leaveChat() {
    socket.leaveRoom();
    utility.log('Left chat room');
  }

  sendText(message: string) {
    const chatMessage: ChatMessage = {
      mode: 'text',
      text: message,
      data: {},
    };
    socket.sendRoomMessage(chatMessage);
    utility.log(`Sent message: ${message}`);
  }
  sendData(mode: string, data: any) {
    const chatMessage: ChatMessage = {
      mode: mode,
      text: '',
      data: data,
    };
    socket.sendRoomMessage(chatMessage);
    utility.log(`Sent message with mode ${mode}:`, data);
  }
}

export const chat = new ChatManager();
