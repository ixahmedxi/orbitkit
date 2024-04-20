# Contributing to Orbitkit

Thank you for considering contributing to Orbitkit :tada:

## How to Contribute

To contribute to this project, follow these steps:

1. Fork this repository and clone it to your local machine.
2. Create a new branch for your contribution: `git checkout -b BRANCHNAME`
3. Add your changes to the staging area: `git add [path of files]`
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push -u origin BRANCHNAME`
6. Submit a pull request.

## Quick Guide

### Prerequisites

```shell
node: "^>=20.12.2"
pnpm: ">=9.0.4"
```

We recommend using [Volta](https://volta.sh/), It's a JavaScript Tool Manager; you can learn more about it [here](https://docs.volta.sh/guide/)

### Setting up your local repo

Orbitkit uses pnpm workspaces, so you should **always run `pnpm install` from the top-level project directory**. Running `pnpm install` in the top-level project root will install dependencies for `Orbitkit`, and every package in the repo.

```shell
git clone && cd ...
pnpm install
pnpm run build
```

### Setting up environment variables

Checkout the `.env.example` file inside the `apps/web` directory for the environment variables you need to get the project running. You should create an UploadThing and Neon DB accounts and copy the environment variables from their dashboard to a `.env.local` file in `apps/web`.

You will also need to create a GitHub Oauth token as well as for Google authentication as well.

### Using GitHub Codespaces for development

To get started, create a codespace for this repository by clicking this 👇

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ixahmedxi/orbitkit)

Your new codespace will open in a web-based version of Visual Studio Code. All development dependencies will be preinstalled, and the tests will run automatically ensuring you've got a green base from which to start working.

### Development

```shell
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

### Other useful commands

```shell
# auto-format the entire project
pnpm run format
```

```shell
# lint the project
pnpm run lint
```

## Code Style Guidelines

Please follow the existing code style and conventions used in the project.

## Issue Reporting

If you encounter any issues with the project or have suggestions for improvements, please open an issue on the GitHub repository.

## License

By contributing to this project, you agree that your contributions will be licensed under the [LICENSE](LICENSE).

---

If you have any suggestions or concerns, consider opening a new issue.

**[Orbitkit](https://github.com/ixahmedxi/orbitkit/issues)**
