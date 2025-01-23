import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import CaseDataHelper from '../../../../helpers/case-data-helper';
import { Party } from '../../../../models/partys';
import ExuiPage from '../../exui-page/exui-page';
import {
  links,
  radioButtons,
  subheadings,
  inputs,
  buttons,
  dropdowns,
  paragraphs,
} from './correspondence-address-content';

export default class CorrespondenceAddressFragment extends ExuiPage(BasePage) {
  private solicitorParty: Party;

  constructor(page: Page, solicitorParty: Party) {
    super(page);
    this.solicitorParty = solicitorParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectText(radioButtons.addressRequired.label),
        super.expectText(paragraphs.descriptionText),
      ],
      {
        runAxe: false,
      },
    );
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.addressRequired.yes.selector(this.solicitorParty));
    await super.expectSubheading(subheadings.correspondenceAddress);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.addressRequired.no.selector(this.solicitorParty));
  }

  async enterAddressManual() {
    const addressData = CaseDataHelper.buildAddressData(this.solicitorParty);
    await super.clickLink(links.cannotFindAddress.title);
    await super.inputText(
      addressData.AddressLine1,
      inputs.addressLine1.selector(this.solicitorParty),
    );
    await super.inputText(
      addressData.AddressLine2,
      inputs.addressLine2.selector(this.solicitorParty),
    );
    await super.inputText(
      addressData.AddressLine3,
      inputs.addressLine3.selector(this.solicitorParty),
    );
    await super.inputText(addressData.PostTown, inputs.postTown.selector(this.solicitorParty));
    await super.inputText(addressData.County, inputs.county.selector(this.solicitorParty));
    await super.inputText(addressData.Country, inputs.country.selector(this.solicitorParty));
    await super.inputText(addressData.PostCode, inputs.postCode.selector(this.solicitorParty));
  }

  async findAddress(postcode: string, index: number) {
    await super.inputText(postcode, inputs.postCodeLookup.selector(this.solicitorParty));
    await super.clickButtonByName(buttons.findaddress.title);
    await super.expectSelector(dropdowns.addressList.selector(this.solicitorParty));
    await super.selectFromDropdown(index, dropdowns.addressList.selector(this.solicitorParty));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
