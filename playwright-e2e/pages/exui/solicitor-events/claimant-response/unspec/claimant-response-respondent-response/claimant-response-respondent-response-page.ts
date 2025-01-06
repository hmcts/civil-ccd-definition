import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  paragraph,
  legend,
  radioButtonForm,
  containers,
  legendUnspec2v1,
} from './claimant-response-respondent-response-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ClaimantResponseRespondentResponseUnspecPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    throw new Error('method not implemented');
  }

  async verifyContentUnspec(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(paragraph.descriptionText),
        super.expectText(legend.proceedClaim, { containerSelector: legend.containerSelector }),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContentUnspec1v2(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(paragraph.descriptionText, { count: 2 }),
        super.expectText(legend.proceedClaim, {
          containerSelector: legend.containerSelector1v2Respondent1,
        }),
        super.expectText(legend.proceedClaim, {
          containerSelector: legend.containerSelector1v2Respondent2,
        }),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContentUnspec2v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(paragraph.descriptionText),
        // super.expectText(legend.proceedClaim, {containerSelector:legendUnspec2v1.textClaimant1}),
        // super.expectText(legend.proceedClaim, {containerSelector:legendUnspec2v1.textClaimant2}),
      ],
      { useAxeCache: true },
    );
  }

  async selectYes() {
    await super.clickBySelector(radioButtonForm.radioYes.selector);
  }

  async select1v2Yes() {
    await super.clickBySelector(radioButtonForm.radioYes.selector1v2Respondent1);
    await super.clickBySelector(radioButtonForm.radioYes.selector1v2Respondent2);
  }

  async select2v1Yes() {
    await super.clickBySelector(radioButtonForm.radioYes.selector2v1Clamant1);
    await super.clickBySelector(radioButtonForm.radioYes.selector2v1Clamant2);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
