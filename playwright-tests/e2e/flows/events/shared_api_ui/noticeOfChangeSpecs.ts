import claimTypes from '../../../../enums/claim-types.ts';
import { SessionUserKey } from '../../../../helpers/SessionHelper.ts';
import { ClaimShape } from '../../createClaimShape.ts';

// A party a solicitor takes over with a notice of change (NOTICE_OF_CHANGE). In a claim with two claimants their one
// solicitor (APPLICANTSOLICITORONE) acts for both, so a notice of change for Claimant 1 moves both of them.
export type NocParty = 'CLAIMANT_1' | 'DEFENDANT_1' | 'DEFENDANT_2';

const allParties: NocParty[] = ['CLAIMANT_1', 'DEFENDANT_1', 'DEFENDANT_2'];

// The case role the party's solicitor holds, which the notice of change moves to the new solicitor
export const nocCaseRole: Record<NocParty, string> = {
  CLAIMANT_1: '[APPLICANTSOLICITORONE]',
  DEFENDANT_1: '[RESPONDENTSOLICITORONE]',
  DEFENDANT_2: '[RESPONDENTSOLICITORTWO]',
};

// The party whose name the solicitor gives. CCD's challenge question (NoCChallenge, clientName) matches it against
// the party's partyName, which for an individual includes their title (e.g. "Mr Claimant One").
export const nocPartyField: Record<NocParty, string> = {
  CLAIMANT_1: 'applicant1',
  DEFENDANT_1: 'respondent1',
  DEFENDANT_2: 'respondent2',
};

export const nocPartyLabel: Record<NocParty, string> = {
  CLAIMANT_1: 'Claimant 1',
  DEFENDANT_1: 'Defendant 1',
  DEFENDANT_2: 'Defendant 2',
};

// The step NOTICE_OF_CHANGE runs after when NOTICE_OF_CHANGE_AFTER is not set
export const defaultNocAfterStep = 'NOTIFY_CLAIM_DETAILS';

// The parts of a journey's claim that decide who can be given a notice of change
export interface NocClaim {
  claimType: claimTypes;
  claimShape: ClaimShape;
  noticeOfChangeSetting?: string;
  noticeOfChangeAfter: string;
}

// One notice of change: the party, whether they are a litigant in person, and the solicitor who takes them over
export interface NocSpec {
  party: NocParty;
  litigantInPerson: boolean;
  newSolicitor: SessionUserKey;
}

// The NOTICE_OF_CHANGE parties, in the order given, as a comma separated list such as DEFENDANT_1,CLAIMANT_1
export function nocParties(c: NocClaim): string[] {
  return (c.noticeOfChangeSetting ?? '').split(',').map((party) => party.trim()).filter(Boolean);
}

// Who takes over each party:
//  - a defendant who is a litigant in person gets the solicitor the claim would have given them had they been
//    represented: Defendant 1 the Respondent1 Solicitor (Organisation 2), Defendant 2 the Respondent2 Solicitor
//    (Organisation 3). The journey then carries on as that represented claim type (see nocClaimTypeAfter).
//  - a represented party moves to a solicitor of an organisation with no other part in the claim: the claimant to the
//    New Claimant Solicitor, a defendant to the New Defendant Solicitor
export function nocSpecs(c: NocClaim): NocSpec[] {
  return nocParties(c)
    .filter((party): party is NocParty => allParties.includes(party as NocParty))
    .map((party) => {
      if (party === 'CLAIMANT_1') {
        return { party, litigantInPerson: false, newSolicitor: 'newClaimantSolicitor' };
      }
      const defendantNumber = party === 'DEFENDANT_1' ? 1 : 2;
      const litigantInPerson = c.claimShape.defendants[defendantNumber - 1]?.solicitor === 'none';
      if (litigantInPerson) {
        return { party, litigantInPerson, newSolicitor: defendantNumber === 1 ? 'respondent1Solicitor' : 'respondent2Solicitor' };
      }
      return { party, litigantInPerson, newSolicitor: 'newDefendantSolicitor' };
    });
}

