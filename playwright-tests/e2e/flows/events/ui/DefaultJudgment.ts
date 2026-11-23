import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor requesting default judgment on an unspecified claim (event DEFAULT_JUDGEMENT, "Request
// Default Judgment"), against every defendant, once the time for responding has passed with no response. It is only
// offered in AWAITING_RESPONDENT_ACKNOWLEDGEMENT, and civil-service refuses it until 5pm on the day the response was
// due. The court decides the damages at a disposal hearing, which the claimant asks to attend in person at the court
// the claim is issued at, with no dates to avoid and no support needed. civil-service moves the claim to
// JUDICIAL_REFERRAL for a judge's directions.
//
// Where the claim includes an other remedy (housing disrepair, or damages and an other remedy, with a declaration),
// XUI also asks whether the claimant abandons it, which they do.
export class DefaultJudgment {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(twoDefendants: boolean) {
    await this.pageHelper.selectNextStep('Request Default Judgment');

    // Against which defendant: both, where there are two
    await expect(this.page.getByText('Against which Defendant are you requesting default judgment?')).toBeVisible();
    if (twoDefendants) {
      await this.page.getByRole('radio', { name: 'Both Defendants', exact: true }).check();
    } else {
      await this.page.getByRole('radio').first().check();
    }
    await this.pageHelper.continueToNextPage();

    // The claimant's solicitor certifies the statements apply to the defendants
    await this.page.locator(twoDefendants ? '#CPRAcceptance2Def_acceptance-CERTIFIED' : '#CPRAcceptance_acceptance-CERTIFIED').check();
    await this.pageHelper.continueToNextPage();

    // Abandoning an other remedy, where the claim has one
    // Only visible elements count: CCD keeps hidden copies of other pages' fields in the page
    const abandonOtherRemedy = this.page.locator('#isOtherRemedyAbandoned_Yes').filter({ visible: true });
    const hearingType = this.page.locator('#hearingSelection-DISPOSAL_HEARING').filter({ visible: true });
    await abandonOtherRemedy.or(hearingType).first().waitFor({ state: 'visible' });
    if (await abandonOtherRemedy.isVisible()) {
      await abandonOtherRemedy.check();
      await this.pageHelper.continueToNextPage();
    }

    // A disposal hearing decides the damages
    await hearingType.check();
    await this.page.locator('#detailsOfDirection').fill('Directions requested by playwright-tests');
    await this.pageHelper.continueToNextPage();

    // Hearing requirements: in person at the claim's court, no dates to avoid and no support
    await this.page.locator('#hearingSupportRequirementsDJ_hearingType-IN_PERSON').check();
    await this.selectCourt(this.page.locator('#hearingSupportRequirementsDJ_hearingTemporaryLocation'));
    await this.page.locator('#hearingSupportRequirementsDJ_hearingPreferredTelephoneNumber1').fill('07444552365');
    await this.page.locator('#hearingSupportRequirementsDJ_hearingPreferredEmail').fill('claimant@example.com');
    await this.page.locator('#hearingSupportRequirementsDJ_hearingUnavailableDates_No').check();
    await this.page.locator('#hearingSupportRequirementsDJ_hearingSupportQuestion_No').check();
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Judgment for damages to be decided');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  // Clerkenwell, where the claims are issued, or the first court if the list does not have it
  private async selectCourt(courts: ReturnType<Page['locator']>) {
    const labels = await courts.locator('option').allTextContents();
    const court = labels.find((label) => /Clerkenwell/i.test(label)) ?? labels.find((label) => label.trim() && !/select/i.test(label));
    expect(court, `The hearing court list has no courts (it has ${labels.join(', ')})`).toBeDefined();
    await courts.selectOption({ label: court.trim() });
  }
}
