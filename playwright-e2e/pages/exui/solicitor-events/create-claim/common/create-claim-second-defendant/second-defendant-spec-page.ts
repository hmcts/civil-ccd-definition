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
} from './second-defendant-spec-content.ts';

@AllMethodsStep()
export default class AddSecondDefendantPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subheadings.defendanttDetails),
      super.expectText(labels.defendantType, { ignoreDuplicates: true }),
      super.expectSelector(selectors.defendantIndividual),
      super.expectSelector(selectors.defendantCompany),
      super.expectSelector(selectors.defendantOrganisation),
      super.expectSelector(selectors.defendantSoleTrader),
      super.expectSubheading(subheadings.defendanttAddress),
      super.expectText(labels.defendantPostcode, { ignoreDuplicates: true }),
    ]);
  }

  async clickDefendantIndividual() {
    await super.clickBySelector(selectors.defendantIndividual);
  }

  async verifyDefendantDetails() {
    await super.runVerifications([
      super.expectText(labels.defendantTitle, { ignoreDuplicates: true }),
      super.expectText(labels.defendantFirstName, { ignoreDuplicates: true }),
      super.expectText(labels.defendantLastName, { ignoreDuplicates: true }),
      super.expectText(labels.defendantEmail, { ignoreDuplicates: true }),
      super.expectText(labels.defendantPhone, { ignoreDuplicates: true }),
    ]);
  }

  async fillDetails() {
    await super.inputText('Jane', formFields.firstName);
    await super.inputText('Doe', formFields.lastName);
    await super.inputText('SW1A 1AA', formFields.postCode);
  }

  async clickFindAddress() {
    await super.clickButtonByName(buttons.findAddress);
  }

  async verifyAddressSelection() {
    await super.expectText(labels.defendantSelectAnAddress, { ignoreDuplicates: true });
  }

  async selectAddress() {
    await super.selectFromDropdown(1, dropdowns.addressList);
  }

  async verifyAddressDetails() {
    await super.runVerifications([
      super.expectText(labels.defendantBuildingAndStreet),
      super.expectText(labels.defendantAddressLine2),
      super.expectText(labels.defendantAddressLine3),
      super.expectText(labels.defendantTownOrCity),
      super.expectText(labels.defendantCounty),
      super.expectText(labels.defendantCountry),
      super.expectText(labels.defendantPostcodeOrZipcode),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
