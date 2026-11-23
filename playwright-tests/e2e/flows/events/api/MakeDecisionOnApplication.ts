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

  // For an application made without notice: sends it to the other side instead of deciding it (MAKE_DECISION, "Request
  // more information", "Send application to other party and request hearing details"), as the UI version does. The
  // about to start callback fills in judicialDecisionRequestMoreInfo (isWithNotice is No, which is what offers the
  // option), so the option is added to it. There is no order to preview (showRequestInfoPreviewDoc is No). civil-service
  // then asks the applicant for the extra fee (APPLICATION_ADD_PAYMENT).
  async sendToOtherParty(applicationCaseId: string, user: SessionUserKey) {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'MAKE_DECISION', applicationCaseId, [
      { page: 'GAJudicialDecision', answers: { judicialDecision: { decision: 'REQUEST_MORE_INFO' } } },
      {
        page: 'GAJudicialRequestMoreInfoScreen',
        answers: (data) => ({
          judicialDecisionRequestMoreInfo: {
            ...(data.judicialDecisionRequestMoreInfo ?? {}),
            requestMoreInfoOption: 'SEND_APP_TO_OTHER_PARTY',
          },
        }),
      },
      { page: 'GAJudicialRequestMoreInfoDocPreview', when: (data) => data.showRequestInfoPreviewDoc === 'Yes' },
    ], false, true);
    console.log(`MAKE_DECISION (send the application to the other party) submitted through the API as ${user} on application ${applicationCaseId}`);
  }

  // Asks the applicant for more information instead of deciding the application (MAKE_DECISION, "Request more
  // information"), as the UI version does: the information wanted and a date a week away, with the recital the about to
  // start callback filled in. Unless the application is known to be made with notice, "Request more information" is
  // chosen among the options too. The page's callback generates the request the preview page shows, where there is
  // one. civil-service then waits for the applicant (AWAITING_ADDITIONAL_INFORMATION).
  async requestMoreInfo(applicationCaseId: string, user: SessionUserKey, information: string) {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'MAKE_DECISION', applicationCaseId, [
      { page: 'GAJudicialDecision', answers: { judicialDecision: { decision: 'REQUEST_MORE_INFO' } } },
      {
        page: 'GAJudicialRequestMoreInfoScreen',
        answers: (data) => {
          const request = data.judicialDecisionRequestMoreInfo ?? {};
          return {
            judicialDecisionRequestMoreInfo: {
              ...request,
              // The page's callback works isWithNotice out itself when the about to start callback left it empty, and
              // then fails without an option unless the application is with notice, so the option is given unless it
              // is known to be with notice
              ...(request.isWithNotice !== 'Yes' ? { requestMoreInfoOption: 'REQUEST_MORE_INFORMATION' } : {}),
              judgeRequestMoreInfoText: information,
              judgeRequestMoreInfoByDate: moment().add(7, 'days').format('YYYY-MM-DD'),
            },
          };
        },
      },
      { page: 'GAJudicialRequestMoreInfoDocPreview', when: (data) => data.showRequestInfoPreviewDoc === 'Yes' },
    ], false, true);
    console.log(`MAKE_DECISION (request more information) submitted through the API as ${user} on application ${applicationCaseId}`);
  }

  // Lists the application for a hearing instead of deciding it now (MAKE_DECISION, "List for a hearing"), as the UI
  // version does: a 15 minute video hearing, then the general order with the recital the callback filled in, the
  // hearing directions and not on the court's own initiative. The general order page's callback generates the order the
  // preview page shows. civil-service then waits for court staff to schedule the hearing (LISTING_FOR_A_HEARING).
  async listForHearing(applicationCaseId: string, user: SessionUserKey, directions: string) {
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'MAKE_DECISION', applicationCaseId, [
      { page: 'GAJudicialDecision', answers: { judicialDecision: { decision: 'LIST_FOR_A_HEARING' } } },
      {
        page: 'GAJudicialHearingDetailsScreen',
        answers: (data) => ({
          judicialListForHearing: {
            ...(data.judicialListForHearing ?? {}),
            hearingPreferencesPreferredType: 'VIDEO',
            judicialTimeEstimate: 'MINUTES_15',
          },
        }),
      },
      {
        page: 'GAJudicialHearingDetailsGeneralOrderScreen',
        answers: (data) => ({
          judicialGeneralHearingOrderRecital: data.judicialGeneralHearingOrderRecital,
          judicialGOHearingDirections: directions,
          judicialByCourtsInitiativeListForHearing: 'OPTION_3',
        }),
      },
      { page: 'GAJudicialListHearingDocPreview' },
    ], false, true);
    console.log(`MAKE_DECISION (list for a hearing) submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
