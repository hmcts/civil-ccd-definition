import CaseDataHelper from '../../../../../helpers/case-data-helper';
import { ClaimantDefendantPartyType } from '../../../../../models/claimant-defendant-party-types';
import { Party } from '../../../../../models/partys';

export const text = {
    party: (claimantParty: Party, claimantPartyType: ClaimantDefendantPartyType) =>
          `Claimant: ${CaseDataHelper.buildClaimantAndDefendantData(claimantParty, claimantPartyType).partyName}`,
   };
