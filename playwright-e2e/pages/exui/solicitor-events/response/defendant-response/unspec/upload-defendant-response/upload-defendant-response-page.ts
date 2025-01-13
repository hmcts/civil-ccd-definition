import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs } from './upload-defendant-response-content.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class UploadDefendantResponsePage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectSubheading(subheadings.uploadDefence),
        super.expectLabel(inputs.uploadDoc.label),
      ],
      { pageInsertName: StringHelper.capitalise(this.party.key) },
    );
  }

  async uploadDefence() {
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadDoc.selector(this.party));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
