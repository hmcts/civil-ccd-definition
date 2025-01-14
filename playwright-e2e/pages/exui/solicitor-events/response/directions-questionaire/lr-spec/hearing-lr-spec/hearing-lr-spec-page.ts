import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, inputs, radioButtons } from './hearing-lr-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class HearingLRSpecPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private defendantParty: Party;

  constructor(page: Page, dateFrament: DateFragment, party: Party) {
    super(page);
    this.dateFragment = dateFrament;
    this.defendantParty = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYesAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.yes.selector(this.defendantParty),
    );
  }

  async selectNoAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.no.selector(this.defendantParty),
    );
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.addNewAvailability.selector(this.defendantParty));
  }

  async selectSingleDate(hearingNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selector(this.defendantParty, hearingNumber),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, 'date');
  }

  async selectDateRange(hearingNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.range.selector(this.defendantParty, hearingNumber),
    );
    const unavailableDateFrom = DateHelper.addToToday({ months: 6 });
    const unavailableDateTo = DateHelper.addToToday({ months: 7 });
    await this.dateFragment.enterDate(unavailableDateFrom, 'fromDate');
    await this.dateFragment.enterDate(unavailableDateTo, 'toDate');
  }

  async removeAvailability(hearingNumber: number) {
    await super.clickBySelector(
      buttons.removeAvailability.selector(this.defendantParty, hearingNumber),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
