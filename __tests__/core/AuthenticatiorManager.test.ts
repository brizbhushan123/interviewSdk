import { authenticator } from "../../src/core/AuthenticatorManager";
import { errorManager } from "../../src/core/ErrorManager";
import { configrationManager } from "../../src/core/ConfigrationManager";
import request from "../../src/core/RequestManager";
import utility from "../../src/core/Utility";
import api from "../../src/core/APIManager";
import { Init } from "../../src/ui/Init";

// filepath: /var/www/html/thinkproctorcandidatesdk/src/core/AuthenticatorManager.test.ts

jest.mock("../../src/core/ConfigrationManager");
jest.mock("../../src/core/RequestManager");
jest.mock("../../src/core/Utility");
jest.mock("../../src/core/APIManager");
jest.mock("../../src/ui/Init");

const validOptions = {
  api_key: "key",
  sdk_token: "token",
  unique_user_id: "user",
  user_name: "name",
  group_code: "group",
  group_name: "groupName",
  template_code: "template",
  language: "en",
  registration_id_url: "",
  registration_photo_url: "",
};

describe("AuthenticatorManager", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (configrationManager.isValidAndReachableImageUrl as jest.Mock).mockResolvedValue(true);
    (request.sdkInitialize as jest.Mock).mockResolvedValue(global.sessionResponse);
    (utility.decodeBase64 as jest.Mock).mockImplementation((str) => Buffer.from(str, "base64").toString());
    (api.setToken as jest.Mock).mockImplementation(() => {});
    (configrationManager.setConfig as jest.Mock).mockImplementation(() => {});
    (configrationManager.extractValueAndData as jest.Mock).mockImplementation(() => {});
    (configrationManager.saveLang as jest.Mock).mockImplementation(() => {});
    (configrationManager.socketUser as jest.Mock).mockImplementation(() => {});
    (Init as jest.Mock).mockImplementation(() => ({
      loadPage: jest.fn().mockResolvedValue(undefined),
    }));

    // // call session initialize api
    // mockFetch.mockImplementationOnce(() =>
    //   Promise.resolve({
    //     ok: true, // Simulate a successful HTTP status (2xx)
    //     json: () => Promise.resolve(global.sessionResponse), // Simulate the JSON response
    //   } as Response) // Type assertion to satisfy TypeScript
    // );
  });

  test("should call error callback if api_key is empty", async () => {
    const errorCb = jest.fn();
    await authenticator.validate({ ...validOptions, api_key: "" }, jest.fn(), errorCb);
    expect(errorCb).toHaveBeenCalledWith(errorManager.getError("VALIDATION", "MISSING_API_KEY"));
  });

  test("should call error callback if group_code is empty", async () => {
    const errorCb = jest.fn();
    await authenticator.validate({ ...validOptions, group_code: "" }, jest.fn(), errorCb);
    expect(errorCb).toHaveBeenCalledWith(errorManager.getError("VALIDATION", "MISSING_GROUP_CODE"));
  });

  test("should call error callback if unique_user_id is empty", async () => {
    const errorCb = jest.fn();
    await authenticator.validate({ ...validOptions, unique_user_id: "" }, jest.fn(), errorCb);
    expect(errorCb).toHaveBeenCalledWith(errorManager.getError("VALIDATION", "MISSING_UNIQUE_USER_ID"));
  });

  test("should call error callback if registration_id_url is invalid", async () => {
    (configrationManager.isValidAndReachableImageUrl as jest.Mock).mockResolvedValueOnce(false);
    const errorCb = jest.fn();
    await authenticator.validate({ ...validOptions, registration_id_url: "bad_url" }, jest.fn(), errorCb);
    expect(errorCb).toHaveBeenCalledWith(errorManager.getError("ERROR", "INVALID_ID_IMAGES"));
  });

  test("should call error callback if registration_photo_url is invalid", async () => {
    (configrationManager.isValidAndReachableImageUrl as jest.Mock).mockResolvedValueOnce(true).mockResolvedValueOnce(false);
    const errorCb = jest.fn();
    await authenticator.validate({ ...validOptions, registration_photo_url: "bad_url" }, jest.fn(), errorCb);
    expect(errorCb).toHaveBeenCalledWith(errorManager.getError("ERROR", "INVALID_PHOTO_IMAGES"));
  });

  test("should call success callback with correct data if all is valid", async () => {

    
    const successCb = jest.fn();
    await authenticator.validate(validOptions, successCb, jest.fn());
    expect(successCb).toHaveBeenCalledWith(expect.objectContaining({
      sessionInfo: { sessionToken: "session" },
      config: expect.any(String),
      template: expect.any(Object),
      language: "en",
    }));
  });

  test("should call error callback if sdkInitialize rejects", async () => {
    (request.sdkInitialize as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    const errorCb = jest.fn();
    await authenticator.validate(validOptions, jest.fn(), errorCb);
    expect(errorCb).toHaveBeenCalled();
  });
});