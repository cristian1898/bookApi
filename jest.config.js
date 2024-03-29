/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/{features,controllers,utils}/**/*.ts",
    "!src/**/*.d.ts",
  ],
  moduleNameMapper: {
    "@app": "<rootDir>/src/app",
    "@config": "<rootDir>/src/config",
    "@errors": "<rootDir>/src/utils/errors/index",
    "@libs/(.*)": "<rootDir>/src/libs/$1",
    "@middlewares/(.*)": "<rootDir>/src/@middlewares/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
    "@schema/(.*)": "<rootDir>/src/@middlewares/schema/$1",
    "@routers/(.*)": "<rootDir>/src/routers/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
  },
};
