import { Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { envUrl } from '../../../../civilConfig.ts';
import trackType from '../../../../enums/track.ts';

// The judge's Standard Direction Order (event CREATE_SDO) once the claim is in JUDICIAL_REFERRAL. XUI only offers the
// event through a work allocation task (its EventEnablingCondition hides it from the next step list), so it is opened
// at its page URL instead, which is where the task would take the judge. The fast and small claims tracks are coded.
// For a noise induced hearing loss (NIHL) claim the judge chooses the NIHL directions, which have their own page
// (SdoR2FastTrack). civil-service fills in its directions, hearing method and trial court, so they are kept as they are.
// For a small claim civil-service likewise fills in the directions, an in person hearing and the court, leaving the
// hearing's time estimate.
export class CreateSdo {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(caseId: string, track: trackType, noiseInducedHearingLoss: boolean = false) {
    if (track !== trackType.FAST && track !== trackType.SMALL) {
      throw new Error(`CreateSdo only has the fast and small claims tracks coded, not ${track}`);
    }
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/cases/case-details/CIVIL/CIVIL/${caseId}/trigger/CREATE_SDO/CREATE_SDOSDO`);

    // A standard directions order rather than a draft directions order
    await this.page.locator('#drawDirectionsOrderRequired_No').check();
    await this.pageHelper.continueToNextPage();

    // Track
    if (track === trackType.SMALL) {
      await this.page.locator('#claimsTrack-smallClaimsTrack').check();
      await this.pageHelper.continueToNextPage();

      // Small claims directions: a one hour hearing
      await this.page.locator('#smallClaimsHearing_time-ONE_HOUR').check();
      await this.pageHelper.continueToNextPage();
      await this.previewAndSubmit();
      return;
    }
    await this.page.locator('#claimsTrack-fastTrack').check();
    if (noiseInducedHearingLoss) {
      await this.page.locator('#fastClaims-fastClaimNoiseInducedHearingLoss').check();
    }
    await this.pageHelper.continueToNextPage();

    if (noiseInducedHearingLoss) {
      // Noise induced hearing loss directions: all filled in already
      await this.page.locator('#sdoR2ImportantNotesTxt').waitFor({ state: 'visible' });
      await this.pageHelper.continueToNextPage();
    } else {
      // Fast track directions: the directions are filled in already, leaving the complexity band and time estimate
      await this.page.locator('#fastTrackAllocation_assignComplexityBand_No').check();
      await this.page.locator('#fastTrackHearingTime_hearingDuration-ONE_HOUR').check();
      await this.pageHelper.continueToNextPage();
    }
    await this.previewAndSubmit();
  }

  private async previewAndSubmit() {
    // Order preview (the order document is generated for this page)
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
