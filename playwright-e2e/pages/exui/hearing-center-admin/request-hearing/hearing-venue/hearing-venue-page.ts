import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, link } from './hearing-venue-content';

@AllMethodsStep()
export default class HearingVenuePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
      super.expectLink(link, { exact: false }),
    ]);
  }

  async submit() {
    await super.clickContinue();
  }
}
