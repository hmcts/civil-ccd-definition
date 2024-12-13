import BasePage from '../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import {
  heading,
  fileDirectionsCheckbox,
  oneMonthStayRadioButtons,
  compliedRadioButtons,
  fileDirectionsCheckbox1v2,
} from './file-directions-questionnaire-content.ts';

@AllMethodsStep()
export default class FileDirectionsQuestionnairePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectCheckBox(defendantNumber: number) {
    await super.clickBySelector(fileDirectionsCheckbox(defendantNumber).selector);
  }

  async selectYesOneMonthStay(defendantNumber: number) {
    await super.clickBySelector(oneMonthStayRadioButtons(defendantNumber).yes.selector);
  }

  async selectNoOneMonthStay(defendantNumber: number) {
    await super.clickBySelector(oneMonthStayRadioButtons(defendantNumber).no.selector);
  }

  async selectYesComplied(defendantNumber: number) {
    await super.clickBySelector(compliedRadioButtons(defendantNumber).yes.selector);
  }

  async selectNoComplied(defendantNumber: number) {
    await super.clickBySelector(compliedRadioButtons(defendantNumber).no.selector);
    await super.inputText(
      'textarea',
      `#respondent${defendantNumber}DQFileDirectionsQuestionnaire_reactionProtocolNotCompliedWithReason`,
    );
  }

  async selectCheckBox1v2() {
    await super.clickBySelector(fileDirectionsCheckbox1v2.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
