---
"@orbitkit/utils": patch
"@orbitkit/auth": patch
"@orbitkit/api": patch
"@orbitkit/ui": patch
"@orbitkit/docs": patch
"@orbitkit/web": patch
"@orbitkit/marketing": patch
"@orbitkit/assets": patch
"eslint-config-orbitkit": patch
"@orbitkit/storybook": patch
"@orbitkit/tailwind": patch
"@orbitkit/tsconfig": patch
"@orbitkit/vite": patch
"@orbitkit/core": patch
"@orbitkit/db": patch
"@orbitkit/env": patch
---

feat: creates a trpc api package

changes in this release:

- creates a new `packages/api` package that hosts a tRPC api to be used for the web application.
- renames the lucia auth `getSession` function to `auth` and provides a new uncached version of it.
- refactors the code in some places to be generally better.
- splits the utils package from a barrel export to multi-file export.
- `getBaseUrl` util now returns `window.location.origin` instead of an empty string when the `window` object is not `undefined`.
