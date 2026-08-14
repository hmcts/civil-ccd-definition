import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { heading, subheading, dropdowns } from './select-template-content';
import { getFormattedCaseId } from '../../../mixin-pages/exui-page/exui-content.ts';
import MultiIntermediateTemplateTypes from '../../../../../constants/ccd-events/generate-directions-order/multi-intermediate-template-types';

@AllMethodsStep()
export default class SelectTemplatePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectHeading(getFormattedCaseId(ccdCaseData.id!), { exact: false }),
      super.expectHeading(ccdCaseData.caseNamePublic!, { exact: false }),
      super.expectSubheading(subheading, { headingLevel: 3 }),
      super.expectText(dropdowns.template.label),
    ]);
  }

  async selectTemplateIntermediate() {
    await super.selectFromDropdown(
      MultiIntermediateTemplateTypes.FIX_DATE_CMC,
      dropdowns.template.selector,
    );
  }

  async selectTemplateMulti() {
    await super.selectFromDropdown(
      MultiIntermediateTemplateTypes.FIX_DATE_CCMC,
      dropdowns.template.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
