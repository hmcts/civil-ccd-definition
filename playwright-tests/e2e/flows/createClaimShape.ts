import claimTypes from '../../enums/claim-types.ts';
import yesNo from '../../enums/yesNo.ts';
import { respondent1SolicitorCredentials, respondent2SolicitorCredentials } from '../../civilConfig.ts';

// A defendant's solicitor's organisation: its name, which XUI's organisation search finds it by, and its ID, which the
// case data holds
export interface SolicitorOrganisation {
  name: string;
  orgId: string;
}

export interface ClaimantShape {
  type: string;
  litigationFriend: yesNo;
}

// Who represents a defendant: no one (a litigant in person), their own solicitor, or Defendant 1's solicitor
export type DefendantShape =
  | { type: string; solicitor: 'none' }
  | { type: string; solicitor: 'own'; organisation: SolicitorOrganisation }
  | { type: string; solicitor: 'sameAsDefendant1' };

// The parties to a claim and who represents them, worked out from the claim type. Creating the claim through the UI
// (createUnspecifiedCase.ts) and through the API (flows/events/api/payloads/createClaimPayload.ts) both follow it, so
// they make the same claim.
export interface ClaimShape {
  claimants: ClaimantShape[];
  defendants: DefendantShape[];
}

// Defendant 1's solicitor is the Respondent1 Solicitor user, of Organisation 2. Defendant 2's own solicitor is the
// Respondent2 Solicitor user, of Organisation 3.
const defendant1Organisation: SolicitorOrganisation = { name: 'Civil - Organisation 2', orgId: respondent1SolicitorCredentials.orgId };
const defendant2Organisation: SolicitorOrganisation = { name: 'Civil - Organisation 3', orgId: respondent2SolicitorCredentials.orgId };

export function createClaimShape(
  claimType: claimTypes,
  claimantType: string,
  defendantType: string,
  claimantLitigationFriends: [yesNo, yesNo],
): ClaimShape {
  const claimant = (number: 1 | 2): ClaimantShape => ({ type: claimantType, litigationFriend: claimantLitigationFriends[number - 1] });
  const litigantInPerson: DefendantShape = { type: defendantType, solicitor: 'none' };
  const defendant1Solicitor: DefendantShape = { type: defendantType, solicitor: 'own', organisation: defendant1Organisation };
  const defendant2Solicitor: DefendantShape = { type: defendantType, solicitor: 'own', organisation: defendant2Organisation };

  switch (claimType) {
    case claimTypes.ONE_VS_ONE:
      return { claimants: [claimant(1)], defendants: [defendant1Solicitor] };
    case claimTypes.ONE_VS_ONE_LIP:
      return { claimants: [claimant(1)], defendants: [litigantInPerson] };
    case claimTypes.TWO_VS_ONE:
      return { claimants: [claimant(1), claimant(2)], defendants: [defendant1Solicitor] };
    case claimTypes.TWO_VS_ONE_LIP:
      return { claimants: [claimant(1), claimant(2)], defendants: [litigantInPerson] };
    case claimTypes.ONE_VS_TWO_SAME_SOL:
      return { claimants: [claimant(1)], defendants: [defendant1Solicitor, { type: defendantType, solicitor: 'sameAsDefendant1' }] };
    case claimTypes.ONE_VS_TWO_DIFF_SOL:
      return { claimants: [claimant(1)], defendants: [defendant1Solicitor, defendant2Solicitor] };
    case claimTypes.ONE_VS_TWO_LR_LIP:
      return { claimants: [claimant(1)], defendants: [defendant1Solicitor, litigantInPerson] };
    case claimTypes.ONE_VS_TWO_LIP_LR:
      return { claimants: [claimant(1)], defendants: [litigantInPerson, defendant2Solicitor] };
    case claimTypes.ONE_VS_TWO_LIPS:
      return { claimants: [claimant(1)], defendants: [litigantInPerson, litigantInPerson] };
  }
}
