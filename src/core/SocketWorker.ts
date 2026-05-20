// src/worker.ts

// The Web Worker environment doesn't have access to the DOM,
// so you must use 'self' to interact with the worker thread.
import io,{ Socket } from "socket.io-client";
import { ChatMessage } from "./SocketManager";
export interface SocketWorkterMessage {
  type: 'DATA' | 'STATUS' ;
  on : string;
  payload: any;
}

let socket: null | typeof Socket = null;

self.onmessage = (event) => {
  const message =  event.data ;
// console.log("SocketWorker received message:", event);
  if (message.mode === 'CONNECT' && message.data) {
    // 1. Establish the connection
    socket = io(message.data.socketUrl, { auth: {
        token: message.data.authToken, // <--- Pass the token here
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000
    }); 

     
   
  }
  if(message.mode === 'DISCONNECT'){
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  }

  if(message.mode === 'ON'){
    
    if (!socket) {
      console.error('SocketWorker WebSocket is not connected.');
      return;
    }
    socket.on(message.text, (data: any) => {
      // console.log(`SocketWorker received event: ${message.text}`, data);
      const socketMessage: SocketWorkterMessage = {
        type: 'DATA',
        on: message.text,
        payload: data
      };
      self.postMessage(socketMessage);
    });
  }
  if(message.mode === 'OFF'){ 
    if (!socket) {
      console.error('SocketWorker WebSocket is not connected.');
      return;
    }
    socket.off(message.text);
  }
  if(message.mode == "EMIT"){
    if (!socket) {
      console.error('SocketWorker WebSocket is not connected.');
      return;
    }
    // console.log(`SocketWorker SocketWorker emitting event: ${message.text}`, message.data);
    socket.emit(message.text, message.data);
  }
};