import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The claimant's solicitor requesting default judgment on a specified claim (event DEFAULT_JUDGEMENT_SPEC, "Request
// Default Judgment"), against every defendant, once the time for responding has passed with no response. It is only
// offered in AWAITING_RESPONDENT_ACKNOWLEDGEMENT, and civil-service refuses it until the response deadline has passed.
// Nothing has been paid, no fixed costs are claimed and the defendants are to pay immediately.
//
// civil-service records the judgment through Judgments Online: where the judgment is against every defendant the
// claim moves to JUDGMENT_REQUESTED while the judgment waits to be issued (where the judgment buffer is switched on)
// or straight to All_FINAL_ORDERS_ISSUED, and against only one of two defendants the claim goes offline.
//
// Which fixed costs page XUI shows, and whether it shows the amounts owed before the payment type, depends on the
// claim, so those pages are answered as they come.
export class DefaultJudgmentSpec {
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

    // Nothing has been paid
    await this.page.locator('#partialPayment_No').check();
    await this.pageHelper.continueToNextPage();

    // No fixed costs, on whichever fixed costs page the claim gets, then the amounts owed where XUI shows them
    // Only visible elements count: CCD keeps hidden copies of other pages' fields in the page
    const fixedCosts = this.page.locator('#claimFixedCostsOnEntryDJ_No').filter({ visible: true });
    const oldFixedCosts = this.page.locator('#paymentConfirmationDecisionSpec_No').filter({ visible: true });
    const immediately = this.page.locator('#paymentTypeSelection-IMMEDIATELY').filter({ visible: true });
    const breakdown = this.page.getByText('The judgment will order', { exact: false }).filter({ visible: true });
    for (let page = 0; page < 3; page++) {
      await fixedCosts.or(oldFixedCosts).or(immediately).or(breakdown).first().waitFor({ state: 'visible' });
      if (await immediately.isVisible()) {
        break;
      }
      if (await fixedCosts.isVisible()) {
        await fixedCosts.check();
      } else if (await oldFixedCosts.isVisible()) {
        await oldFixedCosts.check();
      }
      await this.pageHelper.continueToNextPage();
    }

    // The defendants pay immediately
    await immediately.check();
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText(/Default Judgment Granted|Default judgment requested/i);
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
