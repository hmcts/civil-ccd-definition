import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, radioButtons } from './upload-particulars-of-claim-content';

@AllMethodsStep()
export default class UploadParticularsOfClaimPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(labels.uploadParticularsOfClaim),
      super.expectSelector(radioButtons.uploadParticularsOfClaim.yes),
      super.expectSelector(radioButtons.uploadParticularsOfClaim.no),
    ]);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.uploadParticularsOfClaim.no);
  }

  async submit() {
    await super.clickSubmit();
  }
}
