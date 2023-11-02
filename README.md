# ds-devtool-setEnvVars

> GitHub action to set environment variables for a `Job` in a workflow.

## Usage

The action has a required input called `envFile`. This sets the path to the file containing the environment variables to set for e.g. `staging.env`.

This action reads all variable defined in a file and makes them available as environment variables to the workflow steps. In the above example, variables defined in `staging.env` will be setup as environment varaibles.

### In the workflow.yml

1.  Use the checked out action in your workflow:

        - name: Set staging env vars
          uses: university-of-york/ds-devtool-setEnvVars@v2
          with:
            envFile: 'staging.env'

### Using secrets with this action

Any secrets defined as environment variables when using action are setup as environment variables to the steps in the workflow. This does not reveal the value of the secret. An example of using secrets is as follows:

        - name: Set staging env vars
          uses: university-of-york/ds-devtool-setEnvVars@v2
          with:
            envFile: 'staging.env'
          env:
              MY_SECRET: ${{secrets.MY_SECRET}}

The secret can then be used in the workflow steps as `$MY_SECRET`.

### Overwriting existing variables

By default, this action will not replace environment variables that have been previously defined. You may change
this by setting the `overwrite` flag:

        - name: Set staging env vars
          uses: university-of-york/ds-devtool-setEnvVars@v2
          with:
            envFile: 'staging.env'
            overwrite: true
          env:
              MY_SECRET: ${{secrets.MY_SECRET}}

## Developer notes

Note that this action is manually released, you will need to perform the following;

```shell
npm run build
# commit your changes
npm version minor # or major, or patch depending on scope
npm run move-major-tag
# push the changes
```
