import ClaimType from '../../../../constants/cases/claim-type';
import ClaimTrack from '../../../../constants/cases/claim-track';
import Airline from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/airline';
import FlightDelayClaim from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/flight-delay-claim';
import ClaimInterest from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/claim-interest';
import InterestClaimOption from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/interest-claim-option';
import SameRateInterestType from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/same-rate-interest-type';
import InterestClaimFromOption from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/interest-claim-from-option';
import InterestClaimUntilOption from '../../../../constants/ccd-events/ccd-events/create-claim/create-claim-spec/interest-claim-until-option';
import { ClaimantDefendantPartyType } from '../../../users/claimant-defendant-party-types';

type CreateClaimSpecOptions = {
  claimType?: ClaimType;
  claimTrack?: ClaimTrack;
  claimant1PartyType?: ClaimantDefendantPartyType;
  claimant2PartyType?: ClaimantDefendantPartyType;
  defendant1PartyType?: ClaimantDefendantPartyType;
  defendant2PartyType?: ClaimantDefendantPartyType;
  flightDelayClaim?: FlightDelayClaim;
  airline?: Airline;
  claimInterest?: ClaimInterest;
  interestClaimOption?: InterestClaimOption;
  sameRateInterestType?: SameRateInterestType;
  interestClaimFrom?: InterestClaimFromOption;
  interestClaimUntil?: InterestClaimUntilOption;
};

export default CreateClaimSpecOptions;
