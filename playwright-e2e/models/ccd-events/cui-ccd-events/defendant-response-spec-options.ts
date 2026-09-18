import DefenceAdmittedPartRouteSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-admitted-part-route-spec';
import DefenceRouteSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defence-route-spec';
import DefendantResponseSpecType from '../../../constants/ccd-events/ccd-events/defendant-response-spec/defendant-response-spec-type';
import PaymentTypeSpec from '../../../constants/ccd-events/ccd-events/defendant-response-spec/payment-type-spec';
import ClaimTrack from '../../../constants/cases/claim-track';
import ClaimType from '../../../constants/cases/claim-type';

export default interface DefendantResponseSpecOptions {
  claimTrack?: ClaimTrack;
  claimType?: ClaimType;
  responseType?: DefendantResponseSpecType;
  defenceRoute?: DefenceRouteSpec;
  paymentType?: PaymentTypeSpec;
  defenceAdmittedPartRoute?: DefenceAdmittedPartRouteSpec;
}
