/** @type {import('eslint').Linter.Config} */
const config = {
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: ['orbitkit/base'],
};

module.exports = config;
