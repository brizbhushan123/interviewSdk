import ui from '../ui/UiManager';
import { audioDetails, cameraDetails } from './LiveStreamManager';
import utility from './Utility';

export interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate';
  sdp?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

export interface PeerConnectionOptions {
  iceServers?: RTCIceServer[];
  // Add any other RTCPeerConnectionInit options you might need
}

/**
 *
 */
export class PeerManager {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStreams: MediaStream[] = [];
  private iceCandidatesQueue: RTCIceCandidateInit[] = [];

  public restartIceTimeout: ReturnType<typeof setTimeout> | null = null;
  public statMonitorInterval: ReturnType<typeof setInterval> | null = null;
  private lastFramesDecoded: number = -1;
  private stuckCount: number = 0;

  // Callbacks for signaling and media events
  public onSignalingMessage: ((message: SignalingMessage) => void) | null = null;
  public onTrackAdded: ((track: MediaStreamTrack, stream: MediaStream) => void) | null = null;
  public onConnectionStateChange: ((state: RTCPeerConnectionState) => void) | null = null;
  public onIceCandidate: ((candidate: RTCIceCandidate) => void) | null = null;
  public onNegotiationNeeded: (() => void) | null = null;
  public isOfferer = true;

  // Perfect negotiation state
  public makingOffer: boolean = false;
  public ignoreOffer: boolean = false;

  /**
   *
   * @param options
   */
  constructor(private options: PeerConnectionOptions = {}, offerer: boolean = true) {
    this.isOfferer = offerer;
    this.peerConnection = new RTCPeerConnection(this.options);
    this.setupPeerConnectionListeners();
    this.startStatsMonitor();
  }

