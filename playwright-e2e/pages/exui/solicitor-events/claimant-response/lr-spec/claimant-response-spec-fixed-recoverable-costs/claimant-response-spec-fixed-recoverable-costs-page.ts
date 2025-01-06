import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  subHeadings,
  complexityBandForm,
} from './claimant-response-spec-fixed-recoverable-costs-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecFixedRecoverableCostsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(subHeadings.heading2, { first: true }),
      super.expectText(complexityBandForm.text, { first: true }),
    ]);
  }

  async selectYesDetermineComplexityBand() {
    await super.clickBySelector(complexityBandForm.recoverableCostRegimeRadioYes.selector);
  }

  async verifyContentComplexityBand() {
    await super.runVerifications([
      super.expectText(complexityBandForm.bandText, { first: true }),
      super.expectText(complexityBandForm.band1.text, { first: true }),
      super.expectText(complexityBandForm.band2.text, { first: true }),
      super.expectText(complexityBandForm.band3.text, { first: true }),
      super.expectText(complexityBandForm.band4.text, { first: true }),
      super.expectText(complexityBandForm.complexityBandingAgreed.text, { first: true }),
    ]);
  }

  async selectBand() {
    await super.clickBySelector(complexityBandForm.band2.selector);
    await super.clickBySelector(complexityBandForm.complexityBandingAgreed.radioYes.selector);
    await super.inputText('The other party agreed', complexityBandForm.textBox.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
