

const config = require('../../../config.js');

const TEST_DIRECTORY = 'e2e/tests/ui_tests/dj';
const BASELINE_DIRECTORY = 'e2e/pdf-baselines/dj';
const DEFAULT_JUDGMENT_CLAIMANT1 = 'default_judgment_claimant1.pdf';
const DEFAULT_JUDGMENT_DEFENDANT1 = 'default_judgment_defendant1.pdf';
const DEFAULT_JUDGMENT_DEFENDANT2 = 'default_judgment_defendant2.pdf';

Feature('1v2 spec defaultJudgement').tag('@ui-dj');

Scenario('1v2 create spec claim, request default judgment', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO');

  let caseid = await api_spec.getCaseId();

  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);
  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_TWO', 'SPEC');

  await I.viewAndAssertPdf('default_judgment_spec_form', TEST_DIRECTORY, BASELINE_DIRECTORY, DEFAULT_JUDGMENT_CLAIMANT1, caseid, 0);
  await I.viewAndAssertPdf('default_judgment_spec_form', TEST_DIRECTORY, BASELINE_DIRECTORY, DEFAULT_JUDGMENT_DEFENDANT1, caseid, 1);
  await I.viewAndAssertPdf('default_judgment_spec_form', TEST_DIRECTORY, BASELINE_DIRECTORY, DEFAULT_JUDGMENT_DEFENDANT2, caseid, 2);
}).retry(2);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
