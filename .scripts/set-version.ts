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
  }).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newVersion = argv.ver ?? '0.1.0';
// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const excludePackages = argv.exclude ?? [];

// ------------------------------------------------------------------

// Function to update the version in package.json files
function updateVersion(packageJson: any): void {
  // Skip updating excluded packages
  if (excludePackages.includes(packageJson.name)) {
    return packageJson;
  }

  packageJson.version = newVersion;
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updateVersion);
