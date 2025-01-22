import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { buttons, inputs, dropdowns, links } from './address-content';
import { Party } from '../../../../models/partys';
import CaseDataHelper from '../../../../helpers/case-data-helper';

@AllMethodsStep()
export default class AddressFragment extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent() {
    await super.runVerifications([super.expectLabel(inputs.postCodeInput.label)]);
  }

  async enterAddressManual() {
    const addressData = CaseDataHelper.buildAddressData(this.party);
    await super.clickLink(links.cannotFindAddress.title);
    await super.inputTextBySelector(
      addressData.AddressLine1,
      inputs.addressLine1.selector(this.party),
    );
    await super.inputTextBySelector(
      addressData.AddressLine2,
      inputs.addressLine2.selector(this.party),
    );
    await super.inputTextBySelector(
      addressData.AddressLine3,
      inputs.addressLine3.selector(this.party),
    );
    await super.inputTextBySelector(addressData.PostTown, inputs.postTown.selector(this.party));
    await super.inputTextBySelector(addressData.County, inputs.county.selector(this.party));
    await super.inputTextBySelector(addressData.Country, inputs.country.selector(this.party));
    await super.inputTextBySelector(addressData.PostCode, inputs.postCode.selector(this.party));
  }

  async findAddress(postcode: string, index: number) {
    await super.inputTextBySelector(postcode, inputs.postCodeInput.selector(this.party));
    await super.clickButtonByName(buttons.findaddress.title);
    await super.expectSelector(dropdowns.addressList.selector(this.party));
    await super.selectFromDropdownBySelector(index, dropdowns.addressList.selector(this.party));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
