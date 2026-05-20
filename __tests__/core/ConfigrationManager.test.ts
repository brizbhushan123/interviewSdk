import { configrationManager } from "../../src/core/ConfigrationManager";
import utility from "../../src/core/Utility";

// filepath: /var/www/html/thinkproctorcandidatesdk/src/core/ConfigrationManager.test.ts

jest.mock("../../src/core/Utility");

describe("ConfigrationManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset instance properties
    configrationManager.config = {};
    configrationManager.flattenedTemplate = {};
    configrationManager.url = undefined;
    configrationManager.signal_node_url = '';
    configrationManager.appEnv = 'local';
    configrationManager.recording_node_url = undefined;
    configrationManager.turn_url = '';
    configrationManager.stun_url = '';
    configrationManager.stun_password = '';
    configrationManager.stun_username = '';
    configrationManager.turn_password = '';
    configrationManager.turn_username = '';
    configrationManager.socketUserName = '';
    configrationManager.language = 'en';
    configrationManager.speechUrl = '';
    configrationManager.recordingUrl = ''; 
  });

  test("should set all config properties with setConfig", () => {
    const data = {
      url: "url",
      signal_node_url: "signal",
      recording_node_url: "rec",
      turn_url: "turn",
      stun_url: "stun",
      stun_password: "stunpass",
      stun_username: "stunuser",
      turn_password: "turnpass",
      turn_username: "turnuser",
      env: "prod",
      speechURL: "speech",
    };
    configrationManager.setConfig(data);
    expect(configrationManager.url).toBe("url");
    expect(configrationManager.signal_node_url).toBe("signal");
    expect(configrationManager.recording_node_url).toBe("rec");
    expect(configrationManager.turn_url).toBe("turn");
    expect(configrationManager.stun_url).toBe("stun");
    expect(configrationManager.stun_password).toBe("stunpass");
    expect(configrationManager.stun_username).toBe("stunuser");
    expect(configrationManager.turn_password).toBe("turnpass");
    expect(configrationManager.turn_username).toBe("turnuser");
    expect(configrationManager.appEnv).toBe("prod");
    expect(configrationManager.speechUrl).toBe("speech");
    expect(configrationManager.config).toEqual(data);
  });

  test("should extract value and data from template", () => {
    const template = {
      a: { value: 1, data: 2 },
      b: { value: 3 },
      c: { data: 4 },
      d: 5,
    };
    const result = configrationManager.extractValueAndData(template);
    console.log(result);
    expect(result).toEqual({
      a: { value: 1, data: 2 },
      b: { value: 3 },
      c: { data: 4 },
      d: 5,
    });
    expect(configrationManager.valueMap).toEqual(result);
  });

  test("should set socketUserName with socketUser", () => {
    configrationManager.socketUser("testUser");
    expect(configrationManager.socketUserName).toBe("testUser");
  });

  test("should set language with saveLang", () => {
    configrationManager.saveLang("fr");
    expect(configrationManager.language).toBe("fr");
  });

  test("should decode and set speechUrl with speechURL", () => {
    (utility.decodeBase64 as jest.Mock).mockReturnValue("decodedUrl");
    configrationManager.speechURL(btoa("encodedUrl"));
    expect(utility.decodeBase64).toHaveBeenCalledWith("encodedUrl");
    expect(configrationManager.speechUrl).toBe("decodedUrl");
  });

  describe("isValidAndReachableImageUrl", () => {
    // Patch global Image for these tests
    let originalImage: any;
    beforeAll(() => {
      originalImage = (global as any).Image;
    });
    afterAll(() => {
      (global as any).Image = originalImage;
    });

    test("should return false for invalid protocol", async () => {
      const result = await configrationManager.isValidAndReachableImageUrl("ftp://example.com/image.jpg");
      expect(result).toBe(false);
    });

    test("should return false for invalid extension", async () => {
      const result = await configrationManager.isValidAndReachableImageUrl("http://example.com/image.gif");
      expect(result).toBe(false);
    });

    test("should resolve true if image loads", async () => {
      function MockImage(this: any) {
        setTimeout(() => this.onload(), 0);
      }
      (global as any).Image = MockImage as any;
      const result = await configrationManager.isValidAndReachableImageUrl("http://example.com/image.jpg");
      expect(result).toBe(true);
    });

    test("should resolve false if image fails to load", async () => {
      function MockImage(this: any) {
        setTimeout(() => this.onerror(), 0);
      }
      (global as any).Image = MockImage as any;
      const result = await configrationManager.isValidAndReachableImageUrl("http://example.com/image.jpg");
      expect(result).toBe(false);
    });

    test("should return false for invalid URL", async () => {
      const result = await configrationManager.isValidAndReachableImageUrl("not a url");
      expect(result).toBe(false);
    });
  });
});