import ClaimTrack from "../../../constants/cases/claim-track";
import DefenceRouteSpec from "../../../constants/ccd-events/defendant-response/lr-spec/defence-route-spec";
import DefendantResponseSpecType from "../../../constants/ccd-events/defendant-response/lr-spec/defendant-response-spec-type";

export type FullDefenceHasPaidDefendantResponseSpecType = {
  defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE,
  defenceRoute: DefenceRouteSpec.HAS_PAID,
  claimTrack: ClaimTrack
};

export type FullDefenceDisputeDefendantResponseSpecType = {
  defendantResponseSpecType: DefendantResponseSpecType.FULL_DEFENCE,
  defenceRoute: DefenceRouteSpec.DISPUTE,
};


export type FullDefenceDefendantResponseSpecTypeObjs = FullDefenceHasPaidDefendantResponseSpecType | FullDefenceDisputeDefendantResponseSpecType;

type DefendantResponseSpecTypeObjs =
  DefendantResponseSpecType |
  FullDefenceHasPaidDefendantResponseSpecType |
  FullDefenceDisputeDefendantResponseSpecType

export default DefendantResponseSpecTypeObjs;
