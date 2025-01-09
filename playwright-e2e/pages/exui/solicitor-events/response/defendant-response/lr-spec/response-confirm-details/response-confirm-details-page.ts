import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import {
  heading,
  radioButtons,
  inputs,
  tableHeadings,
} from './response-confirm-details-content.ts';

@AllMethodsStep()
export default class ResponseConfirmDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    super.runVerifications([
      super.expectHeading(heading),
      super.expectLabel(inputs.defendantSolicitorReference.label),
      super.expectText(tableHeadings.organisation),
      super.expectText(tableHeadings.reference),
      super.expectLabel(inputs.defendant1DateOfBirth.day.label),
      super.expectLabel(inputs.defendant1DateOfBirth.month.label),
      super.expectLabel(inputs.defendant1DateOfBirth.year.label),
      super.expectText(radioButtons.defendant1Address.label),
    ]);
  }

  async selectYesAddress() {
    await super.clickBySelector(radioButtons.defendant1Address.yes.selector);
  }

  async selectNoAddress() {
    await super.clickBySelector(radioButtons.defendant1Address.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
