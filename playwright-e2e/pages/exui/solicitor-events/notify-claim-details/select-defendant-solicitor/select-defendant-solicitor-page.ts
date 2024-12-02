import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../exui-event/exui-event';
import { dropdowns } from './select-defendant-solicitor-content';

@AllMethodsStep()
export default class SelectDefendantSolicitorPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(dropdowns.defendantSolicitors.label),
    ]);
  }

  async selectBoth() {
    await super.selectFromDropdown(
      dropdowns.defendantSolicitors.options[0],
      dropdowns.defendantSolicitors.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
