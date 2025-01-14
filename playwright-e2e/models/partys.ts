export type Party = {
  key: string;
  oldKey: string;
  number: number;
};

type Partys = {
  CLAIMANT: Party;
  CLAIMANT_1: Party;
  CLAIMANT_2: Party;
  CLAIMANT_1_LITIGATION_FRIEND: Party;
  CLAIMANT_2_LITIGATION_FRIEND: Party;
  CLAIMANT_SOLICITOR_1: Party;
  DEFENDANT: Party;
  DEFENDANT_1: Party;
  DEFENDANT_2: Party;
  DEFENDANT_1_LITIGATION_FRIEND: Party;
  DEFENDANT_2_LITIGATION_FRIEND: Party;
  DEFENDANT_SOLICITOR_1: Party;
  DEFENDANT_SOLICITOR_2: Party;
};

export default Partys;