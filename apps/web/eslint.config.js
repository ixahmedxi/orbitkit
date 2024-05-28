import { defineConfig, configs } from '@orbitkit/eslint';

export default defineConfig(
  ...configs.base,
  ...configs.next,
  ...configs.playwright,
);
