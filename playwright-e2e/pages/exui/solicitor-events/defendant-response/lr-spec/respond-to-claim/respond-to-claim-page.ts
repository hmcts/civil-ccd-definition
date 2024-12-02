import { ccdData } from '../../../../../../../e2e/tests/unit/utils/dataProvider.js';
import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, radioButtons } from './respond-to-claim-content.ts';

@AllMethodsStep()
export default class RespondToClaimPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      //super.expectText(radioButtons.text.label()),
      super.expectText(radioButtons.defends.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.admitsAll.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.admitsPart.label, { ignoreDuplicates: true }),
      super.expectText(radioButtons.defendsAndWantsCounterclaim.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectDefends() {
    await super.clickBySelector(radioButtons.defends.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
