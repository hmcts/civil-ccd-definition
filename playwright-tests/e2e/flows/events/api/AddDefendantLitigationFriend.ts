import { randomUUID } from 'node:crypto';
import { CcdApiHelper, EventPage } from '../../../../helpers/CcdApiHelper.ts';
import { sessionUsers, SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { TestingEndPointHelper } from '../../../../helpers/TestingEndPointHelper.ts';
import {
  LitigationFriendFor,
  litigationFriendDetails,
  litigationFriendField,
} from '../shared_api_ui/defendantLitigationFriendSpecs.ts';

// Adds a litigation friend for a defendant (ADD_DEFENDANT_LITIGATION_FRIEND) as their solicitor through the CCD API,
// instead of the event's pages in XUI. The certificate of suitability is uploaded first, as the solicitor. For Both
// (the defendants have the same solicitor) Both is chosen from the list civil-service fills in, and its mid event
// callback is run, as Continue does in XUI.
export class AddDefendantLitigationFriend {
  private ccdApiHelper = new CcdApiHelper();

  async submit(caseId: string, litigationFriendFor: LitigationFriendFor, user: SessionUserKey) {
    const solicitor = sessionUsers[user].credentials;
    const certificateOfSuitability = await new TestingEndPointHelper().uploadTestDocument(solicitor);
    const litigationFriend = {
      ...litigationFriendDetails(litigationFriendFor),
      certificateOfSuitability: [{ id: randomUUID(), value: { document: certificateOfSuitability } }],
    };
    const page = { DEFENDANT_1: 'LitigationFriend', DEFENDANT_2: 'Defendant2LitigationFriend', BOTH: 'CommonLitigationFriend' }[litigationFriendFor];

    const pages: EventPage[] = [
      ...(litigationFriendFor === 'BOTH'
        ? [{
          page: 'SelectALitigationFriend',
          answers: (data: Record<string, any>) => ({
            selectLitigationFriend: {
              ...data.selectLitigationFriend,
              value: data.selectLitigationFriend.list_items.find((item: { label: string }) => item.label === 'Both'),
            },
          }),
        }]
        : []),
      { page, answers: { [litigationFriendField(litigationFriendFor)]: litigationFriend } },
    ];
    await this.ccdApiHelper.submitEventThroughPages(solicitor, 'ADD_DEFENDANT_LITIGATION_FRIEND', caseId, pages);
    console.log(`ADD_DEFENDANT_LITIGATION_FRIEND submitted through the API for ${litigationFriendFor} on case ${caseId}`);
  }
}
