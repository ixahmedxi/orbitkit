/* eslint-disable security/detect-non-literal-fs-filename */
import { readdirSync, type Dirent } from 'fs';
import { dirname, join } from 'path';

/**
 * This function lists all directories in a given path.
 * @param path The path to the parent directory
 * @returns A list of directory names in the parent directory
 */
export function listDirectories(path: string): Dirent[] {
  return readdirSync(path, { withFileTypes: true }).filter((d) =>
    d.isDirectory(),
  );
}

/**
 * This function is used to resolve the absolute path of a package. It is needed
 * in projects that use Yarn PnP or are set up within a monorepo.
 * @param value The package name.
 * @returns The absolute path of the package.
 */
export function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
/* eslint-enable security/detect-non-literal-fs-filename */
