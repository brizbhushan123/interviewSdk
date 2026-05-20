import { audioDetails, cameraDetails } from './LiveStreamManager';
import { PeerConnectionOptions, PeerManager } from './PeerManager';
interface PeerInfo {
    [key: string]: PeerManager;
}
/**
 *
 */
declare class PeerConnectionManager {
    peerConf: PeerConnectionOptions | null;
    event: {
        PEER_CONNECION_CLOSE: string;
        PEER_OFFER: string;
        PEER_ANSWER: string;
        PEER_ICECANDIDATE: string;
    };
    peerList: PeerInfo;
    peerIceBeforeAnswerArray: {
        [key: string]: RTCIceCandidateInit[];
    };
    /**
     *
     */
    Init(): void;
    /**
     *
     * @param from
     */
    hasConnection(from: string): boolean;
    /**
     *
     */
    InitListner(): void;
    /**
     *
     * @param to
     */
    connect(to: string, ...streams: (cameraDetails | audioDetails)[]): Promise<void>;
    /**
     *
     * @param to
     */
    getPeer(to: string, offer: boolean): PeerManager | null;
    /**
     *
     * @param to
     * @param {...any} streams
     */
    streamAdd(to: string, ...streams: (cameraDetails | audioDetails)[]): Promise<void>;
    /**
     *
     * @param to
     * @param {...any} streams
     */
    streamAddAll(...streams: (cameraDetails | audioDetails)[]): Promise<void>;
    /**
     *
     * @param to
     * @param {...any} streams
     */
    removeAdd(to: string, ...streams: (cameraDetails | audioDetails)[]): Promise<void>;
    /**
     *
     * @param peer
     * @param to
     */
    private createOffer;
    /**
     *
     * @param to
     */
    close(to: string): void;
    closeAll(): void;
}
export declare const peer: PeerConnectionManager;
export {};
