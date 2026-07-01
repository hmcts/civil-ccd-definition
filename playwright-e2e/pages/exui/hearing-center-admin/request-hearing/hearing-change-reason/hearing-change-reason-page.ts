import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, checkboxes } from './hearing-change-reason-content';

@AllMethodsStep()
export default class HearingChangeReasonPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false, ignoreDuplicates: true }),
      super.expectText(heading),
    ]);
  }

  async selectReasonPartyRequestedChange() {
    await super.clickBySelector(checkboxes.partyRequestedChange.selector);
  }

  async submit() {
    await super.clickButtonByName('Submit change request');
  }
}
