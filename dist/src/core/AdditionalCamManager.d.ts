declare class AdditionCamManager {
    streamMap: {
        [user: string]: {
            streams: MediaStream;
            user: string;
        }[];
    };
    userLeftSubscribed: boolean;
    constructor();
    registerStream(user: string, stream: MediaStream): void;
    getStreamType(stream: MediaStream): "audio" | "video" | "both" | "none";
    disConnectStream(user: string): void;
    getStreamMap(user?: string): {
        [user: string]: {
            streams: MediaStream;
            user: string;
        }[];
    } | {
        streams: MediaStream;
        user: string;
    }[];
}
export declare const additionalCam: AdditionCamManager;
export {};
