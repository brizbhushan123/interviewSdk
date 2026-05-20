import { StepInterface, StepResult } from '../core/StepInterface';
declare class Complete extends StepInterface {
    envAlias: string;
    constructor();
    start(): void;
    result(): StepResult;
}
export declare const completeExam: Complete;
export {};
