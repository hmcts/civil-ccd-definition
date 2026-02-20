# AGENTS

## Codeceptjs E2E Tests
- Code related to e2e tests for codeceptjs are contained in the './e2e/' folder.
- Configuration lives in codecept.conf.js.
- UI tests are contained in the following folder path './e2e/tests/ui_tests' and API tests are contained in the following folder path './e2e/tests/api_tests'. 
- These tests are run in a Jenkins pipeline, there are 3 pipelines: master, PR (preview) and nightly. For the following repos:
    * civil-ccd-definition
    * civil-service
    * civil-camunda-bpmn-definition
    * civil-wa-task-configuration
 
- For civil-ccd-definition (this repo):
  * For this repo,the jenkins configuration for master and PR pipelines is defined in the 'Jenkinsfile_CNP' and the configuration for the nightly pipeline is defined in the 'Jenkinsfile_nightly'. Both jenkins configurations are defined and maintained by a common pipeline.
  * For the master and PR pipeline there is a 'Functional Test' stage where these tests are run. The tests are run using yarn and the script that is run, defined in the package.json file, is 'test:functional', this runs a shell script and depending on github labels defined on the PR, this command then invokes the following two commands for the master pipeline and preview PR respectively 'test:ui-prod' and 'test:ui-nonprod' which looks for tests in a set of files defined in the './codecept.conf.js' file which have the following tags '@ui-prod' for the master pipeline and '@ui-prod' or '@ui-nonprod' for the preview pipeline.
  * For the nightly pipeline. The tests are run using yarn and the script that is run, defined in the package.json file, is 'test:fullfunctional', this runs a shell script and depending on the env  variables defined, this command then invokes the following commands 'test:ui-nightly-prod' which look for tests in a set of files defined in the './codecept.conf.js' file which have the following tags '@ui-nightly-prod' or '@ui-prod'.
  * Only tests contained within the folder path './e2e/tests/ui_tests' are run.

- For civil-service and civil-camunda-bpmn-definition:
  * There is a 'Jenkinsfile_CNP' and 'Jenkinsfile_nightly', similar to the ones contained in this repo which is maintained by the same common pipeline
  * The pipeline pulls in the latest master version of this repo with all its e2e tests into it's workspace.
  * The projects in those repos are gradle projects which, for the master and PR pipeline there is a 'Functional Test' stage, which runs a gradle task called 'functional', this then executes a similar shell script to the one executed by 'test:functional', which in turn runs a yarn and the script that is run, defined in the package.json file, called 'test:api-prod' for master and 'test:api-nonprod' for PR. which looks for tests in a set of files defined in the './codecept.conf.js' file which have the following tags '@api-prod' for the master pipeline and '@api-prod' or 'api-nonprod' for the preview pipeline.
  * For the nightly pipeline there is only one for civil-service which is executed using the gradle task 'functional' as well but uses a conditional check to execute a nightly shell script which is similar to the nightly shell script contained in this repo, to in turn invoke the yarn command, defined in the package.json, 'test:api-nightly-prod', which looks for tests in a set of files defined in the './codecept.conf.js' file which have the following tags '@api-nightly-prod' or '@api-prod'.
  * Only tests contained within the folder path './e2e/tests/api_tests' are run.

- For the civil-wa-task-configuration repo:
  * There is a 'Jenkinsfile_CNP' and 'Jenkinsfile_nightly', similar to the ones contained in this repo which is maintained by the same common pipeline
  * The pipeline pulls in the latest master version of this repo with all its e2e tests into it's workspace.
  * The projects in those repos are gradle projects which, for the master and PR pipeline there is a 'Functional Test' stage, which runs a gradle task called 'functional', this then executes a similar shell script to the one executed by 'test:functional', which in turn runs a yarn and the script that is run, defined in the package.json file, called 'test:wa-task' for both master and PR pipelines. which looks for tests in a set of files defined in the './codecept.conf.js' file which have the following tag for the master pipeline and preview '@wa-task'.
  * For the nightly pipeline which is executed using the gradle task 'functional' as well but uses a conditional check to execute a nightly shell script which is similar to the nightly shell script contained in this repo, to in turn invoke the yarn command, defined in the package.json, 'test:wa-task', which looks for tests in a set of files defined in the './codecept.conf.js' file which have the following tags '@wa-task'.
  * Only tests contained within the folder path './e2e/tests/api_tests' are run.

