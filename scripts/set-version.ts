import type { PackageJson } from 'pkg-types';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('ver', {
    alias: 'v',
    type: 'string',
    demandOption: false,
    description: 'The new version for the packages',
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

const newVersion = argv.ver ?? '0.1.0';
const excludePackages = argv.exclude ?? [];
const includeRoot = argv['include-root'];

// ------------------------------------------------------------------

/**
 * Function to update the version in package.json files
 * @param packageJson the parsed package.json
 * @returns updated package.json
 */
function updateVersion(packageJson: PackageJson): PackageJson {
  // Skip updating excluded packages
  if (packageJson.name && excludePackages.includes(packageJson.name)) {
    return packageJson;
  }

  packageJson.version = newVersion;
  console.log(`Updated version of ${String(packageJson.name)}`);
  return packageJson;
}

// Start updating from the current directory
console.log(`🔼 Updating all packages to version ${newVersion}`);
await updateWorkspacePackages(process.cwd(), updateVersion, includeRoot);
