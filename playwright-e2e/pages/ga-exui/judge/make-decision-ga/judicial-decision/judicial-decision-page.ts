import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { subheadings, radioButtons } from './judicial-decision-content';

@AllMethodsStep()
export default class JudicialDecisionPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectSubheading(subheadings),
      super.expectLabel(radioButtons.decision.orderWithoutHearing.label),
      super.expectLabel(radioButtons.decision.freeFormOrder.label),
      super.expectLabel(radioButtons.decision.requestMoreInformation.label),
      super.expectLabel(radioButtons.decision.listForAHearing.label),
      super.expectLabel(radioButtons.decision.orderForWrittenRepresentations.label),
    ]);
  }

  async selectListForAHearing() {
    await super.clickBySelector(radioButtons.decision.listForAHearing.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
