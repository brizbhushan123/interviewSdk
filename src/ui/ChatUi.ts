import { environment } from '../config/environment';
import { chat } from '../core/ChatManager';
import { configrationManager } from '../core/ConfigrationManager';
import { audioDetails, LiveStreamManager } from '../core/LiveStreamManager';
import { peer } from '../core/PeerConnectionManager';
import request from '../core/RequestManager';
import { socket } from '../core/SocketManager';
import { stepUIManager } from '../core/StepUIManager';
import utility from '../core/Utility';
import ui from './UiManager';
import { ai } from '../core/AIManager'
import { UiComponents } from './UiComponents';

class ChatUi {

  callTimerInterval: any;
  callStartTime: number = 0;
  userName: string = '';
  firstChatLoadDone: boolean = false;
  lastTempMsgId: string | null = null;
  isChatOpen: boolean = false;

  messageRecived(user: string, message: Record<string, any>) {
    utility.log('chat message recieve', message.mode);
    switch (message.mode) {
      case 'chat':
        if (configrationManager.currentStepAlias == 'Interview_Session') {
          this.setInterviewChatUI();
        }
        break;
      case 'proctor_audio_track':
        this.audioTrackAdded(message.data, user);
        break;
      case 'proctor_audio_track_remove':
        this.removeAudioTrackAdded(user);
        break;
      default:
        console.log('Unknown mode:', message.mode);
    }
  }

  shownMessages: Record<string, any> = {};

  setChatUI(): void {

    if (LiveStreamManager.PRIMARY_CAMERA_NAME == 'P_CAM') {
      // ui.show(ui.id('thinkproc_chat'));
      // ui.show(ui.id('thinkprocChatMainBody'));
      stepUIManager.insertText('thinkX_Candidate_Name', 'Proctor');
      this.toggleChat();
    }
  };

  showMessages(): void {
    this.setChatUI();
    request
      .getChat()
      .then((response: any) => {
        const chatContainer = ui.id('thinkproc_chat_histroy');
        if (!chatContainer) {
          utility.log('Chat container not found');
          return;
        }
        chatContainer.innerHTML = ''; // clear old messages if needed

        if (response.status && response.data && typeof response.data === 'object') {
          Object.entries(response.data).forEach(([id, msg]: [string, any]) => {
            if (this.shownMessages[id]) return; // use id as unique key
            let messageBubble = '';

            let timeOnly = '';
            if (msg.date) {
              const parts = msg.date.split(' '); // ["25-09-2025", "07:15", "am"]
              if (parts.length >= 3) {
                timeOnly = parts[1] + ' ' + parts[2].toUpperCase(); // "07:15 AM"
              } else if (parts.length === 2) {
                timeOnly = parts[1]; // fallback if no AM/PM
              } else {
                timeOnly = msg.date; // fallback
              }
            }

            if (msg.sender === 'Proctor') {
              // Incoming message
              messageBubble = `
                <div class="thinkproc_chat_message-bubble thinkproc_chat_message-incoming">
                  <div class="thinkproc-message-wrap">
                    <div class="thinkproc_chat_message_top">
                      <div class="thinkproc_chat_proctor_img">
                        <img src="${msg.senderPhoto || environment.UI_BASE_URL + 'images/user.jpg'}" alt="">
                      </div>
                      <div class="thinkproc_chat_proc_name">${msg.sender}</div>
                    </div>
                    <div class="thinkproc_chat_message_bottom">
                      <span class="thinkproc_chat_message_text">${msg.message}</span>
                      <span class="thinkproc_chat_time-stamp">${timeOnly}</span>
                    </div>
                  </div>
                </div>
              `;
            } else {
              // Outgoing (Candidate) message
              messageBubble = `
                <div class="thinkproc_chat_message-bubble thinkproc_chat_message-outgoing">
                  <div class="thinkproc-message-wrap">
                    <div class="thinkproc_chat_message_top">
                      <div class="thinkproc_chat_proctor_img">
                        <img src="${msg.senderPhoto || environment.UI_BASE_URL + 'images/user.jpg'}" alt="">
                      </div>
                      <div class="thinkproc_chat_proc_name">${msg.sender}</div>
                    </div>
                    <div class="thinkproc_chat_message_bottom">
                      <span class="thinkproc_chat_message_text">${msg.message}</span>
                      <span class="thinkproc_chat_time-stamp">${timeOnly}</span>
                    </div>
                  </div>
                </div>
              `;
            }

            chatContainer.insertAdjacentHTML('beforeend', messageBubble);
            this.shownMessages[msg.id] = msg;
          });

          // auto-scroll to bottom after appending messages
          // chatContainer.scrollTo(0,chatContainer.scrollHeight);
          this.scrollToBottom('thinkX_chat_body');
        }
      })
      .catch((error: any) => {
        utility.log('error', error);
      });
  }

