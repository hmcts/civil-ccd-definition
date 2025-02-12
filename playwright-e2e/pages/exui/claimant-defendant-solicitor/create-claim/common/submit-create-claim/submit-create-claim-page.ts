import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';

@AllMethodsStep()
export default class SubmitCreateClaimPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([super.verifyHeadings()]);
    await super.expectTableValueByRowName('Claimant type', 'Individual', {
      index: 1,
      valueIndex: 0,
    });
    await super.expectTableValueByRowName(
      "Claimant's legal representative's reference",
      'Solicitor Reference - claimant1',
      { index: 0, valueIndex: 1 },
    );
    await super.expectTableValueByRowName('Phone', '07123456789', { index: 0, valueIndex: 7 });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
