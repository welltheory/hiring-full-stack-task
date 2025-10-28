import _ from 'lodash';
import fs from 'fs';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const paths = _.omit(compilerOptions.paths || {}, ['*']);
const swcRc = JSON.parse(fs.readFileSync(`${__dirname}/../.swcrc`, 'utf-8'));

const config: JestConfigWithTsJest = {
  rootDir: '../',
  testEnvironment: 'node',
  preset: 'ts-jest',
  clearMocks: true,
  verbose: true,
  testTimeout: 15 * 1000, // 15 seconds
  logHeapUsage: true,
  testMatch: [
    '<rootDir>/**/specs/**/*.spec.ts',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
  setupFiles: [
    '<rootDir>/envs/setup.ts',
    '<rootDir>/alias/index.ts',
    '<rootDir>/jest/setup.ts',
  ],
  setupFilesAfterEnv: [
    'jest-extended',
  ],
  transform: {
    '^.+\\.tsx?$': [
      '@swc/jest',
      swcRc,
    ],
    '^.+\\.(js|jsx)$': [
      '@swc/jest',
      {
        ...swcRc,
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm))',
  ],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
};

console.info('Jest config loaded!');

export default config;
