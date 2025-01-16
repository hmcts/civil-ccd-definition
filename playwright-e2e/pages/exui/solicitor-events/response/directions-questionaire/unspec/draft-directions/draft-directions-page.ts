import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { subheadings, inputs } from './draft-directions-content.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class DraftDirectionsPage extends ExuiPage(BasePage) {
  private claimantDefendantParty: Party;

  constructor(page: Page, claimantDefendantParty: Party) {
    super(page);
    this.claimantDefendantParty = claimantDefendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(subheadings.draft, { first: true }),
        super.expectText(inputs.uploadFile.label, { first: true }),
        super.expectText(inputs.uploadFile.hintText, { first: true }),
      ],
      { axePageInsertName: StringHelper.capitalise(this.claimantDefendantParty.key) },
    );
  }

  async uploadEvidence() {
    await super.retryUploadFile(
      filePaths.testPdfFile,
      inputs.uploadFile.selector(this.claimantDefendantParty),
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
