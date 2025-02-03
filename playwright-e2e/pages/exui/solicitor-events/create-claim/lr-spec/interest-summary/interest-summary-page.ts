import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ClaimTrack from '../../../../../../enums/claim-track';
import CaseDataHelper from '../../../../../../helpers/case-data-helper';
import ExuiPage from '../../../../exui-page/exui-page';
import { subheadings, tableHeadings } from './interest-summary-content';
import partys from '../../../../../../constants/partys';

@AllMethodsStep()
export default class InterestSummaryPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subheadings.totalAmountOfClaim),
      super.expectText(tableHeadings.description, { exact: true }),
      super.expectText(tableHeadings.amount, { exact: true }),
    ]);
  }

  async verifySmallTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.SMALL_CLAIM)}`;
    await super.expectTableRowValueByName(`Claim amount`, amount);
    await super.expectDataCellValue(amount, { first: true });
  }

  async verifyFastTrack() {
    const amount = `£ ${CaseDataHelper.getClaimValue(ClaimTrack.FAST_CLAIM)}`;
    await super.expectTableRowValueByName(`Claim amount`, amount);
    await super.expectDataCellValue(amount, { first: true });
  }

  async submit() {
    await super.clickSubmit();
  }
}
