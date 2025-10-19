import { jest } from '@jest/globals';

export default {
  createLogger: () => ({
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  }),
  transports: { Console: jest.fn() },
  format: {
    combine: jest.fn((...args) => args), // optional: just return args
    timestamp: jest.fn(() => () => {}), // returns a no-op transform
    printf: jest.fn(() => () => {}),
    splat: jest.fn(() => () => {}),
    json: jest.fn(() => () => {}),
    errors: jest.fn(() => () => {}),
    simple: jest.fn(() => () => {}),
  },
};
