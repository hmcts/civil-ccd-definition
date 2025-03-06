import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import DateOfBirthFragment from '../../../../fragments/date/date-of-birth-fragment.ts';
import { Page } from 'playwright-core';
import { ClaimantDefendantPartyType } from '../../../../../../models/claimant-defendant-party-types.ts';
import partys from '../../../../../../constants/partys.ts';
import { inputs, heading } from './confirm-name-and-address-content.ts';

@AllMethodsStep()
export default class ConfirmNameAndAddressPage extends ExuiPage(BasePage) {
  private dateOfBirthFragment: DateOfBirthFragment;

  constructor(page: Page, dateOfBirthFragment: DateOfBirthFragment) {
    super(page);
    this.dateOfBirthFragment = dateOfBirthFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(ccdCaseData.id),
      super.expectHeading(ccdCaseData.caseNamePublic),
      super.expectText(inputs.dateOfBirth.label, { count: 1 }),
    ]);
  }

  //Need to decide how I am going to pass partyType Data, could be pass by ccdCaseData or store a reference in test data.
  async enterDefendantDateOfBirth(partyType: ClaimantDefendantPartyType) {
    await this.dateOfBirthFragment.enterDate(partys.DEFENDANT_1, partyType);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
