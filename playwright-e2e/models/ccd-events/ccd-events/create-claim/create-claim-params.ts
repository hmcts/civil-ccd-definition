import ClaimType from '../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../constants/cases/claim-track';
import ClaimTypeUnspec from '../../../../constants/ccd-events/ccd-events/create-claim/claim-type-unspec';
import PersonalInjuryType from '../../../../constants/ccd-events/ccd-events/create-claim/personal-injury-type';
import { ClaimantDefendantPartyType } from '../../../users/claimant-defendant-party-types';

type CreateClaimParams = {
  claimType?: ClaimType;
  claimTypeUnspec?: ClaimTypeUnspec;
  personalInjuryType?: PersonalInjuryType;
  claimTrack?: ClaimTrack;
  claimant1PartyType?: ClaimantDefendantPartyType;
  claimant2PartyType?: ClaimantDefendantPartyType;
  defendant1PartyType?: ClaimantDefendantPartyType;
  defendant2PartyType?: ClaimantDefendantPartyType;
};

export default CreateClaimParams;