// The claim type the journey carries on as once every litigant in person named in NOTICE_OF_CHANGE has a solicitor.
// A change of solicitor for a represented party leaves it as it is.
export function nocClaimTypeAfter(c: NocClaim): claimTypes {
  const specs = nocSpecs(c);
  const { claimants, defendants } = c.claimShape;
  const represented = defendants.map((defendant, index) =>
    defendant.solicitor !== 'none' || specs.some((spec) => spec.party === `DEFENDANT_${index + 1}`));
  if (defendants.length === 1) {
    if (claimants.length === 2) {
      return represented[0] ? claimTypes.TWO_VS_ONE : claimTypes.TWO_VS_ONE_LIP;
    }
    return represented[0] ? claimTypes.ONE_VS_ONE : claimTypes.ONE_VS_ONE_LIP;
  }
  if (represented[0] && represented[1]) {
    return c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL ? claimTypes.ONE_VS_TWO_SAME_SOL : claimTypes.ONE_VS_TWO_DIFF_SOL;
  }
  if (represented[0]) {
    return claimTypes.ONE_VS_TWO_LR_LIP;
  }
  return represented[1] ? claimTypes.ONE_VS_TWO_LIP_LR : claimTypes.ONE_VS_TWO_LIPS;
}

// Who each solicitor's steps run as once the notices of change have been given: the steps of the claimant's solicitor,
// Defendant 1's solicitor and Defendant 2's own solicitor move to whoever represents that party now
export function nocUsersAfter(c: NocClaim): Partial<Record<SessionUserKey, SessionUserKey>> {
  const newSolicitor = (party: NocParty) => nocSpecs(c).find((spec) => spec.party === party)?.newSolicitor;
  // In a claim with the same solicitor for both defendants, Defendant 2's steps are that solicitor's
  const defendant2Default = c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL ? 'respondent1Solicitor' : 'respondent2Solicitor';
  return {
    claimantSolicitor: newSolicitor('CLAIMANT_1') ?? 'claimantSolicitor',
    respondent1Solicitor: newSolicitor('DEFENDANT_1') ?? 'respondent1Solicitor',
    respondent2Solicitor: newSolicitor('DEFENDANT_2') ?? defendant2Default,
  };
}

// Why the NOTICE_OF_CHANGE setting cannot be used with this claim, or undefined when it can
export function nocProblem(c: NocClaim): string | undefined {
  const parties = nocParties(c);
  if (parties.length === 0) {
    return undefined;
  }
  const problems: string[] = [];
  const unknown = parties.filter((party) => !allParties.includes(party as NocParty));
  if (unknown.length > 0) {
    problems.push(`${unknown.join(', ')} ${unknown.length === 1 ? 'is' : 'are'} not one of ${allParties.join(', ')} (in a claim with two claimants, CLAIMANT_1 moves both, as they share a solicitor)`);
  }
  if (new Set(parties).size !== parties.length) {
    problems.push('each party can only be given once');
  }
  const specs = nocSpecs(c);
  const defendants = c.claimShape.defendants;
  if (specs.some((spec) => spec.party === 'DEFENDANT_2') && defendants.length < 2) {
    problems.push(`DEFENDANT_2: a ${c.claimType} claim has one defendant`);
  }
  if (specs.some((spec) => spec.litigantInPerson) && c.noticeOfChangeAfter !== defaultNocAfterStep) {
    problems.push(`a litigant in person (${specs.filter((spec) => spec.litigantInPerson).map((spec) => spec.party).join(', ')}) can only be given a solicitor after ${defaultNocAfterStep}, so the solicitor can acknowledge and respond to the claim (NOTICE_OF_CHANGE_AFTER is ${c.noticeOfChangeAfter})`);
  }
  // Both defendants' new solicitor is the same one, so changing who represents only some of them would turn a claim
  // with one solicitor for both into one with a solicitor each, or the other way round
  const representedDefendantsChanged = specs.filter((spec) => spec.party !== 'CLAIMANT_1' && !spec.litigantInPerson).length;
  if (c.claimType === claimTypes.ONE_VS_TWO_SAME_SOL && representedDefendantsChanged === 1) {
    problems.push('in a 1v2SS claim the defendants share a solicitor, so give DEFENDANT_1 and DEFENDANT_2 together');
  }
  if (c.claimType !== claimTypes.ONE_VS_TWO_SAME_SOL && representedDefendantsChanged === 2) {
    problems.push(`in a ${c.claimType} claim each defendant has their own solicitor, and both would move to the New Defendant Solicitor, so give only one of them`);
  }
  return problems.length ? `Invalid NOTICE_OF_CHANGE value: ${c.noticeOfChangeSetting}. ${problems.join('; ')}` : undefined;
}
