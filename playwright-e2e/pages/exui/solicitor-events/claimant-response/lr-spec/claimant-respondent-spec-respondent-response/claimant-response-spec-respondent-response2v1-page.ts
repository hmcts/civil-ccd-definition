import BasePage from '../../../../../../base/base-page';
import ExuiEvent from '../../../../exui-event/exui-event';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import {
  paragraph,
  legend,
  radioButtonForm,
} from './claimant-response-spec-respondent-response-content';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class ClaimantResponseSpecRespondentResponse2v1Page extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraph.descriptionText, { ignoreDuplicates: true }),
      super.expectText(legend.defendsAllClaim, { ignoreDuplicates: true }),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtonForm.radioYes.selector2v1);
  }

  async submit() {
    await super.clickBySelector(radioButtonForm.continueButton.selector);
  }
}
