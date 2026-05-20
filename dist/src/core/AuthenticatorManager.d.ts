import { ErrorDefinition } from './ErrorManager';
export interface SessionInfo {
    sessionToken: string;
}
export interface ThinkProctorOptions {
    api_key: string;
    sdk_token: string;
    unique_user_id: string;
    user_name: string;
    group_code: string;
    group_name: string;
    template_code: string;
    language: string;
    registration_id_url: string;
    registration_photo_url: string;
    session_token?: string;
}
export interface ValidatorResponse {
    sessionInfo: SessionInfo;
    config?: {
        [key: string]: any;
    };
    template?: any;
    language?: string;
}
/**
 *
 */
declare class Authenticator {
    /**
     *
     */
    constructor();
    /**
     *
     * @param options
     * @param success
     * @param error
     */
    validate(options: ThinkProctorOptions, success?: (response: ValidatorResponse) => void, error?: (error: ErrorDefinition) => void): Promise<any>;
    secondaryCameraConnect(session_token: string, camera: string, step: string, current_env_alias: string, link_data: string): Promise<unknown>;
    getRandomDelay(): number;
}
export declare const authenticator: Authenticator;
export {};
