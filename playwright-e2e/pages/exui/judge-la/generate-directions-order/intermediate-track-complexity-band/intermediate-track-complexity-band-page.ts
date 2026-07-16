import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { heading, subheading, radioButtons } from './intermediate-track-complexity-band-content';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';

@AllMethodsStep()
export default class intermediateTrackComplexityBandPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectSubheading(subheading, { headingLevel: 3 }),
      super.expectLegend(radioButtons.assignComplexityBand.label),
      super.expectSelector(radioButtons.assignComplexityBand.yes.selector),
      super.expectSelector(radioButtons.assignComplexityBand.no.selector),
    ]);
  }

  async assignComplexityBandYes() {
    await super.clickBySelector(radioButtons.assignComplexityBand.yes.selector);
    await super.expectLegend(radioButtons.complexityBand.label);
  }

  async assignComplexityBandNo() {
    await super.clickBySelector(radioButtons.assignComplexityBand.no.selector);
  }

  async selectComplexityBand1() {
    await super.clickBySelector(radioButtons.complexityBand.complexityBand1.selector);
  }

  async selectComplexityBand2() {
    await super.clickBySelector(radioButtons.complexityBand.complexityBand2.selector);
  }

  async selectComplexityBand3() {
    await super.clickBySelector(radioButtons.complexityBand.complexityBand3.selector);
  }

  async selectComplexityBand4() {
    await super.clickBySelector(radioButtons.complexityBand.complexityBand4.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
