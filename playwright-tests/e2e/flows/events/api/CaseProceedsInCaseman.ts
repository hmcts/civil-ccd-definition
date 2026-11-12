import moment from 'moment-business-days';
import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import CaseProceedsInCasemanReason from '../../../../enums/caseProceedsInCaseman.ts';

// Takes the claim offline (CASE_PROCEEDS_IN_CASEMAN, "Case proceeds in Caseman") as the hearing centre admin through
// the CCD API, instead of the event's page in XUI, with the same answers as the UI: transferred to Caseman today, for the
// given reason. The page's mid event callback checks the date is not in the future.
export class CaseProceedsInCaseman {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, reason: CaseProceedsInCasemanReason, specified: boolean) {
    const answers = {
      date: moment().format('YYYY-MM-DD'),
      reason,
      ...(reason === CaseProceedsInCasemanReason.OTHER ? { other: 'Taken offline by the Playwright journey' } : {}),
    };
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'CASE_PROCEEDS_IN_CASEMAN', caseId, [
      specified
        ? { page: 'CaseProceedsInCasemanLR', answers: { claimProceedsInCasemanLR: answers } }
        : { page: 'CaseProceedsInCaseman', answers: { claimProceedsInCaseman: answers } },
    ]);
    console.log(`CASE_PROCEEDS_IN_CASEMAN (${reason}) submitted through the API on case ${caseId}`);
  }
}
