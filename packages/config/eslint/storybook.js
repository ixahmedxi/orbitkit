/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    'plugin:storybook/recommended',
    'plugin:storybook/csf',
    'plugin:storybook/csf-strict',
  ],
  overrides: [
    {
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {},
    },
  ],
};

module.exports = config;
