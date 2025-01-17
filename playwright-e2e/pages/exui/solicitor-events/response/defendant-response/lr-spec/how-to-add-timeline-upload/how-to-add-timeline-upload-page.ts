import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { heading, inputs } from './how-to-add-timeline-upload-content.ts';
import filePaths from '../../../../../../../config/file-paths.ts';
import { Party } from '../../../../../../../models/partys.ts';
import StringHelper from '../../../../../../../helpers/string-helper.ts';

@AllMethodsStep()
export default class HowToAddTimelineUploadPage extends ExuiPage(BasePage) {
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        super.expectHeading(ccdCaseData.id),
        super.expectHeading(ccdCaseData.caseNamePublic),
        super.expectLabel(inputs.upload.label),
      ],
      { axePageInsertName: StringHelper.capitalise(this.defendantParty.key) },
    );
  }

  async uploadDoc() {
    await super.retryUploadFile(inputs.upload.selector(this.defendantParty), filePaths.testPdfFile);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
