export interface APIManagerOptions {
    baseURL: string;
    headers?: Record<string, string>;
    timeout?: number;
}
export interface Files {
    name: string;
    File: Blob;
}
/**
 *
 */
export declare class APIManager {
    baseURL: string;
    headers: Record<string, string>;
    timeout: number;
    token: string;
    /**
     *
     * @param options
     */
    constructor(options: APIManagerOptions);
    /**
     *
     * @param path
     * @param params
     * @param tkn
     */
    setToken(tkn: string): void;
    getToken(): string;
    /**
     *
     * @param path
     * @param params
     */
    private buildURL;
    /**
     *
     * @param method
     * @param path
     * @param body
     * @param params
     * @param extraHeaders
     */
    private request;
    /**
     *
     * @param path
     * @param params
     * @param headers
     */
    get<T = any>(path: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    /**
     *
     * @param path
     * @param data
     * @param params
     * @param headers
     */
    post<T = any, U = any>(path: string, data: U, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    /**
     *
     * @param path
     * @param data
     * @param params
     * @param headers
     */
    put<T = any, U = any>(path: string, data: U, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    /**
     *
     * @param path
     * @param data
     * @param params
     * @param headers
     */
    patch<T = any, U = any>(path: string, data: U, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    /**
     *
     * @param path
     * @param params
     * @param headers
     */
    delete<T = any>(path: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    /**
     *
     * @param token
     * @param scheme
     */
    setAuthToken(token: string, scheme?: string): void;
    /**
     *
     */
    clearAuthToken(): void;
    /**
     *
     * @param path
     * @param data
     * @param files
     * @param params
     * @param headers
     */
    file<T = any, U = any>(path: string, data: U, files: Files[], params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
}
declare const api: APIManager;
export default api;
