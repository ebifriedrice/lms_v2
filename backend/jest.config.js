module.exports = {
  testEnvironment: 'node',
  // The root directory that Jest should scan for tests and modules within
  rootDir: '.',
  // A list of paths to directories that Jest should use to search for modules
  modulePaths: ['<rootDir>/../node_modules'],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // A path to a module which exports an async function that is triggered once before all test suites
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
};
