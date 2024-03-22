/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['orbitkit/base', 'orbitkit/react', 'orbitkit/astro'],
  parserOptions: {
    project: true,
  },
};

module.exports = config;
