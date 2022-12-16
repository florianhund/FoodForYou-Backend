module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules',
    '<rootDir>/__tests__/utils'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/']
};
