import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  buttons,
  dropdowns,
  formFields,
  labels,
  selectors,
  subheadings,
} from './second-claimant-content.ts';

@AllMethodsStep()
export default class AddSecondClaimantPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.claimantDetails),
      super.expectText(labels.claimantType, { ignoreDuplicates: true }),
      super.expectSelector(selectors.claimantIndividual),
      super.expectSelector(selectors.claimantCompany),
      super.expectSelector(selectors.claimantOrganisation),
      super.expectSelector(selectors.claimantSoleTrader),
      super.expectSubheading(subheadings.claimantAddress),
      super.expectText(labels.claimantPostcode, { ignoreDuplicates: true }),
    ]);
  }

  async clickClaimantIndividual() {
    await super.clickBySelector(selectors.claimantIndividual);
  }

  async verifyClaimantDetails() {
    await super.runVerifications([
      super.expectText(labels.claimantTitle, { ignoreDuplicates: true }),
      super.expectText(labels.claimantFirstName, { ignoreDuplicates: true }),
      super.expectText(labels.claimantLastName, { ignoreDuplicates: true }),
      super.expectText(labels.claimantDateOfBirth, { ignoreDuplicates: true }),
      super.expectText(labels.claimantDay, { ignoreDuplicates: true }),
      super.expectText(labels.claimantMonth, { ignoreDuplicates: true }),
      super.expectText(labels.claimantYear, { ignoreDuplicates: true }),
      super.expectText(labels.claimantEmail, { ignoreDuplicates: true }),
      super.expectText(labels.claimantPhone, { ignoreDuplicates: true }),
    ]);
  }

  async fillDetails() {
    await super.inputText('Jane', formFields.firstName);
    await super.inputText('Doe', formFields.lastName);
    await super.inputText('01', formFields.dateOfBirthDay);
    await super.inputText('01', formFields.dateOfBirthMonth);
    await super.inputText('2000', formFields.dateOfBirthYear);
    await super.inputText('SW1A 1AA', formFields.postCode);
  }

  async clickFindAddress() {
    await super.clickButtonByName(buttons.findAddress);
  }

  async verifyAddressSelection() {
    await super.expectText(labels.claimantSelectAnAddress, { ignoreDuplicates: true });
  }

  async selectAddress() {
    await super.selectFromDropdown(1, dropdowns.addressList);
  }

  async verifyAddressDetails() {
    await super.runVerifications([
      super.expectText(labels.claimantBuildingAndStreet),
      super.expectText(labels.claimantAddressLine2),
      super.expectText(labels.claimantAddressLine3),
      super.expectText(labels.claimantTownOrCity),
      super.expectText(labels.claimantCounty),
      super.expectText(labels.claimantCountry),
      super.expectText(labels.claimantPostcodeOrZipcode),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
