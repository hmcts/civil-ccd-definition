import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import DateFragment from '../../../../fragments/date/date-fragment.ts';
import { Page } from 'playwright-core';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types.ts';
import partys from '../../../../../../constants/partys.ts';
import { inputs, heading } from './confirm-name-and-address-content.ts';

@AllMethodsStep()
export default class ConfirmNameAndAddress1v2Page extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(ccdCaseData.id),
      super.expectHeading(ccdCaseData.caseNamePublic),
      this.dateFragment.verifyContent(),
      super.expectText(inputs.dateOfBirth.label, { count: 2 }),
    ]);
  }

  async enterDefendant1DateOfBirth(partyType: ClaimantDefendantPartyType) {
    await this.dateFragment.enterDateOfBirth(partys.DEFENDANT_1, partyType, 0);
  }

  async enterDefendant2DateOfBirth(partyType: ClaimantDefendantPartyType) {
    await this.dateFragment.enterDateOfBirth(partys.DEFENDANT_2, partyType, 1);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
