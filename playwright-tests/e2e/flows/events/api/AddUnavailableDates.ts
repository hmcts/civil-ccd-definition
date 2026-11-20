import { CcdApiHelper, EventPage } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { UnavailableDates, unavailableDatesAnswers } from '../shared_api_ui/addUnavailableDatesSpecs.ts';

// Adds a party's unavailable dates (ADD_UNAVAILABLE_DATES) through the CCD API, instead of the event's pages in XUI.
// Court staff choose the party (adminChoice) from the list civil-service's about to start callback fills in; a
// solicitor goes straight to the dates page. The dates page's mid event callback is run, as Continue does in XUI.
export class AddUnavailableDates {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, dates: UnavailableDates, user: SessionUserKey, adminChoice?: string) {
    const credentials = sessionUsers[user].credentials;
    const pages: EventPage[] = [
      {
        // Only court staff get this page; XUI skips it for a solicitor, whose choice is hidden
        page: 'PartySelection',
        when: () => adminChoice !== undefined,
        answers: (data: Record<string, any>) => {
          const value = data.partyChosen?.list_items?.find((item: { label: string }) => item.label === adminChoice);
          if (!value) {
            throw new Error(`"${adminChoice}" is not one of the parties offered: ${(data.partyChosen?.list_items ?? []).map((item) => item.label).join(', ')}`);
          }
          return { partyChosen: { ...data.partyChosen, value } };
        },
      },
      {
        page: 'AddAdditionalDates',
        answers: { additionalUnavailableDates: unavailableDatesAnswers(dates).map((value) => ({ value })) },
      },
    ];
    await this.ccdApiHelper.submitEventThroughPages(credentials, 'ADD_UNAVAILABLE_DATES', caseId, pages);
    console.log(`ADD_UNAVAILABLE_DATES submitted through the API as ${credentials.name}${adminChoice ? ` for ${adminChoice}` : ''} on case ${caseId}`);
  }
}
