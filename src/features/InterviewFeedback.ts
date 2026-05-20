import { configrationManager } from "../core/ConfigrationManager";
import { liveStreamManager, LiveStreamManager } from "../core/LiveStreamManager";
import { StepInterface, StepResult } from "../core/StepInterface";
import { stepUIManager } from "../core/StepUIManager";
import ui from "../ui/UiManager";
import {FeedbackManager} from "../core/FeedbackManager";
import request from "../core/RequestManager";
import { util } from "@tensorflow/tfjs";
import utility from "../core/Utility";
import {feedbackUI} from "../ui/featuresUI/FeedbackUI"

class InterviewFeedback extends StepInterface  {

    envAlias: string = 'Feedback';
    feedback: FeedbackManager;

    constructor() {
        super();
        this.feedback = new FeedbackManager();
    }     

    start(): void {
        ui.hide(ui.id('thinkX_compatibility_wrapper'));
        ui.hide(ui.id('think_interview_lobby'));
        ui.hide(ui.id('thinkproc_interview_lobby'));
        // if(configrationManager.userType === '2'){
        //      ui.show(ui.id('thinkproc-feedback-popup-tab'));
        // }else if(configrationManager.userType === '3'){
        //      ui.show(ui.id('thinkproc-feedback-popup-tab'));
        // }
        this.renderFeedbackSections();
    }

    async renderFeedbackSections(): Promise<void> {
        try { 
            const apiResponse = await this.feedback.getFeedbackSkillList();
            const functional = apiResponse?.data?.functional ?? { data: [] };
            const behavioural = apiResponse?.data?.behavioural ?? { data: [] };
            const feedbackContainer = ui.id("thinkproc-feedbackContainer");
            if (feedbackContainer) feedbackContainer.innerHTML = "";
            feedbackUI.createSkillGroup("Functional Skills", functional.data || [], functional.skill_type_id ?? 0);
            feedbackUI.createSkillGroup("Behavioural Skills", behavioural.data || [], behavioural.skill_type_id ?? 0);
        } catch (err) {
            console.error("Failed to load feedback skills:", err);
        } finally {
            this.dispatchAllEventButton();
            if(configrationManager.userType === '3'){
                ui.show(ui.id('thinkproc-feedback-popup-tab'));
            }
        }
    }

    dispatchAllEventButton(){ 
        feedbackUI.dispatchNextBtn();
        feedbackUI.dispatchTextAeraKeyup();
        const submitBtn = ui.id("thinkproc-feedback-submit-btn");
        if(submitBtn){
            ui.click(submitBtn, async() => {
                this.ratingSubmit();
            })
        }
    }

    async ratingSubmit() {
        // Convert to array of objects
        let functionalArr = Object.entries(feedbackUI.functionalRatings).map(([id, value]) => ({
            id: parseInt(id),
            value: value
        }));
        let behaviouralArr = Object.entries(feedbackUI.behavouralRatings).map(([id, value]) => ({
            id: parseInt(id),
            value: value
        }));
        const descriptionElem = ui.id("thinkproc-feedback-comment-textarea") as HTMLTextAreaElement | null;
        const description = descriptionElem ? descriptionElem.value : '';
        const apiResponse = this.feedback.submitFeedbackSkillList(functionalArr, behaviouralArr, description);
        utility.log("Feedback submitted successfully!");
        this.end(0, false);
    }
    
    result(): StepResult {
        return this.resultData;
    }

}

export const interviewFeedback = new InterviewFeedback();