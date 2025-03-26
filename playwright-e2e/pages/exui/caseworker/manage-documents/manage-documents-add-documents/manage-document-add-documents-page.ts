import BasePage from '../../../../../base/base-page.ts';
import filePaths from '../../../../../config/file-paths.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  subHeading,
  labels,
  inputFields,
  buttons,
} from './manage-document-add-documents-content.ts';
import {getFormattedCaseId} from "../../../exui-page/exui-content.ts";

@AllMethodsStep()
export default class ManageDocumentAddDocumentsPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id), {exact: false}),
      super.expectHeading(ccdCaseData.caseNamePublic, {exact:false}),
      super.expectHeading(heading),
      super.expectSubheading(subHeading),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
      super.expectText(buttons.addNewTop.label, { ignoreDuplicates: true }),
    ]);
  }

  async addNew() {
    await super.clickBySelector(buttons.addNewTop.selector);
  }

  async fillFormNewDocuments() {
      await super.inputText("Test Document Name", inputFields.documentName.selector);
      await super.selectFromDropdown(
        inputFields.documentType.options[0],
        inputFields.documentType.selector,
      );

      await super.retryUploadFile(
        filePaths.testTextFile,
        inputFields.uploadEssentialDocument.selector
      );
  }

  async remove() {
    await super.clickBySelector(buttons.remove.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
