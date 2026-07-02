import BasePage from '../../../../../base/base-page';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import CCDCaseData from '../../../../../models/ccd-case-data';
import { heading, radioButtons, checkboxes, dropdowns, inputs } from './hearing-attendance-content';

@AllMethodsStep()
export default class HearingAttendancePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.expectText(`${ccdCaseData.caseNamePublic}`, { exact: false }),
      super.expectHeading(heading),
    ]);
  }

  async selectAttendance() {
    await super.clickBySelector(checkboxes.telephone.selector);

    const partyChannelCount = await super.countBySelector(dropdowns.selector);
    for (let index = 0; index < partyChannelCount; index++) {
      await super.selectFromDropdown(dropdowns.inPerson.label, `#partyChannel${index}`);
    }

    await super.inputText(inputs.numberOfAttendees, inputs.selector);
  }

  async updateAttendance() {
    await super.clickBySelector(checkboxes.inPerson.selector);
  }

  async submit() {
    await super.clickContinue();
  }
}
