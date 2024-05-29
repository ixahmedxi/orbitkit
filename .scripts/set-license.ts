import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('license', {
    alias: 'l',
    type: 'string',
    demandOption: false,
    description: 'The new license for the packages',
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
  }).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newLicense = argv.license ?? 'MIT';
// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const excludePackages = argv.exclude ?? [];
// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const includeRoot = argv['include-root'] ?? false;

// ------------------------------------------------------------------

// Function to update the version in package.json files
function updateLicense(packageJson: any): void {
  // Skip updating excluded packages
  if (excludePackages.includes(packageJson.name)) {
    return packageJson;
  }

  packageJson.license = newLicense;
  console.log(`Updated license for ${packageJson.name}`);
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updateLicense, includeRoot);
