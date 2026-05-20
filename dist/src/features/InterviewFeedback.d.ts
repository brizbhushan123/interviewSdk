import { StepInterface, StepResult } from "../core/StepInterface";
import { FeedbackManager } from "../core/FeedbackManager";
declare class InterviewFeedback extends StepInterface {
    envAlias: string;
    feedback: FeedbackManager;
    constructor();
    start(): void;
    renderFeedbackSections(): Promise<void>;
    dispatchAllEventButton(): void;
    ratingSubmit(): Promise<void>;
    result(): StepResult;
}
export declare const interviewFeedback: InterviewFeedback;
export {};
