/**
 *
 */
declare class IdUi {
    /**
     *
     * @param stream
     */
    setStream(stream: MediaStream): HTMLVideoElement | undefined;
    /**
     *
     * @param message
     */
    setMessage(message: string): void;
    /**
     *
     */
    showButton(): void;
    /**
     *
     */
    hideButon(attempNumber: number): void;
}
export declare const idUi: IdUi;
export {};
