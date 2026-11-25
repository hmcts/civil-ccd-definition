import CaseType from '../../../../enums/caseType.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { GaOrder, GaOrderAnswers } from '../shared_api_ui/gaOrderSpecs.ts';

// A judge makes an order on a general application once its hearing is scheduled (GENERATE_DIRECTIONS_ORDER, "Make an
// order", on the application) through the CCD API, instead of the event's pages in XUI, with the same answers as the UI:
//  - a free form order: its recitals and what it orders, with no note about notice (NOT_APPLICABLE)
//  - an assisted order: not made following a hearing, what it orders, costs in the case, no public funding costs
//    protection, no further hearing or appeal, no note about notice (NONE) and no reasons
// The order type page's mid event callback fills in the order's other fields, and the order page's callback generates
// the order document the preview page shows. civil-service then issues the order and moves the application to
// ORDER_MADE. Only the fields on the pages answered are submitted, as in XUI.
export class MakeOrderOnApplication {
  private ccdApiHelper = new CcdApiHelper(CaseType.GENERAL_APPLICATION);

  async submit(applicationCaseId: string, user: SessionUserKey, order: GaOrder, answers: GaOrderAnswers) {
    const orderPage = order === GaOrder.FREE_FORM_ORDER
      ? {
        page: 'FreeFormOrder',
        answers: {
          freeFormRecitalText: answers.recitals,
          freeFormOrderedText: answers.ordered,
          orderOnCourtsList: 'NOT_APPLICABLE',
        },
      }
      : {
        page: 'FinalOrderAssistedOrder',
        answers: {
          assistedOrderMadeSelection: 'No',
          assistedOrderOrderedThatText: answers.orderedThat,
          assistedCostTypes: 'COSTS_IN_CASE',
          publicFundingCostsProtection: 'No',
          orderMadeOnOption: 'NONE',
          assistedOrderGiveReasonsYesNo: 'No',
        },
      };
    await this.ccdApiHelper.submitEventThroughPages(sessionUsers[user].credentials, 'GENERATE_DIRECTIONS_ORDER', applicationCaseId, [
      { page: 'FinalOrderSelect', answers: { finalOrderSelection: order } },
      orderPage,
      { page: 'gaFinalOrderDocPreview' },
    ], false, true);
    console.log(`GENERATE_DIRECTIONS_ORDER (${order}) submitted through the API as ${user} on application ${applicationCaseId}`);
  }
}
