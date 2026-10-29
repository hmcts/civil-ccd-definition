import { expect } from '@playwright/test';
import { envUrl } from '../../civilConfig.ts';
import claimTypes from '../../enums/claim-types.ts';
import { CaseUserKey, CaseUserRegistry } from '../../helpers/CaseUserRegistry.ts';
import { sessionUsers, SessionUserKey } from '../../helpers/SessionHelper.ts';
import { NoticeOfChange } from '../flows/events/ui/NoticeOfChange.ts';
import { NoticeOfChange as ApiNoticeOfChange } from '../flows/events/api/NoticeOfChange.ts';
import {
  nocCaseRole,
  NocClaim,
  nocClaimTypeAfter,
  nocPartyField,
  nocPartyLabel,
  NocSpec,
  nocSpecs,
  nocUsersAfter,
} from '../flows/events/shared_api_ui/noticeOfChangeSpecs.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// Adds the notices of change (NOTICE_OF_CHANGE) to a journey's steps. They are given after the NOTICE_OF_CHANGE_AFTER
// step, one step per party in group NOTICE_OF_CHANGE. From then on:
//  - a defendant who was a litigant in person has a solicitor, so the journey carries on as the represented claim type
//    (a 1v1LIP claim as 1v1, for example), whose steps stepsForClaimType gives, with that solicitor responding
//  - the steps of a party whose solicitor changed run as their new solicitor
// Without NOTICE_OF_CHANGE the journey still lists one NOTICE_OF_CHANGE step, skipped with the reason, as it does for
// other switched-off steps.
export function withNoticeOfChange(
  c: NocClaim,
  ctx: JourneyContext,
  steps: JourneyStep[],
  stepsForClaimType: (claimType: claimTypes) => JourneyStep[],
): JourneyStep[] {
  const specs = nocSpecs(c);
  const anchor = steps.find((step) => step.name === c.noticeOfChangeAfter);
  const anchorIndex = steps.indexOf(anchor);
  const firstIndex = steps.findIndex((step) => step.name === c.noticeOfChangeFirstStep);
  const placeholder = (skipIf: Array<[boolean, string]>, invalidIf?: JourneyStep['invalidIf']): JourneyStep => ({
    name: 'NOTICE_OF_CHANGE', title: 'A solicitor takes over a party with a notice of change.', user: 'claimantSolicitor', skipIf, invalidIf, run: async () => {},
  });

  if (anchor === undefined || anchorIndex < firstIndex || anchor.closesClaim) {
    // The journey still lists the step, so the settings check can report the problem
    const problem = `Invalid NOTICE_OF_CHANGE_AFTER value: ${c.noticeOfChangeAfter}. It must be one of the steps from ${c.noticeOfChangeFirstStep} on, and not one that closes the claim: ${steps.slice(firstIndex).filter((step) => !step.closesClaim).map((step) => step.name).join(', ')}.`;
    const invalid = specs.length > 0;
    return [...steps.slice(0, firstIndex + 1), placeholder([[true, problem]], () => [[invalid, problem]]), ...steps.slice(firstIndex + 1)];
  }
  if (specs.length === 0) {
    const off: [boolean, string] = [true, 'Notice of change is switched off (set NOTICE_OF_CHANGE to a list such as DEFENDANT_1,CLAIMANT_1 to run it)'];
    return [...steps.slice(0, anchorIndex + 1), placeholder([off]), ...steps.slice(anchorIndex + 1)];
  }

  // Once every litigant in person has a solicitor, the steps after the notices of change are the represented claim's
  const claimTypeAfter = nocClaimTypeAfter(c);
  const stepsAfter = claimTypeAfter === c.claimType ? steps : stepsForClaimType(claimTypeAfter);
  const usersAfter = nocUsersAfter(c);
  const later = stepsAfter.slice(stepsAfter.findIndex((step) => step.name === anchor.name) + 1).map((step) => {
    const user = usersAfter[step.user] ?? step.user;
    const title = user === step.user ? step.title : `${step.title.trim().replace(/\.$/, '')} (as ${sessionUsers[user].credentials.name}).`;
    return { ...step, user, title };
  });
  if (claimTypeAfter !== c.claimType) {
    console.log(`Notice of change: after ${anchor.name} the ${c.claimType} claim carries on as ${claimTypeAfter}`);
  }
  return [...steps.slice(0, anchorIndex + 1), ...noticeOfChangeSteps(c, ctx, specs, anchor), ...later];
}

