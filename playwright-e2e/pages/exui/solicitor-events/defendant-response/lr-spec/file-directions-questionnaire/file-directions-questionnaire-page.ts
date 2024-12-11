import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  heading,
  fileDirectionsCheckbox,
  oneMonthStayRadioButtons,
  compliedRadioButtons,
  fileDirectionsCheckbox1v2,
  oneMonthStayRadioButtons1v2,
  compliedRadioButtons1v2,
} from './file-directions-questionnaire-content.ts';

@AllMethodsStep()
export default class FileDirectionsQuestionnairePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(heading, { ignoreDuplicates: true }),
    ]);
  }

  async selectCheckBox() {
    await super.clickBySelector(fileDirectionsCheckbox.selector);
  }

  async selectYesOneMonthStay() {
    await super.clickBySelector(oneMonthStayRadioButtons.yes.selector);
  }

  async selectNoOneMonthStay() {
    await super.clickBySelector(oneMonthStayRadioButtons.no.selector);
  }

  async selectYesComplied() {
    await super.clickBySelector(compliedRadioButtons.yes.selector);
  }

  async selectNoComplied() {
    await super.clickBySelector(compliedRadioButtons.no.selector);
    await super.inputText(
      'textarea',
      '#respondent1DQFileDirectionsQuestionnaire_reactionProtocolNotCompliedWithReason',
    );
  }

  async selectCheckBox1v2() {
    await super.clickBySelector(fileDirectionsCheckbox1v2.selector);
  }

  async selectYesOneMonthStay1v2() {
    await super.clickBySelector(oneMonthStayRadioButtons1v2.yes.selector);
  }

  async selectNoOneMonthStay1v2() {
    await super.clickBySelector(oneMonthStayRadioButtons1v2.no.selector);
  }

  async selectYesComplied1v2() {
    await super.clickBySelector(compliedRadioButtons1v2.yes.selector);
  }

  async selectNoComplied1v2() {
    await super.clickBySelector(compliedRadioButtons1v2.no.selector);
    await super.inputText(
      'textarea',
      '#respondent2DQFileDirectionsQuestionnaire_reactionProtocolNotCompliedWithReason',
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
