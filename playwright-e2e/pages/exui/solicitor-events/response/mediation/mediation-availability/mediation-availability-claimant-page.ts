import { Page } from 'playwright-core';
import { Party } from '../../../../../../models/partys.ts';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  subHeading,
  content,
  radioButtons,
  buttons,
  inputFields,
} from './mediation-availability-content.ts';
import StringHelper from '../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class MediationAvailabilityClaimantPage extends ExuiPage(BasePage) {
  private claimantParty: Party;

  constructor(page: Page, claimantParty: Party) {
    super(page);
    this.claimantParty = claimantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectHeading(heading.claimant.label),
        super.expectSubheading(subHeading),
        super.expectText(content.paragraph1.label),
        super.expectText(radioButtons.mediationAvailability.label),
        super.expectText(radioButtons.mediationAvailability.yes.label),
        super.expectText(radioButtons.mediationAvailability.no.label, { exact: true }),
        super.expectText(buttons.previous.label),
        super.expectText(buttons.submit.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantParty.key) },
    );
  }

  async selectYes() {
    await super.clickBySelector(
      radioButtons.mediationAvailability.yes.selector(this.claimantParty),
    );
    await super.expectSubheading(inputFields.singleDate.parentLabel, { ignoreDuplicates: true });
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.mediationAvailability.no.selector(this.claimantParty));
  }

  async selectSingleDate() {
    await super.clickBySelector(
      radioButtons.addSingleDateOrDateRange.singleDate.selector(this.claimantParty),
    );
  }

  async selectDateRange() {
    await super.clickBySelector(
      radioButtons.addSingleDateOrDateRange.dateRange.selector(this.claimantParty),
    );
  }

  async enterSingleDate() {
    await this.addNewTop();
    await super.clickBySelector(
      radioButtons.addSingleDateOrDateRange.singleDate.selector(this.claimantParty),
    );

    const { dayString, monthString, yearString } = await this.getNextWeekday(0);

    await super.inputText(dayString, inputFields.singleDate.day.selector);
    await super.inputText(monthString, inputFields.singleDate.month.selector);
    await super.inputText(yearString, inputFields.singleDate.year.selector);
  }

  async enterDateRange() {
    await this.addNewTop();
    await super.clickBySelector(
      radioButtons.addSingleDateOrDateRange.dateRange.selector(this.claimantParty),
    );
    //Have to repeat as EXUI is not able to click on the radio button
    await super.clickBySelector(
      radioButtons.addSingleDateOrDateRange.dateRange.selector(this.claimantParty),
    );

    const {
      dayString: dayStringDateFrom,
      monthString: monthStringDateFrom,
      yearString: yearStringDateFrom,
    } = await this.getNextWeekday(0);
    const {
      dayString: dayStringDateTo,
      monthString: monthStringDateTo,
      yearString: yearStringDateTo,
    } = await this.getNextWeekday(7);

    await super.inputText(dayStringDateFrom, inputFields.dateRange.dateFrom.day.selector);
    await super.inputText(monthStringDateFrom, inputFields.dateRange.dateFrom.month.selector);
    await super.inputText(yearStringDateFrom, inputFields.dateRange.dateFrom.year.selector);

    await super.inputText(dayStringDateTo, inputFields.dateRange.dataTo.day.selector);
    await super.inputText(monthStringDateTo, inputFields.dateRange.dataTo.month.selector);
    await super.inputText(yearStringDateTo, inputFields.dateRange.dataTo.year.selector);
  }

  async addNewTop() {
    await super.clickBySelector(buttons.addNewTop.selector);
  }

  async addNewBottom() {
    await super.clickBySelector(buttons.addNewBottom.selector);
  }

  async remove() {
    await super.clickBySelector(buttons.remove.selector);
  }

  async previous() {
    await super.clickBySelector(buttons.previous.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }

  private async getNextWeekday(num: number) {
    const today = new Date();
    let day = today.setDate(today.getDate() + num);

    while (day === 0 || day === 6) {
      // 0 is Sunday, 6 is Saturday
      today.setDate(today.getDate() + 1);
      day = today.getDay();
    }

    return {
      dayString: String(today.getDate()),
      monthString: String(today.getMonth() + 1),
      yearString: String(today.getFullYear()),
    };
  }
}
