---
'@orbitkit/storybook': minor
'@orbitkit/tailwind': minor
'@orbitkit/tsconfig': minor
'eslint-config-orbitkit': minor
'@orbitkit/vite': minor
'@orbitkit/assets': minor
'@orbitkit/marketing': minor
'@orbitkit/utils': minor
'@orbitkit/auth': minor
'@orbitkit/core': minor
'@orbitkit/api': minor
'@orbitkit/env': minor
'@orbitkit/db': minor
'@orbitkit/ui': minor
'@orbitkit/docs': minor
'@orbitkit/web': minor
---

feat: moving from `pnpm` to `bun`

- removed Volta configuration
- updated `pnpm` to `bun` in all packages
- updated `pnpm` to `bun` in all `Husky` files
- updated `pnpm` to `bun` in all CI/CD workflows
- updated `pnpm` to `bun` in all documentation
- added custom `.commitlintrc` configuration to handle `scope-enum` rule
- added custom `.scripts/reset-versions` script to reset all package versions
