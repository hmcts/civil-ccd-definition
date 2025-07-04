import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import { heading, radioButtons, inputs } from './create-case-flags-flag-type-party-content';

@AllMethodsStep()
export default class CreateCaseFlagsFlagTypePartyPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectLabel(radioButtons.specialMeasure.label),
      super.expectLabel(radioButtons.adjustment.label),
      super.expectLabel(radioButtons.vulnerable.label),
      super.expectLabel(radioButtons.confidential.label),
      super.expectLabel(radioButtons.behaviour.label),
      super.expectLabel(radioButtons.vexatious.label),
      super.expectLabel(radioButtons.restraint.label),
      super.expectLabel(radioButtons.banningOrder.label),
      super.expectLabel(radioButtons.evidence.label),
      super.expectLabel(radioButtons.interpreter.label),
      super.expectLabel(radioButtons.death.label),
      super.expectLabel(radioButtons.litigationFriend.label),
      super.expectLabel(radioButtons.lackingCapacity.label),
      super.expectLabel(radioButtons.detained.label),
      super.expectLabel(radioButtons.other.label),
    ]);
  }

  async selectSpecialMeasure() {
    await super.clickByLabel(radioButtons.specialMeasure.label);
  }

  async selectOther() {
    await super.clickByLabel(radioButtons.other.label);
    await super.inputText('New flag type', inputs.other.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
