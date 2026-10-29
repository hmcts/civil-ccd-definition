import moment from 'moment-business-days';
import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { workingDayAfter } from '../../../../helpers/WorkingDayHelper.ts';

// A judge or legal adviser decides a general application (MAKE_DECISION, "Make a decision", on the application) through
// the CCD API, instead of the event's pages in XUI: they make an order without a hearing, approving the order the
// applicant asked for as the about to start callback drafted it, not on the court's own initiative. Where the order
// runs to a date, such as a stay, it is a working day four weeks away. civil-service then issues the order
// (ORDER_MADE). The work allocation task for the decision is claimed first, as in the UI (see WaTaskHelper). Only the
// fields on the pages answered are submitted, as in XUI.
export class MakeDecisionOnApplication {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async approve(applicationCaseId: string, user: SessionUserKey) {
    const untilDate = await workingDayAfter(moment().format('YYYY-MM-DD'), 28);
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'MAKE_DECISION', applicationCaseId, [
      { page: 'GAJudicialDecision', answers: { judicialDecision: { decision: 'MAKE_AN_ORDER' } } },
      {
        page: 'GAJudicialMakeADecisionScreen',
        answers: (data) => {
          const order = data.judicialDecisionMakeOrder ?? {};
          return {
            judicialDecisionMakeOrder: {
              ...order,
              makeAnOrder: 'APPROVE_OR_EDIT',
              ...(order.displayjudgeApproveEditOptionDate === 'Yes' ? { judgeApproveEditOptionDate: untilDate } : {}),
              judicialByCourtsInitiative: 'OPTION_3',
              showReasonForDecision: 'No',
            },
          };
        },
      },
      // The order the previous page's callback generated, shown and submitted as it is
      { page: 'GAJudicialMakeADecisionDocPreview' },
    // The about to start callback fills in every kind of decision, and civil-service fails on a half filled one (such
    // as written representations with no option chosen), so only the pages answered are submitted, as XUI does
    ], false, true);
    console.log(`MAKE_DECISION (approve the order) submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
