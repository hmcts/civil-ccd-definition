import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, inputs } from './hearing-additional-instructions-content';

@AllMethodsStep()
export default class HearingAdditionalInstructionsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
    ]);
  }

  async enterAdditionalInstructions() {
    await super.inputText(
      inputs.additionalInstructions.initialText,
      inputs.additionalInstructions.selector,
    );
  }

  async enterUpdatedInstructions() {
    await super.inputText(
      inputs.additionalInstructions.updatedText,
      inputs.additionalInstructions.selector,
    );
  }

  async submit() {
    await super.clickContinue();
  }
}
