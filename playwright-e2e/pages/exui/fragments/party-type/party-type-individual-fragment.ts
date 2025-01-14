import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import { inputs } from '../party-type/party-type-content';
import DateFragment from '../date/date-fragment';
import partyTypes from '../../../../constants/party-types';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class PartyTypeIndividualFragment extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private partyType = partyTypes.INDIVIDUAL;
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
    this.dateFragment = new DateFragment(page);
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectLabel(inputs.firstName.label),
        super.expectLabel(inputs.lastName.label),
        super.expectLabel(inputs.dateOfBirth.label, { index: 0 }),
        this.dateFragment.verifyContent(),
        super.expectLabel(inputs.email.label),
        super.expectLabel(inputs.phone.label),
      ],
      {
        runAxe: false,
      },
    );
  }

  async enterIndividualDetails(dateOfBirth?: Date, phoneNumber?: string) {
    const individualData = CaseDataHelper.buildClaimantAndDefendantData(this.party, this.partyType);
    await super.inputText(
      individualData.individualTitle,
      inputs.title.selector(this.party, this.partyType),
    );
    await super.inputText(
      individualData.individualFirstName,
      inputs.firstName.selector(this.party, this.partyType),
    );
    await super.inputText(
      individualData.individualLastName,
      inputs.lastName.selector(this.party, this.partyType),
    );
    await this.dateFragment.enterDateOfBirth(this.party, this.partyType);
    await super.inputText(individualData.partyEmail, inputs.email.selector(this.party));
    await super.inputText(individualData.partyPhone, inputs.phone.selector(this.party));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}