// jest.config.js
const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: './',  // Point to the root directory (where next.config.js lives)
});

// Add any custom Jest config here
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],  // Your setup file
  testEnvironment: 'jest-environment-jsdom',  // For React/Next.js DOM testing
  moduleNameMapper: {
    // Handle path aliases from tsconfig.json
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    // Mock non-JS assets (e.g., CSS, images) – adjust if needed
    '\\.(css|less|scss|sass|svg|png|jpg|jpeg|gif|webp)$': 'identity-obj-proxy',
  },
  // Optional: Clear mocks between tests
  clearMocks: true,
};

// createJestConfig merges your custom config with Next.js defaults
module.exports = createJestConfig(customJestConfig);