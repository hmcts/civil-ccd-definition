test pipeline # civil-ccd-definition

Civil CCD Definition and E2E tests

### Contents:

- [Building and deploying application](#building-and-deploying-the-application)
- [Testing](#testing)
- [Adding Git Conventions](#adding-git-conventions)

## Building and deploying the application

### Dependencies

The project is dependent on other Civil repositories:

- [civil-service](https://github.com/hmcts/civil-service)
- [civil-camunda-bpmn-definition](https://github.com/hmcts/civil-camunda-bpmn-definition)

To set up complete local environment for Civil check [civil-sdk](https://github.com/hmcts/civil-sdk)

### Preview environment

Preview environment will be created when opening new PR. Camunda BPMN definitions will be pulled from the latest GitHub
release. Service instance will be running the latest image version deployed to ACR.

To access XUI visit url (make sure that it starts with `https`, otherwise IDAM won't let you log in):

- `https://xui-civil-ccd-pr-PR_NUMBER.service.core-compute-preview.internal`

To access Camunda visit url (login and password are both `admin`):

- `https://camunda-civil-ccd-pr-PR_NUMBER.service.core-compute-preview.internal`


Below labels are needed on the PR

```

  "enable_keep_helm" label to retain helm release on preview

  "pr-values:enableNotifyEmails" label to be able to send live notifications on the PR

  "pr-values:elasticsearch" label to have elastic search running - needed for scheduler testing

  "pr-values:enableWA" label to verify work allocation task

```

Running Crossbrowser tests:

Install saucelabs on local machine

```bash
$ yarn test:crossbrowser
```


## Testing

The repo uses codeceptjs framework for e2e tests.

To install dependencies enter `yarn install`.

To run e2e tests enter `yarn test` in the command line.

### Optional configuration

To run tests with browser window open set `SHOW_BROWSER_WINDOW=true`. By default, the browser window is hidden.

### Smoke test

To run smoke tests enter `yarn test:smoke`.

### Functional tests

To run functional tests enter `yarn test:functional`.

For running UI tests, set CCD_UI_TESTS=true

### API test

Before running API tests, you will need the `SENDGRID_API_KEY` environment variable setup and to be running the service locally along with all containers.

To run API tests enter `yarn test:api`.
set CCD_UI_TESTS=false

### Testing in IntelliJ (Ultimate Edition)
1) Running a test_name.js
- Select the .js file containing the tests you want to run and modify its run configuration.

- Set "Node interpreter" to: [...]\node.exe
- Set "Node parameters" to: "[...]\civil-ccd-definition\node_modules\codeceptjs\bin\codecept.js" run --debug --verbose
- Set "Working directory" to: "[...]\civil-ccd-definition\"
- Set JavaScript file to: "[...]\test_name.js"
- Set "Environment variables" to:
- S2S_SECRET=[...];ENVIRONMENT=[...];NODE_TLS_REJECT_UNAUTHORIZED=0;SHOW_BROWSER_WINDOW=true

2) Running a test from package.json
- Run > Edit configurations > + > Node.js

- Set "Node interpreter" to: [...]\node.exe
- Set "Node parameters" to: "[...]\civil-ccd-definition\node_modules\codeceptjs\bin\codecept.js" run --grep @[test_name] --debug --verbose
- Set "Working directory" to: "[...]\civil-ccd-definition\"
- Set "Environment variables" to:
- S2S_SECRET=[...];ENVIRONMENT=[...];NODE_TLS_REJECT_UNAUTHORIZED=0;SHOW_BROWSER_WINDOW=true

## Adding Git Conventions

### Include the git conventions.
* Make sure your git version is at least 2.9 using the `git --version` command
* Run the following command:
```
git config --local core.hooksPath .git-config/hooks
```
Once the above is done, you will be required to follow specific conventions for your commit messages and branch names.

If you violate a convention, the git error message will report clearly the convention you should follow and provide
additional information where necessary.

*Optional:*
* Install this plugin in Chrome: https://github.com/refined-github/refined-github

  It will automatically set the title for new PRs according to the first commit message, so you won't have to change it manually.

  Note that it will also alter other behaviours in GitHub. Hopefully these will also be improvements to you.

*In case of problems*

1. Get in touch with your Technical Lead so that they can get you unblocked
2. If the rare eventuality that the above is not possible, you can disable enforcement of conventions using the following command

   `git config --local --unset core.hooksPath`

   Still, you shouldn't be doing it so make sure you get in touch with a Technical Lead soon afterwards.


## Development / Debugging Environment - Preview with Mirrord

As an alternative for a development environment there is a procedure in place where after running the command
below the required services for Civil are created in Preview under the developer's name, so these will be exclusively
for the named developer use.

While connected to the VPN simply run one of the below commands from your project's (civil-ccd-definition) folder:
Note: be sure to have Docker running
```shell
npx @hmcts/dev-env@latest && ./bin/setup-devuser-preview-env.sh
```
You can optionally specify a branch for CCD definitions and Camunda definitions like below or leave it blank to use master.

```shell
npx @hmcts/dev-env@latest && ./bin/setup-devuser-preview-env.sh camundaBranch dmnBranch waStandaloneBranch
```

Once the pods are up and running you can connect to them using a plugin called Mirrord on Intellij.
https://mirrord.dev

If you want to clean up the environment just run:

```shell
npx @hmcts/dev-env@latest --delete
```

To run the specialised charts, where you can get Work Allocation for instance, run:

```shell
npx @hmcts/dev-env@latest --template values.enableWA.preview.template.yaml && ./bin/setup-devuser-preview-env.sh
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
