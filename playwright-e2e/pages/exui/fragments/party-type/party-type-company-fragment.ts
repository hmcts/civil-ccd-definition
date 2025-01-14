import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { inputs } from './party-type-content';
import partyTypes from '../../../../constants/party-types';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class PartyTypeCompanyFragment extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent() {
    await super.runVerifications(
      [super.expectLabel(inputs.name.label), super.expectLabel(inputs.email.label)],
      {
        runAxe: false,
      },
    );
  }

  async enterCompanyDetails() {
    const companyData = CaseDataHelper.buildClaimantAndDefendantData(
      this.party,
      partyTypes.COMPANY,
    );
    await super.inputText(
      companyData.companyName,
      inputs.name.selector(this.party, partyTypes.COMPANY),
    );
    await super.inputText(companyData.partyEmail, inputs.email.selector(this.party));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}