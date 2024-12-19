import BasePage from '../../../../../base/base-page';
import filePaths from '../../../../../config/file-paths';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import {
  heading,
  subHeading,
  labels,
  changeLinks,
  buttons,
} from './manage-documents-submit-content';

@AllMethodsStep()
export default class ManageDocumentSubmitPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      //   super.verifyHeadings(ccdCaseData),
      super.expectHeading(heading),
      super.expectSubheading(subHeading),
      super.expectText(labels.checkInformationCarefully.label),
      super.expectText(labels.bulkScannedOrEmailedDocuments.label, { exact: true }),
      super.expectText(labels.documentName.label),
      super.expectText(labels.documentType.label),
      super.expectText(labels.uploadEssentialDocument.label),
      super.expectText(labels.eventSummary.label),
      super.expectText(labels.eventDescription.label),
      super.expectText(buttons.previous.label),
      super.expectText(buttons.submit.label),
    ]);
  }

  async changeBulkScannedOrEmailedDocuments() {
    await super.clickBySelector(changeLinks.changeBulkScannedOrEmailedDocuments.selector);
  }

  async previous() {
    await super.clickBySelector(buttons.previous.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
