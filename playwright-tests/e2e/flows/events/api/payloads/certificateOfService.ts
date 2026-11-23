import { randomUUID } from 'node:crypto';
import moment from 'moment-business-days';
import { workingDaysAfter } from '../../../../../helpers/WorkingDayHelper.ts';

// A litigant in person defendant's Certificate of Service, as CoSHelper fills it in the UI: the claim was served two
// weekdays ago and is deemed served two working days from now. civil-service only accepts a deemed served date that is
// a working day no more than 2 working days away, bank holidays included. The UI picks how and where it was served at
// random; here it is always posted to the defendant's usual residence. evidenceDocument is only asked for by Notify
// claim details.
export async function certificateOfService(defendantNumber: number, evidenceDocument?: Record<string, string>) {
  return {
    cosDateOfServiceForDefendant: moment().businessSubtract(2, 'days').format('YYYY-MM-DD'),
    cosDateDeemedServedForDefendant: await workingDaysAfter(2),
    cosServedDocumentFiles: `Test description of documents served - LiP defendant: ${defendantNumber}`,
    ...(evidenceDocument ? { cosEvidenceDocument: [{ id: randomUUID(), value: evidenceDocument }] } : {}),
    cosRecipient: `Test description of who the claim was served to - LiP defendant: ${defendantNumber}`,
    cosRecipientServeType: 'POSTED',
    cosRecipientServeLocation: `Test description of where the documents were served - LiP defendant: ${defendantNumber}`,
    cosRecipientServeLocationOwnerType: 'DEFENDANT',
    cosRecipientServeLocationType: 'USUAL_RESIDENCE',
    cosSender: `Legal Rep Name: Defendant${defendantNumber}`,
    cosSenderFirm: `Legal Rep Firm: Defendant${defendantNumber}`,
    cosUISenderStatementOfTruthLabel: ['CERTIFIED'],
  };
}

// In a 1v2 claim where each defendant has their own solicitor, the claimant chooses which of them to notify from a
// list the event fills in when it starts (Both, Defendant One: ..., Defendant Two: ...), as NotifyClaim does in the UI
export function defendantToNotify(startCaseData: Record<string, any>, listField: string, whomToNotify: string) {
  const list = startCaseData[listField];
  const choice = list?.list_items?.find((item) => item.label.includes(whomToNotify));
  if (!choice) {
    throw new Error(`"${whomToNotify}" is not one of the choices in ${listField}: ${JSON.stringify(list?.list_items?.map((item) => item.label))}`);
  }
  return { [listField]: { list_items: list.list_items, value: choice } };
}
