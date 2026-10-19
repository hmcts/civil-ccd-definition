import { partyDetails } from '../../../fixtures/partyDetails.ts';
import claimTypes from '../../../enums/claim-types.ts';
import yesNo from '../../../enums/yesNo.ts';
import { UnspecifiedConfig } from '../../journey/unspecified/unspecifiedConfig.ts';

// Where a flag can go: the case itself, a claimant or defendant, a claimant's litigation friend, or one of the experts
// or witnesses a party named in their directions questionnaire (numbered from 1)
export type CaseFlagHolder =
  | 'CASE'
  | 'CLAIMANT_1' | 'CLAIMANT_2' | 'DEFENDANT_1' | 'DEFENDANT_2'
  | 'CLAIMANT_1_LITIGATION_FRIEND' | 'CLAIMANT_2_LITIGATION_FRIEND'
  | `CLAIMANT_EXPERT_${number}` | `CLAIMANT_WITNESS_${number}`
  | `DEFENDANT_${1 | 2}_EXPERT_${number}` | `DEFENDANT_${1 | 2}_WITNESS_${number}`;

// How a party is named on the case, as civil-service names it: a company or organisation by its name, an individual by
// title and name, and a sole trader by title and name followed by " T/A <trading name>" when they have one (the claim
// gives claimants a trading name)
function partyName(
  party: { companyName: string; organisationName: string; title: string; firstName: string; lastName: string; soleTraderTradingAs?: string },
  partyType: string,
): string {
  switch (partyType) {
    case 'COMPANY':
      return party.companyName;
    case 'ORGANISATION':
      return party.organisationName;
    case 'SOLE_TRADER':
      return `${party.title} ${party.firstName} ${party.lastName}${party.soleTraderTradingAs ? ` T/A ${party.soleTraderTradingAs}` : ''}`;
    default:
      return `${party.title} ${party.firstName} ${party.lastName}`;
  }
}

// The holder as the first page of Create case flags lists it: "<party name> (<role on case>)", or "Case level".
// Experts and witnesses are named after their party in the directions questionnaire, e.g. Defendant1 Witness1.
export function holderLabel(c: UnspecifiedConfig, holder: CaseFlagHolder): string {
  const expertOrWitness = holder.match(/^(CLAIMANT|DEFENDANT_([12]))_(EXPERT|WITNESS)_(\d+)$/);
  if (expertOrWitness) {
    const [, side, defendantNumber, kind, index] = expertOrWitness;
    const name = `${side === 'CLAIMANT' ? 'Claimant1' : `Defendant${defendantNumber}`} ${kind === 'EXPERT' ? 'Expert' : 'Witness'}${index}`;
    const role = side === 'CLAIMANT' ? 'Claimant solicitor' : `Defendant solicitor ${defendantNumber}`;
    return `${name} (${role} ${kind.toLowerCase()})`;
  }
  switch (holder) {
    case 'CASE':
      return 'Case level';
    case 'CLAIMANT_1':
      return `${partyName(partyDetails.claimant1, c.claimantType)} (Claimant 1)`;
    case 'CLAIMANT_2':
      return `${partyName(partyDetails.claimant2, c.claimantType)} (Claimant 2)`;
    case 'DEFENDANT_1':
      return `${partyName(partyDetails.defendant1, c.defendantType)} (Defendant 1)`;
    case 'DEFENDANT_2':
      return `${partyName(partyDetails.defendant2, c.defendantType)} (Defendant 2)`;
    case 'CLAIMANT_1_LITIGATION_FRIEND':
      return `${partyDetails.claimant1LitigantFriend.firstname} ${partyDetails.claimant1LitigantFriend.lastname} (Claimant 1 Litigation Friend)`;
    case 'CLAIMANT_2_LITIGATION_FRIEND':
      return `${partyDetails.claimant2LitigantFriend.firstname} ${partyDetails.claimant2LitigantFriend.lastname} (Claimant 2 Litigation Friend)`;
  }
  throw new Error(`Unknown case flag holder ${holder}`);
}

// Why a holder is not on this claim, or undefined when it is. Experts and witnesses come from the directions
// questionnaires (EXPERTS and WITNESSES each party names).
export function holderMissingReason(c: UnspecifiedConfig, holder: CaseFlagHolder): string | undefined {
  const expertOrWitness = holder.match(/^(CLAIMANT|DEFENDANT_([12]))_(EXPERT|WITNESS)_(\d+)$/);
  if (expertOrWitness) {
    const [, side, defendantNumber, kind, index] = expertOrWitness;
    const named = Number(kind === 'EXPERT' ? c.noOfExperts : c.noOfWitnesses);
    if (Number(index) > named) {
      return `${holder}: each party names ${named} ${kind.toLowerCase()}(s) (set ${kind === 'EXPERT' ? 'EXPERTS' : 'WITNESSES'})`;
    }
    if (side === 'DEFENDANT' && defendantNumber === '2' && c.claimType !== claimTypes.ONE_VS_TWO_DIFF_SOL) {
      return `${holder}: Defendant 2 only names their own experts and witnesses in a 1v2 claim with different solicitors`;
    }
    return undefined;
  }
  switch (holder) {
    case 'CLAIMANT_2':
      return c.claimType === claimTypes.TWO_VS_ONE ? undefined : `${holder}: the claim has one claimant`;
    case 'DEFENDANT_2':
      return [claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL].includes(c.claimType) ? undefined : `${holder}: the claim has one defendant`;
    case 'CLAIMANT_1_LITIGATION_FRIEND':
      return c.claimant1LitigantFriend === yesNo.YES ? undefined : `${holder}: Claimant 1 has no litigation friend (set CLAIMANT1_LITIGANT_FRIEND=Yes)`;
    case 'CLAIMANT_2_LITIGATION_FRIEND':
      return c.claimant2LitigantFriend === yesNo.YES ? undefined : `${holder}: Claimant 2 has no litigation friend (set CLAIMANT2_LITIGANT_FRIEND=Yes)`;
    default:
      return undefined;
  }
}

// The case data field that holds a holder's flags: caseFlags for the case, a party's own flags, or the flags of an
// entry in a list of experts or witnesses
export function holderFlagsField(holder: CaseFlagHolder): { field: string; index?: number } {
  const expertOrWitness = holder.match(/^(CLAIMANT|DEFENDANT_([12]))_(EXPERT|WITNESS)_(\d+)$/);
  if (expertOrWitness) {
    const [, side, defendantNumber, kind, index] = expertOrWitness;
    const owner = side === 'CLAIMANT' ? 'applicant' : `respondent${defendantNumber}`;
    return { field: `${owner}${kind === 'EXPERT' ? 'Experts' : 'Witnesses'}`, index: Number(index) - 1 };
  }
  const fields: Record<string, string> = {
    CASE: 'caseFlags',
    CLAIMANT_1: 'applicant1',
    CLAIMANT_2: 'applicant2',
    DEFENDANT_1: 'respondent1',
    DEFENDANT_2: 'respondent2',
    CLAIMANT_1_LITIGATION_FRIEND: 'applicant1LitigationFriend',
    CLAIMANT_2_LITIGATION_FRIEND: 'applicant2LitigationFriend',
  };
  return { field: fields[holder] };
}
