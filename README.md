# ds-devtool-setEnvVars

> GitHub action to set environment variables for a `Job` in a workflow.

- Repo-Status: Active
- Repo-Contents: Library
- Repo-Service-Name: setEnvVars devtool
- Repo-Ownership-Rating: 3
- Repo-Quality-Rating: 4
- Repo-Next-Review-Due: 2026-02-19

## ⚠️ **DEPRECATION WARNING** ⚠️

> [!Caution]
> This GitHub Action is being deprecated and may be removed in the future.  
> We recommend using [GitHub configuration variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables#using-the-vars-context-to-access-configuration-variable-values) instead.

## Motivation

This action provides support for loading a set of environment variables from a file of key value pairs such as the following:

```dotenv
DATABASE_NAME=production
```

The initial intent of this action was to create a way of storing non-sensitive configuration variables that have different values per each environment that they are deployed to. It pre-dates GitHub's own [configuration variables] that can be stored per each GitHub environment.

:warning: **For most use cases**, we recommend implementing [configuration variables] over using this action.

## Using configuration variables

Imagine an action that deploys a service from GitHub to an external server.

When using this action, the `DATABASE_NAME` is defined in one of three `.env` files and is passed through at deploy time:

```yml
jobs:
    deploy:
        name: 'Deploy to external server'
        runs-on: ubuntu-latest
        strategy:
            matrix:
                environment: ['dev', 'staging', 'prod']
        environment: ${{ matrix.environment }}
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v3
              with:
                  node-version: 20
            - run: npm ci
            - uses: university-of-york/ds-devtool-setEnvVars@v3
              with:
                  envFile: .env.${{ matrix.environment }}
            - run: npm run deploy
              env:
                  DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
                  EXTERNAL_SERVER: ${{ matrix.environment }}
```

Instead, by storing the `DATABASE_NAME` in [configuration variables] for each of our three environments, we can pass the variable directly to our deployment step:

```yml
jobs:
    deploy:
        name: 'Deploy to external server'
        runs-on: ubuntu-latest
        strategy:
            matrix:
                environment: ['dev', 'staging', 'prod']
        environment: ${{ matrix.environment }}
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v3
              with:
                  node-version: 20
            - run: npm ci
            - run: npm run deploy
              env:
                  DATABASE_NAME: ${{ vars.DATABASE_NAME }}
                  DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
                  EXTERNAL_SERVER: ${{ matrix.environment }}
```

One advantage to this, other than dropping the dependency, is that the whole configuration is defined in one place. We can mix variables, secrets, and static configuration without worrying about which ones can go in the external file and which ones cannot.

## Using this action

The action requires an `envFile` input, which is a text file containing one or more key value pairs. The path to this is resolved from the current working directory.

For example, to populate the environment with variables from a `staging.env` file located in the root you would configure this action as follows:

```yml
- name: Set staging env vars
  uses: university-of-york/ds-devtool-setEnvVars@v3
  with:
      envFile: 'staging.env'
```

### Overwriting existing variables

By default, this action will not replace environment variables that have been previously defined. You may change this by setting the `overwrite` flag:

```yml
- name: Set staging env vars
  uses: university-of-york/ds-devtool-setEnvVars@v3
  with:
      envFile: 'staging.env'
      overwrite: true
```

## Developer notes

Note that this action is manually released, you will need to perform the following;

```shell
npm run build
# commit your changes
npm version minor # or major, or patch depending on scope
npm run move-major-tag
# push the changes
```

[configuration variables]: https://docs.github.com/en/actions/learn-github-actions/variables#using-the-vars-context-to-access-configuration-variable-values

## Repository visibility

This repository is intentionally public to allow this action to be published on the GitHub marketplace.

However, we are now recommending that GitHub's configuration variables should be used instead of this action, so this action may be made private or retired altogether within the next year.
