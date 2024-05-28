import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv)).option('ver', {
  alias: 'v',
  type: 'string',
  demandOption: false,
  description: 'The new version for the packages',
}).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newVersion = argv.ver ?? '0.1.0';

// ------------------------------------------------------------------

// Function to update the version in package.json files
function updateVersion(packageJson: any): void {
  packageJson.version = newVersion;
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updateVersion);
