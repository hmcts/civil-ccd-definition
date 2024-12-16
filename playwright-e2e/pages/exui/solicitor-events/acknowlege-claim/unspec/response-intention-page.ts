import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { intensionRadioButtons } from './response-intension-content.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ResponseIntensionPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectDefendAllClaim(defendantNumber: number) {
    await super.clickBySelector(intensionRadioButtons(defendantNumber).defendsAll.selector);
  }

  async selectDefendPartClaim(defendantNumber: number) {
    await super.clickBySelector(intensionRadioButtons(defendantNumber).defendsPart.selector);
  }

  async selectContestJurisdiction(defendantNumber: number) {
    await super.clickBySelector(intensionRadioButtons(defendantNumber).contests.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
