import { dirname, join } from 'path';

/**
 * This function is used to resolve the absolute path of a package. It is needed
 * in projects that use Yarn PnP or are set up within a monorepo.
 */
export function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
