module.exports = {
  transform: {
    '^.+\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!marked)/',
  ],
  testEnvironment: 'jsdom',
};