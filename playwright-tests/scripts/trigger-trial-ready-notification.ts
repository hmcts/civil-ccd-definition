// Sends the trial ready notification (the solicitorTrialReady email) for one case, without waiting for civil-service's
// nightly scheduler, which only picks up fast track cases whose hearing is less than 6 weeks away:
//
//   ENV=preview PREVIEW_SERVICE=citizen-ui PR_NUMBER=8265 yarn trigger:trial-ready-notification <case id>
//
// TRIAL_READY_NOTIFICATION can only be run by the civil system user, so it is not offered in XUI. The case must be in
// HEARING_READINESS or PREPARE_FOR_HEARING_CONDUCT_HEARING. The script runs the event, waits for its business process
// (whose "Notify parties" task sends the emails), checks trialReadyNotified, and lists each solicitorTrialReady email
// with the notificationId GOV.UK Notify gave it.
import '../env.ts';
import { TestingEndPointHelper } from '../helpers/TestingEndPointHelper.ts';

// civil-service's notifications.solicitorTrialReady template (application.yaml), or SOLICITOR_TRIAL_READY_TEMPLATE_ID
const solicitorTrialReadyTemplateId = process.env.SOLICITOR_TRIAL_READY_TEMPLATE_ID ?? 'b2e4ac03-4c1a-40c1-855c-718c61cb73e9';

(async () => {
  const caseId = process.argv[2]?.replace(/-/g, '');
  if (!caseId || !/^\d{16}$/.test(caseId)) {
    throw new Error('Give the 16 digit case id, e.g. yarn trigger:trial-ready-notification 1792405587216053');
  }
  const helper = new TestingEndPointHelper();

  await helper.triggerTrialReadyNotification(caseId);
  await helper.waitForCamundaProcessToFinish(caseId, 'TRIAL_READY_NOTIFICATION');

  const caseData = await helper.getCaseData(caseId);
  if (caseData.trialReadyNotified !== 'Yes') {
    throw new Error(`TRIAL_READY_NOTIFICATION finished but trialReadyNotified is ${caseData.trialReadyNotified}`);
  }
  console.log(`Case ${caseId}: trialReadyNotified is Yes`);

  // The emails, from civil-service's record of what it sent to GOV.UK Notify
  const sent = await helper.getSentNotifications(caseId, solicitorTrialReadyTemplateId);
  if (sent.length === 0) {
    console.log(`No solicitorTrialReady emails (template ${solicitorTrialReadyTemplateId}) are recorded for the case. civil-service only records`
      + ' them where testing support is switched on, and loses them when it restarts.');
  }
  for (const email of sent) {
    console.log(`solicitorTrialReady email to ${email.recipientEmail}: notificationId ${email.notificationId} (reference ${email.reference}, sent ${email.sentAt})`);
  }
})().catch((error) => {
  console.error(`ERROR ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
