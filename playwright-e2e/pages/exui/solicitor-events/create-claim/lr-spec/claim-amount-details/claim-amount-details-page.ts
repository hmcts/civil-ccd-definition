import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import ExuiPage from '../../../../exui-page/exui-page';
import { tableHeaders } from './claim-amount-details-content';
import partys from '../../../../../../constants/partys';

@AllMethodsStep()
export default class ClaimAmountDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(tableHeaders.description, { ignoreDuplicates: true }),
      super.expectText(tableHeaders.amount, { ignoreDuplicates: true }),
    ]);
  }

  async verifySmallTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.SMALL_CLAIM).toFixed(2)}`;
    await super.expectTableRowValueByName(`Roof damage - ${partys.CLAIMANT_1.key}`, amount);
    await super.expectDataCellValue(amount, { first: true });
  }

  async verifyFastTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.FAST_CLAIM).toFixed(2)}`;
    await super.expectTableRowValueByName(`Roof damage - ${partys.CLAIMANT_1.key}`, amount);
    await super.expectDataCellValue(amount, { first: true });
  }

  async submit() {
    await super.clickSubmit();
  }
}
