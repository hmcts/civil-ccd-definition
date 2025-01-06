import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  headings,
  unavailableDateRadioForm,
  subHeadings,
  navigationButtons,
  selectSingleUnavailableDate,
} from './claimant-response-spec-hearing-content.ts';
import {
  containers,
  legend,
  paragraph,
} from '../claimant-respondent-spec-respondent-response/claimant-response-spec-respondent-response-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecHearingPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      // super.verifyHeadings(ccdCaseData),
      super.expectHeading(headings.heading1),
      super.expectText(unavailableDateRadioForm.paragraph, { first: true }),
      super.expectText(unavailableDateRadioForm.hint),
    ]);
  }

  async unavailableDateSelectYes() {
    await super.clickBySelector(unavailableDateRadioForm.radioYes.selector);
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(unavailableDateRadioForm.addNewUnavailableDate.selector);
    await super.clickBySelector(selectSingleUnavailableDate.singleDate.selector);
  }

  async fillUnavailableSingleDate() {
    await super.inputText('05', selectSingleUnavailableDate.day.selector);
    await super.inputText('06', selectSingleUnavailableDate.month.selector);
    await super.inputText('2025', selectSingleUnavailableDate.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
    await super.retryClickSubmit();
  }
  async verifyContentUnspec(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(headings.heading1, { first: true }),
        super.expectText(unavailableDateRadioForm.paragraphUnspec, { first: true }),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContentFastTrack(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(headings.heading1),
        super.expectText(unavailableDateRadioForm.paragraphFastTrack),
      ],
      { useAxeCache: true },
    );
  }
  async unavailableDateUnspecSelectYes() {
    await super.clickBySelector(unavailableDateRadioForm.radioYes.selectorUnspec);
  }

  async addNewUnavailableDateUnspec() {
    await super.clickBySelector(unavailableDateRadioForm.addNewUnavailableDate.selectorUnspec);
    await super.clickBySelector(selectSingleUnavailableDate.singleDate.selectorUnspec);
  }

  async unavailableDateFastTrackSelectYes() {
    await super.clickBySelector(unavailableDateRadioForm.radioYes.selectorFastTrack);
  }

  async addNewUnavailableDateFastTrack() {
    await super.clickBySelector(unavailableDateRadioForm.addNewUnavailableDate.selectorFastTrack);
    await super.clickBySelector(selectSingleUnavailableDate.singleDate.selectorFastTrack);
  }
}
