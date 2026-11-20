import { expect } from '@playwright/test';
import caseStates from '../../enums/caseStates.ts';
import NotSuitableSdo from '../../enums/notSuitableSdo.ts';
import * as ui from '../flows/events/ui/index.ts';
import * as api from '../flows/events/api/index.ts';
import { SessionUserKey } from '../../helpers/SessionHelper.ts';
import { WaTaskHelper } from '../../helpers/WaTaskHelper.ts';
import { JourneyContext, JourneyStep } from './journeyRunner.ts';

// The steps for NOT_SUITABLE_SDO, which go just before CREATE_SDO, while the claim is in JUDICIAL_REFERRAL:
//  - NOT_SUITABLE_SDO: the user who would make the Standard Direction Order (sdoUser) claims the same directions task
//    (sdoTaskType) and follows its "Not Suitable for SDO" link instead. Sending the claim to another hearing centre
//    (CHANGE_LOCATION) leaves it in JUDICIAL_REFERRAL and gives the hearing centre admin a "Request for transfer online
//    case" task. Another reason (OTHER_REASONS) starts the NotSuitable_SDO business process, which takes the claim
//    offline (PROCEEDS_IN_HERITAGE_SYSTEM).
//  - TRANSFER_ONLINE_CASE (with CHANGE_LOCATION): the hearing centre admin transfers the claim to another London court
//    with "Transfer online case". The claim stays in JUDICIAL_REFERRAL, and work allocation gives the new court a
//    directions task, so CREATE_SDO carries on.
// Both are skipped wherever CREATE_SDO is (see withNotSuitableSdo).
export function notSuitableSdoSteps(
  notSuitableSdo: NotSuitableSdo | undefined,
  ctx: JourneyContext,
  sdoUser: SessionUserKey,
  sdoTaskType: string,
): JourneyStep[] {
  return [
    {
      name: 'NOT_SUITABLE_SDO',
      title: `${sdoUser === 'legalAdviser' ? 'Legal Adviser' : 'Judge'} decides the claim is not suitable for a Standard Direction Order${notSuitableSdo ? ` (${notSuitableSdo})` : ''}.`,
      user: sdoUser,
      skipIf: [[notSuitableSdo === undefined, 'Not suitable for SDO is switched off (set NOT_SUITABLE_SDO=CHANGE_LOCATION or OTHER_REASONS to run it)']],
      run: async ({ page, storageState, user }) => {
        const reason = notSuitableSdo as NotSuitableSdo;
        await ctx.runEvent(page, storageState, async () => {
          // The event is only reached from the directions task, which is claimed through the API version too
          await new WaTaskHelper(page).assignTaskForEvent(ctx.caseId, 'NotSuitable_SDO', sdoTaskType);
          if (!ctx.useApi()) {
            await new ui.NotSuitableSdo(page).submit(ctx.caseId, reason);
          }
        });
        if (ctx.useApi()) {
          await new api.NotSuitableSdo().submit(ctx.caseId, reason, user);
        }
        if (reason === NotSuitableSdo.OTHER_REASONS) {
          await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'NotSuitable_SDO');
          await ctx.assertCaseState(caseStates.PROCEEDS_IN_HERITAGE_SYSTEM);
        } else {
          const caseData = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
          expect(caseData.notSuitableSdoOptions, 'The request to send the claim to another hearing centre was not saved').toBe(NotSuitableSdo.CHANGE_LOCATION);
          await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
        }
      },
    },
    {
      name: 'TRANSFER_ONLINE_CASE',
      title: 'Hearing Centre Admin transfers the claim to another hearing centre.',
      user: 'hearingCentreAdmin',
      skipIf: [[notSuitableSdo !== NotSuitableSdo.CHANGE_LOCATION, 'Skipping as the judge did not ask for the claim to go to another hearing centre (set NOT_SUITABLE_SDO=CHANGE_LOCATION to run it)']],
      run: async ({ page, storageState }) => {
        const before = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        const currentSite: string | undefined = before.locationName;
        console.log(`The claim is at ${currentSite ?? 'an unnamed court'} (${before.caseManagementLocation?.baseLocation})`);
        let chosen = '';
        if (ctx.useApi()) {
          chosen = await new api.TransferOnlineCase().submit(ctx.caseId, currentSite);
        } else {
          await ctx.runEvent(page, storageState, async () => {
            chosen = await new ui.TransferOnlineCase(page).submit(currentSite);
          });
        }
        await ctx.testingEndpointHelper.waitForNoOngoingBusinessProcess(ctx.caseId);
        const after = await ctx.testingEndpointHelper.getCaseData(ctx.caseId);
        expect(after.caseManagementLocation?.baseLocation, `The claim was not moved to ${chosen}`).not.toBe(before.caseManagementLocation?.baseLocation);
        expect(chosen.toLowerCase(), 'The claim was moved to a different court from the one chosen').toContain(String(after.locationName).toLowerCase());
        await ctx.assertCaseState(caseStates.JUDICIAL_REFERRAL);
      },
    },
  ];
}

// Finishes the NOT_SUITABLE_SDO steps once the journey's steps are all in place: they are skipped wherever CREATE_SDO
// is, NOT_SUITABLE_SDO fails the run up front where the claim never gets to CREATE_SDO, and once a claim has gone
// offline (OTHER_REASONS) every later step is skipped apart from those that close the claim.
export function withNotSuitableSdo(steps: JourneyStep[], notSuitableSdo: NotSuitableSdo | undefined): void {
  const sdoStep = steps.find((step) => step.name === 'CREATE_SDO');
  const sdoSkipIf = sdoStep?.skipIf ?? [];
  const sdoReached = !sdoSkipIf.some(([skipped]) => skipped);
  const notSuitable = steps.find((step) => step.name === 'NOT_SUITABLE_SDO');
  const transfer = steps.find((step) => step.name === 'TRANSFER_ONLINE_CASE');
  for (const step of [notSuitable, transfer]) {
    if (step) {
      step.skipIf = [...(step.skipIf ?? []), ...sdoSkipIf];
    }
  }
  if (notSuitable) {
    notSuitable.invalidIf = () => notSuitableSdo === undefined ? [] : [[
      !sdoReached,
      `NOT_SUITABLE_SDO=${notSuitableSdo} needs the claim to reach the Standard Direction Order (CREATE_SDO), on the fast or small claims track: ${sdoSkipIf.filter(([skipped]) => skipped).map(([, reason]) => reason).join('; ')}`,
    ]];
  }
  if (notSuitableSdo === NotSuitableSdo.OTHER_REASONS) {
    const offline: [boolean, string] = [true, 'Skipping as the claim went offline when the judge decided it was not suitable for a Standard Direction Order (NOT_SUITABLE_SDO=OTHER_REASONS)'];
    steps.slice(steps.indexOf(transfer ?? notSuitable!) + 1)
      .filter((step) => !step.closesClaim)
      .forEach((step) => {
        step.skipIf = [...(step.skipIf ?? []), offline];
      });
  }
}
