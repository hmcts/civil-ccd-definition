
import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import Party from '../../../../../../../enums/party.ts';
import { subheadings, getUploadForm  } from './draft-directions-content.ts';
import filePaths from "../../../../../../../config/file-paths.ts";

@AllMethodsStep()
export default class DraftDirectionsPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

async verifyContent(ccdCaseData: CCDCaseData) {
  await super.runVerifications([
    super.verifyHeadings(ccdCaseData),
    super.expectText(subheadings.draft, {first: true}),
    super.expectText(getUploadForm(this.party).uploadFile.label, {ignoreDuplicates: true}),
    super.expectText(getUploadForm(this.party).hint.label, {first: true}),
  ]);
}

  async uploadEvidence() {
    await super.retryUploadFile(filePaths.testPdfFile, getUploadForm(this.party).uploadFile.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
