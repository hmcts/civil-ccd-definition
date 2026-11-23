import { expect } from '@playwright/test';
import claimTypes from '../../../../enums/claim-types.ts';
import yesNo from '../../../../enums/yesNo.ts';
import { partyDetails } from '../../../../fixtures/partyDetails.ts';

// Who a run of "Add litigation friend" (ADD_DEFENDANT_LITIGATION_FRIEND) adds a litigation friend for. A defendant's
// solicitor adds one for the defendant they represent. Where both defendants have the same solicitor (1v2SS) the
// event's first page asks who needs one, and the journey chooses Both, so one litigation friend is added for both.
export type LitigationFriendFor = 'DEFENDANT_1' | 'DEFENDANT_2' | 'BOTH';

export function litigationFriendFor(claimType: claimTypes, defendantNumber: 1 | 2): LitigationFriendFor {
  if (claimType === claimTypes.ONE_VS_TWO_SAME_SOL) {
    return 'BOTH';
  }
  return defendantNumber === 1 ? 'DEFENDANT_1' : 'DEFENDANT_2';
}

// The field the event's page fills in: respondent1LitigationFriend ("Defendant litigation details") or
// respondent2LitigationFriend for one defendant, or genericLitigationFriend, which civil-service copies to both
// defendants, for Both
export function litigationFriendField(litigationFriendFor: LitigationFriendFor): string {
  switch (litigationFriendFor) {
    case 'DEFENDANT_1':
      return 'respondent1LitigationFriend';
    case 'DEFENDANT_2':
      return 'respondent2LitigationFriend';
    case 'BOTH':
      return 'genericLitigationFriend';
  }
}

// The litigation friend's details, the same in the UI and through the API. They live at the defendant's address, so
// none is entered. The certificate of suitability is uploaded separately.
export function litigationFriendDetails(litigationFriendFor: LitigationFriendFor) {
  const details = litigationFriendFor === 'DEFENDANT_2' ? partyDetails.defendant2LitigantFriend : partyDetails.defendant1LitigantFriend;
  return {
    firstName: details.firstname,
    lastName: details.lastname,
    emailAddress: details.email,
    phoneNumber: details.phone,
    hasSameAddressAsLitigant: yesNo.YES,
  };
}

// What the event should have saved on the case, for Playwright's toMatchObject, which only compares the fields given.
// civil-service records when each litigation friend was added (respondentNLitigationFriendDate and ...CreatedDate),
// which are only checked as present. For Both it copies the one litigation friend to both defendants.
export function expectedLitigationFriendData(litigationFriendFor: LitigationFriendFor): Record<string, any> {
  const saved = (defendantNumber: 1 | 2) => ({
    [`respondent${defendantNumber}LitigationFriend`]: {
      ...litigationFriendDetails(litigationFriendFor),
      certificateOfSuitability: [{ value: { document: { document_filename: expect.any(String) } } }],
    },
    [`respondent${defendantNumber}LitigationFriendDate`]: expect.any(String),
    [`respondent${defendantNumber}LitigationFriendCreatedDate`]: expect.any(String),
  });
  switch (litigationFriendFor) {
    case 'DEFENDANT_1':
      return saved(1);
    case 'DEFENDANT_2':
      return saved(2);
    case 'BOTH':
      return { ...saved(1), ...saved(2) };
  }
}

