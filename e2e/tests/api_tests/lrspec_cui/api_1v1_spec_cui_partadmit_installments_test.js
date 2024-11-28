const config = require('../../../config.js');
const {createAccount, deleteAccount} = require('../../../api/idamHelper');
const { otherSolicitorUser1 } = require('../../../config');

const claimType = 'SmallClaims';
let caseId;
let carmEnabled = false;

Feature('CCD 1v1 API test @api-spec-cui @non-prod-e2e-ft');
Before(async () => {
    await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
  });

  Scenario.only('1v1 LiP v LiP defendant response with part admit pay by installments', async ({api_spec_cui, noc}) => {
    await respondWithPAPayByInstallments(api_spec_cui, noc);
  });

  async function respondWithPAPayByInstallments(api_spec_cui, noc) {
    caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser,'SmallClaims',false,'INDIVIDUAL');
    await noc.requestNoticeOfChangeForRespondent1Solicitor(caseId, otherSolicitorUser1);
    // await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId,claimType,carmEnabled,'PA_INSTALLMENTS_INDIVIDUAL');
    // await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, 'JUDICIAL_REFERRAL', carmEnabled,'PA_REJECT_NO_MEDIATION');
  }

  AfterSuite(async  ({api_spec_cui}) => {
  await api_spec_cui.cleanUp();
    await deleteAccount(config.defendantCitizenUser2.email);
  });

