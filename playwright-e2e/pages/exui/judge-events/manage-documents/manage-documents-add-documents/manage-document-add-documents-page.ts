import BasePage from '../../../../../base/base-page';
import filePaths from '../../../../../config/file-paths';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  heading,
  subHeading,
  testData,
  labels,
  inputFields,
  buttons,
} from './manage-document-add-documents-content';

@AllMethodsStep()
export default class ManageDocumentAddDocumentsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      // super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectSubheading(subHeading),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
      super.expectText(buttons.addNewTop.label, { ignoreDuplicates: true }),
    ]);
  }

  async checkDocumentUploadContent() {
    await super.runVerifications([
      super.expectText(labels.documentName.label),
      super.expectText(labels.documentType.label),
      super.expectText(labels.uploadEssentialDocument.label),
    ]);
  }

  async enterDocumentName() {
    await super.inputText(testData.documentName, inputFields.documentName.selector);
  }

  async selectDocumentType(optionNum: number) {
    await super.selectFromDropdown(
      inputFields.documentType.options[optionNum],
      inputFields.documentType.selector,
    );
  }

  async uploadEssentialDocument() {
    await super.retryUploadFile(
      filePaths.testTextFile,
      inputFields.uploadEssentialDocument.selector,
    );
  }

  async addNew() {
    await super.clickBySelector(buttons.addNewTop.selector);
  }

  async remove() {
    await super.clickBySelector(buttons.remove.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
