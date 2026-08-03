import { Page } from '@playwright/test';
import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import filePaths from '../../../../../config/file-paths';
import DateHelper from '../../../../../helpers/date-helper';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import CCDCaseData from '../../../../../models/ccd-case-data';
import DateFragment from '../../../fragments/date/date-fragment';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import { buttons, containers, headings, inputs } from './document-upload-content';

@AllMethodsStep()
export default class DocumentUploadPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(headings.uploadDocuments),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
    ]);
  }

  async uploadDocumentNonAttendanceStatement() {
    await super.clickButtonByName(buttons.nonAttendanceStatement.addNew.label, {
      containerSelector: containers.nonAttendanceStatement.selector,
    });
    await super.inputText('Test name', inputs.nonAttendanceStatement.name.selector);
    await this.dateFragment.enterDate(
      DateHelper.subtractFromToday({ days: 1 }),
      inputs.date.selectorKey,
      { containerSelector: containers.nonAttendanceStatement.selector },
    );
    await super.retryUploadFile(
      filePaths.testPdfFile,
      inputs.nonAttendanceStatement.document.selector,
      { containerSelector: containers.nonAttendanceStatement.selector },
    );
  }

  async uploadDocumentsReferred() {
    await super.clickButtonByName(buttons.referredDocuments.addNew.label, {
      containerSelector: containers.referredDocuments.selector,
    });
    await super.inputText('Test document', inputs.referredDocuments.documentType.selector);
    await this.dateFragment.enterDate(
      DateHelper.subtractFromToday({ days: 1 }),
      inputs.date.selectorKey,
      { containerSelector: containers.referredDocuments.selector },
    );
    await super.retryUploadFile(filePaths.testPdfFile, inputs.referredDocuments.document.selector, {
      containerSelector: containers.referredDocuments.selector,
    });
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
