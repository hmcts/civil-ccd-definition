import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, selectors } from './legal-representation-content.ts';

@AllMethodsStep()
export default class LegalRepresentationPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(labels.defendantLegalRepresentative),
      super.expectSelector(selectors.respondentRepresentedYes),
      super.expectSelector(selectors.respondentRepresentedNo),
    ]);
  }

  async clickNoForLegalRepresentative() {
    await super.clickBySelector(selectors.respondentRepresentedNo);
  }

  async submit() {
    await super.clickSubmit();
  }
}
