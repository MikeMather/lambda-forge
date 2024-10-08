/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/examples/', '<rootDir>/dist/'],
  testMatch: ['<rootDir>/src/**/*.test.ts']
}
