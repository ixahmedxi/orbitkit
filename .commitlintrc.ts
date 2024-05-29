import { getWorkspacePackageNames } from './scripts/utils';

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

interface Context {
  cwd?: string;
}

// ------------------------------------------------------------------

/**
 * Function to get all projects in the workspace
 * @param context The context object
 * @returns An array of all projects in the workspace
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
