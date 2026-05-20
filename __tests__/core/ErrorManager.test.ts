import { errorManager } from "../../src/core/ErrorManager";

// filepath: /var/www/html/thinkproctorcandidatesdk/src/core/ErrorManager.test.ts

describe('ErrorManager', () => {
  describe('getError', () => {
    it('should return the correct error object for valid category and key', () => {
      const error = errorManager.getError('ERROR', 'INVALID_CREDENTIALS');
      expect(error).toEqual({ code: 4501, message: 'Invalid email or password' });
    });

    it('should return the default error for invalid category', () => {
      const error = errorManager.getError('NON_EXISTENT', 'INVALID_CREDENTIALS');
      expect(error).toEqual({ code: 4500, message: 'Something went wrong' });
    });

    it('should return the default error for invalid key', () => {
      const error = errorManager.getError('ERROR', 'NON_EXISTENT_KEY');
      expect(error).toEqual({ code: 4500, message: 'Something went wrong' });
    });
  });

  describe('throwError', () => {
    it('should throw an error with the correct message for valid category and key', () => {
      expect(() => {
        errorManager.throwError('VALIDATION', 'MISSING_FIELDS');
      }).toThrow('4603 : Required fields are missing');
    });

    it('should throw an error with the default message for invalid category', () => {
      expect(() => {
        errorManager.throwError('NON_EXISTENT', 'INVALID_CREDENTIALS');
      }).toThrow('4500 : Something went wrong');
    });

    it('should throw an error with the default message for invalid key', () => {
      expect(() => {
        errorManager.throwError('ERROR', 'NON_EXISTENT_KEY');
      }).toThrow('4500 : Something went wrong');
    });
  });
});