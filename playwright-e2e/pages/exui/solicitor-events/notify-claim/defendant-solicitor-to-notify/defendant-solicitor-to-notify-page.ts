import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data';
import ExuiPage from '../../../exui-page/exui-page';
import { dropdowns } from './defendant-solicitor-to-notify-content';

@AllMethodsStep()
export default class DefendantSolicitorToNotifyPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(dropdowns.defendantSolicitors.label),
    ]);
  }

  async selectBoth() {
    await super.selectFromDropdownBySelector(
      dropdowns.defendantSolicitors.options[0],
      dropdowns.defendantSolicitors.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
