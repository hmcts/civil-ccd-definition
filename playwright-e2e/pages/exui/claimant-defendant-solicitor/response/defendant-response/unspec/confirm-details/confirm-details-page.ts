import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import { Page } from 'playwright-core';
import DateFragment from '../../../../../fragments/date/date-fragment.ts';
import partys from '../../../../../../../constants/partys.ts';
import { ClaimantDefendantPartyType } from '../../../../../../../models/claimant-defendant-party-types.ts';
import { inputs } from './confirm-details-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class ConfirmDetailsPage extends ExuiPage(BasePage) {
  private defendantParty: Party;
  private solicitorParty: Party;
  private dateFragment: DateFragment;

  constructor(
    page: Page,
    dateFragment: DateFragment,
    defendantParty: Party,
    solicitorParty: Party,
  ) {
    super(page);
    this.dateFragment = dateFragment;
    this.defendantParty = defendantParty;
    this.solicitorParty = solicitorParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [super.verifyHeadings(ccdCaseData), super.expectText(inputs.dateOfBirth.label, { index: 0 })],
      { axePageInsertName: StringHelper.capitalise(this.solicitorParty.key) },
    );
  }

  //Need to decide how I am going to pass partyType Data, could be pass by ccdCaseData or store a reference in test data.
  async enterDefendantDateOfBirth(partyType: ClaimantDefendantPartyType) {
    await this.dateFragment.enterDateOfBirth(this.defendantParty, partyType);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