// One step per NOTICE_OF_CHANGE party, run as the solicitor who takes them over. The client's name is read from the
// case, as CCD's challenge question matches it exactly against the party's name (title included for an individual).
// Each is checked on the case: the party's case role is the new solicitor's organisation's, a defendant is now
// represented, the new solicitor can see the case and the old one can no longer see it (unless they still act for
// another party). The steps have the same skip reasons as the step they follow.
function noticeOfChangeSteps(c: NocClaim, ctx: JourneyContext, specs: NocSpec[], anchor: JourneyStep): JourneyStep[] {
  const organisationPolicy: Record<NocSpec['party'], string> = {
    CLAIMANT_1: 'applicant1OrganisationPolicy',
    DEFENDANT_1: 'respondent1OrganisationPolicy',
    DEFENDANT_2: 'respondent2OrganisationPolicy',
  };
  // Who represents each party as the notices of change are given in turn, so each step knows the solicitor it replaces
  const defendants = c.claimShape.defendants;
  const representative: Record<NocSpec['party'], SessionUserKey | undefined> = {
    CLAIMANT_1: 'claimantSolicitor',
    DEFENDANT_1: defendants[0]?.solicitor === 'own' ? 'respondent1Solicitor' : undefined,
    DEFENDANT_2: defendants[1]?.solicitor === 'own' ? 'respondent2Solicitor' : defendants[1]?.solicitor === 'sameAsDefendant1' ? 'respondent1Solicitor' : undefined,
  };

  return specs.map((spec) => {
    const oldSolicitor = representative[spec.party];
    representative[spec.party] = spec.newSolicitor;
    // The old solicitor keeps the case while they still act for another party (1v2SS, until both have moved)
    const oldSolicitorLosesCase = oldSolicitor !== undefined && !Object.values(representative).includes(oldSolicitor);
    // Every solicitor a notice of change can go to belongs to an organisation
    const newSolicitor = sessionUsers[spec.newSolicitor].credentials as { name: string; username: string; orgId: string };
    const label = nocPartyLabel[spec.party];
    const defendantNumber = spec.party === 'DEFENDANT_1' ? 1 : spec.party === 'DEFENDANT_2' ? 2 : undefined;
    // civil-service runs a business process of its own when Defendant 1 was a litigant in person
    const businessProcess = spec.party === 'DEFENDANT_1' && spec.litigantInPerson ? 'APPLY_NOC_DECISION_DEFENDANT_LIP' : 'APPLY_NOC_DECISION';
    return {
      name: `NOTICE_OF_CHANGE_${spec.party}`,
      group: 'NOTICE_OF_CHANGE',
      title: `${newSolicitor.name} takes over ${label}${spec.litigantInPerson ? ' (a litigant in person)' : ''} with a notice of change.`,
      user: spec.newSolicitor,
      skipIf: anchor.skipIf,
      run: async ({ page, storageState, user }) => {
        const stateBefore = ctx.lastStateReached;
        const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        const clientName: string = caseData[nocPartyField[spec.party]]?.partyName;
        expect(clientName, `Case ${ctx.caseId} has no name for ${label} (${nocPartyField[spec.party]}.partyName)`).toBeTruthy();
        console.log(`${newSolicitor.name} gives a notice of change for ${label}, "${clientName}", replacing ${oldSolicitor ? sessionUsers[oldSolicitor].credentials.name : 'no solicitor (a litigant in person)'}`);

        if (ctx.useApi()) {
          await new ApiNoticeOfChange().submit(ctx.caseId, user, clientName);
        } else {
          const noticeOfChange = new NoticeOfChange(page);
          await ctx.runEvent(page, storageState, async () => {
            await noticeOfChange.submit(ctx.caseId, clientName);
          }, envUrl);
          await noticeOfChange.viewCase(ctx.caseId);
        }
        CaseUserRegistry.record(ctx.caseId, spec.newSolicitor as CaseUserKey);
        if (defendantNumber !== undefined) {
          ctx.defendantsGivenSolicitorByNoc.add(defendantNumber);
        }
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, businessProcess);

        const saved = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(
          saved[organisationPolicy[spec.party]]?.Organisation?.OrganisationID,
          `${label}'s case role ${nocCaseRole[spec.party]} did not move to ${newSolicitor.name}'s organisation`,
        ).toBe(newSolicitor.orgId);
        if (defendantNumber !== undefined) {
          expect(saved[`respondent${defendantNumber}Represented`], `${label} is not recorded as represented`).toBe('Yes');
        }
        // Access is checked by reading the case's event history as each solicitor (CCD refuses it without a case role).
        // The notice of change's own events are not in a solicitor's view of the history, so no event is looked for.
        await expect(
          ctx.testingEndpointHelper.countCaseEvents(newSolicitor, ctx.caseId, 'NOC_REQUEST'),
          `${newSolicitor.name} cannot see the case after the notice of change`,
        ).resolves.toBeGreaterThanOrEqual(0);
        if (oldSolicitorLosesCase) {
          const old = sessionUsers[oldSolicitor].credentials;
          await expect(
            ctx.testingEndpointHelper.countCaseEvents(old, ctx.caseId, 'NOC_REQUEST'),
            `${old.name} can still see the case after the notice of change`,
          ).rejects.toThrow();
        }
        // A notice of change does not change the claim's state
        await ctx.assertCaseState(stateBefore);
      },
    };
  });
}
