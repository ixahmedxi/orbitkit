/** @type {import('eslint').Linter.Config} */
const config = {
  overrides: [
    {
      files: ['*.astro'],
      env: {
        'astro/astro': true,
      },
      extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-strict'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
      },
    },
  ],
};

module.exports = config;
