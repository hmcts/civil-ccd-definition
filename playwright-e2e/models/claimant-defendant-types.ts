export type ClaimantDefendantType = {
  type: string;
  key: string;
};

type ClaimantDefendantTypes = {
  INDIVIDUAL: ClaimantDefendantType;
  COMPANY: ClaimantDefendantType;
  SOLE_TRADER: ClaimantDefendantType;
  ORGANISATION: ClaimantDefendantType;
};

export default ClaimantDefendantTypes;
