import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import ExuiPage from '../../../../exui-page/exui-page';
import { subheadings, tableHeaders, tableRowNames } from './interest-summary-content';

@AllMethodsStep()
export default class InterestSummaryPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.totalAmountOfClaim),
      super.expectText(tableHeaders.description, { exact: true }),
      super.expectText(tableHeaders.amount, { exact: true }),
    ]);
  }

  async verifySmallTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.SMALL_CLAIM)}`;
    // await super.expectTableValueByRowName(tableRowNames.claimAmount, amount);
  }

  async verifyFastTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.FAST_CLAIM)}`;
    // await super.expectTableValueByRowName(tableRowNames.claimAmount, amount);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
