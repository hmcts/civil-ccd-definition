import caseStates from '../../enums/caseStates.ts';
import claimTypes from '../../enums/claim-types.ts';
import yesNo from '../../enums/yesNo.ts';
import { ClaimShape } from '../flows/createClaimShape.ts';

// Facts about a journey's claim that steps depend on, worked out once from its settings, with the same names in both
// journeys. Each is a list of [condition, reason] pairs, like a step's skipIf: the fact holds when none of the
// conditions does, and a step that needs it is left out of the run, with the first reason that holds, when it does not.
// A step lists the facts it needs:
//   needs: [c.facts.reachesJudicialReferral],
// which withNeeds (journeyRunner.ts) adds to its skipIf.
export type Fact = Array<[boolean, string]>;

// Whether a fact holds for the claim
export function holds(fact: Fact): boolean {
  return !fact.some(([condition]) => condition);
}

// The facts both journeys have
export interface ClaimFacts {
  // Defendant 1 has a solicitor (is not a litigant in person)
  defendant1HasSolicitor: Fact;
  // Notify claim and Notify claim details went to both defendants, so the claim did not go offline. A specified claim
  // has neither, so it always holds there.
  notOfflineAtNotify: Fact;
  // Every defendant has a solicitor. A litigant in person responds through the citizen service instead.
  everyDefendantRepresented: Fact;
  // The claim reaches JUDICIAL_REFERRAL through the claimant's response, for the steps from the judge's order on
  reachesJudicialReferral: Fact;
  // The claimant's solicitor responds and the response keeps the claim online (in a specified claim it can also wait
  // in AWAITING_APPLICANT_INTENTION or go to mediation), for the court staff steps once the claimant has responded
  onlineAfterClaimantResponse: Fact;
  // The judge's (or legal adviser's) order moves the claim to CASE_PROGRESSION, for the steps after it
  reachesCaseProgression: Fact;
  // The claimant's solicitor can settle or discontinue the claim: civil-service does not let them where there are two
  // defendants and either is a litigant in person
  claimantSolicitorCanCloseClaim: Fact;
  // The claimant has not asked for default judgment, which replaces the defendants' steps and everything after them
  withoutDefaultJudgment: Fact;
}

// The states "Discontinue this claim" is offered in, and both "Settle this claim" events, which are also offered once
// the final orders are issued (court staff can also settle a stayed case)
export const discontinuableStates = [
  caseStates.AWAITING_RESPONDENT_ACKNOWLEDGEMENT, caseStates.AWAITING_APPLICANT_INTENTION, caseStates.IN_MEDIATION,
  caseStates.JUDICIAL_REFERRAL, caseStates.CASE_PROGRESSION, caseStates.HEARING_READINESS,
  caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING, caseStates.DECISION_OUTCOME,
];
export const settleableStates = [...discontinuableStates, caseStates.All_FINAL_ORDERS_ISSUED];
// The states "Case proceeds in Caseman" is offered in that the journey can reach (it is also offered in CASE_DISMISSED)
export const casemanStates = [
  caseStates.PENDING_CASE_ISSUED, caseStates.CASE_ISSUED, caseStates.AWAITING_CASE_DETAILS_NOTIFICATION,
  caseStates.JUDGMENT_REQUESTED, ...settleableStates, caseStates.CASE_STAYED,
];

// The parts of a journey's config the facts are worked out from, in both journeys
interface ClaimSettings {
  claimShape: ClaimShape;
  defaultJudgment: yesNo;
}

function sharedFacts(c: ClaimSettings): Pick<ClaimFacts, 'claimantSolicitorCanCloseClaim' | 'withoutDefaultJudgment'> {
  return {
    claimantSolicitorCanCloseClaim: [[
      c.claimShape.defendants.length === 2 && c.claimShape.defendants.some((defendant) => defendant.solicitor === 'none'),
      'Skipping as the claimant\'s solicitor cannot settle or discontinue a claim against two defendants where one is a litigant in person',
    ]],
    withoutDefaultJudgment: [[c.defaultJudgment === yesNo.YES, 'Skipping as the claimant asked for default judgment (DEFAULT_JUDGMENT=Yes)']],
  };
}

const representedClaimTypes = [claimTypes.ONE_VS_ONE, claimTypes.TWO_VS_ONE, claimTypes.ONE_VS_TWO_SAME_SOL, claimTypes.ONE_VS_TWO_DIFF_SOL];

// A specified claim's facts, and those only a specified claim has
export interface SpecifiedClaimFacts extends ClaimFacts {
  // The claimant's response takes a small claim to mediation
  reachesMediation: Fact;
  // Mediation did not settle the claim, which stays the case (CASE_STAYED), so there is no order or anything after it
  notSettledInMediation: Fact;
}

