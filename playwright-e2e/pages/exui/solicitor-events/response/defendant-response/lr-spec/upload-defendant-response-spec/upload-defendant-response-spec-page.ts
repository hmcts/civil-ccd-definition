import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getInputs, subheadings } from './upload-defendant-response-spec-content.ts';
import Party from '../../../../../../../enums/party.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class UploadDefendantResponseSpecPage extends ExuiPage(BasePage) {
  private party: Party;
  private defendantNumber?: number;

  constructor(page: Page, party: Party, defendantNumber?: number) {
    super(page);
    this.party = party;
    this.defendantNumber = defendantNumber;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [super.verifyHeadings(ccdCaseData), super.expectSubheading(subheadings.uploadEvidence)],
      { pageInsertName: StringHelper.capitalise(this.party) },
    );
  }

  async enterDisputeReason() {
    await super.inputText(
      `This is ${this.party}'s reason`,
      getInputs(this.party, this.defendantNumber).disputeReason.selector,
    );
    await super.retryUploadFile(
      filePaths.testPdfFile,
      getInputs(this.party, this.defendantNumber).uploadEvidence.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
