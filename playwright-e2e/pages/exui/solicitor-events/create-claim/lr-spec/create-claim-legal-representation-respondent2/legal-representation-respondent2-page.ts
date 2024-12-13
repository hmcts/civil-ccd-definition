import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import { subHeadings, labels, selectors } from './legal-representation-respondent2-content';
import ExuiPage from '../../../../exui-page/exui-page.ts';

@AllMethodsStep()
export default class LegalRepresentationRespondent2Page extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subHeadings.secondDefendantLegalRep),
      super.expectText(labels.yes),
      super.expectText(labels.no, { ignoreDuplicates: true }),
    ]);
  }

  async clickYes() {
    await super.clickBySelector(selectors.specRespondent2RepresentedYes);
  }

  async clickNo() {
    await super.clickBySelector(selectors.specRespondent2RepresentedNo);
  }

  async submit() {
    await super.clickSubmit();
  }
}
