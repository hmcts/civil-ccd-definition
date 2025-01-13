import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { inputs, subheadings } from './upload-defendant-response-spec-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class UploadDefendantResponseSpecPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [super.verifyHeadings(ccdCaseData), super.expectSubheading(subheadings.uploadEvidence)],
      { pageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async enterDisputeReason() {
    await super.inputText(
      `This is Defendant ${this.party.key}'s reason`,
      inputs.disputeReason.selector(this.party),
    );
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadEvidence.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
