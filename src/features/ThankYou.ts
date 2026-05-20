import { configrationManager } from "../core/ConfigrationManager";
import { StepInterface, StepResult } from "../core/StepInterface";
import { examCameraUi } from "../ui/featuresUI/ExamCameraSetupUI";
import ui from "../ui/UiManager";

class ThankYou extends StepInterface  {
    
    envAlias: string = 'Thank_You';

    constructor() {
        super();
    }     

    start(): void {
        setTimeout(() => {
            examCameraUi.stopRecording('all');
        }, 3000);
        ui.hide(ui.id('think_interview_leave_popup'));
        ui.hide(ui.id('think_interview_lobby'));
        ui.hide(ui.id('thinkproc_interview_lobby'));
        ui.hide(ui.id('thinkproc-feedback-popup-tab'));
        const closeBtn = ui.id("thinkpro-thank-you-close-btn");
        if(closeBtn){
            ui.click(closeBtn, async()=>{
                this.manager().closeApplication();
            })
        }
    }

    result(): StepResult {
        return this.resultData;
    }

}

export const thankYou = new ThankYou();