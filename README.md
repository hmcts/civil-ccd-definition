# civil-ccd-definition

Civil CCD Definition and E2E tests HNL

### Contents:

- [Building and deploying application](#building-and-deploying-the-application)
- [Testing](#testing)

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

## Testing

The repo uses codeceptjs framework for e2e tests.

To install dependencies enter `yarn install`.

To run e2e tests enter `yarn test` in the command line.

### Optional configuration

To run tests with browser window open set `SHOW_BROWSER_WINDOW=true`. By default, the browser window is hidden.

### Smoke test

To run smoke tests enter `yarn test:smoke`.

### API test

Before running API tests, you will need the `SENDGRID_API_KEY` environment variable setup and to be running the service locally along with all containers.

To run API tests enter `yarn test:api`.

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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
