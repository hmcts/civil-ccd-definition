import { Page } from 'playwright-core';
import Party from '../../../../../../../enums/party.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  getButtons,
  getInputs,
  getRadioButtons,
} from './small-claim-hearing-availability-content.ts';

@AllMethodsStep()
export default class SmallClaimHearingAvailabilityPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectYesAvailability() {
    await super.clickBySelector(getRadioButtons.availability.radioYes.selector(this.party));
  }

  async selectNoAvailability() {
    await super.clickBySelector(getRadioButtons.availability.radioNo.selector(this.party));
  }

  async selectYesInterpreter() {
    await super.clickBySelector(getRadioButtons.interpreter.radioYes.selector);
  }

  async selectNoInterpreter() {
    await super.clickBySelector(getRadioButtons.interpreter.radioNo.selector);
  }

  async addNew() {
    await super.clickBySelector(getButtons.addNewAvailability.selector(this.party));
  }

  async selectSingleDate(hearingNumber: number) {
    await super.clickBySelector(
      getRadioButtons.availabilityOptions.single.selector(this.party, hearingNumber),
    );
  }

  async inputSingleDate() {
    await super.inputText('01', getInputs.unavailableSingleDate.day.selector);
    await super.inputText('01', getInputs.unavailableSingleDate.month.selector);
    await super.inputText('2025', getInputs.unavailableSingleDate.year.selector);
  }

  async selectDateRange(hearingNumber: number) {
    await super.clickBySelector(
      getRadioButtons.availabilityOptions.range.selector(this.party, hearingNumber),
    );
  }

  async inputDateRange() {
    await super.inputText('01', getInputs.unavailableDateRange.dateFrom.day.selector);
    await super.inputText('01', getInputs.unavailableDateRange.dateFrom.month.selector);
    await super.inputText('2025', getInputs.unavailableDateRange.dateFrom.year.selector);
    await super.inputText('01', getInputs.unavailableDateRange.dateTo.day.selector);
    await super.inputText('01', getInputs.unavailableDateRange.dateTo.month.selector);
    await super.inputText('2025', getInputs.unavailableDateRange.dateTo.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
    await super.retryClickSubmit();
  }
}
