declare class ErrorLogger {
    errorLogLimiter: {
        [key: string]: number;
    };
    logLimitCount: number;
    logLimitWindow: number;
    safeHandler(fn: Function, meta?: any): (this: any, ...args: any[]) => any;
    unknownErrorListener(): void;
    isMySdkError(source: string | null, error: any): any;
    logError(error: any, meta?: object): void;
}
export declare const errorLogger: ErrorLogger;
export {};
