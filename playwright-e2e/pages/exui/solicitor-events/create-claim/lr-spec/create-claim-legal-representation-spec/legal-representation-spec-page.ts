import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { selectors, subHeadings } from './legal-representation-spec-content';

@AllMethodsStep()
export default class LegalRepresentationSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectSubheading(subHeadings.defendantLegalRepresentative),
      super.expectSelector(selectors.respondentRepresentedYes),
      super.expectSelector(selectors.respondentRepresentedNo),
    ]);
  }

  async clickYesForLegalRepresentative() {
    await super.clickBySelector(selectors.respondentRepresentedYes);
  }

  async clickNoForLegalRepresentative() {
    await super.clickBySelector(selectors.respondentRepresentedNo);
  }

  async submit() {
    await super.clickSubmit();
  }
}
