import type { PackageJson } from 'type-fest';

import * as fs from 'fs';
import * as path from 'path';

// ------------------------------------------------------------------

// Function to read and parse the root package.json
export function getRootPackageJson(cwd: string): PackageJson {
  const rootPackageJsonPath = path.resolve(cwd, 'package.json');
  const rootPackageJson = JSON.parse(
    fs.readFileSync(rootPackageJsonPath, 'utf-8'),
  ) as PackageJson;
  return rootPackageJson;
}

// ------------------------------------------------------------------

// Function to get all workspace package paths
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

// Function to get package names from package.json files
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

// Main function to get all package names from the workspace
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

// Function to update all package.json files in the workspace
export function updateWorkspacePackages(
  cwd: string,
  update: (parsedPackageJson: PackageJson, fullPath: string) => PackageJson,
  includeRoot = false,
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
}
