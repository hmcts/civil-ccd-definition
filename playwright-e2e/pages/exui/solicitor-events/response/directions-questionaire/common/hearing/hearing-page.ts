import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import Party from "../../../../../../../enums/party.ts";
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  heading,
  getAvailabilityQuestionSmallTrack,
  interpreterQuestion,
  getAvailabilityQuestionFastTrack,
  getAvailabilityQuestionSmallTrack1v2,
  getAvailabilityQuestionUnspecandSpec2v1,
  interpreterQuestion1v2,
  getButtons,
  getSingleDateOrDateRangeRadioButton,
  unavailableDateRange,
  unavailableSingleDate,
  getSingleDateOrDateRangeRadioButtonSmallClaims,
} from './hearing-content.ts';

@AllMethodsStep()
export default class HearingPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData){
  await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
}

  async selectYesAvailabilitySmallTrack() {
    await super.clickBySelector(getAvailabilityQuestionSmallTrack(this.party).radioYes.selector);
  }

  async selectNoAvailabilitySmallTrack() {
    await super.clickBySelector(getAvailabilityQuestionSmallTrack(this.party).radioNo.selector);
  }

  async selectYesAvailabilityUnspecandSpec2v1() {
    await super.clickBySelector(getAvailabilityQuestionUnspecandSpec2v1(this.party).radioYes.selector,
    );
  }

  async selectNoAvailabilityUnspecandSpec2v1() {
    await super.clickBySelector(
      getAvailabilityQuestionUnspecandSpec2v1(this.party).radioNo.selector,
    );
  }

  async selectYesInterpreterSmallTrack() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async selectNoInterpreterSmallTack() {
    await super.clickBySelector(interpreterQuestion.radioNo.selector);
  }

  async selectYesAvailabilityFastTrack() {
    await super.clickBySelector(getAvailabilityQuestionFastTrack(this.party).radioYes.selector);
  }

  async selectNoAvailabilityFastTrack() {
    await super.clickBySelector(getAvailabilityQuestionFastTrack(this.party).radioNo.selector);
  }

  async selectYesInterpreterFastTrack() {
    await super.clickBySelector(interpreterQuestion.radioYes.selector);
  }

  async selectNoInterpreterFastTrack() {
    await super.clickBySelector(interpreterQuestion.radioNo.selector);
  }

  async selectYesAvailabilitySmallTrack1v2() {
    await super.clickBySelector(getAvailabilityQuestionSmallTrack1v2(this.party).radioYes.selector);
  }

  async selectNoAvailabilitySmallTrack1v2() {
    await super.clickBySelector(getAvailabilityQuestionSmallTrack1v2(this.party).radioNo.selector);
  }

  async selectYesInterpreterSmallTrack1v2() {
    await super.clickBySelector(interpreterQuestion1v2.radioYes.selector);
  }

  async selectNoInterpreterSmallTack1v2() {
    await super.clickBySelector(interpreterQuestion1v2.radioNo.selector);
  }

  async addNew() {
    await super.clickBySelector(getButtons(this.party).addNewAvailability.selector);
  }

  async selectSingleDateSmallClaims(hearingNumber: number) {
    await super.clickBySelector(
      getSingleDateOrDateRangeRadioButtonSmallClaims(this.party, hearingNumber).options.single
        .selector,
    );
  }

  async selectSingleDate( hearingNumber: number) {
    await super.clickBySelector(
      getSingleDateOrDateRangeRadioButton(this.party, hearingNumber).options.single.selector,
    );
  }

  async inputSingleDate() {
    await super.inputText('01', unavailableSingleDate.day.selector);
    await super.inputText('01', unavailableSingleDate.month.selector);
    await super.inputText('2025', unavailableSingleDate.year.selector);
  }

  async selectDateRangeSmallCliams(hearingNumber: number) {
    await super.clickBySelector(
      getSingleDateOrDateRangeRadioButtonSmallClaims(this.party, hearingNumber).options.range
        .selector,
    );
  }

  async selectDateRange(hearingNumber: number) {
    await super.clickBySelector(
      getSingleDateOrDateRangeRadioButton(this.party, hearingNumber).options.range.selector,
    );
  }

  async inputDateRange() {
    await super.inputText('01', unavailableDateRange.dateFrom.day.selector);
    await super.inputText('01', unavailableDateRange.dateFrom.month.selector);
    await super.inputText('2025', unavailableDateRange.dateFrom.year.selector);
    await super.inputText('01', unavailableDateRange.dateTo.day.selector);
    await super.inputText('01', unavailableDateRange.dateTo.month.selector);
    await super.inputText('2025', unavailableDateRange.dateTo.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
    await super.retryClickSubmit();
  }
}
