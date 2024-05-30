import type { PackageJson } from 'type-fest';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('namespace', {
    alias: 'n',
    type: 'string',
    demandOption: true,
    description: 'The new namespace for the packages',
  })
  .option('exclude', {
    alias: 'e',
    type: 'array',
    demandOption: false,
    description: 'Exclude packages from the update',
  })
  .option('include-root', {
    alias: 'ir',
    type: 'boolean',
    demandOption: false,
    description: 'Include the root package.json',
  })
  .parseSync();

const newNamespace = argv.namespace;
const excludePackages = argv.exclude ?? [];
const includeRoot = argv['include-root'];

// ------------------------------------------------------------------

/**
 * Function to update the name in package.json files
 * @param packageJson the parsed package.json
 * @param fullPath the full path to the package.json file
 * @returns updated package.json
 */
function updatePackageName(
  packageJson: PackageJson,
  fullPath: string,
): PackageJson {
  if (packageJson.name) {
    // Skip updating excluded packages
    if (excludePackages.includes(packageJson.name)) {
      return packageJson;
    }

    // Update the name
    const parts = packageJson.name.split('/');

    if (parts.length === 2) {
      parts[0] = newNamespace;
      packageJson.name = parts.join('/');
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    } else if (fullPath === process.cwd()) {
      // Update the root package.json name
      packageJson.name = newNamespace.replace('@', '');
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    }
  }
  return packageJson;
}

updateWorkspacePackages(process.cwd(), updatePackageName, includeRoot);
