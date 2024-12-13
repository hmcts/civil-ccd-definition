import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, selectors, subHeadings } from './upload-claim-document-spec-content';

@AllMethodsStep()
export default class UploadClaimDocumentSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.addClaimTimeline),
      super.expectSelector(selectors.specClaimTimelineListUpload),
      super.expectText(labels.uploadClaimTimelineTemplate),
      super.expectSelector(selectors.specClaimTimelineListManual),
      super.expectText(labels.addManually),
    ]);
  }

  async selectUploadOption() {
    await super.clickBySelector(selectors.specClaimTimelineListUpload);
  }

  async selectManualOption() {
    await super.clickBySelector(selectors.specClaimTimelineListManual);
  }

  async submit() {
    await super.clickSubmit();
  }
}
