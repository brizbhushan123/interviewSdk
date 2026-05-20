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
export declare class SocketManager {
    static socketUrl: string;
    private socket;
    private roomId;
    private roomJoined;
    networkTimeout: NodeJS.Timeout | undefined;
    updateDashboardInterval: NodeJS.Timeout | undefined;
    networkDisconnectTimeout: NodeJS.Timeout | undefined;
    networkPopupShown: boolean;
    socketeventList: {
        [K: string]: Function[];
    };
    workerPath: string;
    socketWorker: Worker | null;
    heartbeatInterval: NodeJS.Timeout | undefined;
    /**
     *
     */
    constructor();
    /**
     *
     * @param socketUrl
     * @param authToken
     */
    Init(socketUrl: string, authToken: string): void;
    /**
     *
     * @param eventName
     * @param fn
     */
    on(eventName: string, fn: Function): void;
    /**
     *
     * @param eventName
     * @param fn
     */
    off(eventName: string): void;
    /**
     *
     * @param eventName
     * @param params
     * @param to
     */
    emit(eventName: string, params?: any, to?: string, ack?: Function): void;
    /**
     *
     * @param msg
     * @param to
     */
    getMessage(msg?: any, to?: string): SocketMessage;
    /**
     *
     */
    setupSocketListeners(): void;
    /**
     *
     */
    userOnline(): void;
    /**
     *
     */
    heartbeat(): void;
    /**
     *
     */
    onlineUserCallback(userIds: {
        [userId: string]: boolean;
    }): void;
    /**
     *
     * @param userIds
     */
    onlineUsers(userIds: string[]): Promise<{
        [userId: string]: boolean;
    }>;
    sendMessage(to: string, message: ChatMessage): void;
    goingOffline(): void;
    createRoom(): void;
    joinRoom(): void;
    joinOtherRoom(roomId: string): void;
    leaveRoom(): void;
    leaveOtherRoom(roomId: string): void;
    sendRoomMessage(message: ChatMessage): void;
    leavingSocket(): void;
    sendOtherRoomMessage(roomId: string, message: ChatMessage): void;
    sendProctorMsg(message: ChatMessage): void;
    setProctor(proctorId: string): void;
    leavingProctor(): void;
    updateProctorDashboard(): void;
    leaveProctor(): void;
    internalMessages(mode: string, text: string, message: Record<string, any>, roomId: string, from: string): boolean;
    cameraRevoke(cameraName: string): void;
    networkPopup(): void;
    closeBtnNetwork(): void;
    networkReconnect(): void;
    closeSocket(): void;
}
export declare const socket: SocketManager;
