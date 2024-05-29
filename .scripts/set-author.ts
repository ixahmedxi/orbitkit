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
  }).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newAuthor = argv.author;
// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const excludePackages = argv.exclude ?? [];

// ------------------------------------------------------------------

// Function to update the author in package.json files
function updateAuthor(packageJson: any): void {
  // Skip updating excluded packages
  if (excludePackages.includes(packageJson.name)) {
    return packageJson;
  }

  packageJson.author = newAuthor;
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updateAuthor);
