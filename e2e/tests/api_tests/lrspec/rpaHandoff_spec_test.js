const config = require('../../../config.js');
const {unAssignAllUsers, assignCaseRoleToUser, addUserCaseMapping} = require('../../../api/caseRoleAssignmentHelper');
const {waitForFinishedBusinessProcess} = require('../../../api/testingSupport');

const caseId = () => `${caseNumber.split('-').join('').replace(/#/, '')}`;
let caseNumber;

Feature('RPA handoff points tests @rpa-handoff-tests-spec');

Scenario('Defendant response- Full defence', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();
}).retry(3);

Scenario('Defendant response- Full admission', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION', 'ONE_V_TWO');
  await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();
}).retry(3);

Scenario('Defendant response- Part admission', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION', 'ONE_V_TWO');
  await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();
}).retry(3);

Scenario('Defendant response- Counter claim', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'COUNTER_CLAIM', 'ONE_V_TWO');
  await waitForFinishedBusinessProcess(caseId());
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.assertNoEventsAvailable();
  await api_spec.signOut();
}).retry(3);

Scenario('Take claim offline', async ({I, api_spec}) => {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec.login(config.defendantSolicitorUser);
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.informAgreedExtensionDate();

  await api_spec.login(config.adminUser);
  await api_spec.navigateToCaseDetails(caseNumber);
  await api_spec.caseProceedsInCaseman();
  await api_spec.signOut();
}).retry(3);

AfterSuite(async  () => {
  await unAssignAllUsers();
});
