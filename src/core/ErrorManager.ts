export type ErrorDefinition = {
  code: number;
  message: string;
};

/* Author : Prateek Jaiswal */

/**
 *
 */
class ErrorManager {
  errorMap: Record<string, Record<string, ErrorDefinition>> = {
    // General errors
    ERROR: {
      DEFAULT: { code: 4500, message: 'Something went wrong' },

      // Authentication errors
      INVALID_CREDENTIALS: { code: 4501, message: 'Invalid email or password' },
      UNAUTHORIZED: { code: 4502, message: 'You are not authorized to perform this action' },
      CAMERA_NOT_FOUND: { code: 4503, message: 'Selected camera not found' },
      AUDIO_NOT_FOUND: { code: 4504, message: 'Selected audio not found' },
      INVALID_ID_IMAGES: { code: 4505, message: 'Registration ID is not a valid JPG/PNG/JPEG URL' },
      INVALID_PHOTO_IMAGES: {
        code: 4506,
        message: 'Registration Photo is not a valid JPG/PNG/JPEG URL',
      },
      NOT_INITIALIZE_INIT: { code: 4507, message: 'Init function is not initialized' },
      NOT_INITIALIZE_COMPATIBILITY: {
        code: 4508,
        message: 'The checkCompatibility function is not initialized.',
      },
      ALREADY_INITIALIZE_INIT: { code: 4509, message: 'The init function is already initialized.' },
      ALREADY_INITIALIZE_COMPATIBILITY: {
        code: 4510,
        message: '"The checkCompatibility function is already initialized.',
      },
      ALREADY_INITIALIZE_LAUNCH: {
        code: 4511,
        message: 'The launch function is already initialized.',
      },
    },

    // Validation-related errors
    VALIDATION: {
      MISSING_FIELDS: { code: 4603, message: 'Required fields are missing' },
      INVALID_FORMAT: { code: 4604, message: 'Input format is invalid' },
      MISSING_API_KEY: { code: 4605, message: 'Missing or invalid API key' },
      MISSING_GROUP_CODE: { code: 4606, message: 'Missing or invalid group code' },
      MISSING_UNIQUE_USER_ID: { code: 4607, message: 'MIssing or invalid user id' },
    },

    // Routing-related errors
    ROUTES: {
      NOT_FOUND: { code: 4705, message: 'Requested route does not exist' },
    },
  };

  /**
   * Get full error object by category and key.
   * @param category - e.g. 'ERROR', 'VALIDATION', 'ROUTES'
   * @param key - e.g. 'INVALID_CREDENTIALS'
   */
  getError(category: string, key: string): ErrorDefinition {
    return this.errorMap[category]?.[key] || this.errorMap.ERROR.DEFAULT;
  }

  /**
   *
   * @param category
   * @param key
   */
  throwError(category: string, key: string) {
    const error = this.getError(category, key);
    throw new Error(`${error.code} : ${error.message}`);
  }
}

export const errorManager = new ErrorManager();
