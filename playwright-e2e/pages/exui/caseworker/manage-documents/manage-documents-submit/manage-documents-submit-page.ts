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
  changeLinks,
  buttons,
} from './manage-documents-submit-content.ts';
import {getFormattedCaseId} from "../../../exui-page/exui-content.ts";

@AllMethodsStep()
export default class ManageDocumentSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id), {exact: false}),
      super.expectHeading(ccdCaseData.caseNamePublic, {exact:false}),
      super.expectHeading(heading),
      super.expectSubheading(subHeading),
      super.expectText(labels.checkInformationCarefully.label),
      super.expectText(labels.bulkScannedOrEmailedDocuments.label, { exact: true }),
      super.expectText(labels.documentName.label),
      super.expectText(labels.documentType.label),
      super.expectText(labels.uploadEssentialDocument.label),
      super.expectText(labels.eventSummary.label, {exact:false}),
      super.expectText(labels.eventDescription.label),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
    ]);
  }

  async changeBulkScannedOrEmailedDocuments() {
    await super.clickBySelector(changeLinks.changeBulkScannedOrEmailedDocuments.selector);
  }

  async enterEventSummary() {
    await super.inputText("Adding Documents", inputFields.eventSummary.selector);
  }

  async enterEventDescription() {
    await super.inputText("Adding Missing Documents that are required", inputFields.eventDescription.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
