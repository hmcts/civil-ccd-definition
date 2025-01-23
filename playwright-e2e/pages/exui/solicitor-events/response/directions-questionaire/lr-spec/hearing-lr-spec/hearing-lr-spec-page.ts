import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, radioButtons, subheadings, inputs } from './hearing-lr-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class HearingLRSpecPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantDefendantParty: Party;

  constructor(page: Page, dateFrament: DateFragment, claimantDefendantParty: Party) {
    super(page);
    this.dateFragment = dateFrament;
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.availability),
        super.expectText(radioButtons.unavailableDateRequired.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async selectYesAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.yes.selector(this.claimantDefendantParty),
    );
  }

  async selectNoAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.no.selector(this.claimantDefendantParty),
    );
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.addNewAvailability.selector(this.claimantDefendantParty));
    await super.expectSubheading(subheadings.unavailableDate);
  }

  async selectSingleDate(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, inputs.singleDate.selectorKey);
  }

  async selectDateRange(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.range.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDateFrom = DateHelper.addToToday({ months: 6 });
    const unavailableDateTo = DateHelper.addToToday({ months: 7 });
    await this.dateFragment.enterDate(unavailableDateFrom, inputs.dateFrom.selectorKey);
    await this.dateFragment.enterDate(unavailableDateTo, inputs.dateTo.selectorKey);
  }

  async removeAvailability(unavailableDateNumber: number) {
    await super.clickBySelector(
      buttons.removeAvailability.selector(this.claimantDefendantParty, unavailableDateNumber),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
