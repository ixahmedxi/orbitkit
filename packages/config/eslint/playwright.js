/** @type {import('eslint').Linter.Config} */
const config = {
  overrides: [
    {
      files: [
        'e2e/**/*.spec.ts',
        'e2e/**/*.spec.tsx',
        'e2e/**/*.spec.js',
        'e2e/**/*.spec.jsx',
        'e2e/**/*.spec.mjs',
        'e2e/**/*.spec.cjs',
      ],
      extends: ['plugin:playwright/recommended'],
    },
  ],
};

module.exports = config;
