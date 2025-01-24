import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { Page } from 'playwright-core';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import partys from '../../../../../../../constants/partys.ts';
import { ClaimantDefendantPartyType } from '../../../../../../../models/claimant-defendant-party-types.ts';
import { inputs } from './confirm-details-content.ts';

@AllMethodsStep()
export default class ConfirmDetailsPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(inputs.dateOfBirth.label, { index: 0 }),
    ]);
  }

  //Need to decide how I am going to pass partyType Data, could be pass by ccdCaseData or store a reference in test data.
  async enterDefendantDateOfBirth(partyType: ClaimantDefendantPartyType) {
    await this.dateFragment.enterDateOfBirth(partys.DEFENDANT_1, partyType);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
