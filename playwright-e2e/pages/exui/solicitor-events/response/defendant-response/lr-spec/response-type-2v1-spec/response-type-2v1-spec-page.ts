import BasePage from '../../../../../../../base/base-page.ts';
import partys from '../../../../../../../constants/partys.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { radioButtons } from './response-type-2v1-spec-content.ts';

@AllMethodsStep()
export default class ResponseType2v1SpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(radioButtons.fullDefence.label, { count: 2 }),
      super.expectLabel(radioButtons.fullDefence.label, { count: 2 }),
      super.expectLabel(radioButtons.fullDefence.label, { count: 2 }),
      super.expectLabel(radioButtons.fullDefence.label, { count: 2 }),
    ]);
  }

  async selectFullDefenceBothClaimants() {
    await super.clickBySelector(radioButtons.fullDefence.selector(partys.CLAIMANT_1));
    await super.clickBySelector(radioButtons.fullDefence.selector(partys.CLAIMANT_2));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
