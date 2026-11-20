import { expect, Page } from '@playwright/test';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';

// The hearing centre admin changing the legal representatives' email addresses (event AMEND_PARTY_DETAILS, "Amend party
// details"). Where Defendant 1 has a legal representative, the one page shows two boxes for their email, both required
// and both labelled "Defendant's legal representative's details", on unspecified and specified claims alike: first
// specRespondentSolicitor1EmailAddress (empty), then respondentSolicitor1EmailAddress (the email the claim was created
// with). Below them is the claimant's legal representative's email (applicantSolicitor1UserDetails.email). civil-service
// checks the emails are valid. The event has no check your answers page and leaves the claim in its state.
export class AmendPartyDetails {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  async submit(emails: { defendant1Solicitor: string; claimantSolicitor: string }) {
    await this.pageHelper.selectNextStep('Amend party details');

    await this.page.locator('#specRespondentSolicitor1EmailAddress').fill(emails.defendant1Solicitor);
    await this.page.locator('#respondentSolicitor1EmailAddress').fill(emails.defendant1Solicitor);
    await this.page.locator('#applicantSolicitor1UserDetails_email').fill(emails.claimantSolicitor);
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('You have updated a legal representative\'s information');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
