import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { inputs, radioButtons } from './not-suitable-sdo-content';

@AllMethodsStep()
export default class NotSuitableSDOPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLegend(radioButtons.reason.label),
      super.expectRadioYesLabel(radioButtons.reason.anotherHearingCentre.selector),
      super.expectRadioNoLabel(radioButtons.reason.otherReason.selector),
    ]);
  }

  async selectAnotherHearingCentre() {
    await super.clickBySelector(radioButtons.reason.anotherHearingCentre.selector);
    await super.expectLabel(inputs.anotherHearingCentre.label);
    await super.expectText(inputs.anotherHearingCentre.paragraph1);
    await super.expectText(inputs.anotherHearingCentre.paragraph2);
    await super.inputText('Details here', inputs.anotherHearingCentre.selector);
  }

  async selectOtherReason() {
    await super.clickBySelector(radioButtons.reason.otherReason.selector);
    await super.expectLabel(inputs.otherReason.label);
    await super.expectText(inputs.otherReason.paragraph1);
    await super.expectText(inputs.otherReason.paragraph2);
    await super.expectText(inputs.otherReason.paragraph3);
    await super.inputText('Other reason here', inputs.otherReason.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
