import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import ExuiPage from '../../../../exui-page/exui-page';
import { tableHeadings } from './claim-amount-details-content';
import partys from '../../../../../../constants/partys';

@AllMethodsStep()
export default class ClaimAmountDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(tableHeadings.description, { ignoreDuplicates: true }),
      super.expectText(tableHeadings.amount, { ignoreDuplicates: true }),
    ]);
  }

  async verifySmallTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.SMALL_CLAIM).toFixed(2)}`;
    await super.expectDataCellValue(amount, { first: true });
  }

  async verifyFastTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.FAST_CLAIM).toFixed(2)}`;
    await super.expectDataCellValue(amount, { first: true });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
