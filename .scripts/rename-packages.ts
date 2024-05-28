import * as fs from 'fs';
import * as path from 'path';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv)).option('name', {
  alias: 'n',
  type: 'string',
  demandOption: true,
  description: 'The new namespace for the packages',
}).argv;

// @ts-ignore - argv is typed to maybe return a promise, but it doesn't
const newNamespace = argv.name;

// ------------------------------------------------------------------

// Function to recursively find package.json files and update the name
function updateNamespace(dir: string): void {
  const files = fs.readdirSync(dir);

  // Iterate over each file in the directory
  files.forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      // Skip node_modules directory
      if (file !== 'node_modules') {
        updateNamespace(fullPath);
      }
    } else if (file === 'package.json') {
      const packageJson = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      if (packageJson.name) {
        // Split the name by the slash
        const parts = packageJson.name.split('/');
        if (parts.length === 2) {
          // Update the first part of the name
          parts[0] = newNamespace;
          packageJson.name = parts.join('/');
          fs.writeFileSync(
            fullPath,
            JSON.stringify(packageJson, null, 2) + '\n',
          );
          console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
        }
      }
    }
  });
}

updateNamespace(process.cwd());
