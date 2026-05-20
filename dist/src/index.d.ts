import './ui/Init.css';
import { EVENT, EventCallbacks } from './core/EventManager';
import { ThinkProctorOptions, SessionInfo } from './core/AuthenticatorManager';
declare const ThinkProctor: {
    init(options: ThinkProctorOptions): Promise<SessionInfo>;
    on<K extends (typeof EVENT)[keyof typeof EVENT]>(event: K, fn: EventCallbacks[K]): void;
    checkCompatibility(): Promise<any>;
    launch(): Promise<any>;
    complete(): Promise<void>;
    pause(): false | undefined;
    play(): void;
    secondaryConnect(session_token: string, camera: string, step: string, current_env_alias: string, link_data: string): Promise<any>;
    config(): void;
    joinRoom(roomId: string): void;
    leaveRoom(): void;
    sendRoomMessage(message: any): void;
};
export default ThinkProctor;
