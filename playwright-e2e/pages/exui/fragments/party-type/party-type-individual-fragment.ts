import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { inputs } from './party-type-content';
import DateFragment from '../date/date-fragment';
import claimantDefendantPartyTypes from '../../../../constants/claimant-defendant-party-types';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import PartyType from '../../../../enums/party-types';

@AllMethodsStep()
export default class PartyTypeIndividualFragment extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private partyType = claimantDefendantPartyTypes.INDIVIDUAL;
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
    this.dateFragment = new DateFragment(page);
  }

  async verifyContent() {
    if (this.claimantDefendantParty.partyType === PartyType.CLAIMANT) {
      await super.expectText(inputs.dateOfBirth.label, { count: 1 });
    }
    await super.runVerifications(
      [
        super.expectLabel(inputs.title.label, { count: 1 }),
        super.expectLabel(inputs.firstName.label, { count: 1 }),
        super.expectLabel(inputs.lastName.label, { count: 1 }),
        super.expectLabel(inputs.email.label),
        super.expectLabel(inputs.phone.label),
      ],
      {
        runAxe: false,
      },
    );
  }

  async enterIndividualDetails() {
    const individualData = CaseDataHelper.buildClaimantAndDefendantData(
      this.claimantDefendantParty,
      this.partyType,
    );
    await super.inputText(
      individualData.individualTitle,
      inputs.title.selector(this.claimantDefendantParty, this.partyType),
    );
    await super.inputText(
      individualData.individualFirstName,
      inputs.firstName.selector(this.claimantDefendantParty, this.partyType),
    );
    await super.inputText(
      individualData.individualLastName,
      inputs.lastName.selector(this.claimantDefendantParty, this.partyType),
    );
    if (this.claimantDefendantParty.partyType === PartyType.CLAIMANT)
      await this.dateFragment.enterDateOfBirth(this.claimantDefendantParty, this.partyType);
    await super.inputText(
      individualData.partyEmail,
      inputs.email.selector(this.claimantDefendantParty),
    );
    await super.inputText(
      individualData.partyPhone,
      inputs.phone.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
