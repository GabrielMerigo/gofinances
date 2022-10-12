module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};