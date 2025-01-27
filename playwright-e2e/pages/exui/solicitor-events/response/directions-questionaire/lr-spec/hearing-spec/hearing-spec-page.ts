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
export default class HearingSpecPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private claimantDefendantParty: Party;

  constructor(page: Page, dateFragment: DateFragment, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(radioButtons.unavailableDateRequired.label),
    ]);
  }

  async verifyContentFasTrack1v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(radioButtons.unavailableDateRequired.label1v1FastTrack),
    ]);
  }


  async selectYesAvailabilityRequiredFastTrack1v1() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.yes.selectorFastTrack1v1(this.claimantDefendantParty),
    );
  }

  async selectNoAvailabilityRequired() {
    await super.clickBySelector(
      radioButtons.unavailableDateRequired.no.selector(this.claimantDefendantParty),
    );
  }

  async addNewUnavailableDateFastTrack() {
    await super.clickBySelector(buttons.addNewAvailability.selector1v1FastTrack(this.claimantDefendantParty));
    await super.expectSubheading(subheadings.unavailableDate, {ignoreDuplicates:true});
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


  async selectSingleDateFastTrack(unavailableDateNumber: number) {
    await super.clickBySelector(
      radioButtons.unavailableDateType.single.selector1v1FastTrack(
        this.claimantDefendantParty,
        unavailableDateNumber,
      ),
    );
    const unavailableDate = DateHelper.addToToday({ months: 6 });
    await this.dateFragment.enterDate(unavailableDate, 'date');
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

  async submit() {
    await super.retryClickSubmit();
  }
}
