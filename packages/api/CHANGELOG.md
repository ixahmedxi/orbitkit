# @orbitkit/api

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
  - @orbitkit/utils@0.1.4
  - @orbitkit/auth@0.1.4
  - @orbitkit/db@0.1.4
  - @orbitkit/env@0.1.4
