import { expect } from '@playwright/test';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import { caseFlagType } from '../../flows/caseFlags/caseFlagTypes.ts';
import { holderFlagsField, holderLabel } from '../../flows/caseFlags/caseFlagHolders.ts';
import { CaseFlagSpec, caseFlagSpecs } from '../../flows/caseFlags/caseFlagSpecs.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig, stateAfterClaimantResponse } from './journeyConfig.ts';

// The hearing centre admin adds the case flags CASE_FLAGS asks for, one step each (CREATE_CASE_FLAGS), once the
// claimant has responded and the claim is still online, then makes the first one inactive (MAKE_CASE_FLAG_INACTIVE).
// Neither changes the claim's state.
export function caseFlagSteps(c: JourneyConfig, ctx: JourneyContext): JourneyStep[] {
  const journey = c.caseType === 'SPECIFIED' ? 'specified' : 'unspecified';
  const flags = caseFlagSpecs(c);
  const noCaseFlags: Array<[boolean, string]> = [
    ...c.facts.onlineAfterClaimantResponse,
    [flags.length === 0, 'Adding case flags is switched off (set CASE_FLAGS=representative, or a list such as CASE:CF0002,DEFENDANT_1:RA0012)'],
  ];
  const comment = (index: number, flag: CaseFlagSpec) => `Case flag ${index + 1} (${flag.code}) added by the ${journey} journey`;

  const createSteps: JourneyStep[] = flags.map((flag, index) => ({
    name: `CREATE_CASE_FLAG_${index + 1}`,
    group: 'CREATE_CASE_FLAGS',
    title: `Hearing Centre Admin adds case flag ${flag.code} to ${flag.holder}.`,
    user: 'hearingCentreAdmin',
    skipIf: noCaseFlags,
    run: async ({ page, storageState }) => {
      const flagType = await caseFlagType(page, flag.holder === 'CASE' ? 'CASE' : 'PARTY', flag.code, flag.otherUnder);
      console.log(`Adding case flag ${flag.code} "${flagType.path.join(' > ')}" to ${holderLabel(c, flag.holder)}`);
      await ctx.submitEvent(page, storageState, {
        api: () => new api.CreateCaseFlag().submit(ctx.caseId, flag.holder, flagType, { ...flag, comment: comment(index, flag) }),
        ui: () => new ui.CreateCaseFlag(page).submit(holderLabel(c, flag.holder), flagType, { ...flag, comment: comment(index, flag) }),
      });
      const { field, index: entry } = holderFlagsField(flag.holder);
      const saved = (await ctx.testingEndpointHelper.getCaseFlagDetails(ctx.caseId, field, entry)).find((detail) => detail.flagComment === comment(index, flag));
      expect(saved, `Case flag ${flag.code} was not saved on ${field}${entry === undefined ? '' : `[${entry}]`}`).toBeDefined();
      expect(saved.flagCode).toBe(flag.code);
      expect(saved.status).toBe('Active');
      if (flag.otherDescription) {
        expect(saved.otherDescription).toBe(flag.otherDescription);
      }
      await ctx.assertCaseState(stateAfterClaimantResponse(c));
    },
  }));

  const first = flags[0];
  const manageStep: JourneyStep = {
    name: 'MAKE_CASE_FLAG_INACTIVE',
    title: 'Hearing Centre Admin makes the first case flag inactive.',
    user: 'hearingCentreAdmin',
    skipIf: noCaseFlags,
    run: async ({ page, storageState }) => {
      const flagType = await caseFlagType(page, first.holder === 'CASE' ? 'CASE' : 'PARTY', first.code, first.otherUnder);
      const reason = `Made inactive by the ${journey} journey`;
      await ctx.submitEvent(page, storageState, {
        api: () => new api.ManageCaseFlag().makeInactive(ctx.caseId, first.holder, first.code, reason),
        ui: () => new ui.ManageCaseFlag(page).makeInactive(holderLabel(c, first.holder), first.otherDescription ?? flagType.name, reason),
      });
      const { field, index: entry } = holderFlagsField(first.holder);
      const saved = (await ctx.testingEndpointHelper.getCaseFlagDetails(ctx.caseId, field, entry)).find((detail) => detail.flagCode === first.code);
      expect(saved?.status, `Case flag ${first.code} on ${field} was not made inactive`).toBe('Inactive');
      await ctx.assertCaseState(stateAfterClaimantResponse(c));
    },
  };

  if (flags.length === 0) {
    // Without CASE_FLAGS the journey still lists one step, skipped with the reason, as it does for other switched-off steps
    return [{ name: 'CREATE_CASE_FLAGS', title: 'Hearing Centre Admin adds case flags.', user: 'hearingCentreAdmin', skipIf: noCaseFlags, run: async () => {} }];
  }
  return [...createSteps, manageStep];
}
