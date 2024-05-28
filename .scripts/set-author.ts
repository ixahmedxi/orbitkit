import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { updateWorkspacePackages } from './utils';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv)).option('author', {
  alias: 'a',
  type: 'string',
  demandOption: true,
  description: 'The new version for the packages',
}).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newAuthor = argv.author;

// ------------------------------------------------------------------

// Function to recursively find package.json files and update the version
function updateAuthor(packageJson: any): void {
  packageJson.author = newAuthor;
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updateAuthor);
