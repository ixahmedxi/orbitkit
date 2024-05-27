import * as fs from 'fs';
import * as path from 'path';

interface PackageJson {
  name: string;
  workspaces?: string[];
}

interface Context {
  cwd?: string;
}

// Function to read and parse the root package.json
function getRootPackageJson(cwd: string): PackageJson {
  const rootPackageJsonPath = path.resolve(cwd, 'package.json');
  const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf-8')) as PackageJson;
  return rootPackageJson;
}

// Function to get all workspace package paths
function getWorkspacePackagePaths(workspaces: string[]): string[] {
  const workspacePackagePaths: string[] = [];

  workspaces.forEach(workspacePattern => {
    const workspaceDirs = workspacePattern.replace(/\/\*$/, '');
    const absolutePath = path.resolve(process.cwd(), workspaceDirs);
    const packages = fs.readdirSync(absolutePath)
      .map(pkgDir => path.join(workspaceDirs, pkgDir))
      .filter(pkgPath => fs.existsSync(path.join(pkgPath, 'package.json'))); // Filter only directories with package.json
    workspacePackagePaths.push(...packages);
  });

  return workspacePackagePaths;
}

// Function to get package names from package.json files
function getPackageNamesFromPaths(packagePaths: string[]): string[] {
  const packageNames = packagePaths.map(pkgPath => {
    const packageJsonPath = path.join(pkgPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;
    return packageJson.name;
  });

  return packageNames;
}

// Main function to get all package names from the workspace
function getWorkspacePackageNames(cwd: string): string[] {
  const rootPackageJson = getRootPackageJson(cwd);
  if (!rootPackageJson.workspaces) {
    throw new Error('No workspaces defined in the root package.json');
  }

  const workspacePackagePaths = getWorkspacePackagePaths(rootPackageJson.workspaces);
  const packageNames = getPackageNamesFromPaths(workspacePackagePaths);

  return [...packageNames, rootPackageJson.name];
}

function getProjects(context?: Context): string[] {
	const ctx = context ?? {};
	const cwd = ctx.cwd ?? process.cwd();

	return getWorkspacePackageNames(cwd).reduce((projects, name) => {
    if (name) {
      // @ts-expect-error - ignore TS error for name.split
      projects.push(name.startsWith('@') ? name.split('/')[1] : name);
    }

    return projects;
  }, [])
  .sort();
}

// Execute the function and log the result
export default {
  extends: ['@commitlint/config-conventional'],
	utils: {getProjects},
	rules: {
		'scope-enum': (ctx: Context) =>
      [2, 'always', getProjects(ctx)],
	},
};