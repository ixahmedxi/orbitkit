---
'@orbitkit/storybook': patch
'@orbitkit/tailwind': patch
'@orbitkit/tsconfig': patch
'eslint-config-orbitkit': patch
'@orbitkit/vite': patch
'@orbitkit/assets': patch
'@orbitkit/marketing': patch
'@orbitkit/utils': patch
'@orbitkit/auth': patch
'@orbitkit/core': patch
'@orbitkit/api': patch
'@orbitkit/env': patch
'@orbitkit/db': patch
'@orbitkit/ui': patch
'@orbitkit/docs': patch
'@orbitkit/web': patch
---

feat: moving from `pnpm` to `bun`

- removed Volta configuration
- updated `pnpm` to `bun` in all packages
- updated `pnpm` to `bun` in all `Husky` files
- updated `pnpm` to `bun` in all CI/CD workflows
- updated `pnpm` to `bun` in all documentation
- added custom `.commitlintrc` configuration to handle `scope-enum` rule
- added custom `.scripts/reset-versions` script to reset all package versions
