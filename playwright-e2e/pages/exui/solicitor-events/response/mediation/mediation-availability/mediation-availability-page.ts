import { Page } from 'playwright-core';
import { Party } from '../../../../../../models/partys.ts';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  subheadings,
  paragraphs,
  radioButtons,
  buttons,
  inputs,
} from './mediation-availability-content.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import DateFragment from '../../../../fragments/date/date-fragment.ts';

@AllMethodsStep()
export default class MediationAvailabilityPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantDefendantParty: Party;

  constructor(page: Page, dateFragment: DateFragment, claimantDefendantParty: Party) {
    super(page);
    this.dateFragment = dateFragment;
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(subheadings.mediationAvailability),
      super.expectText(paragraphs.descriptionText),
      super.expectText(radioButtons.mediationAvailability.label),
      super.expectText(radioButtons.mediationAvailability.hintText),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(
      radioButtons.mediationAvailability.yes.selector(this.claimantDefendantParty),
    );
  }

  async selectNo() {
    await super.clickBySelector(
      radioButtons.mediationAvailability.no.selector(this.claimantDefendantParty),
    );
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.addNew.selector(this.claimantDefendantParty));
    await super.expectSubheading(subheadings.unavailableDates);
  }

  async selectSingleDate(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 1 });
    await this.dateFragment.enterDate(unavailableDate, inputs.singleDate.selectorPrefix);
  }

  async selectDateRange(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.range.selector(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDateFrom = DateHelper.addToToday({ months: 1 });
    const unavailableDateTo = DateHelper.addToToday({ months: 2 });
    await this.dateFragment.enterDate(unavailableDateFrom, inputs.dateFrom.selectorPrefix);
    await this.dateFragment.enterDate(unavailableDateTo, inputs.dateTo.selectorPrefix);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
