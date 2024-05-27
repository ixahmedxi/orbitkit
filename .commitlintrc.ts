/* eslint-disable security/detect-non-literal-fs-filename */
import * as fs from 'fs';
import * as path from 'path';

// ------------------------------------------------------------------

// -- CUSTOM COMMITLINT CONFIGURATION --
// This configuration is used to enforce the scope-enum rule.
// The scope-enum rule requires that the scope of a commit message
// must be one of the defined values.
// The defined values are the package names of the workspace.
// The package names are extracted from the package.json files.
//
// This was previously achieved using @commitlint/config-pnpm-scopes
// which provides a custom commitlint configuration.
//
// As Orbitkit has moved away from pnpm workspaces, we need to
// implement a custom commitlint configuration to achieve the same.

// ------------------------------------------------------------------

interface PackageJson {
  name: string;
  workspaces?: string[];
}

interface Context {
  cwd?: string;
}

// ------------------------------------------------------------------

/**
 * Function to read and parse the root package.json
 * @param cwd the current working directory
 * @returns the root package.json in the workspace.
 */
function getRootPackageJson(cwd: string): PackageJson {
  const rootPackageJsonPath = path.resolve(cwd, 'package.json');
  const rootPackageJson = JSON.parse(
    fs.readFileSync(rootPackageJsonPath, 'utf-8'),
  ) as PackageJson;
  return rootPackageJson;
}

/**
 * Function to get all workspace package paths.
 * @param workspaces the workspaces defined in the root package.json.
 * @returns an array of all workspace package paths.
 */
function getWorkspacePackagePaths(workspaces: string[]): string[] {
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

/**
 * Function to get package names from package.json files
 * @param packagePaths an array of package paths
 * @returns an array of package names
 */
function getPackageNamesFromPaths(packagePaths: string[]): string[] {
  const packageNames = packagePaths.map((pkgPath) => {
    const packageJsonPath = path.join(pkgPath, 'package.json');
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf-8'),
    ) as PackageJson;
    return packageJson.name;
  });

  return packageNames;
}

/**
 * Function to get all workspace package names
 * @param cwd the current working directory
 * @returns an array of all workspace package names
 */
function getWorkspacePackageNames(cwd: string): string[] {
  const rootPackageJson = getRootPackageJson(cwd);
  if (!rootPackageJson.workspaces) {
    throw new Error('No workspaces defined in the root package.json');
  }

  const workspacePackagePaths = getWorkspacePackagePaths(
    rootPackageJson.workspaces,
  );
  const packageNames = getPackageNamesFromPaths(workspacePackagePaths);

  return [...packageNames, rootPackageJson.name];
}

/**
 * Function to get all projects in the workspace
 * @param context the context object
 * @returns an array of all projects in the workspace
 */
function getProjects(context?: Context): string[] {
  const ctx = context ?? {};
  const cwd = ctx.cwd ?? process.cwd();

  return getWorkspacePackageNames(cwd)
    .reduce((projects, name) => {
      if (name) {
        // @ts-expect-error - ignore TS error for name.split
        projects.push(name.startsWith('@') ? name.split('/')[1] : name);
      }

      return projects;
    }, [])
    .sort();
}

// We are exporting a custom commitlint configuration
export default {
  extends: ['@commitlint/config-conventional'],
  utils: { getProjects },
  rules: {
    'scope-enum': (ctx: Context) => [2, 'always', getProjects(ctx)],
  },
};
/* eslint-enable security/detect-non-literal-fs-filename */