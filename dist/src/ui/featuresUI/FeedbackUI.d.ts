import { FeedbackManager } from "../../core/FeedbackManager";
declare class FeedbackUI {
    functionalRatings: {
        [key: string]: string | number;
    };
    behavouralRatings: {
        [key: string]: string | number;
    };
    feedback: FeedbackManager;
    functionalSkillCount: number;
    behavouralSkillCount: number;
    constructor();
    createSkillGroup(title: string, skills: Array<any>, skill_type_id: number): void;
    createCommentHtmlDom(): HTMLElement;
    handleRatingClick(skillId: number, value: number, container: HTMLElement, skill_type_id: number): void;
    dispatchNextBtn(): void;
    dispatchTextAeraKeyup(): void;
}
export declare const feedbackUI: FeedbackUI;
export {};
