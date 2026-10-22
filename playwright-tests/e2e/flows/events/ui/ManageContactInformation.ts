import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { MciChange, MciSpec, mciAddsEntry, mciKind, mciSavedField } from '../../manageContactInformation/manageContactInformationSpecs.ts';

// Updating a party's contact details, or the people attending for them, once the claimant has responded (event
// MANAGE_CONTACT_INFORMATION, "Manage Contact Information"). The first page lists the options the user may choose: the
// hearing centre admin sees every party, a solicitor only their own client's side. civil-service then fills in the
// page for the option chosen with what the case holds. The claim's state does not change.
export class ManageContactInformation {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(spec: MciSpec, change: MciChange) {
    await this.pageHelper.selectNextStep('Manage Contact Information');

    await this.page.locator(`#partyChosen_${spec.party}`).check();
    await this.pageHelper.continueToNextPage();

    switch (mciKind(spec.party)) {
      case 'party':
        await this.updateParty(mciSavedField(spec.party), change);
        break;
      case 'litigationFriend':
        await this.updateLitigationFriend(mciSavedField(spec.party), change);
        break;
      case 'individuals':
        await this.addToCollection(spec.party.endsWith('_LR_INDIVIDUALS') ? 'updateLRIndividualsForm' : 'updateOrgIndividualsForm', change, false);
        break;
      case 'witnesses':
        await this.changeCollection('updateWitnessesDetailsForm', spec, change, false);
        break;
      case 'experts':
        await this.changeCollection('updateExpertsDetailsForm', spec, change, true);
        break;
    }

    // Check your answers
    await this.pageHelper.submitEvent();
    await expect(this.page.locator('#confirmation-header')).toContainText('Contact information changed');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }

  // The party's own details, e.g. #applicant1_partyEmail. The address is already entered, so its fields show.
  private async updateParty(field: string, change: MciChange) {
    await this.page.locator(`#${field}_partyEmail`).fill(change.email);
    await this.page.locator(`#${field}_primaryAddress__detailAddressLine1`).fill(change.addressLine1);
    await this.continueAfterWarning();
  }

  private async updateLitigationFriend(field: string, change: MciChange) {
    await this.page.locator(`#${field}_emailAddress`).fill(change.email);
    await this.page.locator(`#${field}_phoneNumber`).fill(change.phone);
    await this.continueAfterWarning();
  }

  // Witnesses and experts: the admin adds one, while a solicitor can only change those already named, so changes the
  // first one's email
  private async changeCollection(form: string, spec: MciSpec, change: MciChange, expert: boolean) {
    if (mciAddsEntry(spec)) {
      await this.addToCollection(form, change, expert);
      return;
    }
    await this.page.locator(`#${form}_0_emailAddress`).fill(change.email);
    await this.pageHelper.continueToNextPage();
  }

  // Adds an entry at the end of the list, after any civil-service filled in from the case
  private async addToCollection(form: string, change: MciChange, expert: boolean) {
    await this.page.locator(`#${form}`).getByRole('button', { name: 'Add new' }).first().click();
    const lastField = (name: string) => this.page.locator(`input[id^="${form}_"][id$="_${name}"]`).last();
    await lastField('firstName').fill(change.firstName);
    await lastField('lastName').fill(change.lastName);
    await lastField('emailAddress').fill(change.email);
    await lastField('phoneNumber').fill(change.phone);
    if (expert) {
      await lastField('fieldOfExpertise').fill(change.fieldOfExpertise);
    }
    await this.pageHelper.continueToNextPage();
  }

  // Changing a party with a litigation friend, or a litigation friend when the other party has one too, warns that the
  // litigation friend's details may need changing as well, which is continued past
  private async continueAfterWarning() {
    await this.pageHelper.continueToNextPage();
    const ignoreWarning = this.buttonHelper.IgnoreWarningAndContinueButton;
    if (await ignoreWarning.isVisible()) {
      await ignoreWarning.click();
    }
  }
}
