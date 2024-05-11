/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    'orbitkit/base',
    'orbitkit/next',
    'orbitkit/react',
    'orbitkit/playwright',
  ],
};

module.exports = config;
