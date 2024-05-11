/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    'orbitkit/base',
    'orbitkit/react',
    'orbitkit/astro',
    'orbitkit/playwright',
  ],
  parserOptions: {
    project: true,
  },
};

module.exports = config;
