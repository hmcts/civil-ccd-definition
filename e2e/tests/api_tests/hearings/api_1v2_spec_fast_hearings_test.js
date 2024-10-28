
const config = require('../../../config.js');
const {getLanguageInterpreterFlag, getRAWheelchairFlag} = require('../../../api/caseFlagsHelper');
const {checkCaseFlagsAndHmcEnabled} = require('../../../api/testingSupport');

const serviceId = 'AAA6';
let caseId;
let caseFlagsAndHmcEnabled = false;

let continueWithScenario = () => {
  const continueWithScenario = [
    caseFlagsAndHmcEnabled
  ].filter(condition => !condition).length == 0;

  console.log(`${continueWithScenario ? '' : 'not '}continuing with scenario as toggles are ${continueWithScenario ? '' : ' not '}enabled...`);

  return continueWithScenario;
};

Feature('CCD 1v2 Spec fast hearings API test @api-hearings @api-hearings-spec @api-nonprod');

BeforeSuite(async () => {
  caseFlagsAndHmcEnabled = await checkCaseFlagsAndHmcEnabled();
});

Scenario('1v2 fast claim full defence', async ({api_spec_fast}) => {
  if(!continueWithScenario()) return;
  await api_spec_fast.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_TWO_SAME_SOL');
  await api_spec_fast.defendantResponse(config.defendantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO');
  await api_spec_fast.claimantResponse(config.applicantSolicitorUser, 'FULL_DEFENCE', 'ONE_V_TWO',
    'AWAITING_APPLICANT_INTENTION');

  caseId = await api_spec_fast.getCaseId();
});

Scenario('Listing officer adds case flags', async ({hearings}) => {
  if(!continueWithScenario()) return;
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'applicant1', getLanguageInterpreterFlag());
  await hearings.createCaseFlags(config.hearingCenterAdminWithRegionId2, caseId, 'respondent1', getRAWheelchairFlag());
});

Scenario('Judge choose hearing in person', async ({api_spec_fast}) => {
  if(!continueWithScenario()) return;
  await api_spec_fast.createSDO(config.judgeUserWithRegionId1, 'CREATE_FAST');
});

Scenario('Hearing centre admin requests a hearing', async ({hearings}) => {
  if(!continueWithScenario()) return;
  await hearings.generateHearingsPayload(config.hearingCenterAdminWithRegionId2, caseId, serviceId);
});
