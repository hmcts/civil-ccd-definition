import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import { heading, subheading, witnessesRadioButtons } from './witnesses-content.ts';

@AllMethodsStep()
export default class WitnessesPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(witnessesRadioButtons.text.label, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(witnessesRadioButtons.radioYes.selector);
  }

  async selectNo() {
    await super.clickBySelector(witnessesRadioButtons.radioNo.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
