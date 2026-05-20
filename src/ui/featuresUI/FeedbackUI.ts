import {FeedbackManager} from "../../core/FeedbackManager";
import { configrationManager } from '../../core/ConfigrationManager';
import utility from '../../core/Utility';
import ui from '../UiManager';

class FeedbackUI  {

    functionalRatings: { [key: string]: string | number };
    behavouralRatings: { [key: string]: string | number };
    feedback: FeedbackManager;
    functionalSkillCount: number;
    behavouralSkillCount: number;

    constructor() {
        this.functionalRatings = {};
        this.behavouralRatings = {};
        this.feedback = new FeedbackManager();
        this.functionalSkillCount = 0; 
        this.behavouralSkillCount = 0; 
    }     


    // Create a group of skill rating controls and append to #feedbackContainer
    createSkillGroup(title: string, skills: Array<any>, skill_type_id: number): void {
        let feedbackContainer = null;
        if(skill_type_id == 1){
            this.functionalSkillCount = Object.keys(skills).length;
            feedbackContainer = ui.id("thinkproc-feedback-functional-list-container");
        }else if(skill_type_id == 2){
            this.behavouralSkillCount = Object.keys(skills).length;
            feedbackContainer = ui.id("thinkproc-feedback-behavoural-list-container");
        }
        if (!feedbackContainer) 
            return;
        ui.innerHTML(feedbackContainer, '');
        skills.forEach(skill => {
          
            const section = ui.createElement("div");
            ui.addClass(section, "thinkproc-feedback-skill-card");

            const h4 = ui.createElement("h4");
            h4.textContent = skill.name || "Untitled Skill";
            section.appendChild(h4);

            const p = ui.createElement("p");
            p.textContent = skill.key;
            section.appendChild(p);

            const ratingDiv = ui.createElement("div");
            ui.addClass(ratingDiv, "thinkproc-feedback-rating");
            ratingDiv.setAttribute("data-skill-id", String(skill.id));
            // Create 10 rating spans
            for (let i = 1; i <= 10; i++) {
                const span = ui.createElement("span");
                span.textContent = String(i);
                span.dataset.value = String(i);
                span.setAttribute("role", "button");
                span.tabIndex = 0; 
                ui.addClass(span,"skill_"+skill_type_id+"_"+skill.id);
                // click
                span.addEventListener("click", () => this.handleRatingClick(skill.id, i, ratingDiv, skill_type_id));
                // keyboard support (Enter / Space)
                span.addEventListener("keydown", (ev: KeyboardEvent) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                        ev.preventDefault();
                        this.handleRatingClick(skill.id, i, ratingDiv, skill_type_id);
                    }
                });
                ratingDiv.appendChild(span);
            }
            
            section.appendChild(ratingDiv);
            feedbackContainer.appendChild(section);
        });
        if(skill_type_id == 2){
            const commentArea = this.createCommentHtmlDom();
            feedbackContainer.appendChild(commentArea);
        }
    }

    createCommentHtmlDom(){
        let commentDiv = ui.createElement('div');
        ui.addClass(commentDiv, 'thinkproc-feedback-comment-section');
        const h3 = ui.createElement('h3');
        h3.textContent = 'Write overall session comment';
        const p = ui.createElement('p');
        p.textContent = 'Give feedback to the candidate you interviewed';
        const div = ui.createElement('div');
        const textarea = ui.createElement('textarea') as HTMLTextAreaElement;
        textarea.placeholder = 'Type Here';
        textarea.id = 'thinkproc-feedback-comment-textarea';
        const commentBox = div.appendChild(textarea);
        commentDiv.appendChild(h3);
        commentDiv.appendChild(p);
        commentDiv.appendChild(commentBox);
        return commentDiv;

    }

    handleRatingClick(skillId: number, value: number, container: HTMLElement, skill_type_id: number): void {
        const elements = ui.class("skill_" +skill_type_id+"_"+ skillId);
        if (elements) {
            Array.from(elements).forEach(element => {
                if(element.getAttribute('data-value') != String(value)){
                    ui.removeClass(<HTMLElement>element, "active");
                }else{
                    ui.addClass(<HTMLElement>element, "active");
                }
            });
        }
        
        if(skill_type_id == 1){
            this.functionalRatings[String(skillId)] = value;
            let selectSkillCount = Object.keys(this.functionalRatings).length;
            const nextBtn = ui.id("thinkproc-feedback-next-btn");
            if(this.functionalSkillCount == selectSkillCount){
               if(nextBtn){
                   ui.removeClass(nextBtn,'thinkproc-disable');
                }
            }else{
                ui.addClass(nextBtn,'thinkproc-disable');
            }   
        }else if(skill_type_id ==2){
            this.behavouralRatings[String(skillId)] = value;
            let selectSkillCount = Object.keys(this.behavouralRatings).length;
            const submitBtn = ui.id("thinkproc-feedback-submit-btn");
            const textAreaVal = ui.id("thinkproc-feedback-comment-textarea") as HTMLTextAreaElement | null;
            if(this.behavouralSkillCount == selectSkillCount && textAreaVal?.value != ''){
                if(submitBtn){
                   ui.removeClass(submitBtn,'thinkproc-disable');
                }
            }else{
                ui.addClass(submitBtn,'thinkproc-disable');
            }
        }
    }

    dispatchNextBtn() :void{
        ui.hide(ui.id("loaderOverlay"));
        const nextBtn = ui.id("thinkproc-feedback-next-btn");
        if(nextBtn){
            ui.click(nextBtn, async() => {
                ui.hide(ui.id("thinkproc-feedback-functional-section"));
                ui.show(ui.id("thinkproc-feedback-behavoural-section"));
            })
        }
    }
    dispatchTextAeraKeyup() :void{
         const textArea = ui.id("thinkproc-feedback-comment-textarea") as HTMLTextAreaElement | null;
        if(textArea){
            ui.keyup(textArea, async()=>{
                const submitBtn = ui.id("thinkproc-feedback-submit-btn");
                const selectSkillCount = Object.keys(this.behavouralRatings).length;
                if(this.behavouralSkillCount == selectSkillCount && textArea?.value != ''){
                    ui.removeClass(submitBtn,'thinkproc-disable');
                }else{
                    ui.addClass(submitBtn,'thinkproc-disable');
                }
            })
        }
    }

}
export const feedbackUI = new FeedbackUI();


