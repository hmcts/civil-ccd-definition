import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { buttons } from './choose-party-type-content';
import { Party } from '../../../../models/partys';

@AllMethodsStep()
export default class ChoosePartyTypeFragment extends ExuiPage(BasePage) {
  private claimantParty: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.claimantParty = party;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectLabel(buttons.individual.label),
        super.expectLabel(buttons.company.label),
        super.expectLabel(buttons.organisaiton.label),
        super.expectLabel(buttons.soleTrader.label),
      ],
      {
        runAxe: false,
      },
    );
  }

  async selectIndivdual() {
    await super.clickBySelector(buttons.individual.selector(this.claimantParty));
  }

  async selectCompany() {
    await super.clickBySelector(buttons.individual.selector(this.claimantParty));
  }

  async selectOrganisation() {
    await super.clickBySelector(buttons.individual.selector(this.claimantParty));
  }

  async selectSoleTrader() {
    await super.clickBySelector(buttons.individual.selector(this.claimantParty));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
