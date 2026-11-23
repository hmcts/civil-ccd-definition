import { expect } from '@playwright/test';
import * as ui from '../../flows/events/ui/index.ts';
import * as api from '../../flows/events/api/index.ts';
import {
  mciChange, mciChangeNotSavedReason, mciSessionUser, mciSpecs, mciStartsBusinessProcess, mciUserLabel,
} from '../../flows/events/shared_api_ui/manageContactInformationSpecs.ts';
import caseStates from '../../../enums/caseStates.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig, stateAfterClaimantResponse } from './journeyConfig.ts';

// Contact information is updated with "Manage Contact Information", one step for each change
// MANAGE_CONTACT_INFORMATION asks for (by the hearing centre admin or a solicitor), once the claimant has responded and
// the claim is still online. The claim's state does not change.
export function manageContactInformationSteps(c: JourneyConfig, ctx: JourneyContext): JourneyStep[] {
  const specs = mciSpecs(c);
  const noMci: Array<[boolean, string]> = [
    ...c.facts.onlineAfterClaimantResponse,
    [specs.length === 0, 'Managing contact information is switched off (set MANAGE_CONTACT_INFORMATION=representative, or a list such as admin:CLAIMANT_1,respondent1Solicitor:DEFENDANT_1)'],
  ];

  if (specs.length === 0) {
    // Without MANAGE_CONTACT_INFORMATION the journey still lists one step, skipped with the reason
    return [{ name: 'MANAGE_CONTACT_INFORMATION', title: 'Contact information is updated.', user: 'hearingCentreAdmin', skipIf: noMci, run: async () => {} }];
  }
  return specs.map((spec, index) => ({
    name: `MANAGE_CONTACT_INFORMATION_${index + 1}`,
    group: 'MANAGE_CONTACT_INFORMATION',
    title: `${mciUserLabel(spec)} updates the contact information of ${spec.party}.`,
    user: mciSessionUser(spec),
    skipIf: [
      ...noMci,
      // Only a specified claim can wait in AWAITING_APPLICANT_INTENTION after the claimant's response
      [
        spec.user !== 'admin' && stateAfterClaimantResponse(c) === caseStates.AWAITING_APPLICANT_INTENTION,
        'Skipping as a solicitor cannot manage contact information while the claim waits in AWAITING_APPLICANT_INTENTION',
      ],
    ],
    run: async ({ page, storageState, user }) => {
      const change = mciChange(index, spec);
      await ctx.submitEvent(page, storageState, {
        api: () => new api.ManageContactInformation().submit(ctx.caseId, spec, change, user),
        ui: () => new ui.ManageContactInformation(page).submit(spec, change),
      });
      if (mciStartsBusinessProcess(spec.party)) {
        await ctx.testingEndpointHelper.waitForCamundaProcessToFinish(ctx.caseId, 'MANAGE_CONTACT_INFORMATION');
      }
      const notSaved = mciChangeNotSavedReason(await ctx.testingEndpointHelper.getCaseData(ctx.caseId), spec, change);
      expect(notSaved, `Manage Contact Information for ${spec.party} was not saved: ${notSaved}`).toBeUndefined();
      await ctx.assertCaseState(stateAfterClaimantResponse(c));
    },
  }));
}
