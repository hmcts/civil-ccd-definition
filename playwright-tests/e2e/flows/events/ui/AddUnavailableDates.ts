import { expect, Page } from '@playwright/test';
import moment from 'moment';
import { PageHelper } from '../../../../helpers/PageHelper';
import { ButtonHelper } from '../../../../helpers/ButtonHelper.ts';
import { UnavailableDates } from '../shared_api_ui/addUnavailableDatesSpecs.ts';

// A solicitor or court staff adding dates a party cannot attend a hearing (event ADD_UNAVAILABLE_DATES, "Add
// Unavailable Dates"), on a specified or unspecified claim. It is offered once the claimant's response or default
// judgment has taken the claim to JUDICIAL_REFERRAL (or IN_MEDIATION), and in the states after, and does not change the
// claim's state. A solicitor goes straight to the dates page, as civil-service adds the dates for the parties they
// represent; court staff first choose the party from a list. The dates show on the Listing notes tab. civil-service does not
// start a business process.
export class AddUnavailableDates {
  private buttonHelper: ButtonHelper;
  private pageHelper: PageHelper;

  constructor(public page: Page) {
    this.buttonHelper = new ButtonHelper(this.page);
    this.pageHelper = new PageHelper(this.page);
  }

  // adminChoice is the party court staff choose, such as Defendant or Defendants; a solicitor has no choice
  async submit(dates: UnavailableDates, adminChoice?: string) {
    await this.pageHelper.selectNextStep('Add Unavailable Dates');

    // Only court staff get the party page: for a solicitor its choice is hidden and the rest is text, so XUI skips it
    // and opens on the dates page
    if (adminChoice) {
      // The parties are radio buttons (a dynamic radio list), labelled as civil-service names them
      await this.page.locator('#partyChosen').getByRole('radio', { name: adminChoice, exact: true }).check();
      await this.pageHelper.continueToNextPage();
    }

    // Single date
    await this.buttonHelper.addNewButton.first().click();
    await this.page.locator('#additionalUnavailableDates_0_unavailableDateType-SINGLE_DATE').check();
    await this.pageHelper.fillDate('date', moment(dates.date));

    // Date range
    await this.buttonHelper.addNewButton.first().click();
    const dateRange = this.page.locator('#additionalUnavailableDates_1_unavailableDateType-DATE_RANGE');
    await dateRange.check();
    await expect(dateRange).toBeChecked();
    await this.pageHelper.fillDate('fromDate', moment(dates.fromDate));
    await this.pageHelper.fillDate('toDate', moment(dates.toDate));
    // civil-service's mid event callback checks the dates are from today to a year ahead
    await this.pageHelper.continueToNextPage();

    // Check your answers
    await this.pageHelper.submitEvent();

    await expect(this.page.locator('#confirmation-header')).toContainText('Availability updated');
    await this.buttonHelper.closeAndReturnToCaseDetailsButton.click();
  }
}
