import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subheadings,
  getInputs,
  getRadioButtons,
} from './disclosure-of-electronic-documents-spec-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class DisclosureOfElectronicDocumentsSpecPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party.key = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.disclosureOfDocs),
        super.expectText(getRadioButtons(this.party.key).disclosureOfElectronicDocs.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(
      getRadioButtons(this.party.key).disclosureOfElectronicDocs.no.selector,
    );
    await super.expectText(getRadioButtons(this.party.key).agreement.label);
    await super.clickBySelector(getRadioButtons(this.party.key).agreement.no.selector);
    await super.expectText(getInputs(this.party.key).disagreementReason.label);
    await super.inputText('No major reason', getInputs(this.party.key).disagreementReason.selector);
  }

  async enterDetailsDefendant2() {
    await super.clickBySelector(
      getRadioButtons(this.party.key).disclosureOfElectronicDocs.no.selector,
    );
    await super.expectText(getRadioButtons(this.party.key).agreement.label);
    await super.clickBySelector(getRadioButtons(this.party.key).agreement.no.selector);
    await super.expectText(getInputs(this.party.key).disagreementReason.label);
    await super.inputText('No major reason', getInputs(this.party.key).disagreementReason.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
