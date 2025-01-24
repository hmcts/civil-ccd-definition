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
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.disclosureOfDocs, {index:0}),
        super.expectText(radioButtons.disclosureOfElectronicDocs.label, {index:0}),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async enterDetails() {
    await super.clickBySelector(
      radioButtons.disclosureOfElectronicDocs.yes.selector(this.claimantDefendantParty),
    );
    await super.expectText(radioButtons.standardDisclosure.label, {index:0});
    await super.clickBySelector(
      radioButtons.standardDisclosure.no.selector(this.claimantDefendantParty),
    );
    await super.expectLabel(inputs.bespokeDirections.label, {index:0});
    await super.inputText(
      `No directions required - ${this.claimantDefendantParty.key}`,
      inputs.bespokeDirections.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
