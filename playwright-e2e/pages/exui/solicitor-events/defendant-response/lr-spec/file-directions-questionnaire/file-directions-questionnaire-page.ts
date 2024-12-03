import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';
import ExuiEvent from '../../../../exui-event/exui-event.ts';
import {
  heading,
  fileDirectionsCheckbox,
  oneMonthStayRadioButtons,
  compliedRadioButtons,
} from './file-directions-questionnaire-content.ts';

@AllMethodsStep()
export default class FileDirectionsQuestionnairePage extends ExuiEvent(BasePage) {
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

  async submit() {
    await super.retryClickSubmit();
  }
}
