import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, radioButtons } from './hearing-stage-content';

@AllMethodsStep()
export default class HearingStagePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
    ]);
  }

  async selectStage() {
    await super.clickBySelector(radioButtons.disposalHearing.selector);
  }

  async submit() {
    await super.clickContinue();
  }
}
