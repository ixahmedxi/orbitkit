import type { PackageJson } from 'pkg-types'

import { $ } from 'bun'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import {
  replaceInFile,
  traverseDirectory,
  updateNamespaceInPrettierConfig,
  updateWorkspacePackages,
} from './utils'

// ------------------------------------------------------------------

// Parse command line arguments
const argv = yargs(hideBin(process.argv))
  .option('namespace', {
    alias: 'n',
    type: 'string',
    demandOption: false,
    description: 'The new namespace for the packages',
  })
  .option('ver', {
    alias: 'v',
    type: 'string',
    demandOption: false,
    description: 'The new version for the packages',
  })
  .option('author', {
    alias: 'a',
    type: 'string',
    demandOption: false,
    description: 'The new author of the packages',
  })
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
  })
  .parseSync()

const newLicense = argv.license
const newAuthor = argv.author
const newVersion = argv.ver
const newNamespace = argv.namespace
const excludePackages = argv.exclude ?? []
const includeRoot = argv['include-root']

// Record to store updated package names
const updatedPackages: Record<string, string> = {}

const ignoredFolders = [
  'node_modules',
  '.next',
  '.turbo',
  'dist',
  'build',
  '.git',
]
const ignoredFiles = ['package.json', 'bun.lockb']

// ------------------------------------------------------------------

/**
 * Function to update the version in package.json files
 * @param packageJson the parsed package.json
 * @returns updated package.json
 */
function updateVersion(packageJson: PackageJson): PackageJson {
  // Skip updating excluded packages
  if (
    !newVersion ||
    (packageJson.name && excludePackages.includes(packageJson.name))
  ) {
    return packageJson
  }

  packageJson.version = newVersion
  console.log(`Updated version of ${String(packageJson.name)}`)
  return packageJson
}

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
  if (!newNamespace) {
    return packageJson
  }

  if (packageJson.name) {
    // Skip updating excluded packages
    if (excludePackages.includes(packageJson.name)) {
      return packageJson
    }

    // Update the name
    const parts = packageJson.name.split('/')

    if (parts.length === 2) {
      // Update the name
      parts[0] = newNamespace
      const newPackageName = parts.join('/')
      updatedPackages[packageJson.name] = newPackageName
      packageJson.name = newPackageName

      console.log(`Updated name in ${fullPath} to ${packageJson.name}`)
    } else if (fullPath === process.cwd()) {
      // Update the root package.json name
      packageJson.name = newNamespace.replace('@', '')
      console.log(`Updated name in ${fullPath} to ${packageJson.name}`)
    }
  }
  return packageJson
}

// ------------------------------------------------------------------

/**
 * Function to update the author in package.json files
 * @param packageJson the parsed package.json
 * @returns updated package.json
 */
function updateAuthor(packageJson: PackageJson): PackageJson {
  if (!newAuthor) {
    return packageJson
  }
  // Skip updating excluded packages
  if (packageJson.name && excludePackages.includes(packageJson.name)) {
    return packageJson
  }

  packageJson.author = newAuthor
  console.log(`Updated author of ${String(packageJson.name)}`)
  return packageJson
}

// ------------------------------------------------------------------

/**
 * Function to update the license in package.json files
 * @param packageJson the parsed package.json
 * @returns updated package.json
 */
function updateLicense(packageJson: PackageJson): PackageJson {
  if (!newLicense) {
    return packageJson
  }

  // Skip updating excluded packages
  if (packageJson.name && excludePackages.includes(packageJson.name)) {
    return packageJson
  }

  packageJson.license = newLicense
  console.log(`Updated license for ${String(packageJson.name)}`)
  return packageJson
}

// ------------------------------------------------------------------

/**
 * Function to update the package.json details
 * @param packageJson the parsed package.json
 * @param fullPath the full path to the package.json file
 * @returns updated package.json
 */
function updatePackageJsonDetails(
  packageJson: PackageJson,
  fullPath: string,
): PackageJson {
  packageJson = updatePackageName(packageJson, fullPath)
  packageJson = updateVersion(packageJson)
  packageJson = updateAuthor(packageJson)
  packageJson = updateLicense(packageJson)

  return packageJson
}

// ------------------------------------------------------------------

/**
 * Update the dependencies in all package.json files
 * @param packageJson the parsed package.json
 * @returns updated package.json
 */
function updateDependencies(packageJson: PackageJson): PackageJson {
  packageJson.dependencies = renameDependencies(packageJson.dependencies)
  packageJson.devDependencies = renameDependencies(packageJson.devDependencies)

  return packageJson
}

// ------------------------------------------------------------------

/**
 * Function to rename dependencies in a package.json
 * @param dependencies the dependencies to update
 * @returns updated dependencies
 */
function renameDependencies(
  dependencies: Record<string, string> | undefined,
): Record<string, string> {
  if (!dependencies) {
    return {}
  }

  /* eslint-disable security/detect-object-injection */
  for (const [name, version] of Object.entries(dependencies)) {
    const dependency = updatedPackages[name]
    if (dependency && dependency !== name) {
      dependencies[dependency] = version
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete dependencies[name]
      console.log(`Updated dependency from ${name} to ${dependency}`)
    }
  }
  /* eslint-enable security/detect-object-injection */

  return dependencies
}

// ------------------------------------------------------------------

/**
 * Function to find and replace package names in all files
 */
async function findAndReplacePackageNames() {
  if (!newNamespace) {
    return
  }

  console.log('🗂️ Finding and replacing package names in all files...')
  await traverseDirectory(
    process.cwd(),
    async (fullPath) => {
      // for each updated package, make sure the file is updated where they are referenced
      await replaceInFile(fullPath, updatedPackages, ignoredFiles)
    },
    ignoredFolders,
  )

  await updateNamespaceInPrettierConfig(process.cwd(), newNamespace)
}

// ------------------------------------------------------------------

// Start updating from the current directory
await updateWorkspacePackages(
  process.cwd(),
  updatePackageJsonDetails,
  includeRoot,
)

if (newNamespace) {
  // Update dependencies
  console.log('🔄 Updating dependencies...')
  await updateWorkspacePackages(process.cwd(), updateDependencies, includeRoot)

  // Find and replace package names in all files
  await findAndReplacePackageNames()

  // Done
  await $`bun format && bun turbo clean && bun install`

  console.log(
    '🎉 Done! Workspace namespaces have successfully been updated. You may wish to reload your IDE, to remove any errors.',
  )
}
