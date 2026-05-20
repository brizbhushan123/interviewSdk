import { ExamMonitor } from '../features/ExamMonitor';
import { ai } from './AIManager';
import { configrationManager } from './ConfigrationManager';
import { SDK_EVENT, sdkEvents } from './InternalEventManager';
import request from './RequestManager';
import { socket } from './SocketManager';
import { stepManager } from './StepsManager';
import { ufmM } from './UfmManager';
import utility from './Utility';

export class FeedbackManager {

  async getFeedbackSkillList() {
    return await request.getFeedbackSkill();
  }

  async submitFeedbackSkillList(functional: object, behavioural: object, description: string) {
    return await request.postFeedbackSkill({ functional, behavioural, description });
  }

 
}
