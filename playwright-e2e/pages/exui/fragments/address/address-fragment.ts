import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { buttons, getInputs, links } from './address-content';
import Party from '../../../../enums/party';

@AllMethodsStep()
export default class AddressFragment extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent() {
    await super.runVerifications([super.expectLabel(getInputs(this.party).postCodeInput.label)]);
  }

  async enterAddressManual(postCode?: string) {
    await super.clickLink(links.cannotFindAddress.title);
    await super.inputText(`${this.party} Building`, getInputs(this.party).addressLine1.selector);
    await super.inputText(`${this.party} Flat`, getInputs(this.party).addressLine2.selector);
    await super.inputText(`${this.party} Street`, getInputs(this.party).addressLine3.selector);
    await super.inputText(`${this.party} City`, getInputs(this.party).postTown.selector);
    await super.inputText(`${this.party} County`, getInputs(this.party).county.selector);
    await super.inputText(`${this.party} Country`, getInputs(this.party).country.selector);
    await super.inputText(postCode ?? `E10 5DN`, getInputs(this.party).postCode.selector);
  }

  async findAddress(postcode: string, index: number) {
    await super.inputText(postcode, getInputs(this.party).postCodeInput.selector);
    await super.clickButtonByName(buttons.findaddress.title);
    //method incomplete, need to add method in basePage for waiting for dropdown to appear.
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
