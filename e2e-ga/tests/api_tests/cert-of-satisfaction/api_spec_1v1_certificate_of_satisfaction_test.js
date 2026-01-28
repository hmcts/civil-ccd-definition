const config = require('../../../config.js');
const { createAccount, deleteAccount} = require('../../../api/idamHelper.js');

let civilCaseReference;

Feature('GA SPEC Claim 1v1 Certification of Satisfaction/Cancellation').tag('@api-nightly-prod @api-cert-of-satisfaction');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('1v1 LR v LIP Spec case marked paid in full', async ({api}) => {
  civilCaseReference = await api.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api.amendRespondent1ResponseDeadline(config.systemUpdate);
  await api.defaultJudgmentXuiPayImmediately(config.applicantSolicitorUser);
  await api.markJudgmentPaid(config.applicantSolicitorUser);
  await api.certificateOfSatisfactionCancellationCui(config.defendantCitizenUser2, civilCaseReference);
}).retry(1).tag('@api-prod @ui-prod');

Scenario('1v1 LIP v LIP Spec Case marked paid in full', async ({api}) => {
  civilCaseReference = await api.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'SmallClaims', 'INDIVIDUAL');
  await api.amendRespondent1ResponseDeadline(config.systemUpdate);
  await api.defaultJudgmentCui(config.applicantCitizenUser);
  await api.certificateOfSatisfactionCancellationCui(config.defendantCitizenUser2, civilCaseReference);
}).retry(1).tag('@api-prod @ui-prod');

Scenario('1v1 LIP v LIP Spec Case not marked paid in full', async ({api}) => {
  civilCaseReference = await api.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, 'SmallClaims', 'INDIVIDUAL');
  await api.amendRespondent1ResponseDeadline(config.systemUpdate);
  await api.defaultJudgmentCui(config.applicantCitizenUser);
  await api.judgmentPaidInFullCui(config.applicantCitizenUser);
  await api.certificateOfSatisfactionCancellationCui(config.defendantCitizenUser2, civilCaseReference);
}).retry(1);

Scenario('1v1 LR v LIP Spec case JBA marked paid in full', async ({api}) => {
  civilCaseReference = await api.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  await api.performCitizenDefendantResponse(config.defendantCitizenUser2, civilCaseReference);
  await api.claimantResponseClaimSpec(config.applicantSolicitorUser, 'PART_ADMISSION_IMMEDIATELY', 'ONE_V_ONE',
    'AWAITING_APPLICANT_INTENTION');
  await api.amendWhenWillThisAmountBePaidDeadLine(config.systemUpdate);
  await api.requestJudgementXui(config.applicantSolicitorUser, 'REQUEST_JUDGEMENT');
  await api.markJudgmentPaid(config.applicantSolicitorUser);
  await api.certificateOfSatisfactionCancellationCui(config.defendantCitizenUser2, civilCaseReference);
}).retry(1);

AfterSuite(async ({ api }) => {
  await api.cleanUp();
  await deleteAccount(config.defendantCitizenUser2.email);
});
