import { hearingCentreAdminCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';

// Reviews the order the judge has made (CONFIRM_ORDER_REVIEW) as the hearing centre admin through the CCD API, instead
// of the event's pages in XUI: no date a party must do something by, the order is final and nothing is left to do on
// the case, which moves the claim to All_FINAL_ORDERS_ISSUED
export class ConfirmOrderReview {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    await this.ccdApiHelper.submitEventThroughPages(hearingCentreAdminCredentials, 'CONFIRM_ORDER_REVIEW', caseId, [
      { page: 'ObligationDate', answers: { obligationDatePresent: 'No' } },
      { page: 'IsFinalOrder', answers: { isFinalOrder: 'Yes' } },
      { page: 'NextSteps', answers: { courtStaffNextSteps: 'NO_TASKS' } },
    ]);
    console.log(`CONFIRM_ORDER_REVIEW submitted through the API on case ${caseId}`);
  }
}