  /**
   *
   */
  private setupPeerConnectionListeners() {
    if (!this.peerConnection) return;

    this.peerConnection.ontrack = (event: RTCTrackEvent) => {
      utility.log('Remote track added:', event.track);
      const stream = event.streams[0];
      if (!stream) return;
      if (!this.remoteStreams.includes(stream)) {
        this.remoteStreams.push(stream);
      }
      if (this.onTrackAdded) {
        this.onTrackAdded(event.track, stream);
      }
    };

    this.peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        utility.log('Local ICE candidate:', event.candidate);
        if (this.onIceCandidate) {
          this.onIceCandidate(event.candidate);
        }
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection) {
        utility.log('Peer connection state:', this.peerConnection.connectionState);
        if (this.onConnectionStateChange) {
          this.onConnectionStateChange(this.peerConnection.connectionState);
        }
      }
    };

    this.peerConnection.onnegotiationneeded = async () => {
      utility.log('Negotiation needed: creating offer...');
      if (this.onNegotiationNeeded) {
        this.onNegotiationNeeded();
      }
      // try {
      //   await this.createOffer();
      // } catch (error) {
      //   utility.error('Error creating offer:', error);
      // }
    };
  }

  /**
   * Initializes the local media stream (e.g., camera and microphone).
   * @param constraints MediaStreamConstraints for getUserMedia.
   */
  public async initLocalStream(
    constraints: MediaStreamConstraints = { video: true, audio: true }
  ): Promise<void> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.localStream.getTracks().forEach((track) => {
        if (this.peerConnection) {
          this.peerConnection.addTrack(track, this.localStream!);
        }
      });
      utility.log('Local stream initialized and added to peer connection.');
    } catch (error) {
      utility.error('Error getting user media:', error);
      throw error;
    }
  }

  /**
   * Initializes the local media stream (e.g., camera and microphone).
   * @param constraints MediaStreamConstraints for getUserMedia.
   * @param camera
   */
  public async addCameraStream(camera: cameraDetails): Promise<string> {
    utility.log('stream getting....');
    try {
      if (camera.stream == null) {
        return '';
      }
      let trackId = '';
      utility.log('Send Stream', camera.stream);
      camera.stream.getTracks().forEach((track) => {
        if (this.peerConnection && !this.isTrackAlreadyAdded(track)) {
          utility.log('stream addtrack....');
          this.peerConnection.addTrack(track, camera.stream!);
        }

        if (track.kind == 'video') {
          trackId = track.id;
        }
      });

      utility.log('Local stream initialized and added to peer connection.');
      return trackId;
    } catch (error) {
      utility.error('Error getting user media:', error);
      return '';
    }
  }

  public async removeCameraStream(camera: cameraDetails): Promise<string> {
    utility.log('removing stream....');
    try {
      if (!camera.stream) {
        return '';
      }

      let trackId = '';

      camera.stream.getTracks().forEach((track) => {
        if (this.peerConnection) {
          const senders = this.peerConnection.getSenders();
          const sender = senders.find(s => s.track === track);

          if (sender) {
            this.peerConnection.removeTrack(sender);
            utility.log(`Track removed: ${track.kind}`);
          }
        }

        if (track.kind === 'video') {
          trackId = track.id;
        }

        // stop the track so it's no longer active
        track.stop();
      });

      utility.log('Local stream removed from peer connection.');
      return trackId;
    } catch (error) {
      utility.error('Error removing user media:', error);
      return '';
    }
  }

  public async removeAudioStream(audio: audioDetails): Promise<string> {
    try {
      if (!audio.stream) {
        return '';
      }

      let trackId = '';

      audio.stream.getTracks().forEach((track) => {
        if (this.peerConnection) {
          const senders = this.peerConnection.getSenders();
          const sender = senders.find(s => s.track === track);

          if (sender) {
            this.peerConnection.removeTrack(sender);
            utility.log(`Audio track removed: ${track.id}`);
          }
        }

        if (track.kind === 'audio') {
          trackId = track.id;
        }

        // stop the track so mic is released
        track.stop();
      });

      utility.log('Audio stream removed from peer connection.');
      return trackId;
    } catch (error) {
      utility.error('Error removing audio stream:', error);
      return '';
    }
  }

  /**
   * Initializes the local media stream (e.g., camera and microphone).
   * @param constraints MediaStreamConstraints for getUserMedia.
   * @param audio
   */
  public async addAudioStream(audio: audioDetails): Promise<string> {
    try {
      if (audio.stream == null) {
        return '';
      }
      let trackId = '';
      audio.stream.getTracks().forEach((track) => {
        if (this.peerConnection && !this.isTrackAlreadyAdded(track)) {
          console.log('audio stream addtrack....');
          this.peerConnection.addTrack(track, audio.stream!);
        }

        if (track.kind == 'audio') {
          trackId = track.id;
        }
      });

      utility.log('Local stream initialized and added to peer connection.');
      return trackId;
    } catch (error) {
      utility.error('Error getting user media:', error);
      return '';
    }
  }

  isTrackAlreadyAdded(trackToCheck: MediaStreamTrack) {
    if (!this.peerConnection || !trackToCheck) {
      console.warn('Invalid peerConnection or trackToCheck provided.');
      return false;
    }

    // Get all senders currently associated with the peer connection
    const senders = this.peerConnection.getSenders();
    console.log('Current senders:', senders);

    // Iterate through the senders and check if any sender's track matches trackToCheck
    for (const sender of senders) {
      if (sender.track === trackToCheck) {
        return true; // Found a sender with the same track
      }
    }

    return false; // No sender found with the specified track
  }

  /**
   * Creates and sends an offer (for the initiating peer).
   */
  public async createOffer(): Promise<RTCSessionDescriptionInit | null> {
    if (!this.peerConnection || this.makingOffer) return null;
    try {
      this.makingOffer = true;
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      if (this.peerConnection.signalingState !== 'closed') {
        await this.peerConnection.setLocalDescription(offer);
      }
      return offer;
    } catch (error) {
      utility.error('Error creating or setting offer:', error);
      return null;
    } finally {
      this.makingOffer = false;
    }
  }

  /**
   * Handles an incoming signaling message (offer, answer, or ICE candidate).
   * @param message The signaling message.
   * @param polite Boolean indicating if this peer is the polite peer (resolves glare).
   */
  public async handleSignalingMessage(message: SignalingMessage, polite: boolean = false): Promise<void> {
    if (!this.peerConnection) {
      utility.error('Peer connection not initialized. Cannot handle signaling message.');
      return;
    }

    try {
      if (message.type === 'offer' || message.type === 'answer') {
        const offerCollision = (
          message.type === 'offer' &&
          (this.makingOffer || this.peerConnection.signalingState !== 'stable')
        );

        this.ignoreOffer = !polite && offerCollision;
        if (this.ignoreOffer) {
          utility.log('Glare detected. Impolite peer ignoring offer.');
          return;
        }

        if (message.sdp) {
          if (offerCollision) {
            utility.log('Glare detected. Polite peer rolling back to accept incoming offer.');
            await Promise.all([
              this.peerConnection.setLocalDescription({ type: 'rollback' }),
              this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp))
            ]);
          } else {
            if (message.type === 'offer') {
              utility.log('Received offer:', message.sdp);
            } else {
              utility.log('Received answer:', message.sdp);
            }
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
          }

          if (message.type === 'answer') {
            while (this.iceCandidatesQueue.length > 0) {
              const candidate = this.iceCandidatesQueue.shift();
              if (candidate) {
                await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
              }
            }
          }
        }
      } else if (message.type === 'candidate') {
        if (message.candidate) {
          utility.log('Received ICE candidate:', message.candidate);
          try {
            if (this.peerConnection.remoteDescription) {
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
            } else {
              this.iceCandidatesQueue.push(message.candidate);
            }
          } catch (e) {
            if (!this.ignoreOffer) {
              utility.error('Error adding received ICE candidate:', e);
            }
            // If ignoreOffer is true, we expect candidates to fail until we recover
          }
        }
      }
    } catch (err) {
      utility.error('Error handling signaling message:', err);
    }
  }

  /**
   * Creates and sends an answer (for the answering peer).
   */
  public async createAnswer(): Promise<RTCSessionDescriptionInit | null> {
    if (!this.peerConnection) return null;
    try {
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
      utility.error('Error creating or setting answer:', error);
      return null;
    }
  }

  /**
   * Closes the peer connection and cleans up resources.
   */
  public close(): void {

    this.stopStatsMonitor();

    if (this.restartIceTimeout) {
      clearTimeout(this.restartIceTimeout);
      this.restartIceTimeout = null;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
      this.localStream = null;
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
      utility.log('Peer connection closed.');
    }
    this.remoteStreams = [];
  }

  /**
   * Get the local media stream.
   */
  public getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  /**
   * Get the remote media streams.
   */
  public getRemoteStreams(): MediaStream[] {
    return this.remoteStreams;
  }

  /**
   * Get the current peer connection state.
   */
  public getConnectionState(): RTCPeerConnectionState | null {
    return this.peerConnection ? this.peerConnection.connectionState : null;
  }

  public restartIce(): void {
    if (this.peerConnection) {
      this.peerConnection.restartIce();
      utility.log('ICE restart triggered.');
    }
  }

  /**
   * Starts an interval that periodically checks `getStats()` to detect stuck video streams
   * (e.g. from system sleep). It ensures auto-recovery via bidirectional ICE restart.
   */
  public startStatsMonitor(): void {
    if (this.statMonitorInterval) return;

    // Check every 3 seconds as requested
    this.statMonitorInterval = setInterval(async () => {
      if (!this.peerConnection || this.peerConnection.connectionState !== 'connected') {
        return;
      }

      try {
        const stats = await this.peerConnection.getStats();
        stats.forEach((report) => {
          // Monitor incoming video frames
          if (report.type === 'inbound-rtp' && report.kind === 'video') {
            const framesDecoded: number = report.framesDecoded ?? -1;

            // lastFramesDecoded starts at -1; skip the first reading so we have a baseline
            if (this.lastFramesDecoded !== -1) {
              if (framesDecoded === this.lastFramesDecoded) {
                this.stuckCount++;
                utility.log(`No frames received \u2192 stream stuck. Count: ${this.stuckCount}`);

                // 2 consecutive stuck checks (~6 s) \u2192 trigger recovery
                if (this.stuckCount >= 2) {
                  utility.log('Stream recovery triggered (restartIce) due to stuck video frames.');
                  this.restartIce();
                  this.stuckCount = 0;
                }
              } else {
                this.stuckCount = 0; // Flowing normally
              }
            }
            this.lastFramesDecoded = framesDecoded;
          }
        });
      } catch (error) {
        utility.error('Error fetching stream stats during monitoring:', error);
      }
    }, 3000);
  }

  /**
   * Cleans up the stats monitoring interval.
   */
  public stopStatsMonitor(): void {
    if (this.statMonitorInterval) {
      clearInterval(this.statMonitorInterval);
      this.statMonitorInterval = null;
    }
  }
}
