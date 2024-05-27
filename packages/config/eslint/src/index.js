import { base } from './configs/base.js';
import { playwright } from './configs/playwright.js';
import { react } from './configs/react.js';

export { defineConfig } from './utils.js';

/**
 * Note: You MUST import files using the .js extension in this entire package
 * (not only this file) otherwise ESLint will not be able to resolve the files.
 */
export const configs = {
  base,
  playwright,
  react,
};
