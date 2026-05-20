declare class ChatManager {
    eventInitialized: boolean;
    constructor();
    join(): Promise<void>;
    leaveChat(): void;
    sendText(message: string): void;
    sendData(mode: string, data: any): void;
}
export declare const chat: ChatManager;
export {};
