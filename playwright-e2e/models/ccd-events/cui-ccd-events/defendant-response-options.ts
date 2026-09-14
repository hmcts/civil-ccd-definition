import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';
import DefendantResponseType from '../../../constants/ccd-events/ccd-events/defendant-response/defendant-response-type';

export default interface DefendantResponseOptions {
  claimTrack?: ClaimTrack;
  claimType?: ClaimType;
  responseType?: DefendantResponseType;
}
