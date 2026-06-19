import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { getFormattedCaseId } from '../../../exui-page/exui-content';
import { headings, radioButtons } from './multiple-claimant-content';

@AllMethodsStep()
export default class MultipleClaimantPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(headings.discontinueThisClaim),
      super.expectHeading(headings.whoIsDiscontinuing),
      super.expectHeading(getFormattedCaseId(ccdCaseData?.id!), { exact: false }),
      super.expectHeading(ccdCaseData?.caseNamePublic!, { exact: false }),
      super.expectLabel(radioButtons.claimantWhoIsDiscontinuing.label),
      super.expectLabel(radioButtons.claimantWhoIsDiscontinuing.both),
    ]);
  }

  async selectBoth() {
    await super.clickByLabel(radioButtons.claimantWhoIsDiscontinuing.both);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
