import { Page } from 'playwright-core';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getRadioButtons } from './mediation-content.ts';

@AllMethodsStep()
export default class MediationPage extends ExuiPage(BasePage) {
  private defendantNumber?: number;

  constructor(page: Page, defendantNumber?: number) {
    super(page);
    this.defendantNumber = defendantNumber;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectLabel(getRadioButtons(this.defendantNumber).yesMediation.label),
      super.expectLabel(getRadioButtons(this.defendantNumber).yesMediation.label),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(getRadioButtons(this.defendantNumber).yesMediation.selector);
  }

  async selectNo() {
    await super.clickBySelector(getRadioButtons(this.defendantNumber).noMediation.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
