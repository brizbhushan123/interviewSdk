import { configrationManager } from '../core/ConfigrationManager';
import { StepInterface, StepResult } from '../core/StepInterface';

class Complete extends StepInterface {
  envAlias: string = 'Complete';

  constructor() {
    super();
  }

  start(): void {
    this.resultData.status = true;
    this.resultData.info = 'complete exam';
    if(configrationManager.isTerminated == false){
      this.manager().closeApplication();
      this.end();
    }
  }

  result(): StepResult {
    return this.resultData;
  }
}

export const completeExam = new Complete();
