import { additionalCam } from './AdditionalCamManager';
import { configrationManager } from './ConfigrationManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import { audioDetails, cameraDetails } from './LiveStreamManager';
import { PeerConnectionOptions, PeerManager } from './PeerManager';
import { socket, SocketMessage } from './SocketManager';
import utility from './Utility';

interface PeerInfo {
  [key: string]: PeerManager;
}

/**
 *
 */
class PeerConnectionManager {
  peerConf: PeerConnectionOptions | null = null;

  event = {
    PEER_CONNECION_CLOSE: 'peer_connection_close',
    PEER_OFFER: 'peer_offer',
    PEER_ANSWER: 'peer_answer',
    PEER_ICECANDIDATE: 'peer_icecandidate',
  };

  peerList: PeerInfo = {};

  peerIceBeforeAnswerArray: { [key: string]: RTCIceCandidateInit[] } = {};
  /**
   *
   */
  Init() {
    this.peerConf = {
      iceServers: [
        {
            urls: configrationManager.stun_url,
            // username:configrationManager.stun_username,
            // credential:configrationManager.stun_password
          },
          {
            urls: configrationManager.turn_url,
            username: configrationManager.turn_username,
            credential: configrationManager.turn_password,
          },
      ],
    };
    utility.log('PeerConnectionManager initialized with config:', this.peerConf);
    this.InitListner();
  }

  /**
   *
   * @param from
   */
  hasConnection(from: string): boolean {
    return from in this.peerList;
  }

  /**
   *
   */
  InitListner() {
    socket.on(this.event.PEER_CONNECION_CLOSE, (payload: SocketMessage<{}>) => {
      if (!this.hasConnection(payload.from)) {
        return;
      }
      const peer = this.peerList[payload.from];
      peer.close();
      delete this.peerList[payload.from];
    });
    utility.log('closing peer connection line 73');
    let self = this;
    sdkEvents.on(SDK_EVENT.USER_LEFT, (user_name: string) => {
      utility.log('closing peer connection111');
      if (user_name in self.peerList) {
        utility.log('closing peer connection');
        self.close(user_name);
      }
    });

    socket.on(
      this.event.PEER_OFFER,
      async (payload: SocketMessage<{ offer: RTCSessionDescriptionInit }>) => {
        let peer: PeerManager | null;
        const polite = configrationManager.socketUserName.localeCompare(payload.from) > 0;

        if (!this.hasConnection(payload.from)) {
          if (!this.peerConf) {
            return;
          }
          peer = this.getPeer(payload.from, false);
          if (!peer) {
            return;
          }
          this.peerList[payload.from] = peer;
        } else {
          peer = this.peerList[payload.from];
        }

        await peer.handleSignalingMessage({ type: 'offer', sdp: payload.data.offer }, polite);

        if (!peer.ignoreOffer) {
          const answer = await peer.createAnswer();

          if (answer != null) {
            const payloadAnswer = { answer: answer };
            socket.emit(this.event.PEER_ANSWER, payloadAnswer, payload.from);
          }
        }
        for (const candidate of this.peerIceBeforeAnswerArray[payload.from] || []) {
          await peer.handleSignalingMessage({ type: 'candidate', candidate: candidate }, polite);
        }
        this.peerIceBeforeAnswerArray[payload.from] = [];

        // proctor
        // admin
        // superprocor
        // mobile device - room san
        // mobile device - secondary cam setup
      }
    );

    socket.on(
      this.event.PEER_ANSWER,
      async (payload: SocketMessage<{ answer: RTCSessionDescriptionInit }>) => {
        if (!this.hasConnection(payload.from)) {
          return;
        }
        const peer = this.peerList[payload.from];
        const polite = configrationManager.socketUserName.localeCompare(payload.from) > 0;

        await peer.handleSignalingMessage({ type: 'answer', sdp: payload.data.answer }, polite);

        // proctor
        // admin
        // superprocor
        // mobile device - room san
        // mobile device - secondary cam setup
      }
    );

    socket.on(
      this.event.PEER_ICECANDIDATE,
      async (payload: SocketMessage<{ candidate: RTCIceCandidateInit }>) => {
        if (!this.hasConnection(payload.from)) {
          this.peerIceBeforeAnswerArray[payload.from] = this.peerIceBeforeAnswerArray[payload.from] || [];
          this.peerIceBeforeAnswerArray[payload.from].push(payload.data.candidate);
          return;
        }
        const peer = this.peerList[payload.from];
        const polite = configrationManager.socketUserName.localeCompare(payload.from) > 0;

        for (const candidate of this.peerIceBeforeAnswerArray[payload.from] || []) {
          await peer.handleSignalingMessage({ type: 'candidate', candidate: candidate }, polite);
        }
        this.peerIceBeforeAnswerArray[payload.from] = [];
        await peer.handleSignalingMessage({ type: 'candidate', candidate: payload.data.candidate }, polite);
      }
    );
  }

