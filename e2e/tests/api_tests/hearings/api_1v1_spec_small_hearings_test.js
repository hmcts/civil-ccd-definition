/* eslint-disable no-unused-vars */
const config = require('../../../config.js');
const {getLanguageInterpreterFlag, getRAWheelchairFlag} = require('../../../api/caseFlagsHelper');

const mpScenario = 'ONE_V_ONE';
const hearingsApi = true;
let caseId;

Feature('CCD 1v1 Spec small hearings API test @non-prod-e2e-ft @api-hearings-spec @api-hearings');

// Scenario('1v1 full defence defendant and claimant response', async ({api_spec_small}) => {
//   await api_spec_small.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, hearingsApi);
//   await api_spec_small.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', mpScenario, hearingsApi);
//   await api_spec_small.claimantResponse(config.applicantSolicitorUser);
//
//   caseId = await api_spec_small.getCaseId();
// });
//
// Scenario('Listing officer adds case flags', async ({hearings}) => {
//   await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId1, caseId, 'applicant1', getLanguageInterpreterFlag());
//   await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId1, caseId, 'respondent1', getRAWheelchairFlag());
// });
//
// Scenario('Judge choose hearing in person', async ({api_spec_small}) => {
//   await api_spec_small.createSDO(config.judgeUserWithRegionId1, 'CREATE_SMALL');
// });
//
// Scenario('Hearing centre admin requests a hearing', async ({hearings}) => {
//   await hearings.generateHearingsPayload(config.hearingCenterAdminWithRegionId1, caseId, 'AAA6');
// });
