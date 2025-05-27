import { readFileSync } from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';
import { parse } from 'jsonc-parser';

const tsconfig = parse(readFileSync('./tsconfig.json', 'utf8'));

export default {
  clearMocks: true,
  collectCoverageFrom: [
    '{src,pages,api}/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
    '!**/coverage/**',
  ],
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'package.json',
    'package-lock.json',
  ],
  coverageDirectory: '<rootDir>/.coverage',
  coverageReporters: [
    'html',
    'text-summary',
    [
      'lcovonly',
      {
        file: 'lcov.info',
      },
    ],
  ],
  coverageThreshold: {
    global: {
      statements: 74,
      branches: 58,
      functions: 64,
      lines: 75,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFiles: ['./jest.setup-all.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/setup.jest.ts',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'],
  testTimeout: 30_000,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  // This is a workaround for:
  // https://github.com/facebook/jest/issues/11956
  workerIdleMemoryLimit: '1GB',
};
