import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import { Party } from '../../../../../../../models/partys.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subheadings,
  radioButtons,
  inputs,
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
        super.expectLabel(radioButtons.disclosureOfElectronicDocs.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(radioButtons.disclosureOfElectronicDocs.yes.selector(this.party));
    await super.clickBySelector(radioButtons.standardDisclosure.no.selector(this.party));
    await super.expectLabel(inputs.bespokeDirections.label);
    await super.inputText('No directions required', inputs.bespokeDirections.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
