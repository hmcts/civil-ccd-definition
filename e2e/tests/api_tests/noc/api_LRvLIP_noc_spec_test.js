const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let caseId;

Feature('LR v LiP notice of change spec api journey').tag('@api-nightly-prod @api-noc');

Before(async () => {
  await createAccount(config.applicantCitizenUser.email, config.applicantCitizenUser.password);
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('LR v LiP notice of change', async ({noc, api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, true);
  await noc.requestNoticeOfChangeForApplicant1Solicitor(caseId, config.applicantSolicitorUser);
  await api_spec_cui.checkUserCaseAccess(config.applicantCitizenUser, false);
  await api_spec_cui.checkUserCaseAccess(config.applicantSolicitorUser, true);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, true);
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE_CITIZEN_DEFENDANT', 'ONE_V_ONE', 'No', 'IN_MEDIATION', true);
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.applicantCitizenUser.email);
  await deleteAccount(config.defendantCitizenUser2.email);
});
