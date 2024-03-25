/** @type {import('eslint').Linter.Config} */
const config = {
  ignorePatterns: ['**/_next-typesafe-url_.d.ts'],
  root: true,
  extends: ['orbitkit/base', 'orbitkit/next', 'orbitkit/react'],
};

module.exports = config;
