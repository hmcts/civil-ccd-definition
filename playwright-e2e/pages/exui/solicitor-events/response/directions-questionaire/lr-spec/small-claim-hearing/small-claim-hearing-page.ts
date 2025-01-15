import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, inputs, radioButtons, subheadings } from './small-claim-hearing-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class SmallClaimHearingPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private defendantParty: Party;

  constructor(page: Page, dateFrament: DateFragment, party: Party) {
    super(page);
    this.dateFragment = dateFrament;
    this.defendantParty = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.availability),
      super.expectText(radioButtons.unavailableDatesRequired.label),
    ]);
  }

  async selectYesAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDatesRequired.yes.selector(this.defendantParty),
    );
  }

  async selectNoAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDatesRequired.no.selector(this.defendantParty),
    );
  }

  async selectYesInterpreter() {
    await super.clickBySelector(radioButtons.interpreter.yes.selector);
  }

  async selectNoInterpreter() {
    await super.clickBySelector(radioButtons.interpreter.no.selector);
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.addNewAvailability.selector(this.defendantParty));
  }

  async selectSingleDate(hearingNumber: number) {
    await super.clickBySelector(
      radioButtons.availabilityOptions.single.selector(this.defendantParty, hearingNumber),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, 'date');
  }

  async selectDateRange(hearingNumber: number) {
    await super.clickBySelector(
      radioButtons.availabilityOptions.range.selector(this.defendantParty, hearingNumber),
    );
    const unavailableDateFrom = DateHelper.addToToday({ months: 6 });
    const unavailableDateTo = DateHelper.addToToday({ months: 7 });
    await this.dateFragment.enterDate(unavailableDateFrom, 'fromDate');
    await this.dateFragment.enterDate(unavailableDateTo, 'toDate');
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
