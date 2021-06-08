# ds-devtool-setEnvVars

This is a Github action that sets environment variables for a `Job` in a workflow.

## Usage

The action has a required input called `envFile`. This sets the path to the file containing the environment variables to set for e.g. `staging.env`.

This action reads all variable defined in a file and makes them available as environment variables to the workflow steps. In the above example, variables defined in `staging.env` will be setup as environment varaibles.
The env files should be at the root of the project.

### In the workflow.yml

1.  Use the checked out action in your worflow:

        - name: Set staging env vars
          uses: actions/setEnvVars@v1
          with:
            envFile: 'staging.env'

### Using secrets with this action

Any secrets defined as environment variables when using action are setup as environment varaibles to the steps in the workflow. This does not reveal the value of the secret. An example of using secrets is as follows:

        - name: Set staging env vars
          uses: actions/setEnvVars@v1
          with:
            envFile: 'staging.env'
          env:
              MY_SECRET: ${{secrets.MY_SECRET}}

The secret can then be used in the workflow steps as `$MY_SECRET`.