  /**
   *
   * @param to
   */
  async connect(to: string, ...streams: (cameraDetails | audioDetails)[]) {
    if (this.peerList[to]) {
      await this.streamAdd(to, ...streams);
      return;
    }
    const peer = this.getPeer(to, true);
    if (!peer) {
      return;
    }
    this.peerList[to] = peer;
    if (streams && streams.length > 0) {
      await this.streamAdd(to, ...streams);
      // onnegotiationneeded fires after addTrack and drives the offer — no explicit createOffer needed
    } else {
      // No tracks added so onnegotiationneeded will not fire; send a receive-only offer manually
      this.createOffer(peer, to);
    }
  }

  /**
   *
   * @param to
   */
  getPeer(to: string, offer: boolean): PeerManager | null {
    if (!this.peerConf) {
      return null;
    }
    const peer = new PeerManager(this.peerConf, offer);
    const self = this;
    peer.onIceCandidate = function (candidate: RTCIceCandidate) {
      const payload = { candidate: candidate.toJSON() };
      // let payload = JSON.stringify(candidate.candidate);
      socket.emit(self.event.PEER_ICECANDIDATE, payload, to);
    };
    peer.onTrackAdded = function (track: MediaStreamTrack, stream: MediaStream) {
      additionalCam.registerStream(to, stream);
      //utility.log(track, stream);
    };
    peer.onNegotiationNeeded = function () {
      utility.log('Negotiation needed for peer:', to);
      self.createOffer(peer, to);
    };

    peer.onConnectionStateChange = function (state: RTCPeerConnectionState) {
      utility.log(`Peer connection state with ${to}: ${state}`);
      if (state === 'failed') {
        if (peer.isOfferer) {
          // Offerer restarts immediately — it owns the ICE restart offer
          peer.restartIce();
        } else {
          // Answerer waits 10 s for the offerer's restart to arrive.
          // If still failed after that, force a restart from this side as a fallback.
          if (!peer.restartIceTimeout) {
            peer.restartIceTimeout = setTimeout(() => {
              peer.restartIceTimeout = null;
              if (peer.getConnectionState() === 'failed') {
                utility.log(`Answerer fallback ICE restart triggered for ${to}`);
                peer.restartIce();
              }
            }, 10000);
          }
        }
      } else if (state === 'closed') {
        // Both offerer and answerer must clean up their peer entry
        self.close(to);
        if (peer.restartIceTimeout) {
          clearTimeout(peer.restartIceTimeout);
          peer.restartIceTimeout = null;
        }
      } else if (state === 'connected') {
        if (peer.restartIceTimeout) {
          clearTimeout(peer.restartIceTimeout);
          peer.restartIceTimeout = null;
        }
      }
    };
    return peer;
  }

  /**
   *
   * @param to
   * @param {...any} streams
   */
  async streamAdd(to: string, ...streams: (cameraDetails | audioDetails)[]) {
    if (!this.hasConnection(to)) {
      utility.log('Not in connection', to);
      return;
    }
    const peer = this.peerList[to];

    utility.log('stream sending....');
    for (const i in streams) {
      const stream = streams[i];

      if ('videoDeviceIN' in stream) {
        await peer.addCameraStream(stream);
      } else {
        await peer.addAudioStream(stream);
      }
    }

    //this.createOffer(peer, to);
  }


  /**
   *
   * @param to
   * @param {...any} streams
   */
  async streamAddAll(...streams: (cameraDetails | audioDetails)[]) {
    for (var to in this.peerList) {
      if (!to.includes(configrationManager.interviewCandidateSocketName)) {
        this.streamAdd(to, ...streams);
      }
    }
  }

  /**
   *
   * @param to
   * @param {...any} streams
   */
  async removeAdd(to: string, ...streams: (cameraDetails | audioDetails)[]) {
    if (!this.hasConnection(to)) {
      utility.log('Not in connection', to);
      return;
    }
    const peer = this.peerList[to];

    utility.log('stream sending....');
    for (const i in streams) {
      const stream = streams[i];

      if ('videoDeviceIN' in stream) {
        await peer.removeCameraStream(stream);
      } else {
        await peer.removeAudioStream(stream);
      }
    }

    //this.createOffer(peer, to);
  }

  /**
   *
   * @param peer
   * @param to
   */
  private async createOffer(peer: PeerManager, to: string) {
    const offer = await peer.createOffer();
    if (offer != null) {
      const payload: { [key: string]: RTCSessionDescriptionInit } = { offer: offer };
      socket.emit(this.event.PEER_OFFER, payload, to);
    }
  }

  /**
   *
   * @param to
   */
  close(to: string) {
    const payload = {};
    socket.emit(this.event.PEER_CONNECION_CLOSE, payload, to);

    if (!this.hasConnection(to)) {
      return;
    }
    const peer = this.peerList[to];
    peer.close();
    delete this.peerList[to];
  }

  closeAll() {
    for (const key in this.peerList) {
      this.close(key);
    }
    this.peerList = {};
  }
}

export const peer = new PeerConnectionManager();
