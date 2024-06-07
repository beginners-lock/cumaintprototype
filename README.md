# Rophi's Documentation
PLEASE READ THIS BEFORE DOING ANYTHING
The files are arranged in the default vite project order except a few of my presonal tweaks

In the /src folder:

`/components`: this folder would contain all components that would be used across pages

`/pages`: this folder contains each page i.e. login page, dashboard page, etc.

`/styles`: this folder would contain all the css files for each page and component 


Developers
- Chukwu Rophi
- Agbi Marshal

See all the available branches with the command `git branch -a`

You should see the following branches: `main`, `rophi` and `marshal`

Ensure you are working in your own branch by switching across branches with this command `git checkout branch_name` 

Confirm the current branch you are in with `git branch -a`, the highlighted branch with a star is the one you are in

Confirm the current branch you are in with `git branch -a`, the highlighted branch with a star is the one you are in

When you want to begin programming in your branch ensure to pull any changes that have been made in the main branch first. You do this with the code below
`git pull origin main`

NOTE: Do this when you are in your branch

When you want to push to the repo

`git add .`

`git commit -m 'commit_statement'`

`git push -u origin marshal`

NOTE: Please ensure you are in your branch before you do this.

# Default Documentation
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list