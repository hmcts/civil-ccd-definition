import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { buttons, inputs, radioButtons, subheadings } from './hearing-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class HearingPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantDefendantParty: Party;

  constructor(page: Page, dateFragment: DateFragment, claimantDefendantParty: Party) {
    super(page);
    this.dateFragment = dateFragment;
    this.claimantDefendantParty = claimantDefendantParty;
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.availability, {index:0}),
      super.expectText(radioButtons.unavailableDateRequired.label, {index:0}),
    ]);
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
    await super.expectSubheading(subheadings.unavailableDate, {index:0});
  }

  async selectSingleDateFastClaim(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.singleFastClaim.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, inputs.singleDate.selectorKey);
  }

  async selectSingleDateSmallClaim(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.singleSmallClaim.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, 'date');
  }


  async selectDateRangeFastClaim(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.rangeFastClaim.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDateFrom = DateHelper.addToToday({ months: 6 });
    const unavailableDateTo = DateHelper.addToToday({ months: 7 });
    await this.dateFragment.enterDate(unavailableDateFrom, 'fromDate');
    await this.dateFragment.enterDate(unavailableDateTo, 'toDate');
  }

  async selectDateRangeSmallClaim(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.rangeSmallClaim.selector(
        this.claimantDefendantParty,
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
  }
}
