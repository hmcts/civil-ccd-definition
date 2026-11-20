import { expect, Page } from '@playwright/test';
import moment from 'moment-business-days';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import DiscontinueClaimType from '../../../../enums/discontinueClaim.ts';

// The claimant's solicitor fully discontinuing the claim (event DISCONTINUE_CLAIM_CLAIMANT, "Discontinue this claim"),
// for every claimant and against every defendant. Where the court's permission is not needed they confirm the
// conditions for that are met, and civil-service discontinues the claim (CASE_DISCONTINUED). Otherwise they give the
// judge who granted permission and when (today), and the claim waits for court staff to validate it.
//
// Which pages XUI shows depends on the claim: who is discontinuing with two claimants, and whether it is against both
// defendants with two represented defendants. So each page is answered as it comes, up to the type of discontinuance.
export class DiscontinueClaim {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(type: DiscontinueClaimType) {
    await this.pageHelper.selectNextStep('Discontinue this claim');

    const claimantsPage = this.page.getByText('Who is discontinuing?');
    const permissionPage = this.page.locator('#courtPermissionNeeded-YES');
    const permissionGrantedPage = this.page.locator('#isPermissionGranted-YES');
    const defendantsPage = this.page.locator('#isDiscontinuingAgainstBothDefendants-YES');
    const typePage = this.page.locator('#typeOfDiscontinuance-FULL_DISCONTINUANCE');
    let typeDone = false;
    while (!typeDone) {
      await claimantsPage.or(permissionPage).or(permissionGrantedPage).or(defendantsPage).or(typePage).first().waitFor({ state: 'visible' });
      if (await claimantsPage.isVisible()) {
        // Both claimants are discontinuing
        await this.page.getByRole('radio', { name: 'Both', exact: true }).check();
      } else if (await permissionPage.isVisible()) {
        if (type === DiscontinueClaimType.NO_PERMISSION_NEEDED) {
          await this.page.locator('#courtPermissionNeeded-NO').check();
          await this.page.locator('#courtPermissionNeededChecked-CourtPermissionNeededChecked').check();
        } else {
          await permissionPage.check();
        }
      } else if (await permissionGrantedPage.isVisible()) {
        // The judge who granted permission, today
        await permissionGrantedPage.check();
        await this.page.locator('#permissionGrantedComplex_permissionGrantedJudge').fill('District Judge Playwright');
        await this.pageHelper.fillDate('permissionGrantedDate', moment());
      } else if (await defendantsPage.isVisible()) {
        await defendantsPage.check();
      } else {
        await typePage.check();
        typeDone = true;
      }
      await this.pageHelper.continueToNextPage();
    }

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText(
      type === DiscontinueClaimType.NO_PERMISSION_NEEDED ? 'Your claim has been discontinued' : 'Your request is being reviewed',
    );
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
