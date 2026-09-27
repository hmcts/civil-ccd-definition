import ClaimType from '../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../constants/cases/claim-track';
import Airline from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/airline';
import FlightDelayClaim from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/flight-delay-claim';
import { ClaimantDefendantPartyType } from '../../../users/claimant-defendant-party-types';

type CreateClaimSpecParams = {
  claimType?: ClaimType;
  claimTrack?: ClaimTrack;
  claimant1PartyType?: ClaimantDefendantPartyType;
  claimant2PartyType?: ClaimantDefendantPartyType;
  defendant1PartyType?: ClaimantDefendantPartyType;
  defendant2PartyType?: ClaimantDefendantPartyType;
  flightDelayClaim?: FlightDelayClaim;
  airline?: Airline;
};

export default CreateClaimSpecParams;
