const {createTrialHearing, triggerHearingNotice, createDisputeResolutionHearing, createDisposalHearing} = require('../../../helpers/autoHearingNoticeHelper');
const config = require('../../../config');

Feature('Local integrated hearing notice @localAHN');

const judgeUser = config.testEarlyAdopterCourts ? config.judgeUser2WithRegionId2 : config.judgeUserWithRegionId1;
const createHearingId = () => Math.floor(1000000000 + Math.random() * 9000000000);

let caseId;

Scenario('Create unspec claim with sdo', async ({api}) => {
    await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE', '11000');
    caseId = await api.getCaseId();
    await api.amendClaimDocuments(config.applicantSolicitorUser);
    await api.notifyClaim(config.applicantSolicitorUser);
    await api.notifyClaimDetails(config.applicantSolicitorUser);
    await api.defendantResponse(config.defendantSolicitorUser, 'ONE_V_ONE', null, 'FAST_CLAIM');
    await api.claimantResponse(config.applicantSolicitorUser, 'ONE_V_ONE', 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
    await api.createSDO(judgeUser, 'CREATE_FAST');
});

Scenario('Trial hearing notice', async () => {
  const hearingId = createHearingId();
  await createTrialHearing(caseId, hearingId);
  await triggerHearingNotice(caseId, hearingId);
});

Scenario.skip('Disposal hearing notice', async () => {
  const hearingId = createHearingId();
  await createDisposalHearing(caseId, hearingId);
  await triggerHearingNotice(caseId, hearingId);
});

Scenario.skip('Dispute resolution hearing notice', async () => {
  const hearingId = createHearingId();
  await createDisputeResolutionHearing(caseId, hearingId);
  await triggerHearingNotice(caseId, hearingId);
});
