import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import utility from './Utility';

class AdditionCamManager {
  streamMap: { [user: string]: { streams: MediaStream; user: string }[] };
  userLeftSubscribed: boolean = false;
  constructor() {
    this.streamMap = {}; // Initialize the map
  }

  registerStream(user: string, stream: MediaStream) {
    if (!this.streamMap[user]) {
      this.streamMap[user] = [];
    }

    // Optional: check if this stream is already added to avoid duplicates
    const alreadyExists = this.streamMap[user].some((entry) => entry.streams === stream);
    if (!alreadyExists) {
      this.streamMap[user].push({ streams: stream, user: user });
      const type = this.getStreamType(stream);
      if (type == "video") {
        sdkEvents.trigger(SDK_EVENT.SECOND_STREAM, user, stream);
      } else {
        sdkEvents.trigger(SDK_EVENT.AUDIO_STREAM, user, stream);
      }
    }
    utility.log('Updated streamMap:', this.streamMap);
    if (!this.userLeftSubscribed) {
      this.userLeftSubscribed = true;
      sdkEvents.on(SDK_EVENT.USER_LEFT, (user_name: string) => {
        if (user_name in this.streamMap) {
          this.disConnectStream(user_name);
        }
      });
      sdkEvents.on(SDK_EVENT.USER_RECONNECT, (user_name: string) => {
        if (user_name in this.streamMap) {
          sdkEvents.trigger(SDK_EVENT.SECOND_STREAM_RETRY, user_name);
        }
      });
    }
  }

  getStreamType(stream: MediaStream): "audio" | "video" | "both" | "none" {
    const hasAudio = stream.getAudioTracks().length > 0;
    const hasVideo = stream.getVideoTracks().length > 0;

    if (hasAudio && hasVideo) return "both";
    if (hasAudio) return "audio";
    if (hasVideo) return "video";
    return "none";
  }

  disConnectStream(user: string) {
    const userStreams = this.streamMap[user];
    if (userStreams && userStreams.length > 0) {
      for (const entry of userStreams) {
        // Stop all tracks in each MediaStream
        entry.streams.getTracks().forEach((track) => track.stop());
      }

      // Remove the user's entry entirely
      delete this.streamMap[user];
      sdkEvents.trigger(SDK_EVENT.SECOND_STREAM_DISCONNET, user);
      utility.log(`Disconnected all streams for user: ${user}`);
    } else {
      utility.log(`No streams found for user: ${user}`);
    }
  }

  getStreamMap(user?: string) {
    if (user) {
      return this.streamMap[user] || [];
    }
    return this.streamMap;
  }
}

export const additionalCam = new AdditionCamManager();
