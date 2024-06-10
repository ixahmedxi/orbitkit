# @orbitkit/marketing

## 0.3.1

### Patch Changes

- 50e9dd2: refactor: moves almost all packages to being built
- Updated dependencies [50e9dd2]
  - @orbitkit/env@0.3.1
  - @orbitkit/ui@0.3.1
  - @orbitkit/assets@0.3.1

## 0.3.0

### Minor Changes

- feat: update workspace script & revised turbo config

### Patch Changes

- Updated dependencies
  - @orbitkit/assets@0.3.0
  - @orbitkit/env@0.3.0
  - @orbitkit/ui@0.3.0

## 0.2.2

### Patch Changes

- 5b69876: feat: added new scripts for setting project metadata
- Updated dependencies [5b69876]
  - @orbitkit/assets@0.2.2
  - @orbitkit/env@0.2.2
  - @orbitkit/ui@0.2.2

## 0.2.1

### Patch Changes

- 870e09f: feat: eslint v9
- Updated dependencies [870e09f]
  - @orbitkit/env@0.2.1
  - @orbitkit/ui@0.2.1
  - @orbitkit/assets@0.2.1

## 0.2.0

### Minor Changes

- 3ae31ea: chore: removing volta configuration
- 3ae31ea: feat: moving from `pnpm` to `bun`

  - removed Volta configuration
  - updated `pnpm` to `bun` in all packages
  - updated `pnpm` to `bun` in all `Husky` files
  - updated `pnpm` to `bun` in all CI/CD workflows
  - updated `pnpm` to `bun` in all documentation
  - added custom `.commitlintrc` configuration to handle `scope-enum` rule
  - added custom `.scripts/reset-versions` script to reset all package versions

### Patch Changes

- 3ae31ea: feat: updating playwright configuration from `pnpm` to `bun`
- Updated dependencies [3ae31ea]
- Updated dependencies [3ae31ea]
  - @orbitkit/assets@0.2.0
  - @orbitkit/env@0.2.0
  - @orbitkit/ui@0.2.0

## 0.1.5

### Patch Changes

- bf709fb: feat: enables tsup experimental dts option

  - switches tsup to use the new experimental dts option.
  - adds a `tsconfig.build.json` file to the `ui` package.
  - removes `concurrently` and `@storybook/testing-library`
  - adds `@storybook/test` to the `ui` package as a replacement for `@storybook/testing-library` due to deprecation.

- Updated dependencies [bf709fb]
  - @orbitkit/ui@0.1.5
  - @orbitkit/assets@0.1.5
  - @orbitkit/env@0.1.5

## 0.1.4

### Patch Changes

- 4f0f72d: feat: creates a trpc api package

  changes in this release:

  - creates a new `packages/api` package that hosts a tRPC api to be used for the web application.
  - renames the lucia auth `getSession` function to `auth` and provides a new uncached version of it.
  - refactors the code in some places to be generally better.
  - splits the utils package from a barrel export to multi-file export.
  - `getBaseUrl` util now returns `window.location.origin` instead of an empty string when the `window` object is not `undefined`.

- Updated dependencies [4f0f72d]
  - @orbitkit/ui@0.1.4
  - @orbitkit/assets@0.1.4
  - @orbitkit/env@0.1.4

## 0.1.3

### Patch Changes

- feat: sets up playwright in the monorepo
- Updated dependencies
  - @orbitkit/assets@0.1.3
  - @orbitkit/env@0.1.3
  - @orbitkit/ui@0.1.3

## 0.1.2

### Patch Changes

- 6ef0133: docs app and optional oauth
- Updated dependencies [6ef0133]
  - @orbitkit/assets@0.1.2
  - @orbitkit/ui@0.1.2

## 0.1.1

### Patch Changes

- 107e6dc: - Adds Github Actions
  - Updates dependencies to latest versions
- Updated dependencies [107e6dc]
  - @orbitkit/ui@0.1.1
  - @orbitkit/assets@0.1.1
