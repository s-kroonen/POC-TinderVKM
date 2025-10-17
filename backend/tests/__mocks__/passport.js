import { jest } from "@jest/globals";

const passport = {
  use: jest.fn(),
  initialize: jest.fn(() => (req, res, next) => next()),
  session: jest.fn(() => (req, res, next) => next()),
  authenticate: jest.fn(() => (req, res, next) => next()),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
};

export default passport;
export const {
  use,
  initialize,
  session,
  authenticate,
  serializeUser,
  deserializeUser,
} = passport;
