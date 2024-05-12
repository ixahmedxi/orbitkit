# eslint-config-orbitkit

## 0.1.4

### Patch Changes

- 4f0f72d: feat: creates a trpc api package

  changes in this release:

  - creates a new `packages/api` package that hosts a tRPC api to be used for the web application.
  - renames the lucia auth `getSession` function to `auth` and provides a new uncached version of it.
  - refactors the code in some places to be generally better.
  - splits the utils package from a barrel export to multi-file export.
  - `getBaseUrl` util now returns `window.location.origin` instead of an empty string when the `window` object is not `undefined`.

## 0.1.3

### Patch Changes

- feat: sets up playwright in the monorepo

## 0.1.2

### Patch Changes

- 6ef0133: docs app and optional oauth

## 0.1.1

### Patch Changes

- 107e6dc: - Adds Github Actions
  - Updates dependencies to latest versions
