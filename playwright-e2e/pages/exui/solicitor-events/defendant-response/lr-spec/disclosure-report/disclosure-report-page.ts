import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  agreedProposalRadioButtons,
  filedAndServedRadioButtons,
} from './disclosure-report-content.ts';

@AllMethodsStep()
export default class DisclosureReportPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectYesFiledAndServedRadioButtons(defendantNumber: number) {
    await super.clickBySelector(filedAndServedRadioButtons(defendantNumber).yes.selector);
  }

  async selectNoFiledAndServedRadioButtons(defendantNumber: number) {
    await super.clickBySelector(filedAndServedRadioButtons(defendantNumber).no.selector);
  }

  async selectYesAgreedProposalRadioButtons(defendantNumber: number) {
    await super.clickBySelector(agreedProposalRadioButtons(defendantNumber).yes.selector);
  }

  async selectNoAgreedProposalRadioButtons(defendantNumber: number) {
    await super.clickBySelector(agreedProposalRadioButtons(defendantNumber).no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
