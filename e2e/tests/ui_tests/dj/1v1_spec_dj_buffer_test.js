const config = require('../../../config.js');
const {createAccount} = require('../../../api/idamHelper');
const {checkToggleEnabled} = require('../../../api/testingSupport');
const {assert} = require('chai');

let caseid;
let judgmentBufferEnabled;

Feature('1v1 spec default judgment - Judgment Buffer (LR claimant vs LiP defendant)')
  .tag('@civil-ccd-nightly @ui-dj @ui-judgment-buffer');

BeforeSuite(async () => {
  judgmentBufferEnabled = await checkToggleEnabled('judgment-buffer');
  if (!judgmentBufferEnabled) return;
  await createAccount(config.defendantCitizenUser2.email, config.defendantCitizenUser2.password);
});

Scenario('01 Create LRvLiP spec claim, LR claimant requests DJ - case parks in JUDGMENT_REQUESTED with buffer confirmation (DTSCCI-5327 AC1, DTSCCI-5101 AC1)', async ({I, api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  caseid = await api_spec_cui.getCaseId();
  await api_spec_cui.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(caseid, 'ONE_V_ONE', 'UNSPEC', 'Default judgment requested');

  await api_spec_cui.verifyCaseState('JUDGMENT_REQUESTED');
  await api_spec_cui.verifyBufferStateInitialFields();
}).retry(2);

Scenario('02 Claimant LR retains event options in JUDGMENT_REQUESTED (DTSCCI-5327 AC2)', async ({api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.verifyEventsAvailable(config.applicantSolicitorUser, 'JUDGMENT_REQUESTED');
  await api_spec_cui.verifyEventsAvailable(config.adminUser, 'JUDGMENT_REQUESTED');
}).retry(2);

Scenario('03 LiP defendant submits defence during buffer - pending DJ cancelled, case moves to AWAITING_APPLICANT_INTENTION (DTSCCI-5101 AC1+AC2)', async ({api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.performCitizenDefendantResponse(config.defendantCitizenUser2, caseid, 'SmallClaims', false, '');
  await api_spec_cui.verifyCaseState('AWAITING_APPLICANT_INTENTION');
  await api_spec_cui.verifyActiveJudgmentCancelled();
}).retry(2);

Scenario('04 Defence-during-buffer triggers defendant-response notifications to both parties (DTSCCI-5101 AC6)', async ({api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.verifyDefendantResponseNotificationsSent(caseid);
}).retry(2);

Scenario('05 Scheduler issues buffered DJ once 48h+ buffer expires - full end-to-end (DTSCCI-5436 positive)', async ({I, api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  const buffCaseId = await api_spec_cui.getCaseId();
  await api_spec_cui.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(buffCaseId, 'ONE_V_ONE', 'UNSPEC', 'Default judgment requested');
  await api_spec_cui.verifyCaseState('JUDGMENT_REQUESTED');
  await api_spec_cui.waitForBusinessProcessFinished();

  const schedulers = await api_spec_cui.listSchedulers();
  assert.include(schedulers, 'JudgementBuffer',
    `JudgementBuffer scheduler not registered. Got: ${JSON.stringify(schedulers)}`);

  await api_spec_cui.amendJoDJCreatedDate(49);
  await new Promise(resolve => setTimeout(resolve, 5000));

  await api_spec_cui.runScheduler('JudgementBuffer');
  await api_spec_cui.verifyJudgmentBufferIssued();
}).retry(2);

Scenario('06 Scheduler does NOT issue DJ when buffer not yet expired (<48h) (DTSCCI-5436 negative - time gate)', async ({I, api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  const withinBufferCaseId = await api_spec_cui.getCaseId();
  await api_spec_cui.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(withinBufferCaseId, 'ONE_V_ONE', 'UNSPEC', 'Default judgment requested');
  await api_spec_cui.verifyCaseState('JUDGMENT_REQUESTED');
  await api_spec_cui.waitForBusinessProcessFinished();

  await api_spec_cui.amendJoDJCreatedDate(47);
  await new Promise(resolve => setTimeout(resolve, 5000));

  await api_spec_cui.runScheduler('JudgementBuffer');
  await api_spec_cui.verifyJudgmentBufferUnchanged();
}).retry(2);

Scenario('07 Scheduler endpoint rejects unknown scheduler name with 404 (DTSCCI-5436 negative - registry guard)', async ({api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.runSchedulerExpectingNotFound('NotARealScheduler');
}).retry(2);

Scenario('08 CTSC takes case offline during buffer - case proceeds offline to PROCEEDS_IN_HERITAGE_SYSTEM (DTSCCI-3661 AC4)', async ({I, api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.createSpecifiedClaimWithUnrepresentedRespondent(config.applicantSolicitorUser, 'ONE_V_ONE');
  const offlineCaseId = await api_spec_cui.getCaseId();
  await api_spec_cui.amendRespondent1ResponseDeadline(config.systemupdate);

  await I.login(config.applicantSolicitorUser);
  await I.initiateDJSpec(offlineCaseId, 'ONE_V_ONE', 'UNSPEC', 'Default judgment requested');
  await api_spec_cui.verifyCaseState('JUDGMENT_REQUESTED');
  await api_spec_cui.waitForBusinessProcessFinished();

  await I.login(config.adminUser);
  await I.caseProceedsInCaseman(offlineCaseId);
  await api_spec_cui.waitForBusinessProcessFinished();

  await api_spec_cui.verifyCaseState('PROCEEDS_IN_HERITAGE_SYSTEM');
}).retry(2);

AfterSuite(async ({api_spec_cui}) => {
  if (!judgmentBufferEnabled) return;
  await api_spec_cui.cleanUp();
});