- UI and API tests were written by different developers and automation engineers, so there is a bit of inconsistency in the approach, however you will find that Scenarios within Features fall into two different categories independent and dependent. Independent meaning the entire e2e test is contained within one scenario, which means one Feature may contain multiple e2e tests. Dependent meaning, for the next Scenario to pass the previous scenario must also pass, which means the entire e2e test is contained within a feature.

- Test documentation:
  * For features with independent scenarios, test names can be considered to be scenario titles and the steps can be considered to be the names of any methods that are being called from the following objects:
    - I
    - LRspec
    - WA
    - api
    - api_spec
    - api_spec_fast
    - api_spec_small
    - api_spec_cui
    - noc
    - hearings
    - bulks
    - qmSteps
  * For features with dependent scenarios, test names can be considered to be the feature title and the test steps can still be considered to be the names of any methods that are being called from the following objects above in each scenario of the feature.
  * For features with independent and dependent scenarios, steps can also be any class methods where the class name ends with 'Steps'
  * There are methods called from the objects above which should be ignored in the documentation of the e2e test steps these include:
    - .getCaseId
    - .login
    - .setCaseId
    - .signOut
    - .amOnPage
    - .waitForText
    - .wait
    - .navigateToCaseDetails
    - .see
    - .grabCaseNumber
    - .navigateToTab
    - .assertHasEvents
    - .retrieveTaskDetails
    - .validateTaskInfo
    - .completeTaskByUser

- Functional Test Groups
  * Within the ./e2e/tests/ui-tests and ./e2e/tests/api-tests folders E2E tests are distributed into sub-folders which pertain to the functional test groups they are associated with.  
  * Within some of these test files additional tags are added which pertain to functional test groups, these are used to only run a specific set of functional tests in a PR pipeline whenever a particular github label has been added to the PR. In UI test tags which are functional test groups are prefixed with '@ui-{functionalGroup}' and in API tests they are prefixed with '@api-{functionalGroup}'. The corresponding github label is given by 'pr_ft_{functionalGroup}'. The ui functional test groups are used on the civil-ccd-definition PR pipeline and the api functional test group are used on the civil-service and civil-camunda-bpmn-definition PR pipeline.

  The ui functional test groups are run in the civil-ccd-definition PR pipeline and the api functional test groups are run in the civil-service PR and civil-camunda-bpmn-definition PR pipelines.
  
  * Here is the current set up for functional test groups (folders) and their functional test group names for ui tests and api tests.
    - api tests
      * bulk-claim: Bulk Claim
      * case-flags: Case Flags
      * case-offline: Case Offline
      * case-progression: Case Progression
      * cos: Certificate of Service
      * discontinue-claim: Discontinue Claim
      * dj: Default Judgment
      * drh: Dispute Resolution Hearing
      * flight-delay: Flight Delay
      * hearings: Hearings
      * intermediate-track: Intermediate Track
      * jo: Judgment Online
      * mci: Manage Contact Information
      * mediation: Mediation
      * multi-track: Multi Track
      * nihl: Noise Induced Hearing Loss
      * noc: Notice of Change
      * not-suitable-sdo: Not Suitable For SDO
      * qm: Query Management
      * rfr: Request For Reconsideration
      * settle-claim: Settle Claim
      * spec-counter-claim: Specified Counter Claim
      * spec-full-admit: Specified Full Admit
      * spec-full-defence: Specified Full Defence
      * spec-part-admit: Specified Part Admit
      * stay-case: Stay Case
      * unspec-full-defence: Unspecified Full Defence
    
    - ui tests
      * case-flags: Case Flags
      * case-offline: Case Offline
      * case-progression: Case Progression
      * cos: Certificate of Service
      * discontinue-claim: Discontinue Claim
      * dj: Default Judgment
      * flight-delay: Flight Delay
      * hearings: Hearings
      * intermediate-track: Intermediate Track
      * jo: Judgment Online
      * mci: Manage Contact Information
      * mediation: Mediation
      * multi-track: Multi Track
      * noc: Notice of Change
      * qm: Query Management
      * rfr: Request For Reconsideration
      * settle-claim: Settle Claim
      * spec-full-admit: Specified Full Admit
      * spec-full-defence: Specified Full Defence
      * spec-part-admit: Specified Part Admit
      * stay-case: Stay Case
      * unspec-full-defence: Unspecified Full Defence

## Playwright E2E Tests
- Currently we are in the process of migrating our E2E tests in codeceptjs into pure playwright. The tests for this migrating are currently located in the following folder path './playwright-e2e'.
