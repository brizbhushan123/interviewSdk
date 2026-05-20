import { StepInterface, StepResult } from "../core/StepInterface";
declare class ThankYou extends StepInterface {
    envAlias: string;
    constructor();
    start(): void;
    result(): StepResult;
}
export declare const thankYou: ThankYou;
export {};
