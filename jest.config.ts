/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  roots:['<rootDir>/src'],
  colletCoverageFrom:['<rootDir>/src/***/*.ts'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform:{
    '.+\\.ts$':"ts-jest"
  }
};
