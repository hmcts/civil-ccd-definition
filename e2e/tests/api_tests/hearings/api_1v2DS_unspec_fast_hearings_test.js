const config = require('../../../config.js');
const {getSupportWorkerFlag, getDetainedIndividualFlag, getDisruptiveIndividualFlag
} = require('../../../api/caseFlagsHelper');
const {checkCaseFlagsAndHmcEnabled} = require('../../../api/testingSupport');

const mpScenario = 'ONE_V_TWO_TWO_LEGAL_REP';
const fastClaimAmount = '11000';
const serviceId = 'AAA7';
let caseId;
let caseFlagsAndHmcEnabled = false;

let continueWithScenario = () => {
  const continueWithScenario = [
    config.testEarlyAdopterCourts,
    caseFlagsAndHmcEnabled
  ].filter(condition => !condition).length == 0;

  console.log(`${continueWithScenario ? '' : 'not '}continuing with scenario as toggles are ${continueWithScenario ? '' : ' not '}enabled...`);

  return continueWithScenario;
};

Feature('CCD 1v2 Unspec fast hearings API test @api-hearings-unspec @api-hearings @api-nonprod');

BeforeSuite(async () => {
  caseFlagsAndHmcEnabled = await checkCaseFlagsAndHmcEnabled();
});

Scenario('1v2DS full defence defendant and claimant response', async ({api}) => {
  if(!continueWithScenario()) return;
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, fastClaimAmount);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, 'solicitorOne');
  await api.defendantResponse(config.secondDefendantSolicitorUser, mpScenario, 'solicitorTwo');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');

  caseId = await api.getCaseId();
});

Scenario('Listing officer adds case flags', async ({hearings}) => {
  if(!continueWithScenario()) return;
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent1', getDetainedIndividualFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent1', getDisruptiveIndividualFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent2Witnesses', getSupportWorkerFlag());
});

Scenario('Judge choose hearing in person', async ({api}) => {
  if(!continueWithScenario()) return;
  await api.createSDO(config.judgeUserWithRegionId2, 'CREATE_FAST_IN_PERSON');
});

Scenario('Hearing centre admin requests a hearing', async ({hearings}) => {
  if(!continueWithScenario()) return;
  await hearings.generateHearingsPayload(config.hearingCenterAdminWithRegionId2, caseId, serviceId);
});
