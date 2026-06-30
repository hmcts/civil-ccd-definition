import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, inputs, radioButtons } from './hearing-timing-content';

@AllMethodsStep()
export default class HearingTimingPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
    ]);
  }

  async enterHearingLength() {
    await super.inputText(
      inputs.lengthOfHearing.hours.value1,
      inputs.lengthOfHearing.hours.selector,
    );
  }

  async updateHearingLength() {
    await super.expectText(heading, { exact: false });
    await super.inputText(
      inputs.lengthOfHearing.hours.value2,
      inputs.lengthOfHearing.hours.selector,
    );
  }

  async selectHearingDate() {
    await super.expectText(radioButtons.specificDate.label);
    await super.clickBySelector(radioButtons.specificDate.no.selector);
  }

  async selectHearingPriority() {
    await super.expectText(radioButtons.priorityOfHearing.label);
    await super.clickBySelector(radioButtons.priorityOfHearing.standard.selector);
  }

  async submit() {
    await super.clickContinue();
  }
}
