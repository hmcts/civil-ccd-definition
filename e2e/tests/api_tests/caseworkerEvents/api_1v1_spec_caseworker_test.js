const config = require("../../../config.js");
const {createAccount} = require("../../../api/idamHelper");

Feature('CCD 1v1 API test @api-caseworker-cui @api-nonprod');

Before(async () => {
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

async function prepareClaimLiPvLiP(api_spec_cui, carmEnabled, claimType = 'SmallClaims') {
  let expectedEndState = carmEnabled ? 'IN_MEDIATION' : 'JUDICIAL_REFERRAL';
  let caseId = await api_spec_cui.createClaimWithUnrepresentedClaimant(config.applicantCitizenUser, claimType, carmEnabled);
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseId, claimType, carmEnabled);
  await api_spec_cui.performCitizenClaimantResponse(config.applicantCitizenUser, caseId, expectedEndState, carmEnabled);
}

Scenario('1v1 JUDICIAL_REFERRAL claimant and defendant response small claim', async ({I, api_spec_cui}) => {
  await prepareClaimLiPvLiP(api_spec_cui, false, 'FastTrack');
  await api_spec_cui.stayCase(config.hearingCenterAdminWithRegionId1);
  await api_spec_cui.manageStay(config.ctscAdminUser, true);
  await api_spec_cui.manageStay(config.ctscAdminUser, false);
  await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_SMALL');
  await api_spec_cui.dismissCase(config.ctscAdminUser);

});

Feature('CCD 1v1 API test @api-caseworker-lrspec @api-nonprod');

Scenario('1v1 PART_ADMISSION claimant and defendant response small claim', async ({I, api_spec_small, api_spec_cui}) => {
  await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser);
  await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'PART_ADMISSION');
  await api_spec_small.claimantResponse(config.applicantSolicitorUser);
  await api_spec_cui.stayCase(config.hearingCenterAdminWithRegionId1);
  await api_spec_cui.manageStay(config.ctscAdminUser, true);
  await api_spec_cui.manageStay(config.ctscAdminUser, false);
  await api_spec_cui.createSDO(config.judgeUserWithRegionId1, 'CREATE_SMALL');
  await api_spec_cui.dismissCase(config.ctscAdminUser);
});


