import type { PackageJson } from 'type-fest';

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
  .option('include-root', {
    alias: 'ir',
    type: 'boolean',
    demandOption: false,
    description: 'Include the root package.json',
  })
  .parseSync();

const newNamespace = argv.namespace;
const excludePackages = argv.exclude ?? [];
const includeRoot = argv['include-root'];

// Record to store updated package names
const updatedPackages: Record<string, string> = {};

// ------------------------------------------------------------------

/**
 * Function to update the name in package.json files
 * @param packageJson the parsed package.json
 * @param fullPath the full path to the package.json file
 * @returns updated package.json
 */
function updatePackageName(
  packageJson: PackageJson,
  fullPath: string,
): PackageJson {
  if (packageJson.name) {
    // Skip updating excluded packages
    if (excludePackages.includes(packageJson.name)) {
      return packageJson;
    }

    // Update the name
    const parts = packageJson.name.split('/');

    if (parts.length === 2) {
      parts[0] = newNamespace;
      const newPackageName = parts.join('/');
      updatedPackages[packageJson.name] = newPackageName;
      packageJson.name = newPackageName;

      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    } else if (fullPath === process.cwd()) {
      // Update the root package.json name
      packageJson.name = newNamespace.replace('@', '');
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`);
    }
  }
  return packageJson;
}

// ------------------------------------------------------------------

/**
 * Update the dependencies in all package.json files
 * @param packageJson the parsed package.json
 * @param fullPath the full path to the package.json file
 * @returns updated package.json
 */
function updateDependencies(
  packageJson: PackageJson,
  fullPath: string,
): PackageJson {
  if (packageJson.dependencies) {
    /* eslint-disable security/detect-object-injection */
    for (const [name, version] of Object.entries(packageJson.dependencies)) {
      const dependency = updatedPackages[name];
      if (dependency && dependency !== name) {
        packageJson.dependencies[dependency] = version;
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete packageJson.dependencies[name];
        console.log(
          `Updated dependency in ${fullPath} from ${name} to ${dependency}`,
        );
      }
    }
    /* eslint-enable security/detect-object-injection */
  }
  return packageJson;
}

// Start updating from the current directory
updateWorkspacePackages(process.cwd(), updatePackageName, includeRoot, () => {
  updateWorkspacePackages(process.cwd(), updateDependencies);
});
