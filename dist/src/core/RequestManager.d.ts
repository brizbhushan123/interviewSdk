import { ThinkProctorOptions } from './AuthenticatorManager';
/**
 *
 */
declare class RequestManager {
    /**
     *
     */
    getExample(): Promise<any>;
    /**
     *
     * @param data
     */
    postExample(data: any): Promise<any>;
    /**
     *
     * @param data
     */
    putExample(data: any): Promise<any>;
    /**
     *
     * @param data
     */
    deleteExample(): Promise<any>;
    /**
     *
     * @param data
     */
    sdkInitialize(data: ThinkProctorOptions): Promise<any>;
    /**
     *
     * @param data
     */
    secondaryCameraConnect(data: {
        camera_type: string;
    }): Promise<any>;
    /**
     *
     * @param data
     * @param data.environment
     */
    stageStart(data: {
        environment: string;
    }): Promise<any>;
    /**
     *
     * @param data
     * @param data.environment
     * @param data.log
     */
    stageEnd(data: {
        environment: string;
        log: any;
    }): Promise<any>;
    /**
     *
     * @param data
     * @param data.environment
     * @param file
     */
    uploadIdAndPhoto(data: {
        environment: string;
    }, file: Blob): Promise<any>;
    /**
     *
     * @param data
     * @param data.attempt_no
     */
    compareIdAndPhoto(data: {
        attempt_no: number;
    }): Promise<any>;
    /**
     *
     * @param data
     * @param data.ufm_type
     * @param data.environment
     * @param data.attempt_no
     * @param file
     */
    ufmLog(data: {
        ufm_type: string;
        environment: string;
        attempt_no: number;
        cameraAngle: string;
        ufm_subtype: number;
        code: number;
        ufm_data: any;
        ufmLogEntry?: any;
    }, file?: Blob): Promise<any>;
    regualarUfmLog(data: {
        environment: string;
        cameraAngle: string;
    }, file?: Blob): Promise<any>;
    /**
     *
     * @param data
     * @param data.environment
     * @param data.attempt_no
     */
    getRoomUfmList(data: {
        environment: string;
        attempt_no: number;
        requestufmOnly: number;
    }): Promise<any>;
    getAudio(data: {
        text: string;
        language_code: string;
        unique_key: string;
        direct: number;
    }): Promise<any>;
    QRCode(data: {
        camera_type: string;
        environment: string;
    }): Promise<any>;
    endExam(data: {
        environment: string;
    }): Promise<any>;
    checkSessionStatus(): Promise<any>;
    clearEscalation(): Promise<any>;
    getChat(): Promise<any>;
    sendChat(data: {
        is_message: number;
        message: string;
        environment: string;
        userType?: string;
    }): Promise<any>;
    qrInactive(data: {
        link_data: string;
    }): Promise<any>;
    checkCurrentQRstatus(data: {
        camera_type: string;
        environment: string;
    }): Promise<any>;
    deskOption(): Promise<any>;
    updateDeskOption(data: {
        desk_option_id: number;
        desk_reason: string;
    }): Promise<any>;
    getFeedbackSkill(): Promise<any>;
    postFeedbackSkill(data: {
        functional: object;
        behavioural: object;
        description: string;
    }): Promise<any>;
    getIdVerification(): Promise<any>;
    getUfmList(): Promise<any>;
    updateIDEscalation(data: {
        is_approved: number;
    }): Promise<any>;
}
declare const request: RequestManager;
export default request;
