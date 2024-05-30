/* eslint-disable security/detect-non-literal-fs-filename */
import type { PackageJson } from 'type-fest';

import * as fs from 'fs';
import * as path from 'path';

// ------------------------------------------------------------------

/**
 * Function to read and parse the root package.json
 * @param cwd the current working directory
 * @returns the root package.json in the workspace.
 */
export function getRootPackageJson(cwd: string): PackageJson {
  const rootPackageJsonPath = path.resolve(cwd, 'package.json');
  const rootPackageJson = JSON.parse(
    fs.readFileSync(rootPackageJsonPath, 'utf-8'),
  ) as PackageJson;
  return rootPackageJson;
}

// ------------------------------------------------------------------

/**
 * Function to get all workspace package paths.
 * @param workspaces the workspaces defined in the root package.json.
 * @returns an array of all workspace package paths.
 */
export function getWorkspacePackagePaths(workspaces: string[]): string[] {
  const workspacePackagePaths: string[] = [];

  workspaces.forEach((workspacePattern) => {
    const workspaceDirs = workspacePattern.replace(/\/\*$/, '');
    const absolutePath = path.resolve(process.cwd(), workspaceDirs);
    const packages = fs
      .readdirSync(absolutePath)
      .map((pkgDir) => path.join(workspaceDirs, pkgDir))
      .filter((pkgPath) => fs.existsSync(path.join(pkgPath, 'package.json'))); // Filter only directories with package.json
    workspacePackagePaths.push(...packages);
  });

  return workspacePackagePaths;
}

// ------------------------------------------------------------------

/**
 * Function to get package names from package.json files
 * @param packagePaths an array of package paths
 * @returns an array of package names
 */
export function getPackageNamesFromPaths(packagePaths: string[]): string[] {
  const packageNames = packagePaths
    .map((pkgPath) => {
      const packageJsonPath = path.join(pkgPath, 'package.json');
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, 'utf-8'),
      ) as PackageJson;
      return packageJson.name;
    })
    .filter((name): name is string => !!name); // Filter out undefined names

  return packageNames;
}

// ------------------------------------------------------------------

/**
 * Function to get all workspace package names
 * @param cwd the current working directory
 * @returns an array of all workspace package names
 */
export function getWorkspacePackageNames(cwd: string): string[] {
  const rootPackageJson = getRootPackageJson(cwd);
  if (!rootPackageJson.workspaces) {
    throw new Error('No workspaces defined in the root package.json');
  }

  const workspacePackagePaths = getWorkspacePackagePaths(
    rootPackageJson.workspaces as string[],
  );
  const packageNames = getPackageNamesFromPaths(workspacePackagePaths);

  return [
    ...packageNames,
    ...(rootPackageJson.name ? [rootPackageJson.name] : []),
  ];
}

// ------------------------------------------------------------------

/**
 * Function to update all package.json files in the workspace
 * @param cwd the current working directory
 * @param update the function to update the package.json
 * @param includeRoot whether to include the root package.json
 * @param callback a function to call after updating all packages
 */
export function updateWorkspacePackages(
  cwd: string,
  update: (parsedPackageJson: PackageJson, fullPath: string) => PackageJson,
  includeRoot = false,
  callback?: () => void,
): void {
  const rootPackageJson = getRootPackageJson(cwd);

  if (!rootPackageJson.workspaces) {
    throw new Error('No workspaces defined in the root package.json');
  }

  const workspacePackagePaths = getWorkspacePackagePaths(
    rootPackageJson.workspaces as string[],
  );

  if (includeRoot) {
    workspacePackagePaths.push(cwd);
  }

  workspacePackagePaths.forEach((pkgPath) => {
    const packageJsonPath = path.join(pkgPath, 'package.json');
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJson;
    const updatedPackageJson = update(packageJson, pkgPath);
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(updatedPackageJson, null, 2) + '\n',
    );
  });

  callback?.();
}

// ------------------------------------------------------------------

/**
 * Function to replace a string in a file
 * @param filePath path to the file
 * @param searchReplace an object with search and replace strings
 * @param ignoredFiles an array of file names to ignore
 */
export function replaceInFile(
  filePath: string,
  searchReplace: Record<string, string>,
  ignoredFiles: string[] = [],
): void {
  if (ignoredFiles.includes(path.basename(filePath))) {
    return;
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    for (const [search, replace] of Object.entries(searchReplace)) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(search, 'g');
      data = data.replace(regex, replace);
    }

    fs.writeFile(filePath, data, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Successfully updated ${filePath}`);
      }
    });
  });
}

// ------------------------------------------------------------------

/**
 * Function to traverse a directory and call a callback on each file
 * @param directory the directory to traverse
 * @param callback a function to call on each file
 * @param ignoredFolders an array of folder names to ignore
 */
export function traverseDirectory(
  directory: string,
  callback: (fullPath: string) => void,
  ignoredFolders: string[] = [],
): void {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directory}:`, err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error(`Error stating file ${fullPath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          if (!ignoredFolders.includes(file)) {
            traverseDirectory(fullPath, callback, ignoredFolders);
          }
        } else if (stats.isFile()) {
          callback(fullPath);
        }
      });
    });
  });
}

// ------------------------------------------------------------------

/**
 * Function to update the prettier.config.js file
 * @param cwd the current working directory
 * @param newNamespace the new namespace to replace
 */
export function updateNamespaceInPrettierConfig(
  cwd: string,
  newNamespace: string,
): void {
  const filePath = path.join(cwd, 'prettier.config.js');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Extract importOrder array content
    const importOrderStart = data.indexOf('importOrder: [');
    const importOrderEnd = data.indexOf('],', importOrderStart);
    if (importOrderStart === -1 || importOrderEnd === -1) {
      console.error('importOrder array not found in file');
      return;
    }

    const beforeImportOrder = data.substring(0, importOrderStart);
    const importOrderContent = data.substring(
      importOrderStart,
      importOrderEnd + 2,
    ); // Include '],'
    const afterImportOrder = data.substring(importOrderEnd + 2);

    const searchPattern = /'\^@\w+\/\(\.\*\)\$'/g;

    // Replace within importOrder array content
    const updatedImportOrderContent = importOrderContent.replace(
      searchPattern,
      (match) => {
        return match.replace(/@\w+\//, `${newNamespace}/`);
      },
    );

    // Reconstruct the file content
    const updatedData =
      beforeImportOrder + updatedImportOrderContent + afterImportOrder;

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Replaced in file: ${filePath}`);
      }
    });
  });
}

/* eslint-enable security/detect-non-literal-fs-filename */
