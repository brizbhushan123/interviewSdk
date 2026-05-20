/**
 *
 */
declare class AIManager {
    frameRate: number;
    thinkAi: any;
    token: string;
    /**
     *
     */
    constructor();
    /**
     *
     */
    setFrameRate(frame: number): void;
    /**
     *
     */
    loaddata(): Promise<void>;
    /**
     *
     * @param video
     * @param callback
     */
    idVerify(video: HTMLVideoElement, callback: Function): any;
    /**
     *
     * @param video
     * @param callback
     */
    photoVerify(video: HTMLVideoElement, callback: Function): any;
    /**
     *
     * @param video
     * @param callback
     */
    roomVerify(video: HTMLVideoElement, callback: Function): any;
    /**
     *
     * @param video
     * @param callback
     */
    leftProfile(video: HTMLVideoElement, callback: Function): any;
    /**
     *
     * @param video
     * @param callback
     */
    rightProfile(video: HTMLVideoElement, callback: Function): any;
    /**
     *
     * @param video
     * @param callback
     */
    handGesture(video: HTMLVideoElement, callback: Function): any;
    deskScan(video: HTMLVideoElement, callback: Function): any;
    examAI(video: HTMLVideoElement, callback: Function): any;
    stopExamination(callback: Function): any;
    /**
     *
     * @param callback
     */
    stopPhotoAndID(): Promise<unknown>;
    /**
     *
     * @param callback
     */
    stopRoomScan(callback: Function): any;
    /**
     *
     * @param callback
     */
    stopLeftProfile(callback: Function): any;
    /**
     *
     * @param callback
     */
    stopRightProfile(callback: Function): any;
    /**
     *
     * @param callback
     */
    stopHandGesture(callback: Function): any;
    /**
     *
     * @param callback
     */
    stopDeskScan(end: number | undefined, callback: Function): any;
    secondaryCameraPosition(video: HTMLVideoElement, cameraName: string, callback: Function): any;
    stopSecondaryCameraPosition(callback: Function): any;
    secondaryCameraPositionValidate(video: HTMLVideoElement, callback: Function): any;
    stopSecondaryCameraPositionValidate(callback: Function): any;
    getUFMCode(ufmType: string, codeArr: number[]): Promise<number>;
    getSmartProctorUFM(data: any): void;
    getSmartProctorCandidateMsg(msg: string): void;
    secondaryCameraSideMonitoring(video: HTMLVideoElement, callback: Function): any;
    stopSecondaryCameraSideMonitoring(callback: Function): any;
    secondaryCameraBackMonitoring(video: HTMLVideoElement, callback: Function): any;
    stopSecondaryCameraBackMonitoring(callback: Function): any;
    secondaryCameraFrontMonitoring(video: HTMLVideoElement, callback: Function): any;
    stopSecondaryCameraFrontMonitoring(callback: Function): any;
    aiLoaded(callback: Function): any;
}
export declare const ai: AIManager;
export {};
