module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    '**/tests/**/**/*.spec.[jt]s?(x)',
    '**/?(*.)+(spec|test).(tj)s?(x)'
  ],
  testPathIgnorePatterns: ['/node_modules/'],
}
