import moment from 'moment-business-days';
import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { workingDayAfter } from '../../../../helpers/WorkingDayHelper.ts';

// Court staff approve a general application the other side agreed to, as a consent order (APPROVE_CONSENT_ORDER,
// "Approve Consent Order", on the application) through the CCD API, instead of the event's pages in XUI: the order as
// the about to start callback filled it in from the order the applicant asked for and, where the order runs to a date
// (a stay), a working day four weeks away. The next page's callback generates the consent order, and civil-service
// then issues it (ORDER_MADE). Court staff's ReviewApplication task is claimed first, as in the UI (see WaTaskHelper).
// Only the fields on the pages answered are submitted, as in XUI.
export class ApproveConsentOrder {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async approve(applicationCaseId: string, user: SessionUserKey, orderSought: string) {
    const untilDate = await workingDayAfter(moment().format('YYYY-MM-DD'), 28);
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'APPROVE_CONSENT_ORDER', applicationCaseId, [
      {
        page: 'GAApproveConsentOrderScreen',
        answers: (data) => {
          const order = data.approveConsentOrder ?? {};
          return {
            approveConsentOrder: {
              ...order,
              consentOrderDescription: order.consentOrderDescription || orderSought,
              ...(order.showConsentOrderDate === 'Yes' ? { consentOrderDateToEnd: untilDate } : {}),
            },
          };
        },
      },
      // The consent order the previous page's callback generated, shown and submitted as it is
      { page: 'GAConsentOrderDocPreviewScreen' },
    // The event's other pages are never shown, so their fields are not submitted, as XUI does
    ], false, true);
    console.log(`APPROVE_CONSENT_ORDER submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
