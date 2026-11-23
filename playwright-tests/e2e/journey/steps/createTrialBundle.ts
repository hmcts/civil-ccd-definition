import { expect } from '@playwright/test';
import caseStates from '../../../enums/caseStates.ts';
import claimTrack from '../../../enums/track.ts';
import { JourneyContext, JourneyStep } from '../journeyRunner.ts';
import { JourneyConfig } from './journeyConfig.ts';

// The trial bundle, which a civil-service scheduler normally creates about 3 weeks before the hearing, is created
// now. Once the bundle has been stitched into one document it shows on the Bundles tab. Small claims have a bundle
// too. The scheduler leaves out intermediate and multi track claims (BundleCreationTriggerService, CIV-14934), so
// the step skips them. civil-service's testing support would still create one, as it does not search for the case.
export function createTrialBundle(c: JourneyConfig, ctx: JourneyContext): JourneyStep {
  return {
    name: 'CREATE_TRIAL_BUNDLE',
    title: 'Trial bundle is created and shown to the Claimant Solicitor.',
    user: 'claimantSolicitor',
    needs: [c.facts.reachesCaseProgression],
    skipIf: [
      [c.track === claimTrack.INTERMEDIATE || c.track === claimTrack.MULTI, 'Skipping as civil-service does not create trial bundles for intermediate or multi track claims'],
    ],
    run: async ({ page, storageState }) => {
      await ctx.testingEndpointHelper.triggerTrialBundle(ctx.caseId);
      const bundleTitle = await ctx.testingEndpointHelper.waitForBundleStitched(ctx.caseId);
      await ctx.runEvent(page, storageState, async () => {
        await ctx.pageHelper.gotoAndWaitForXui(ctx.caseUrl());
        await ctx.tabsHelper.selectTab('Bundles');
        await expect(page.getByText(bundleTitle).first()).toBeVisible();
      });
      await ctx.assertCaseState(caseStates.PREPARE_FOR_HEARING_CONDUCT_HEARING);
    },
  };
}
