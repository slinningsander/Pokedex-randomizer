# Technical documentation
## Formater and linter
We are using the Prettier formater and the ESLint linter. These are much used code-checking tools, which can be configured to customize linting and formating. One advantage of using these tools is the availability of documentation and ready-made linting and formating configuration provided by industry leaders. 

- (*add more on these tools*)

For the most part we are using the default configuration generate when building a regular vite project, but we have added formating and linting on commit by adding [Husky](https://github.com/typicode/husky) to the project, which uses Git hooks to execute formating and linting pre-commit.
- (*and docs on lint-staged??*)

To use this we install husky and lint-staged localy:
```
npm install eslint prettier husky lint-staged pretty-quick --save-dev
```

and added this to package.json:
```"husky": {
  "hooks": {
    "pre-commit": "lint-staged",
    "pre-push": "npm test"
  }
},
"lint-staged": {
  "*.{js,jsx}": [
    "pretty-quick --staged",
    "eslint --fix",
    "git add"
  ]
}
```
[More on this.](https://dev.to/kreshby/keep-your-code-clean-with-eslint-prettier-pre-commit-and-pre-push-hooks-using-husky-lint-staged-and-pretty-quick-4fka)
To run ESLint in terminal we use:

```
npm run lint
```

## Frontend code testing
For frontend testing we use Vitest... (add more text)

Install Vitest:
```
npm install -D vitest
```

## React Routs 
- *add docs*
## TanStack Query
- *add docs*
## PokeAPI
- *add docs*

## HTML Web storage API
- *add docs*
### Localstorage
- *add docs*
### SessionStorage
- *add docs*

## Add docs on more tools ??

# Functional documentation
- *add docs*
## Our webapp
*- add domain specific docs*

<!-- ## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list -->
