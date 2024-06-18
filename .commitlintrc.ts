import { getWorkspacePackageNames } from './scripts/utils'

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

// ------------------------------------------------------------------

interface Context {
  cwd?: string
}

// ------------------------------------------------------------------

/**
 * Function to get all projects in the workspace
 * @param context The context object
 * @returns An array of all projects in the workspace
 */
function getProjects(context?: Context): string[] {
  const ctx = context ?? {}
  const cwd = ctx.cwd ?? process.cwd()

  return getWorkspacePackageNames(cwd)
    .reduce((projects: string[], name) => {
      if (name.startsWith('@')) {
        const project = name.split('/')[1]

        if (typeof project === 'string') {
          projects.push(project)
        }

        projects.push(name)
      }

      return projects
    }, [])
    .sort()
}

// We are exporting a custom commitlint configuration
export default {
  extends: ['@commitlint/config-conventional'],
  utils: { getProjects },
  rules: {
    'scope-enum': (ctx: Context) => [2, 'always', getProjects(ctx)],
  },
}
