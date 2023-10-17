const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';
const claimAmountAdvisor = '100';
let fastTrackDirectionsTask, taskId;
let smallClaimDirectionsTask, legalAdvisorSmallClaimsTrackDirectionsTask;
let transferOfflineSdoTask;
if (config.runWAApiTest) {
  fastTrackDirectionsTask = require('../../../../wa/tasks/fastTrackDirectionsTask.js');
  smallClaimDirectionsTask = require('../../../../wa/tasks/smallClaimDirectionsTask.js');
  legalAdvisorSmallClaimsTrackDirectionsTask = require('../../../../wa/tasks/legalAdvisorSmallClaimsTrackDirectionsTask.js');
  transferOfflineSdoTask = require('../../../../wa/tasks/transferOfflineSdo.js');
}

Feature('CCD 1v1 API test');

async function prepareClaim(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario, null, 'FAST_CLAIM');
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO', 'FAST_CLAIM');
}

Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_SMALL');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'SMALL_CLAIMS');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
    await api.createFinalOrder(config.judgeUserWithRegionId1, 'FREE_FORM_ORDER');
  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages - hearing scheduled @api-sdo @api-prod-sdo @123', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
    await prepareClaim(api, claimAmountJudge);
  await api.createSDO(judgeUser, 'CREATE_FAST');
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
    // to be re-added after merge of  https://github.com/hmcts/civil-service/pull/3340
    //await api.createFinalOrder(config.judgeUserWithRegionId1, 'ASSISTED_ORDER');
  }
});

Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages - hearing scheduled', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_SMALL_NO_SUM');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'SMALL_CLAIMS');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
  }
});


Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeeUnpaid(config.hearingCenterAdminWithRegionId1);
  }
});


Feature('CCD 1v1 API test @e2e-nightly');

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'SMALL_CLAIMS');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'SMALL_CLAIMS');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_FAST');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_FAST_NO_SUM');
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'FAST_TRACK_TRIAL');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeePaid(config.hearingCenterAdminWithRegionId1);
    if (['demo'].includes(config.runningEnv)) {
      await api.triggerBundle(config.systemupdate);
    }
  }
});

Scenario('1v1 full defence unspecified - judge draws disposal order - hearing scheduled @wa-r4', async ({ api, WA}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      const task = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.fastTrackDirections);
      WA.validateTaskInfo(task, fastTrackDirectionsTask);
      taskId = task['id'];
    }
    await api.createSDO(judgeUser);
    if (config.runWAApiTest) {
      api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
    }
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'OTHER');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeeUnpaid(config.hearingCenterAdminWithRegionId1);
  } else if (['aat'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      const task = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.fastTrackDirections);
      WA.validateTaskInfo(task, fastTrackDirectionsTask);
      taskId = task['id'];
    }
    await api.createSDO(judgeUser);
    if (config.runWAApiTest) {
      api.completeTaskByUser(config.judgeUserWithRegionId1, taskId);
    }
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws disposal order - hearing scheduled @wa-r4', async ({api, WA}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      // TODO not sure which one is for this case
      const task = await api.retrieveTaskDetails(legalAdvUser, caseId, config.waTaskIds.legalAdvisorDirections);
      WA.validateTaskInfo(task, smallClaimDirectionsTask);
    }
    await api.createSDO(legalAdvUser);
    await api.evidenceUploadApplicant(config.applicantSolicitorUser);
    await api.evidenceUploadRespondent(config.defendantSolicitorUser, mpScenario);
    await api.scheduleHearing(config.hearingCenterAdminWithRegionId1, 'OTHER');
    await api.amendHearingDueDate(config.systemupdate);
    await api.hearingFeeUnpaid(config.hearingCenterAdminWithRegionId1);
  } else if (['aat'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      // TODO not sure which one is for this case
      const task = await api.retrieveTaskDetails(legalAdvUser, caseId, config.waTaskIds.legalAdvisorDirections);
      WA.validateTaskInfo(task, legalAdvisorSmallClaimsTrackDirectionsTask);
      taskId = task['id'];
    }
    await api.createSDO(legalAdvUser);
    if (config.runWAApiTest) {
      api.completeTaskByUser(config.legalAdvUser, taskId);
    }
  }
});

Scenario('1v1 full defence unspecified - judge declares SDO unsuitable - hearing scheduled', async ({api, WA}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'UNSUITABLE_FOR_SDO');
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      const task = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.notSuitableSdo);
      WA.validateTaskInfo(task, transferOfflineSdoTask);
    }
  }
});

// skip while ccd-data-store says legalAdvUser has no permission to run this event
Scenario.skip('1v1 full defence unspecified - legal advisor declares SDO unsuitable - hearing scheduled', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'UNSUITABLE_FOR_SDO');
  }
});
