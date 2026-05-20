export type ErrorDefinition = {
    code: number;
    message: string;
};
/**
 *
 */
declare class ErrorManager {
    errorMap: Record<string, Record<string, ErrorDefinition>>;
    /**
     * Get full error object by category and key.
     * @param category - e.g. 'ERROR', 'VALIDATION', 'ROUTES'
     * @param key - e.g. 'INVALID_CREDENTIALS'
     */
    getError(category: string, key: string): ErrorDefinition;
    /**
     *
     * @param category
     * @param key
     */
    throwError(category: string, key: string): void;
}
export declare const errorManager: ErrorManager;
export {};
