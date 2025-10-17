export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true, isolatedModules: true }],
  },

  extensionsToTreatAsEsm: [".ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>"],
  verbose: true,
  maxWorkers: 1,
  globals: {
    "ts-jest": {
      isolatedModules: true,
      diagnostics: { ignoreCodes: [151002] },
    },
  },
  moduleNameMapper: {
    "^winston$": "<rootDir>/tests/__mocks__/winston.js",
    "^passport$": "<rootDir>/tests/__mocks__/passport.js",
    "^passport-microsoft$": "<rootDir>/tests/__mocks__/passport-microsoft.js",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

};
