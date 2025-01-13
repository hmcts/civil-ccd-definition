export type PartyType = {
  type: string;
  key: string;
};

type PartyTypes = {
  INDIVIDUAL: PartyType;
  COMPANY: PartyType;
  SOLE_TRADER: PartyType;
  ORGANISATION: PartyType;
};

export default PartyTypes;
