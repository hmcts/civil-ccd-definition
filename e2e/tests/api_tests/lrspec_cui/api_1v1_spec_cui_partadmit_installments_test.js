const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let caseId;
let carmEnabled = false;

Feature('1v1 LIP v LIP spec api part admit journey').tag('@api-spec-cui @ui-nonprod @ui-nightly-prod');
Before(async () => {
  await createAccount(config.applicantCitizenUser.email, config.applicantCitizenUser.password);
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LiP v LiP defendant response with part admit pay by installments', async ({api_spec_cui}) => {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser,'SmallClaims',false,'INDIVIDUAL');
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId,claimType,carmEnabled,'PA_INSTALLMENTS_INDIVIDUAL');
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'JUDICIAL_REFERRAL', carmEnabled,'PA_REJECT_NO_MEDIATION');
});

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.applicantCitizenUser.email);
  await deleteAccount(config.defendantCitizenUser2.email);
});