  // initChatEvents(): void {
  //   const sendBtn = ui.id('thinkX_sendChat') as HTMLButtonElement;
  //   const inputEl = ui.querySelector('.thinkproc_message_input_wrap input') as HTMLInputElement;
  //   const chatContainer = ui.id('thinkproc_chat_histroy') as HTMLElement;

  //   // Send message on button click
  //   ui.click(sendBtn, () => {
  //     let message = inputEl.value.trim();
  //     if (!message) return; // ⛔ prevent empty messages

  //     this.sendMessage(message, chatContainer, inputEl);
  //     if (configrationManager.smartProctorEnable == 1 && configrationManager.previous_instance_escalated == false) {
  //       ai.getSmartProctorCandidateMsg(message);
  //     }
  //   });

  //   // Send message on Enter key
  //   inputEl.addEventListener('keypress', (e: KeyboardEvent) => {
  //     if (e.key === 'Enter') {
  //       e.preventDefault();
  //       let message = inputEl.value.trim();
  //       if (!message) return; // ⛔ prevent empty messages

  //       this.sendMessage(message, chatContainer, inputEl);
  //       if (configrationManager.smartProctorEnable == 1 && configrationManager.previous_instance_escalated == false) {
  //         ai.getSmartProctorCandidateMsg(message);
  //       }
  //     }
  //   });
  // }

