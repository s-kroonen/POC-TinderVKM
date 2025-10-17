import { jest } from "@jest/globals";

// Mock Microsoft OAuth2 Strategy as a named export
export class Strategy {
  constructor() {
    // no-op constructor
  }
}

// Optional: allow tracking for debugging
export const mockStrategyConstructor = jest.fn().mockImplementation(() => new Strategy());

// Support both import styles if needed
export default { Strategy };
