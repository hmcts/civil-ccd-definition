import moment from 'moment-business-days';
import { judgeCredentials } from '../../../../civilConfig.ts';
import { CcdApiHelper } from '../../../../helpers/CcdApiHelper.ts';
import { workingDayAfter } from '../../../../helpers/WorkingDayHelper.ts';

// The judge's directions after default judgment on an unspecified claim (STANDARD_DIRECTION_ORDER_DJ) through the CCD
// API, instead of the event's pages in XUI, with the same answers as the UI: a disposal hearing, in person at the
// court civil-service suggests, on a date 40 days away for 30 minutes. The order type page's mid event callback fills
// in the directions and the lists of hearing methods and courts, which are added to, and the hearing page's callback
// generates the order. civil-service moves the claim to CASE_PROGRESSION.
export class StandardDirectionOrderDj {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string) {
    // The disposal hearing is 40 days away, moved on to the next working day if it is not one, as in the UI
    const hearingDate = await workingDayAfter(moment().format('YYYY-MM-DD'), 40);
    await this.ccdApiHelper.submitEventThroughPages(judgeCredentials, 'STANDARD_DIRECTION_ORDER_DJ', caseId, [
      { page: 'CaseManagementOrder', answers: { caseManagementOrderSelection: 'DISPOSAL_HEARING' } },
      {
        page: 'DisposalHearing',
        answers: (data) => {
          const methods = data.hearingMethodValuesDisposalHearingDJ;
          const inPerson = methods?.list_items?.find((item) => /in person/i.test(item.label));
          const courts = data.disposalHearingMethodInPersonDJ;
          const court = courts?.value ?? courts?.list_items?.[0];
          if (!inPerson || !court) {
            throw new Error(`The disposal hearing page has no in person method or court (methods ${JSON.stringify(methods)}, courts ${JSON.stringify(courts)})`);
          }
          return {
            hearingMethodValuesDisposalHearingDJ: { ...methods, value: inPerson },
            disposalHearingMethodInPersonDJ: { ...courts, value: court },
            disposalHearingFinalDisposalHearingTimeDJ: {
              ...data.disposalHearingFinalDisposalHearingTimeDJ,
              input: 'The disposal hearing will take place',
              date: hearingDate,
              time: 'THIRTY_MINUTES',
            },
            disposalHearingOrderMadeWithoutHearingDJ: { input: 'This order has been made without a hearing' },
          };
        },
      },
    ]);
    console.log(`STANDARD_DIRECTION_ORDER_DJ submitted through the API on case ${caseId}`);
  }
}
