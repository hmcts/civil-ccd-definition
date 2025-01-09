import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { heading, getInputs } from './how-to-add-timeline-upload-content.ts';
import filePaths from '../../../../../../../config/file-paths.ts';

@AllMethodsStep()
export default class HowToAddTimelineUploadPage extends ExuiPage(BasePage) {
  private defendantNumber?: number;

  constructor(page: Page, defendantNumber?: number) {
    super(page);
    this.defendantNumber = defendantNumber;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.expectHeading(heading),
        super.expectHeading(ccdCaseData.id),
        super.expectHeading(ccdCaseData.caseNamePublic),
        super.expectLabel(getInputs(this.defendantNumber).upload.label),
      ],
      { pageInsertName: this.defendantNumber ? 'Defendant2' : '' },
    );
  }

  async uploadDoc() {
    await super.retryUploadFile(
      getInputs(this.defendantNumber).upload.selector,
      filePaths.testPdfFile,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
