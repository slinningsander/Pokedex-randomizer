# Technical documentation

## Formater and linter

We are using the Prettier formatter and the ESLint linter. These are much-used code-checking tools, which can be configured to customize linting and formatting. One advantage of using these tools is the availability of documentation and ready-made linting and formatting configuration provided by industry leaders.

- (_add more on these tools_)

For the most part, we are using the default configuration generated when building a regular Vite project, but we have added formatting and linting on commit by adding [Husky](https://github.com/typicode/husky) to the project, which uses Git hooks to execute formatting and linting pre-commit.

- (_and docs on lint-staged??_)

To use this we install husky and lint-staged locally:

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

## React Routes

We use React Routes to navigate around the page. Specifically to navigate to a details page about each Pokemon. The URLs are dynamic and generated from the names of the Pokemon you click on.

## TanStack Query

We tried to add TanStack Query as part of our fetching from the API, but in the end, we decided to not use it. That is because of the way our application functions. We fetch from the API 10 times to retrieve all of the different Pokemon and present some of the info right away. This is so that we can filter by Pokemon type. TanStack Query is not meant to be used in such a way, e.g. in a loop or another hook.

It would however make sense if we didn't fetch from the API when presenting the 10 Pokemon and instead made a single API call when looking at a single Pokemon. This would perhaps be a better solution, but then we would have to hardcode the Pokemon names and types to ensure filtering. PokeAPI has an endpoint where you can fetch all Pokemon with just their names, but still, we would need to make 10 additional calls to get their types.

## PokeAPI

We are using PokeAPI for our application. This API lets us get information about one specific Pokemon, which we utilize. One issue we had is that we don't need all the information about each Pokemon, but the API doesn't have an endpoint that is tailored to our needs. We therefore overfetch and receive a lot of data we don't need. This is not sustainable. A solution to this is using GraphQL instead of a REST API, which lets you specify exactly what data you want to fetch. However, for this project, using a REST API was one of the requirements.

### Local storage

We use local storage to store the names of the Pokemon that are marked as favorites. In our current solution, we are only saving the name of the Pokemon which means we have to make additional API requests when showing your favorite Pokemon. In the future, we should consider storing all the info about the favorite Pokemon in local storage, such that we minimize the API requests we have to make.

### SessionStorage

We use session storage to store the 10 random Pokemon so that when you click on details for each Pokemon, we can fetch that information from the session storage instead of making an additional API call. We also use it to store the state of the filter, so that when you reload the filter persists. It should be noted that the Pokemon will change, but that is an intentional feature because we want to generate 10 random Pokemon each time. However, when refreshed if some of the Pokemon fit the filter it will show.

## React state and props

We are using props to make it possible to reuse code. Most notably in the PokemonCard component and the pokemonCardTemplate page.

State is handled through various useStates. For example for handling what Pokemon should be shown when the filter is active and what Pokemon are favorited.

# Functional documentation

- _add docs_

## Our web app

_- add domain specific docs_

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
