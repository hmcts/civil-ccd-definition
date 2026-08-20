import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../../models/ccd-case-data';
import ExuiPage from '../../../../mixin-pages/exui-page/exui-page';
import { heading, subheading, radioButtons } from './abandon-other-remedy-content';
import { getFormattedCaseId } from '../../../../mixin-pages/exui-page/exui-content.ts';

@AllMethodsStep()
export default class AbandonOtherRemedyPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectText(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectText(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectSubheading(subheading),
      super.expectLegend(radioButtons.abandonOtherRemedy.legend),
      super.expectLabel(radioButtons.abandonOtherRemedy.yes.label),
      super.expectLabel(radioButtons.abandonOtherRemedy.no.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.abandonOtherRemedy.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.abandonOtherRemedy.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
