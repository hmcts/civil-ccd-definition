const config = require('../../../config.js');

const TEST_DIRECTORY = 'e2e/tests/ui_tests/dj';
const BASELINE_DIRECTORY = 'e2e/pdf-baselines/ui-dj';
const DEFAULT_JUDGMENT_CLAIMANT_PDF = 'default_judgment_claimant_spec_form.pdf';
const DEFAULT_JUDGMENT_DEFENDANT_PDF = 'default_judgment_defendant_spec_form.pdf';

Feature('1v1 spec default judgment')
  .tag('@civil-ccd-master @civil-ccd-pr @civil-ccd-nightly @ui-dj');

Scenario('1v1 create spec claim request default judgment', async ({I, api_spec}) => {

  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  let caseid = await api_spec.getCaseId();
  await api_spec.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_ONE', 'SPEC');

  await I.viewAndAssertPdf('default_judgment_spec_form', TEST_DIRECTORY, BASELINE_DIRECTORY, DEFAULT_JUDGMENT_CLAIMANT_PDF, caseid, 0);
  await I.viewAndAssertPdf('default_judgment_spec_form', TEST_DIRECTORY, BASELINE_DIRECTORY, DEFAULT_JUDGMENT_DEFENDANT_PDF, caseid, 1);
}).retry(2);

AfterSuite(async  ({api_spec}) => {
  await api_spec.cleanUp();
});
