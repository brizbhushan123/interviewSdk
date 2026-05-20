export interface RecordingSocketMessage {
    on: "OPEN" | "CLOSE" | "ERROR" | "MESSAGE";
    payload: any;
}