export function specifiedFacts(c: ClaimSettings & {
  claimType: claimTypes;
  claimantResponds: boolean;
  claimantOutcome: { state: caseStates };
  mediationSuccessful: yesNo;
}): SpecifiedClaimFacts {
  const everyDefendantRepresented: Fact = [[
    !representedClaimTypes.includes(c.claimType),
    'Skipping as a defendant is a litigant in person, who responds through the citizen service',
  ]];
  const notSettledInMediation: Fact = [[
    c.mediationSuccessful === yesNo.YES && c.claimantOutcome.state === caseStates.IN_MEDIATION,
    'Skipping as mediation settled the claim, which stayed the case (MEDIATION_SUCCESSFUL=Yes)',
  ]];
  const responseTakesClaimTo = (states: caseStates[]) => !c.claimantResponds || !states.includes(c.claimantOutcome.state);
  return {
    ...sharedFacts(c),
    defendant1HasSolicitor: [[c.claimShape.defendants[0].solicitor === 'none', 'Skipping as first defendant is a LiP']],
    notOfflineAtNotify: [],
    everyDefendantRepresented,
    reachesJudicialReferral: [
      ...everyDefendantRepresented,
      [responseTakesClaimTo([caseStates.JUDICIAL_REFERRAL]), 'Skipping as the claimant\'s response did not take the claim to JUDICIAL_REFERRAL'],
    ],
    onlineAfterClaimantResponse: [
      ...everyDefendantRepresented,
      [!c.claimantResponds, 'Skipping as the claim went offline once the defendants responded'],
      [c.claimantOutcome.state === caseStates.PROCEEDS_IN_HERITAGE_SYSTEM, 'Skipping as the claimant\'s response took the claim offline'],
    ],
    reachesMediation: [
      ...everyDefendantRepresented,
      [responseTakesClaimTo([caseStates.IN_MEDIATION]), 'Skipping as the claimant\'s response did not take the claim to mediation'],
    ],
    notSettledInMediation,
    // On the fast, intermediate and multi tracks after the claimant's response took the claim to JUDICIAL_REFERRAL,
    // and for a small claim after unsuccessful mediation
    reachesCaseProgression: [
      ...everyDefendantRepresented,
      [
        responseTakesClaimTo([caseStates.JUDICIAL_REFERRAL, caseStates.IN_MEDIATION]),
        'Skipping as the claimant\'s response did not take the claim to JUDICIAL_REFERRAL or mediation',
      ],
      ...notSettledInMediation,
    ],
  };
}

// An unspecified claim's facts, and those only an unspecified claim has
export interface UnspecifiedClaimFacts extends ClaimFacts {
  // Defendant 2 has a solicitor of their own, who acknowledges and responds separately
  defendant2HasOwnSolicitor: Fact;
  // The claimant's solicitor responds to the defence: the claim is still online, has no litigant in person and every
  // defendant entered a full defence
  claimantResponds: Fact;
}

export function unspecifiedFacts(c: ClaimSettings & {
  claimType: claimTypes;
  claimOfflineAfterNotifyClaimDetails: boolean;
  defendant1SolicitorClaimTypes: claimTypes[];
  defendant2OwnSolicitorClaimTypes: claimTypes[];
  claimantResponseClaimTypes: claimTypes[];
  stateAfterAllResponses: caseStates;
  stateAfterClaimantResponse: caseStates;
}): UnspecifiedClaimFacts {
  const notOfflineAtNotify: Fact = [[c.claimOfflineAfterNotifyClaimDetails, 'Claim went offline at Notify claim / Notify claim details']];
  const claimantResponds: Fact = [
    ...notOfflineAtNotify,
    [!c.claimantResponseClaimTypes.includes(c.claimType), 'Skipping as the claim has a litigant in person'],
    [c.stateAfterAllResponses !== caseStates.AWAITING_APPLICANT_INTENTION, 'Skipping as not every defendant entered a full defence, so the claim went offline'],
  ];
  // The claim reaches JUDICIAL_REFERRAL only if the claimant proceeds against every defendant, and the directions
  // follow from there on every track
  const reachesJudicialReferral: Fact = [
    ...claimantResponds,
    [c.stateAfterClaimantResponse !== caseStates.JUDICIAL_REFERRAL, 'Skipping as the claimant did not proceed against every defendant, so the claim went offline'],
  ];
  return {
    ...sharedFacts(c),
    defendant1HasSolicitor: [[!c.defendant1SolicitorClaimTypes.includes(c.claimType), 'Skipping as first defendant is a LiP']],
    everyDefendantRepresented: [[!c.claimantResponseClaimTypes.includes(c.claimType), 'Skipping as the claim has a litigant in person']],
    notOfflineAtNotify,
    defendant2HasOwnSolicitor: [[!c.defendant2OwnSolicitorClaimTypes.includes(c.claimType), 'Skipping test as Defendant 2 has no separate solicitor']],
    claimantResponds,
    reachesJudicialReferral,
    // An unspecified claim stays online after the claimant's response only by going to JUDICIAL_REFERRAL
    onlineAfterClaimantResponse: reachesJudicialReferral,
    reachesCaseProgression: reachesJudicialReferral,
  };
}
