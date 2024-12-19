import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  radioButtons,
  radioButtonsMultiparty,
  complexityBandAgreedButtons,
  complexityBandButtons,
  reasonInput,
} from './fixed-recoverable-costs-content.ts';

@AllMethodsStep()
export default class FixedRecoverableCostsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.retryClickBySelector(radioButtons.yes.selector, () => Promise.resolve(), {
      retries: 2,
    });
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async selectYesMultiparty(defendantNumber: number) {
    await super.clickBySelector(radioButtonsMultiparty(defendantNumber).yes.selector);
  }

  async selectNoMultiparty(defendantNumber: number) {
    await super.clickBySelector(radioButtonsMultiparty(defendantNumber).no.selector);
  }

  async selectBand(defendantNumber: number, bandNumber: number) {
    await super.clickBySelector(complexityBandButtons(defendantNumber, bandNumber).band.selector);
  }

  async selectcomplexityBandAgreedButtonYes(defendantNumber: number) {
    await super.clickBySelector(complexityBandAgreedButtons(defendantNumber).yes.selector);
  }

  async selectcomplexityBandAgreedButtonNo(defendantNumber: number) {
    await super.clickBySelector(complexityBandAgreedButtons(defendantNumber).no.selector);
  }

  async enterReason(defendantNumber: number) {
    await super.inputText('reason', reasonInput(defendantNumber).selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
