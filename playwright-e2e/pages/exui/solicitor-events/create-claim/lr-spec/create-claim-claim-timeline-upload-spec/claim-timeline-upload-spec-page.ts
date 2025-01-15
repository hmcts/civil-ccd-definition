import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import {
  buttons,
  hints,
  labels,
  subHeadings,
  uploadDocument,
} from './claim-timeline-upload-spec-content';
import filePaths from '../../../../../../config/file-paths.ts';

@AllMethodsStep()
export default class ClaimTimelineUploadSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.uploadClaimTimelineTemplate),
      super.expectText(labels.uploadFiles),
      super.expectText(hints.uploadFileHint),
      super.expectSelector(uploadDocument.specClaimTemplateDocumentFiles),
      super.expectText(buttons.cancelUpload),
    ]);
  }

  async uploadDocument() {
    await super.clickBySelector(uploadDocument.specClaimTemplateDocumentFiles);
    await super.retryUploadFile(
      filePaths.testPdfFile,
      uploadDocument.specClaimTemplateDocumentFiles,
    );
  }

  async submit() {
    await super.clickSubmit();
  }
}
