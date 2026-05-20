import { audioDetails, cameraDetails } from './LiveStreamManager';
export interface SignalingMessage {
    type: 'offer' | 'answer' | 'candidate';
    sdp?: RTCSessionDescriptionInit;
    candidate?: RTCIceCandidateInit;
}
export interface PeerConnectionOptions {
    iceServers?: RTCIceServer[];
}
/**
 *
 */
export declare class PeerManager {
    private options;
    private peerConnection;
    private localStream;
    private remoteStreams;
    private iceCandidatesQueue;
    restartIceTimeout: ReturnType<typeof setTimeout> | null;
    statMonitorInterval: ReturnType<typeof setInterval> | null;
    private lastFramesDecoded;
    private stuckCount;
    onSignalingMessage: ((message: SignalingMessage) => void) | null;
    onTrackAdded: ((track: MediaStreamTrack, stream: MediaStream) => void) | null;
    onConnectionStateChange: ((state: RTCPeerConnectionState) => void) | null;
    onIceCandidate: ((candidate: RTCIceCandidate) => void) | null;
    onNegotiationNeeded: (() => void) | null;
    isOfferer: boolean;
    makingOffer: boolean;
    ignoreOffer: boolean;
    /**
     *
     * @param options
     */
    constructor(options?: PeerConnectionOptions, offerer?: boolean);
    /**
     *
     */
    private setupPeerConnectionListeners;
    /**
     * Initializes the local media stream (e.g., camera and microphone).
     * @param constraints MediaStreamConstraints for getUserMedia.
     */
    initLocalStream(constraints?: MediaStreamConstraints): Promise<void>;
    /**
     * Initializes the local media stream (e.g., camera and microphone).
     * @param constraints MediaStreamConstraints for getUserMedia.
     * @param camera
     */
    addCameraStream(camera: cameraDetails): Promise<string>;
    removeCameraStream(camera: cameraDetails): Promise<string>;
    removeAudioStream(audio: audioDetails): Promise<string>;
    /**
     * Initializes the local media stream (e.g., camera and microphone).
     * @param constraints MediaStreamConstraints for getUserMedia.
     * @param audio
     */
    addAudioStream(audio: audioDetails): Promise<string>;
    isTrackAlreadyAdded(trackToCheck: MediaStreamTrack): boolean;
    /**
     * Creates and sends an offer (for the initiating peer).
     */
    createOffer(): Promise<RTCSessionDescriptionInit | null>;
    /**
     * Handles an incoming signaling message (offer, answer, or ICE candidate).
     * @param message The signaling message.
     * @param polite Boolean indicating if this peer is the polite peer (resolves glare).
     */
    handleSignalingMessage(message: SignalingMessage, polite?: boolean): Promise<void>;
    /**
     * Creates and sends an answer (for the answering peer).
     */
    createAnswer(): Promise<RTCSessionDescriptionInit | null>;
    /**
     * Closes the peer connection and cleans up resources.
     */
    close(): void;
    /**
     * Get the local media stream.
     */
    getLocalStream(): MediaStream | null;
    /**
     * Get the remote media streams.
     */
    getRemoteStreams(): MediaStream[];
    /**
     * Get the current peer connection state.
     */
    getConnectionState(): RTCPeerConnectionState | null;
    restartIce(): void;
    /**
     * Starts an interval that periodically checks `getStats()` to detect stuck video streams
     * (e.g. from system sleep). It ensures auto-recovery via bidirectional ICE restart.
     */
    startStatsMonitor(): void;
    /**
     * Cleans up the stats monitoring interval.
     */
    stopStatsMonitor(): void;
}
