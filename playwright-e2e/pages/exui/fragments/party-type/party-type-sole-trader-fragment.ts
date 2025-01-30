import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { inputs } from '../party-type/party-type-content';
import DateHelper from '../../../../helpers/date-helper';
import DateFragment from '../date/date-fragment';
import claimantDefendantPartyTypes from '../../../../constants/claimant-defendant-party-types';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class PartyTypeSoleTraderFragment extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private partyType = claimantDefendantPartyTypes.INDIVIDUAL;
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
    this.dateFragment = new DateFragment(page);
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectLabel(inputs.firstName.label),
        super.expectLabel(inputs.lastName.label),
        super.expectLabel(inputs.dateOfBirth.label, { index: 1 }),
        this.dateFragment.verifyContent(),
        super.expectLabel(inputs.email.label),
        super.expectLabel(inputs.phone.label),
      ],
      {
        runAxe: false,
      },
    );
  }

  async enterSoleTraderDetails() {
    const soleTraderData = CaseDataHelper.buildClaimantAndDefendantData(
      this.claimantDefendantParty,
      this.partyType,
    );
    await super.inputText(
      soleTraderData.soleTraderTitle,
      inputs.title.selector(this.claimantDefendantParty, this.partyType),
    );
    await super.inputText(
      soleTraderData.soleTraderFirstName,
      inputs.firstName.selector(this.claimantDefendantParty, this.partyType),
    );
    await super.inputText(
      soleTraderData.soleTraderLastName,
      inputs.lastName.selector(this.claimantDefendantParty, this.partyType),
    );
    await super.inputText(
      soleTraderData.soleTraderTradingAs,
      inputs.tradingAs.selector(this.claimantDefendantParty, this.partyType),
    );
    await this.dateFragment.enterDateOfBirth(this.claimantDefendantParty, this.partyType);
    await super.inputText(
      soleTraderData.partyEmail,
      inputs.email.selector(this.claimantDefendantParty),
    );
    await super.inputText(
      soleTraderData.partyPhone,
      inputs.phone.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
