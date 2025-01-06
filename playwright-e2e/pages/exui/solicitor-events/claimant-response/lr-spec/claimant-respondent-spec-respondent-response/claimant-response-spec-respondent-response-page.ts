import BasePage from '../../../../../../base/base-page';
import ExuiPage from '../../../../exui-page/exui-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  paragraph,
  legend,
  radioButtonForm,
  containers,
} from './claimant-response-spec-respondent-response-content';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecRespondentResponsePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    throw new Error('method not implemented');
  }

  async verifyContent1v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(paragraph.descriptionText, {
          containerSelector: containers.claimResponseType.selector,
        }),
        super.expectText(legend.proceedClaim),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContent1v2(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(paragraph.descriptionText, { first: true }),
        super.expectText(legend.proceedClaim),
      ],
      { useAxeCache: true },
    );
  }

  async verifyContent2v1(ccdCaseData: CCDCaseData) {
    await super.runVerifications(
      [
        super.verifyHeadings(ccdCaseData),
        super.expectText(paragraph.descriptionText, { ignoreDuplicates: true }),
      ],
      { useAxeCache: true },
    );
  }

  async selectYes() {
    await super.clickBySelector(radioButtonForm.radioYes.selector);
  }

  async selectSpecYes2v1() {
    await super.clickBySelector(radioButtonForm.radioYes.selectorSpec2v1);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
