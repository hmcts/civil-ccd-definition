import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { inputs } from './payment-set-date-content.ts';
import DateFragment from '../../../../fragments/date/date-fragment';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import partys from '../../../../../../constants/partys.ts';
import CaseDataHelper from '../../../../../../helpers/case-data-helper.ts';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types.ts';

@AllMethodsStep()
export default class PaymentSetDatePage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  async verifyContent(ccdCaseData: CCDCaseData, defendantPartyType: ClaimantDefendantPartyType) {
    const defendantData = CaseDataHelper.buildClaimantAndDefendantData(
      partys.DEFENDANT_1,
      defendantPartyType,
    );
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectSubheading(defendantData.partyName),
    ]);
  }

  async setPaymentDate() {
    const setDate = DateHelper.addToToday({ months: 1 });
    await this.dateFragment.enterDate(setDate, inputs.paymentSetDate.selectorKey);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
