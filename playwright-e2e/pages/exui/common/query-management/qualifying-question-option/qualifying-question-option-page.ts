import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiQmPage from '../../../mixin-pages/exui-qm-page/exui-qm-page.ts';
import { heading, subheading, radioButtons } from './qualifying-question-option-content';

@AllMethodsStep()
export default class QualifyingQuestionOptionPage extends ExuiQmPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(heading),
      super.expectSubheading(subheading),
      super.expectLabel(radioButtons.giveUpdate.label),
      super.expectLabel(radioButtons.askForUpdate.label),
      super.expectLabel(radioButtons.sendDocuments.label),
      super.expectLabel(radioButtons.useManageCases.label),
      super.expectLabel(radioButtons.findChangeHearingDetails.label),
      super.expectLabel(radioButtons.markClaim.label),
      super.expectLabel(radioButtons.helpWithFees.label),
      super.expectLabel(radioButtons.followupExistingQuery.label),
      super.expectLabel(radioButtons.raiseANewQuery.label),
    ]);
  }

  async selectRaiseANewQuery() {
    await super.clickByLabel(radioButtons.raiseANewQuery.label);
  }

  async submit() {
    await super.retryClickContinue();
  }
}
