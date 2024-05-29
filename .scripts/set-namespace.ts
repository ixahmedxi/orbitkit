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
  .option('includeRoot', {
    alias: 'ir',
    type: 'boolean',
    demandOption: false,
    description: 'Include the root package.json',
  }).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newNamespace = argv.namespace;
// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const excludePackages = argv.exclude ?? [];
// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const includeRoot = argv.includeRoot ?? false;

// ------------------------------------------------------------------

// Function to update the name in package.json files
function updatePackageName(packageJson: any, fullPath: string): any {
  // Skip updating excluded packages
  if (excludePackages.includes(packageJson.name)) {
    return packageJson;
  }

  if (packageJson.name) {
    const parts = packageJson.name.split('/');
    if (parts.length === 2) {
      parts[0] = newNamespace;
      packageJson.name = parts.join('/');
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    } else if (fullPath === process.cwd()) {
      packageJson.name = newNamespace.replace('@', '');
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    }
  }
  return packageJson;
}

updateWorkspacePackages(process.cwd(), updatePackageName, includeRoot);
