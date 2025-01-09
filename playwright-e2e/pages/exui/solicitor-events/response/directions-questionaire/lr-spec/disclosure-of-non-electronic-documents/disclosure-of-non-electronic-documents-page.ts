import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import Party from '../../../../../../../enums/party.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subheadings,
  getRadioButtons,
  getInputs,
} from './disclosure-of-non-electronic-documents-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class DisclosureOfNonElectronicDocumentsPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.disclosureOfDocs),
        super.expectLabel(getRadioButtons(this.party).disclosureOfElectronicDocs.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(
      getRadioButtons(this.party).disclosureOfElectronicDocs.yes.selector,
    );
    await super.clickBySelector(getRadioButtons(this.party).standardDisclosure.no.selector);
    await super.expectLabel(getInputs(this.party).bespokeDirections.label);
    await super.inputText(
      'No directions required',
      getInputs(this.party).bespokeDirections.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