  escapeHtml(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  sendMessage(message: string, chatContainer: HTMLElement, inputEl: HTMLInputElement): void {
    if (!message.trim()) return;

    const tempId = 'temp_' + Date.now();

    // clear input immediately
    inputEl.value = '';

    message = this.escapeHtml(message);

    // create pending bubble
    const pendingBubble = `
      <div class="thinkproc_chat_message-bubble thinkproc_chat_message-outgoing pending" id="${tempId}">
        <div class="thinkproc-message-wrap">
          <div class="thinkproc_chat_message_top">
            <div class="thinkproc_chat_proctor_img">
              <img src="${environment.UI_BASE_URL}images/user.jpg" alt="">
            </div>
            <div class="thinkproc_chat_proc_name">You</div>
          </div>
          <div class="thinkproc_chat_message_bottom">
            <span class="thinkproc_chat_message_text">${message}</span>
            <span class="thinkproc_chat_time-stamp">sending...</span>
          </div>
        </div>
      </div>
    `;
    chatContainer.insertAdjacentHTML('beforeend', pendingBubble);
    // chatContainer.scrollTop = chatContainer.scrollHeight;
    this.scrollToBottom('thinkX_chat_body');
    // chatContainer.scrollTo(0,chatContainer.scrollHeight);

    // send to backend
    request
      .sendChat({
        is_message: 1,
        message: message,
        environment: configrationManager.currentStepAlias,
      })
      .then(() => {
        // Replace pending bubble with confirmed bubble
        const bubbleEl = ui.id(tempId);
        if (bubbleEl) {
          bubbleEl.classList.remove('pending');
          bubbleEl.classList.add('sent');
          const timestampEl = ui.scopedQuerySelector(bubbleEl, '.thinkproc_chat_time-stamp');
          if (timestampEl) timestampEl.textContent = new Date().toLocaleTimeString();
        }

        // also trigger refresh to ensure sync
        this.showMessages();
        let msg = { mode: 'chat', text: 'proctor send message' };
        socket.sendRoomMessage(msg);
      })
      .catch((err: any) => {
        utility.log('Message send failed:', err);

        // mark bubble as failed
        const bubbleEl = ui.id(tempId);
        if (bubbleEl) {
          bubbleEl.classList.remove('pending');
          bubbleEl.classList.add('failed');
          const timestampEl = ui.scopedQuerySelector(bubbleEl, '.thinkproc_chat_time-stamp');
          if (timestampEl) timestampEl.textContent = 'failed to send';
        }
      });
  }

  // scrollToBottom(id: string) {
  //   let scrollID = ui.id(id);
  //   if (scrollID) {
  //     scrollID.scrollTop = scrollID.scrollHeight;
  //   }
  // }

  scrollToBottom(id: string) {
    const scrollID = ui.id(id);
    if (!scrollID) return;

    requestAnimationFrame(() => {
      scrollID.style.scrollBehavior = "auto";
      scrollID.scrollTop = scrollID.scrollHeight;
    });
  }
  audioTrackAdded(audioStream: MediaStream, user: string) {
    this.setChatUI();
    // ui.show(ui.id('thinkX_chat_proc_call'));
    // ui.hide(ui.id('thinkX_call_action_btn'));
    // ui.show(ui.id('thinkX_call_timer'));


    let audioEl = ui.id('thinkX_call_audio_' + user) as HTMLAudioElement;
    if (!audioEl) {
      let aduioDiv = ui.createElement('audio') as HTMLAudioElement;
      aduioDiv.id = 'thinkX_call_audio_' + user;
      aduioDiv.autoplay = true;
      aduioDiv.controls = false;
      aduioDiv.style.display = 'none';
      ui.id('thinkX_chat_body')?.appendChild(aduioDiv);
      ui.hide(aduioDiv);
      audioEl = aduioDiv;
    }
    if (audioEl) {
      audioEl.srcObject = audioStream;
      audioEl.play().catch((error) => {
        utility.log('Audio play error:', error);
      });
    }

    this.startCallTimer();
  }

  startCallTimer(): void {
    // Clear any existing timer
    if (this.callTimerInterval) {
      clearInterval(this.callTimerInterval);
    }

    this.callStartTime = Date.now();

    this.callTimerInterval = setInterval(() => {
      const elapsed = Date.now() - this.callStartTime;

      const totalSeconds = Math.floor(elapsed / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const formatted =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      const timerEl = ui.id('thinkX_call_timer_start');
      if (timerEl) {
        timerEl.textContent = formatted;
      }
    }, 1000);
  }

  // Call this when call ends
  stopCallTimer(): void {
    if (this.callTimerInterval) {
      clearInterval(this.callTimerInterval);
      this.callTimerInterval = null;
    }

    const timerEl = ui.id('thinkX_call_timer_start');
    if (timerEl) {
      timerEl.textContent = "00:00";
    }
  }

  removeAudioTrackAdded(user: string) {
    ui.hide(ui.id('thinkX_chat_proc_call'));
    ui.show(ui.id('thinkX_call_action_btn'));
    ui.hide(ui.id('thinkX_call_timer'));

    const audioEl = ui.id('thinkX_call_audio') as HTMLAudioElement;

    // peer.removeAdd(user, LiveStreamManager.AUDIO.PRIMARY);

    if (audioEl) {
      audioEl.pause();
      audioEl.srcObject = null;
    }

    let msg = { mode: 'close_chat_interval', text: 'close chat interval' };
    socket.sendRoomMessage(msg);

    this.stopCallTimer();
  }

  toggleChat() {
    const button = ui.id('thinkX_minimize_chat');

    if (button) {
      // remove any existing listeners to avoid duplicates
      button.replaceWith(button.cloneNode(true));
      const newButton = ui.id('thinkX_minimize_chat');

      if (newButton) {
        newButton.addEventListener('click', (event) => {
          event.preventDefault();

          const chatBody = ui.id('thinkprocChatMainBody');
          if (chatBody) {
            chatBody.classList.toggle('d-none');
          }
        });
      }
    }
  }

  initCloseButton() {
    const chatBody = ui.id('thinkproc_chat');
    if (chatBody) {
      ui.hide(chatBody);
    }
  }

  sendInterviewMessage(message: string, chatContainer: HTMLElement, inputEl: HTMLInputElement): void {
    if (!message.trim()) return;

    const tempId = "temp_" + Date.now();
    const safeMsg = message;
    inputEl.value = "";

    this.lastTempMsgId = tempId;
    // ---- TEMP OUTGOING BUBBLE ----
    const tempHTML = `
      <div class="temp-bubble" id="${tempId}">
        <p class="thinkproc-message-sender temp">${ui.translations.interviewLobby.You}</p>
        <p class="thinkproc-message-text pending">
          ${message}
          <span class="thinkproc_chat_time-stamp"></span>
        </p>
      </div>
    `;

    chatContainer.insertAdjacentHTML("beforeend", tempHTML);
    setTimeout(() => {
      this.scrollToBottomForce("thinkInterview_chatMsgBody");
    }, 500);

    // user type
    this.userName = (configrationManager.userType == "3") ? "Interviewer" : "Candidate";

    // ---- SEND TO BACKEND ----
    request.sendChat({
      is_message: 1,
      message: safeMsg,
      environment: configrationManager.currentStepAlias,
      userType: this.userName
    })
      .then(() => {

        // ---- UPDATE TEMP → SENT ----
        const bubble = ui.id(tempId);
        if (bubble) {
          bubble.classList.remove("pending");
          bubble.classList.add("sent");

          // const ts = bubble.querySelector(".thinkproc_chat_time-stamp");
          // if (ts) ts.textContent = new Date().toLocaleTimeString();
        }

        // ---- ALSO LOAD SERVER MESSAGES (ONLY NEW ONES) ----
        this.showInterviewMessages(false);

        socket.sendRoomMessage({ mode: "chat", text: "proctor send message" });
      })
      .catch(() => {
        // ---- FAILED ----
        const bubble = ui.id(tempId);
        if (bubble) {
          bubble.classList.remove("pending");
          bubble.classList.add("failed");

          const ts = bubble.querySelector(".thinkproc_chat_time-stamp");
          if (ts) ts.textContent = "";
        }
      });
  }

  showInterviewMessages(forceReload: boolean = false): void {

    const chatContainer = ui.id("thinkInterview_chatMsgBody");
    if (!chatContainer) return;

    if (!this.shownMessages) {
      this.shownMessages = {};
    }

    if (forceReload === true) {
      this.shownMessages = {};
      chatContainer.innerHTML = "";
    }

    const noDataEl = ui.id("thinkInterview_noDataFound");


    if (!this.firstChatLoadDone) {
      this.showLoaderwithText('thinkInterview_chatMsgBody');
    }
    request.getChat().then((response: any) => {

      if (!this.firstChatLoadDone) {
        this.hideLoaderwithText();
      }

      this.firstChatLoadDone = true;

      if (response.status && response.data) {

        // const messageKeys = Object.keys(response.data);

        if (response.code == 4101) {
          if (noDataEl) ui.show(noDataEl);
          return;
        }

        if (noDataEl) ui.hide(noDataEl);
        Object.entries(response.data).forEach(([msgId, msg]: [string, any]) => {

          if (this.shownMessages[msgId]) return;

          let timeOnly = "";
          let senderName = msg.sender;

          if (msg.date) {
            const parts = msg.date.split(" ");
            timeOnly = `${parts[1]} ${parts[2]?.toUpperCase() ?? ""}`;
          }

          if (msg.userID == configrationManager.userId && msg.userTypeID == configrationManager.userType) {
            senderName = ui.translations.interviewLobby.You;
          } else {
            senderName = msg.sender;
          }

          const bubble = `
                      <div class="chat-msg-wrapper" data-id="${msgId}">
                          <p class="thinkproc-message-sender">
                              ${senderName}
                              <span class="thinkproc_chat_time-stamp"> - ${timeOnly}</span>
                          </p>
                          <p class="thinkproc-message-text">
                              ${this.escapeHtml(msg.message)}
                          </p>
                      </div>
                  `;

          if (this.lastTempMsgId &&
            msg.userID == configrationManager.userId &&
            ui.id(this.lastTempMsgId)) {

            const tempEl = ui.id(this.lastTempMsgId);
            if (tempEl) {
              tempEl.outerHTML = bubble;  // replace temp with real
              this.lastTempMsgId = null;
              this.shownMessages[msgId] = true;
              return;
            }
          }

          chatContainer.insertAdjacentHTML("beforeend", bubble);


          // Mark added
          this.shownMessages[msgId] = true;
        });

        chatContainer.querySelectorAll('.temp-bubble').forEach(el => el.remove());

        this.scrollToBottomForce("thinkInterview_chatMsgBody");
      }
    })
      .catch(() => {
        if (!this.firstChatLoadDone) {
          this.hideLoaderwithText();
        }
        this.firstChatLoadDone = true;
      });
  }





  scrollToBottomForce(containerId: string) {
    const el = ui.id(containerId);
    if (!el) return;

    const prevScroll = el.scrollTop;          // where user currently is
    const maxScroll = el.scrollHeight;        // new full height

    // If already near bottom → scroll smoothly
    if (prevScroll + el.clientHeight >= maxScroll - 50) {
      el.scrollTo({ top: maxScroll, behavior: "smooth" });
    }
    else {
      // If user was reading older messages → jump without effect
      el.scrollTop = maxScroll;
    }
  }


  setInterviewChatUI(): void {
    const popup = ui.id('thinkproc_chat_popup');
    if (popup) {
      ui.show(popup);
      ui.hide(ui.id('think_interview_ufmList'));
      this.initChatEvents();
      this.showInterviewMessages();
      this.closeChat();
      ui.show(ui.id('thinkInterview_StaticUFMIcon'));
      ui.hide(ui.id('thinkInterview_blueUFMIcon'));
      const ufmText = ui.id('thinkInterview_blueUFMText');
      if (ufmText) {
        ufmText.style.color = "#000000";
      }
      this.isChatOpen = true;
    }
  }

  chatButton(): void {
    const chatEl = ui.id('thinkinterview_chat');
    if (!chatEl) return;

    ui.click(chatEl, () => {
      const popup = ui.id('thinkproc_chat_popup');
      const videoHtml = ui.id('think_interview_video_rightdiv');
      const ufmText = ui.id('thinkInterviewMsgText');

      if (!popup) return;

      if (!this.isChatOpen) {
        // 🔓 OPEN CHAT
        this.setInterviewChatUI();

        ui.show(ui.id('thinkInterview_blueMsg'));
        ui.hide(ui.id('thinkInterview_StaticMsg'));

        if (ufmText) {
          ufmText.style.color = "rgba(47, 77, 219, 1)";
        }

        // if (configrationManager.userType == '2' && videoHtml) {
        //   videoHtml.style.width = "330px";
        // }

      } else {
        // 🔒 CLOSE CHAT
        ui.hide(popup);
        ui.hide(ui.id('thinkInterview_blueMsg'));
        ui.show(ui.id('thinkInterview_StaticMsg'));

        if (ufmText) {
          ufmText.style.color = "#000000";
        }

        // if (configrationManager.userType == '2' && videoHtml) {
        //   videoHtml.style.width = "0";
        // }

        this.isChatOpen = false;
      }
    });
  }


  closeChat(): void {
    const closeBtn = ui.id('thinkInterview_closeBtn');
    if (!closeBtn) return;

    ui.click(closeBtn, () => {
      const popup = ui.id('thinkproc_chat_popup');
      const videoHtml = ui.id('think_interview_video_rightdiv');
      const ufmText = ui.id('thinkInterviewMsgText');

      if (popup) {
        ui.hide(popup);
        ui.hide(ui.id('thinkInterview_blueMsg'));
        ui.show(ui.id('thinkInterview_StaticMsg'));

        if (ufmText) ufmText.style.color = "#000000";
      }

      // if (configrationManager.userType == '2' && videoHtml) {
      //   videoHtml.style.width = "0";
      // }

      this.isChatOpen = false; // 👈 sync toggle state
    });
  }

  initChatEvents(): void {
    const sendBtn = ui.id('thinkinterview_sendChat') as HTMLButtonElement;
    const inputEl = ui.querySelector('.thinkproc-chat-footer input') as HTMLInputElement;
    const chatContainer = ui.id('thinkInterview_chatMsgBody') as HTMLElement;

    // Send message on button click
    ui.click(sendBtn, () => {
      let message = inputEl.value.trim();
      if (!message) return; // ⛔ prevent empty messages

      chatUi.sendInterviewMessage(message, chatContainer, inputEl);
    });

    // Send message on Enter key
    inputEl.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        let message = inputEl.value.trim();
        if (!message) return; // ⛔ prevent empty messages

        chatUi.sendInterviewMessage(message, chatContainer, inputEl);
      }
    });
  }

  showLoaderwithText(id: string): void {
    const loaderHTML = UiComponents.loadingwithtext(ui.translations.ai_label.please_wait);
    stepUIManager.setLoader(loaderHTML, id);
  }

  hideLoaderwithText(): void {
    const existingLoader = ui.id('thinkX_loadingwithText');
    if (existingLoader && existingLoader.parentNode) {
      existingLoader.parentNode.removeChild(existingLoader);
    }
  }



}
export const chatUi = new ChatUi();
