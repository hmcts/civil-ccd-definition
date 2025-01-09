import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons } from './response-type-2v1-spec-content.ts';

@AllMethodsStep()
export default class ResponseType2v1SpecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(getRadioButtons(1).fullDefence.label, { count: 2 }),
      super.expectLabel(getRadioButtons(1).fullDefence.label, { count: 2 }),
      super.expectLabel(getRadioButtons(1).fullDefence.label, { count: 2 }),
      super.expectLabel(getRadioButtons(1).fullDefence.label, { count: 2 }),
    ]);
  }

  async selectFullDefenceBothClaimants() {
    await super.clickBySelector(getRadioButtons(1).fullDefence.selector);
    await super.clickBySelector(getRadioButtons(2).fullDefence.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
