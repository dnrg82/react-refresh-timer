module.exports = {
    testMatch: [
      '**/test/**/*.test.js'
    ],
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '\\.(css)$': 'jest-css-modules-transform',
      '^.+\\.jsx?$': 'babel-jest'
    },
    setupFilesAfterEnv: ['./setupTests.js'],
  };
  