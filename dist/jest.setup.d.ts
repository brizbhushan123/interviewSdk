import { SessionInfo } from "./src/core/AuthenticatorManager";
import ThinkProctor from "./src/index";
declare const _mockSpeechSynthesis: SpeechSynthesis;
declare global {
    var mockFetch: jest.Mock;
    var mockSdkCallback: jest.Mock<typeof ThinkProctor>;
    var sessionToken: SessionInfo;
    var htmlTemplate: string;
    var templateJson: string;
    var mockSpeechSynthesis: typeof _mockSpeechSynthesis;
    var sessionResponse: any;
}
export {};
