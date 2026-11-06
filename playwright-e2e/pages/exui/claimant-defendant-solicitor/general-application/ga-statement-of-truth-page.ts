import BasePage from '../../../../base/base-page';
import filePaths from '../../../../config/file-paths';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import CCDCaseData from '../../../../models/ccd-case-data';
import ExuiPage from '../../mixin-pages/exui-page/exui-page';
import { checkboxes, inputs, buttons } from './ga-statement-of-truth-content';

@AllMethodsStep()
export default class GaStatementOfTruthPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(inputs.details.label),
      super.expectLabel(inputs.reasons.label),
      super.expectLabel(checkboxes.statementOfTruth.label),
      super.expectLabel(inputs.name.label),
      super.expectLabel(inputs.role.label),
    ]);
  }

  async enterDetails() {
    await super.inputText('Test Order details', inputs.details.selector);
    await super.inputText('Test reasons for orders', inputs.reasons.selector);
    await super.clickBySelector(buttons.addNewTop.selector);
    await super.retryUploadFile(filePaths.testPdfFile, inputs.evidence.selector);
    await super.clickBySelector(checkboxes.statementOfTruth.selector);
    await super.inputText('John Smith', inputs.name.selector);
    await super.inputText('Solicitor', inputs.role.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
