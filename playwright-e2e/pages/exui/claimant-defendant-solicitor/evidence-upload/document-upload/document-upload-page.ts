import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import filePaths from '../../../../../config/file-paths.ts';
import DateHelper from '../../../../../helpers/date-helper.ts';
import { headings, buttons, inputs } from './document-upload-content.ts';

@AllMethodsStep()
export default class DocumentUploadPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(headings.cannotWithdraw),
      super.expectSubheading(headings.witnessStatement),
    ]);
  }

  async addWitnessStatement(addButtonSelector = buttons.addNew.selector) {
    const statementDate = DateHelper.addToToday({});
    await super.clickBySelector(addButtonSelector);
    await super.inputText(DateHelper.getTwoDigitDay(statementDate), inputs.day);
    await super.inputText(DateHelper.getTwoDigitMonth(statementDate), inputs.month);
    await super.inputText(`${statementDate.getFullYear()}`, inputs.year);
    await super.inputTextByLabel('Witness 1', inputs.witnessName);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.uploadDoc.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
