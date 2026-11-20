import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { reasonForTransfer, transferCourtLabel } from '../shared_api_ui/notSuitableSdoSpecs.ts';

// The hearing centre admin transferring the claim to another hearing centre (event TRANSFER_ONLINE_CASE, "Transfer
// online case"): a London court that is not the current one (see transferCourtLabel), with a reason. civil-service moves
// the claim's case management location there; the claim's state does not change. Returns the label of the court chosen.
export class TransferOnlineCase {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(currentSite: string | undefined): Promise<string> {
    await this.pageHelper.selectNextStep('Transfer online case');

    const courts = this.page.locator('select[id$="transferCourtLocationList"]');
    await expect(courts).toBeVisible();
    const labels = (await courts.locator('option').allTextContents()).map((label) => label.trim());
    const chosen = transferCourtLabel(labels, currentSite);
    await courts.selectOption({ label: chosen });
    await this.page.locator('#reasonForTransfer').fill(reasonForTransfer);
    await this.pageHelper.continueToNextPage();

    // Check your answers and submit
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Case transferred to new location');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
    return chosen;
  }
}
