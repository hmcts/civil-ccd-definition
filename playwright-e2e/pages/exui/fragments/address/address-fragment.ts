import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import ExuiPage from '../../exui-page/exui-page';
import { buttons, getDropdowns, getInputs, heading } from './address-content';

@AllMethodsStep()
export default class AddressFragment extends ExuiPage(BasePage) {
  private party: string;

  constructor(page: Page, party: string) {
    super(page);
    this.party = party;
  }

  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectSubheading(heading),
      super.expectLabel(getInputs(this.party).postCodeInput.label),
      super.expectLabel(getInputs(this.party).detailAddressLine1.label),
      super.expectLabel(getInputs(this.party).detailAddressLine2.label),
      super.expectLabel(getInputs(this.party).detailAddressLine3.label),
      super.expectLabel(getInputs(this.party).detailPostTown.label),
      super.expectLabel(getInputs(this.party).detailCounty.label),
      super.expectLabel(getInputs(this.party).detailCountry.label),
      super.expectLabel(getInputs(this.party).detailPostCode.label),
    ]);
  }

  async fillAddress() {
    await super.inputText('E10 5DN', getInputs(this.party).postCodeInput.selector);
    await super.clickByText(buttons.findAddress.title);
    await super.expectLabel(getDropdowns(this.party).addressList.label);
    await super.selectFromDropdown(
      getDropdowns(this.party).addressList.options[0],
      getDropdowns(this.party).addressList.selector,
    );
    await super.expectInputValue(
      'George Mitchell Comprehensive School',
      getInputs(this.party).detailAddressLine1.selector,
    );
    await super.expectInputValue('Farmer Road', getInputs(this.party).detailAddressLine2.selector);
    await super.expectInputValue('London', getInputs(this.party).detailPostTown.selector);
    await super.expectInputValue('United Kingdom', getInputs(this.party).detailCountry.selector);
    await super.expectInputValue('E10 5DN', getInputs(this.party).detailPostCode.selector);
  }

  async submit(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
