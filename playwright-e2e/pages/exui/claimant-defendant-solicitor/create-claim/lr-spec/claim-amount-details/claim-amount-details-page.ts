import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import ExuiPage from '../../../../exui-page/exui-page';
import { tableHeaders } from './claim-amount-details-content';

@AllMethodsStep()
export default class ClaimAmountDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(tableHeaders.description, { exact: true }),
      super.expectText(tableHeaders.amount, { exact: true }),
    ]);
  }

  async verifySmallTrack() {
    const amount = CaseDataHelper.getClaimValue(ClaimTrack.SMALL_CLAIM);
  }

  async verifyFastTrack() {
    const amount = CaseDataHelper.getClaimValue(ClaimTrack.FAST_CLAIM);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
