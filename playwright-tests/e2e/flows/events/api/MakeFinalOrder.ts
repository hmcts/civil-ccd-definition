import moment from 'moment-business-days';
import { judgeCredentials } from '../../../../civilConfig.ts';
import FinalOrder from '../../../../enums/finalOrders.ts';
import { CcdApiHelper, EventPage } from '../../../../helpers/CcdApiHelper.ts';
import { uploadDocumentThroughXui } from '../../../../helpers/XuiDocumentHelper.ts';

// The template each intermediate and multi track order is made from, as the judge picks it from the list
const templateLabels: Partial<Record<FinalOrder, string>> = {
  [FinalOrder.BLANK_TEMPLATE_AFTER_HEARING]: 'Blank template to be used after a hearing',
  [FinalOrder.BLANK_TEMPLATE_BEFORE_HEARING]: 'Blank template to be used before a hearing/box work',
  [FinalOrder.FIX_A_DATE_FOR_CMC]: 'Fix a date for CMC',
  [FinalOrder.FIX_A_DATE_FOR_CCMC]: 'Fix a date for CCMC',
};

// The judge's order (GENERATE_DIRECTIONS_ORDER, "Make an order") through the CCD API, instead of the event's pages in
// XUI, with the same answers as the UI. On the small and fast tracks it is a free form order or an assisted order,
// which the order page's mid event callback turns into the document the order is issued with. On the intermediate and
// multi tracks the judge picks a template, whose document the template page's callback generates for download, and
// uploads the completed order, a Word document (TEST_ORDER.docx, uploaded as the judge as in the UI).
//
// The claim stays on its track. Where a page's fields hold values civil-service filled in (such as the order's dates),
// the answers are added to them rather than replacing them.
export class MakeFinalOrder {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, order: FinalOrder) {
    const templateOrder = order !== FinalOrder.FREE_FORM_ORDER && order !== FinalOrder.ASSISTED_ORDER;
    const pages = templateOrder ? await this.templateOrderPages(order) : this.smallOrFastTrackOrderPages(order);
    await this.ccdApiHelper.submitEventThroughPages(judgeCredentials, 'GENERATE_DIRECTIONS_ORDER', caseId, [
      // The claim stays on the track it was allocated to
      { page: 'TrackAllocation', when: (data) => data.allowOrderTrackAllocation === 'Yes', answers: { finalOrderAllocateToTrack: 'No' } },
      ...pages,
    ]);
    console.log(`GENERATE_DIRECTIONS_ORDER (${order}) submitted through the API on case ${caseId}`);
  }

  private smallOrFastTrackOrderPages(order: FinalOrder): EventPage[] {
    return [
      { page: 'FinalOrderSelect', answers: { finalOrderSelection: order } },
      order === FinalOrder.FREE_FORM_ORDER
        ? {
          // A free form order made on the court's own initiative, whose wording and date civil-service fills in
          page: 'FreeFormOrder',
          answers: {
            freeFormRecordedTextArea: 'The court records that the trial took place.',
            freeFormOrderedTextArea: 'The court orders that judgment is entered for the claimant.',
            orderOnCourtsList: 'ORDER_ON_COURT_INITIATIVE',
            freeFormHearingNotes: 'Final order made by playwright-tests',
          },
        }
        : {
          // An assisted order made after a hearing on a single date (civil-service fills in the date), with costs in
          // the case, made on the court's own initiative and without written reasons.
          //
          // Choosing the order type fills in every optional section of this page, but XUI drops the ones left hidden
          // (who the judge heard from, recitals, a further hearing, other costs orders, an appeal, an order without
          // notice, reasons) before Continue. civil-service's checks expect that, so they are cleared here too: a
          // filled-in "heard from" section with no one chosen fails the order's generation.
          page: 'FinalOrderAssistedOrder',
          answers: {
            finalOrderMadeSelection: 'Yes',
            finalOrderJudgePapers: ['CONSIDERED'],
            finalOrderOrderedThatText: 'The court orders that judgment is entered for the claimant.',
            assistedOrderCostList: 'COSTS_IN_THE_CASE',
            orderMadeOnDetailsList: 'COURTS_INITIATIVE',
            finalOrderGiveReasonsYesNo: 'No',
            finalOrderRepresentation: null,
            finalOrderRecitalsRecorded: null,
            finalOrderFurtherHearingComplex: null,
            assistedOrderCostsReserved: null,
            assistedOrderMakeAnOrderForCosts: null,
            assistedOrderCostsBespoke: null,
            finalOrderAppealComplex: null,
            orderMadeOnDetailsOrderWithoutNotice: null,
            finalOrderGiveReasonsComplex: null,
          },
        },
      // Order preview (the order document is generated for this page)
      { page: 'FinalOrderPreview' },
    ];
  }

  private async templateOrderPages(order: FinalOrder): Promise<EventPage[]> {
    const completedOrder = await uploadDocumentThroughXui('judge', './playwright-tests/documents/TEST_ORDER.docx');
    return [
      {
        page: 'SelectTemplate',
        answers: (data) => {
          const options = data.finalOrderDownloadTemplateOptions;
          const template = options?.list_items?.find((item) => item.label === templateLabels[order]);
          if (!template) {
            throw new Error(`The order template list has no "${templateLabels[order]}" (it has ${options?.list_items?.map((item) => item.label).join(', ')})`);
          }
          return { finalOrderDownloadTemplateOptions: { ...options, value: template } };
        },
      },
      // The after-hearing template asks when the hearing was, which cannot be in the future
      {
        page: 'OrderAfterHearingDate',
        when: (data) => data.showOrderAfterHearingDatePage === 'Yes',
        answers: { orderAfterHearingDate: { dateType: 'SINGLE_DATE', date: moment().format('YYYY-MM-DD') } },
      },
      // The template civil-service generated for download
      { page: 'DownloadTemplate' },
      { page: 'UploadOrder', answers: { uploadOrderDocumentFromTemplate: completedOrder } },
    ];
  }
}
