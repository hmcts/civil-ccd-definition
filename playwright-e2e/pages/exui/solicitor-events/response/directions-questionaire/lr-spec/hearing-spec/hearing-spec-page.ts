import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, radioButtons, subheadings, inputs, heading } from './hearing-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class HearingSpecPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantParty: Party;

  constructor(page: Page, dateFrament: DateFragment, claimantParty: Party) {
    super(page);
    this.dateFragment = dateFrament;
    this.claimantParty = claimantParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        // super.expectSubheading(subheadings.unavailableDate),
        super.expectText(radioButtons.unavailableDateRequired.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantParty.key) },
    );
  }

  async selectYesUnavailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.yes.selector(this.claimantParty),
    );
  }

  async selectNoUnavailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.no.selector(this.claimantParty),
    );
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.addNewUnavailability.selector(this.claimantParty));
  }

  async selectSingleDate(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selector(this.claimantParty, unavailableDateNumber),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, inputs.singleDate.selectorKey);
  }

  async selectDateRange(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.range.selector(this.claimantParty, unavailableDateNumber),
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
