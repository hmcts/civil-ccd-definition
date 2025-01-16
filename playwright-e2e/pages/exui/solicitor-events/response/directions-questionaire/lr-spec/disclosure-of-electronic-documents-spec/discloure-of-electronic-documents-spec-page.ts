import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  subheadings,
  inputs,
  radioButtons,
} from './disclosure-of-electronic-documents-spec-content.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class DisclosureOfElectronicDocumentsSpecPage extends ExuiPage(BasePage) {
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
        super.expectText(radioButtons.disclosureOfElectronicDocs.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(radioButtons.disclosureOfElectronicDocs.no.selector(this.party));
    await super.expectText(radioButtons.agreement.label);
    await super.clickBySelector(radioButtons.agreement.no.selector(this.party));
    await super.expectText(inputs.disagreementReason.label);
    await super.inputText('No major reason', inputs.disagreementReason.selector(this.party));
  }

  async enterDetailsDefendant2() {
    await super.clickBySelector(radioButtons.disclosureOfElectronicDocs.no.selector(this.party));
    await super.expectText(radioButtons.agreement.label);
    await super.clickBySelector(radioButtons.agreement.no.selector(this.party));
    await super.expectText(inputs.disagreementReason.label);
    await super.inputText('No major reason', inputs.disagreementReason.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
