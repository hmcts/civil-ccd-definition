import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import {
  LitigationFriendFor,
  litigationFriendDetails,
  litigationFriendField,
} from '../shared_api_ui/defendantLitigationFriendSpecs.ts';

// A defendant's solicitor adding a litigation friend for the defendant they represent on an unspecified claim (event
// ADD_DEFENDANT_LITIGATION_FRIEND, "Add litigation friend"). It is offered from the claim being issued until the
// claimant responds, and does not change the claim's state. Where both defendants have the same solicitor the first
// page asks who needs a litigation friend (Both, Defendant One or Defendant Two); otherwise civil-service works out
// which defendant from the solicitor's case role, and the event opens on that defendant's litigation friend page.
// civil-service starts the ADD_DEFENDANT_LITIGATION_FRIEND business process.
export class AddDefendantLitigationFriend {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(litigationFriendFor: LitigationFriendFor) {
    await this.pageHelper.selectNextStep('Add litigation friend');

    if (litigationFriendFor === 'BOTH') {
      // Who requires a litigation friend? The list is filled in by civil-service, and its mid event callback works out
      // which page comes next
      await this.page.locator('#selectLitigationFriend').selectOption({ label: 'Both' });
      await this.pageHelper.continueToNextPage();
    }

    const field = litigationFriendField(litigationFriendFor);
    const details = litigationFriendDetails(litigationFriendFor);
    await this.page.locator(`#${field}_firstName`).fill(details.firstName);
    await this.page.locator(`#${field}_lastName`).fill(details.lastName);
    await this.page.locator(`#${field}_emailAddress`).fill(details.emailAddress);
    await this.page.locator(`#${field}_phoneNumber`).fill(details.phoneNumber);
    await this.page.locator(`#${field}_hasSameAddressAsLitigant_${details.hasSameAddressAsLitigant}`).check();
    await this.buttonHelper.addNewButton.click();
    await this.pageHelper.uploadFile(
      this.page.locator(`#${field}_certificateOfSuitability_0_document`),
      './playwright-tests/documents/TEST_DOCUMENT_1.pdf',
    );
    await this.pageHelper.continueToNextPage();

    // Check your answers
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('You have added litigation friend details');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
