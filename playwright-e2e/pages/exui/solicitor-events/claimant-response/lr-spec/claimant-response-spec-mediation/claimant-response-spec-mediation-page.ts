import BasePage from '../../../../../../base/base-page';
import ExuiEvent from '../../../../exui-page/exui-page';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  mediationParagraphs,
  mediationRadioForm,
} from './claimant-response-spec-mediation-content.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecMediationPage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(mediationParagraphs.p1),
      super.expectText(mediationParagraphs.p2),
      super.expectText(mediationParagraphs.p3.text, {
        containerSelector: mediationParagraphs.p3.containerSelector,
      }),
      super.expectText(mediationRadioForm.legend),
      super.expectLabel(mediationRadioForm.agreeButton.label),
      super.expectLabel(mediationRadioForm.optOutButton.label),
    ]);
  }

  async selectMediationDecision() {
    await super.clickBySelector(mediationRadioForm.agreeButton.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
