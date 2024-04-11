<div align="center">
  <img src="https://github.com/ixahmedxi/orbitkit/blob/main/apps/marketing/public/blog-placeholder.jpg?raw=true" alt="Cover image" width="700px">
</div>

## Features

- [**Monorepo**](https://monorepo.tools/): OrbitKit is a monorepo, giving you the ability to scale your project with ease.
- [**TypeScript**](https://www.typescriptlang.org/): type-safety is a core principle of OrbitKit.
- [**Astrojs**](https://astro.build): for a clean slate to build your marketing website on top.
- [**Next.js**](https://nextjs.org): Web application is included, giving you a solid foundation for your product.
- [**Turborepo**](https://turbo.build/repo): caching builds so you never have to run the same command twice.
- [**Drizzle ORM**](https://orm.drizzle.team): providing a fully type-safe way to interact with your database.
- [**Neon DB**](https://neon.tech): serverless database, with autoscaling, branching, and bottomless storage.
- [**Uploadthing**](https://uploadthing.com/): for an easy, type-safe way of handling file uploads.
- [**Unkey**](https://unkey.dev): for a fast way of rate-limiting the web app.
- [**Lucia auth**](https://lucia-auth.com): for authentication, giving you full flexibility and control over your user system.
- [**Tailwind CSS**](https://tailwindcss.com): for styling, with [**Radix UI Colors**](https://www.radix-ui.com/colors) for automatic light/dark mode handling.
- [**Shadcn UI**](https://ui.shadcn.com): full implementation in a dedicated package.
- [**Storybook**](https://storybook.js.org): to develop, test and visualize your components in isolation.
- [**Github Actions**](https://github.com/features/actions): for CI/CD, with automatic DB branching & code checks.
- [**next-themes**](https://github.com/pacocoursey/next-themes): for easy light/dark mode handling in the web app.
- [**Changesets**](https://github.com/changesets/changesets): for managing versioning and changelogs.
- [**tsup**](https://github.com/egoist/tsup): for fast, easy to configure bundling of packages.
- [**ts-reset**](https://github.com/total-typescript/ts-reset): for the apps, improving the types for common JavaScript APIs.
- [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io), [**Markdownlint**](https://github.com/DavidAnson/markdownlint), [**Cspell**](https://cspell.org), [**Husky**](https://github.com/typicode/husky), [**Lint-staged**](https://github.com/lint-staged/lint-staged) and [**Commitlint**](https://github.com/conventional-changelog/commitlint) for code quality.
- **ESM Only**: because CJS should be left in the past.

And much more!

## Note

> [!IMPORTANT]
> OrbitKit is built on top of a very opinionated tech stack, which might not work for every use case/business idea. I offer monorepo architecture consulting or even building something completely custom for you, if you are interested be sure to [DM me on X/Twitter](https://twitter.com/ixahmedxii).

## Todos

OrbitKit is not in final form yet, there are many things in the plans for it but it is in a usable primitive state. Checkout the [Roadmap](https://github.com/users/ixahmedxi/projects/6) for more info.

## Getting Started

You can check out our [new documentation](https://orbitkit.mintlify.app) for more detailed information about installing & using OrbitKit.

### Installation

```bash
# Clone the repository
git clone --depth 1 https://github.com/ixahmedxi/orbitkit.git <your-project-name>

#or use
npx degit ixahmedxi/orbitkit

# Install Dependencies
pnpm install
```

### Reset changelog and versions

When you first clone the repository, you should reset the changelog and versions to start fresh. You can do so by running the following commands:

```bash
# Reset changelog - this will remove all the changelog.md files in the packages
pnpm reset:changelog

# Reset package versions - this will reset the versions of all the packages to 0.1.0
pnpm reset:versions
```

### Setting up environment variables

Checkout the `.env.example` file inside the `apps/web` directory for the environment variables you need to get the project running. You should create an UploadThing and Neon DB accounts and copy the environment variables from their dashboard to a `.env.local` file in `apps/web`.

You will also need to create a GitHub Oauth token as well as for Google authentication as well.

### Explaining the architecture

- `apps` folder is where the applications live like the Next.js app and the Astrojs marketing website
- `packages/config` folder is where packages that configure and ship out presets of tool configuration throughout the monorepo, for example `packages/config/tailwind` that ships out a tailwind configuration preset as the single source of truth.
- `packages` hosts all of the packages that get consumed by applications, for example `packages/ui` that ships all of Shadcn UI primitives, some packages are internal (meaning they do not have a build step like the auth package) and some do like the ui package.
- There is a core package, `packages/core` that is empty and should be used for business logic sharing.
- `packages/env` is where we define the environment variable types, it is an internal package that gets away with not needing a build step by using `jiti` to run the typescript file in the `next.config.js` file of the web application.

### Running the project

```bash
# Dev
pnpm turbo dev

# Build
pnpm turbo build

# Typecheck
pnpm turbo typecheck

# Lint
pnpm turbo lint

# Storybook
pnpm turbo storybook

# Start apps in production mode
pnpm turbo start
```

If you're familiar with turborepo / pnpm workspaces, running stuff around this repo will be easy to figure out.

### Commit messages

This project uses commitlint to enforce a commit message convention. The commit message should be structured as follows:

```plaintext
<type>(<scope>): <subject>
<body>
<footer>
```

To make this easier, you can use the `pnpm commit` command to create a commit message. This will open up a prompt for you to enter the type, scope, and subject of the commit message.

Through husky and the `prepare-commit-msg` hook, any `git commit` commands will automatically be intercepted and processed by commitizen and commitlint. If a commit message does not follow the convention, the commit will be rejected. If no commit message is provided, commitizen will open up a prompt for you to enter the commit message.

## Issues

If you have any issues / problems with using OrbitKit, be sure to create an issue here on GitHub and I will help you out with it.
