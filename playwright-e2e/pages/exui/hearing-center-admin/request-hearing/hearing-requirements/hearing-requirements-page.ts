import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, paragraph } from './hearing-requirements-content';

@AllMethodsStep()
export default class HearingRequirementsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
      super.expectText(paragraph, { count: 2 }),
    ]);
  }

  async submit() {
    await super.clickContinue();
  }
}
