import { Page } from '@playwright/test';
import { PageHelper } from '../../../helpers/PageHelper';
import { ButtonHelper } from '../../../helpers/ButtonHelper.ts';
import { envUrl } from '../../../civilConfig.ts';
import trackType from '../../../enums/track.ts';

// The judge's Standard Direction Order (event CREATE_SDO) once the claim is in JUDICIAL_REFERRAL. XUI only offers the
// event through a work allocation task (its EventEnablingCondition hides it from the next step list), so it is opened
// at its page URL instead, which is where the task would take the judge. Only the fast track is coded.
export class CreateSdo {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(caseId: string, track: trackType) {
    if (track !== trackType.FAST) {
      throw new Error(`CreateSdo only has the fast track coded, not ${track}`);
    }
    await this.pageHelper.gotoAndWaitForXui(`${envUrl}/cases/case-details/CIVIL/CIVIL/${caseId}/trigger/CREATE_SDO/CREATE_SDOSDO`);

    // A standard directions order rather than a draft directions order
    await this.page.locator('#drawDirectionsOrderRequired_No').check();
    await this.pageHelper.continueToNextPage();

    // Track
    await this.page.locator('#claimsTrack-fastTrack').check();
    await this.pageHelper.continueToNextPage();

    // Fast track directions: the directions are filled in already, leaving the complexity band and time estimate
    await this.page.locator('#fastTrackAllocation_assignComplexityBand_No').check();
    await this.page.locator('#fastTrackHearingTime_hearingDuration-ONE_HOUR').check();
    await this.pageHelper.continueToNextPage();

    // Order preview (the order document is generated for this page)
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await this.page.locator('#confirmation-header').waitFor({ state: 'visible' });
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
