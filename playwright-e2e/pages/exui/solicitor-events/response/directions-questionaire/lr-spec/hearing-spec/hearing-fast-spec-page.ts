import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, heading, radioButtons, subheadings, inputs } from './hearing-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class HearingFastSpecPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantParty: Party;

  constructor(page: Page, dateFragment: DateFragment, claimantParty: Party) {
    super(page);
    this.claimantParty = claimantParty;
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectText(radioButtons.unavailableDateRequired.labelFast),
    ]);
  }

  async selectYesUnavailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.yes.selectorFast(this.claimantParty),
    );
  }

  async selectNoUnavailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.no.selectorFast(this.claimantParty),
    );
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.addNewUnavailability.selectorFast(this.claimantParty));
    await super.expectSubheading(subheadings.unavailableDate, { ignoreDuplicates: true });
  }

  async selectSingleDate(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selectorFast(
        this.claimantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, inputs.singleDate.selectorKey);
  }

  async selectSingleDateFastTrack(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selectorFast(
        this.claimantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, 'date');
  }

  async selectDateRange(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.range.selectorFast(
        this.claimantParty,
        unavailableDateNumber,
      ),
    );

    const unavailableDateFrom = DateHelper.addToToday({ months: 6 });
    const unavailableDateTo = DateHelper.addToToday({ months: 7 });
    await this.dateFragment.enterDate(unavailableDateFrom, inputs.dateFrom.selectorKey);
    await this.dateFragment.enterDate(unavailableDateTo, inputs.dateTo.selectorKey);
  }

  async submit() {
    await super.retryClickSubmit();
    await super.retryClickSubmit();
  }
}
