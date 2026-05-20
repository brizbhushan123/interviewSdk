// RecordingWorker.ts

let socket: WebSocket | null = null;
let chunkBuffer: (ArrayBuffer | string)[] = [];
let isConnecting = false;
let serverUrl = '';

export interface RecordingSocketMessage { 
  on : "OPEN" | "CLOSE" | "ERROR" | "MESSAGE";
  payload: any;
}


// Configure the worker to handle incoming messages
self.onmessage = async (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'INIT':
      serverUrl = payload.url;
      connect();
      break;

    case 'SEND_JSON':
      // payload is the JSON object for START or STOP
      sendMessage(JSON.stringify(payload));
      break;

    case 'SEND_STREAM':
      // payload is the raw ArrayBuffer from MediaRecorder
      sendMessage(payload);
      break;

    case 'STOP_AND_CLOSE':
      await handleGracefulClose();
      break;
  }
};

function connect() {
  if (isConnecting || (socket && socket.readyState === WebSocket.OPEN)) return;

  isConnecting = true;
  socket = new WebSocket(serverUrl);
  socket.binaryType = 'arraybuffer';

  socket.onopen = () => {
    isConnecting = false;
    console.log("Worker: Connected. Draining buffer...");
    self.postMessage({ on: "OPEN", payload: null } as RecordingSocketMessage);
    // drainBuffer();
  };

  socket.onclose = () => {
    isConnecting = false;
    socket = null;
    console.log("Worker: Disconnected. Retrying in 2s...");
    self.postMessage({ on: "CLOSE", payload: null } as RecordingSocketMessage);
    // setTimeout(connect, 2000);
  };

  socket.onerror = (err) => {
    console.error("Worker: Socket Error", err);
    self.postMessage({ on: "ERROR", payload: err } as RecordingSocketMessage);
  };
}

function sendMessage(data: ArrayBuffer | string) {
  if (socket && socket.readyState === WebSocket.OPEN && chunkBuffer.length === 0) {
    socket.send(data);
  } else {
    // If socket is down, we buffer. 
    // If it's binary, it stays binary. If it's string (JSON), it stays string.
    chunkBuffer.push(data);
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      connect();
    }
  }
}

function drainBuffer() {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  while (chunkBuffer.length > 0) {
    const item = chunkBuffer.shift();
    if (item) socket.send(item);
  }
}

async function handleGracefulClose() {
  // 1. Final drain
  drainBuffer();

  // 2. Wait for the browser to actually push bytes to the network
  if (socket) {
    while (socket.bufferedAmount > 0) {
      await new Promise(r => setTimeout(r, 100));
    }
    socket.close();
    socket = null;
  }
  console.log("Worker: Graceful shutdown complete.");
}