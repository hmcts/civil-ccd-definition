import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { inputs } from './party-type-content';
import claimantDefendantPartyTypes from '../../../../constants/claimant-defendant-party-types';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class PartyTypeCompanyFragment extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectLabel(inputs.name.label, { exact: true, index: 0 }),
        super.expectLabel(inputs.email.label),
      ],
      {
        runAxe: false,
      },
    );
  }

  async enterCompanyDetails() {
    const companyData = CaseDataHelper.buildClaimantAndDefendantData(
      this.claimantDefendantParty,
      claimantDefendantPartyTypes.COMPANY,
    );
    await super.inputText(
      companyData.companyName,
      inputs.name.selector(this.claimantDefendantParty, claimantDefendantPartyTypes.COMPANY),
    );
    await super.inputText(
      companyData.partyEmail,
      inputs.email.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
