import type { PackageJson } from 'type-fest';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  replaceInFile,
  traverseDirectory,
  updateNamespaceInPrettierConfig,
  updateWorkspacePackages,
} from './utils';

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

const ignoredFolders = [
  'node_modules',
  '.next',
  '.turbo',
  'dist',
  'build',
  '.git',
];
const ignoredFiles = ['package.json', 'bun.lockb'];

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
      // Update the name
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
 * @returns updated package.json
 */
function updateDependencies(packageJson: PackageJson): PackageJson {
  packageJson.dependencies = renameDependencies(packageJson.dependencies);
  packageJson.devDependencies = renameDependencies(packageJson.devDependencies);

  return packageJson;
}

// ------------------------------------------------------------------

/**
 * Function to rename dependencies in a package.json
 * @param dependencies the dependencies to update
 * @returns updated dependencies
 */
function renameDependencies(
  dependencies: PackageJson.Dependency | undefined,
): PackageJson.Dependency {
  if (!dependencies) {
    return {};
  }

  /* eslint-disable security/detect-object-injection */
  for (const [name, version] of Object.entries(dependencies)) {
    const dependency = updatedPackages[name];
    if (dependency && dependency !== name) {
      dependencies[dependency] = version;
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete dependencies[name];
      console.log(`Updated dependency from ${name} to ${dependency}`);
    }
  }
  /* eslint-enable security/detect-object-injection */

  return dependencies;
}

// ------------------------------------------------------------------

/**
 * Function to find and replace package names in all files
 */
async function findAndReplacePackageNames() {
  console.log('🗂️ Finding and replacing package names in all files...');
  await traverseDirectory(
    process.cwd(),
    async (fullPath) => {
      // for each updated package, make sure the file is updated where they are referenced
      await replaceInFile(fullPath, updatedPackages, ignoredFiles);
    },
    ignoredFolders,
  );

  await updateNamespaceInPrettierConfig(process.cwd(), newNamespace);
}

// ------------------------------------------------------------------

// Start updating from the current directory
console.log(`🚀 Updating package names to ${newNamespace}...`);
await updateWorkspacePackages(process.cwd(), updatePackageName, includeRoot);

// Update dependencies
console.log('🔄 Updating dependencies...');
await updateWorkspacePackages(process.cwd(), updateDependencies, includeRoot);

// Find and replace package names in all files
await findAndReplacePackageNames();

// Done
console.log(
  '🎉 Successfully updated package names! Make sure to run `bun install` to update dependencies in the lock file.',
);
