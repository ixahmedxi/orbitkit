import type { PackageJson } from 'type-fest';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('author', {
    alias: 'a',
    type: 'string',
    demandOption: true,
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

const newAuthor = argv.author;
const excludePackages = argv.exclude ?? [];
const includeRoot = argv['include-root'];

// ------------------------------------------------------------------

// Function to update the author in package.json files
function updateAuthor(packageJson: PackageJson): PackageJson {
  // Skip updating excluded packages
  if (packageJson.name && excludePackages.includes(packageJson.name)) {
    return packageJson;
  }

  packageJson.author = newAuthor;
  console.log(`Updated author of ${packageJson.name}`);
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updateAuthor, includeRoot);
