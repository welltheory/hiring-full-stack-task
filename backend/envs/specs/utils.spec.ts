import { getBoolean, getNumber, getString, required } from '$envs/utils';

describe('envs/utils', () => {
  describe('getBoolean', () => {
    it('should return true when value is "true"', () => {
      // TODO: Implement this test
    });

    it('should return true when value is "1"', () => {
      // TODO: Implement this test
    });

    it('should return false when value is "false"', () => {
      // TODO: Implement this test
    });

    it('should return defaultValue when value is undefined', () => {
      // TODO: Implement this test
    });
  });

  describe('getNumber', () => {
    it('should parse and return a valid number', () => {
      // TODO: Implement this test
    });

    it('should return defaultValue when value is undefined', () => {
      // TODO: Implement this test
    });

    it('should return defaultValue when value is not a valid number', () => {
      // TODO: Implement this test
    });
  });

  describe('getString', () => {
    it('should return the value when provided', () => {
      // TODO: Implement this test
    });

    it('should return defaultValue when value is undefined', () => {
      // TODO: Implement this test
    });

    it('should return defaultValue when value is empty string', () => {
      // TODO: Implement this test
    });
  });

  describe('required', () => {
    it('should return the value when provided', () => {
      // TODO: Implement this test
    });

    it('should throw an error when value is undefined', () => {
      // TODO: Implement this test
      // Hint: Use expect(() => required(undefined, 'VAR_NAME')).toThrow()
    });

    it('should throw an error with the variable name in the message', () => {
      // TODO: Implement this test
    });
  });
});
