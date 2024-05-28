import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv)).option('namespace', {
  alias: 'n',
  type: 'string',
  demandOption: true,
  description: 'The new namespace for the packages',
}).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newNamespace = argv.namespace;

// ------------------------------------------------------------------

// Function to update the name in package.json files
function updatePackageName(packageJson: any, fullPath: string): any {
  if (packageJson.name) {
    const parts = packageJson.name.split('/');
    if (parts.length === 2) {
      parts[0] = newNamespace;
      packageJson.name = parts.join('/');
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    }
  }
  return packageJson;
}

updateWorkspacePackages(process.cwd(), updatePackageName, false);
