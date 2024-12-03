import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  agreedProposalRadioButtons,
  filedAndServedRadioButtons,
} from './disclosure-report-content.ts';

@AllMethodsStep()
export default class DisclosureReportPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYesFiledAndServedRadioButtons() {
    await super.clickBySelector(filedAndServedRadioButtons.yes.selector);
  }

  async selectNoFiledAndServedRadioButtons() {
    await super.clickBySelector(filedAndServedRadioButtons.no.selector);
  }

  async selectYesAgreedProposalRadioButtons() {
    await super.clickBySelector(agreedProposalRadioButtons.yes.selector);
  }

  async selectNoAgreedProposalRadioButtons() {
    await super.clickBySelector(agreedProposalRadioButtons.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
