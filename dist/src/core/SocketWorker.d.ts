export interface SocketWorkterMessage {
    type: 'DATA' | 'STATUS';
    on: string;
    payload: any;
}
