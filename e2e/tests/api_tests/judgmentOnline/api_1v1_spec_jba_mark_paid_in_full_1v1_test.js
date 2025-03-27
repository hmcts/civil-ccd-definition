const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');

const claimType = 'SmallClaims';
let caseId;
let carmEnabled = false;

Feature('CCD 1v1 judgment by admission mark paid in full API test @api-spec-cui @non-prod-e2e-ft');
Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

async function respondWithPAPayByInstallmentsJBAPaidInFullLipvLip(api_spec_cui) {
  caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'SmallClaims', false, 'INDIVIDUAL');
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled, 'PA_INSTALLMENTS_INDIVIDUAL');
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'All_FINAL_ORDERS_ISSUED', carmEnabled, 'PA_ACCEPT_CCJ');
  await api_spec_cui.judgmentPaidInFullCui(config.applicantCitizenUser, caseId, true);
}

async function respondWithFAPayBySetDateJBAPaidInFullLRvLR(api_spec) {
  await api_spec.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', false, false);
  await api_spec.defendantResponse(config.defendantSolicitorUser, 'FULL_ADMISSION_JBA');
  await api_spec.claimantResponse(config.applicantSolicitorUser, 'FA_ACCEPT_CCJ', 'ONE_V_ONE', 'All_FINAL_ORDERS_ISSUED', false, false);
  await api_spec.markJudgmentPaid(config.applicantSolicitorUser);
}

Scenario('1v1 LR v LR defendant response with full admit pay by set date judgment by admission mark paid in full', async ({api_spec}) => {
  await respondWithFAPayBySetDateJBAPaidInFullLRvLR(api_spec);
});

Scenario('1v1 LiP v LiP defendant response with part admit pay by installments judgment by admission mark paid in full', async ({api_spec_cui}) => {
  await respondWithPAPayByInstallmentsJBAPaidInFullLipvLip(api_spec_cui);
});

/*async function prepareClaimLRvLiPExui(api_spec_cui, carmEnabled, claimType = 'SmallClaims') {
  caseId = await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled, 'PA_IMMEDIATELY_INDIVIDUAL');
  await api_spec_cui.claimantResponse(config.applicantSolicitorUser, 'PART_ADMISSION_IMMEDIATELY', 'ONE_V_ONE', 'No', 'AWAITING_APPLICANT_INTENTION', carmEnabled);
  await api_spec_cui.amendWhenWillThisAmountBePaidDeadLine(config.systemupdate);
  await api_spec_cui.requestJudgement(config.applicantSolicitorUser, 'REQUEST_JUDGEMENT');
  await api_spec_cui.markJudgmentPaid(config.applicantSolicitorUser);
}

Scenario('1v1 LR v LiP defendant response with part admit pay immediately judgment by admission mark paid in full', async ({api_spec_cui}) => {
  await prepareClaimLRvLiPExui(api_spec_cui, false);
});*/

AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});

