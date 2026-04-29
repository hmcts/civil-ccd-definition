import ClaimTypeUnspec from "../../enums/ccd-events/create-claim/claim-type-unspec";
import PersonalInjuryType from "../../enums/ccd-events/create-claim/personal-injury-type";


export type PersonalInjuryClaimTypeUnSpec = {
  claimTypeUnspec: ClaimTypeUnspec.PERSONAL_INJURY;
  personalInjuryType: PersonalInjuryType;
};

export type PersonalInjuryOtherClaimTypeUnSpec = {
  claimTypeUnspec: ClaimTypeUnspec.OTHER;
  personalInjuryType: PersonalInjuryType.PERSONAL_INJURY_OTHER;
};

type ClaimTypeUnspecObjs = PersonalInjuryClaimTypeUnSpec | PersonalInjuryOtherClaimTypeUnSpec;

export default ClaimTypeUnspecObjs;