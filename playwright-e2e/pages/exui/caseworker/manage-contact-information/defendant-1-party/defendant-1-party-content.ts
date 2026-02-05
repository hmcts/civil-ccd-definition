import CaseDataHelper from '../../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import { Party } from '../../../../../models/partys';

export const subheadings = {
    party: (defendantParty: Party, defendantPartyType: ClaimantDefendantPartyType) =>
          `Defendant: ${CaseDataHelper.buildClaimantAndDefendantData(defendantParty, defendantPartyType).partyName}`,
   };
