import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiPage from '../../../mixin-pages/exui-page/exui-page.ts';
import { headings, subheadings, radioButtons } from './qualifying-question-option-content';

@AllMethodsStep()
export default class qualifyingQuestionOptionPage extends ExuiPage(BasePage) {
  // async goToQueryManagement(caseId: number) {
  //   await super.retryGoTo(
  //     `${urls.manageCase}/query-management/query/${caseId}`,
  //     () =>
  //       super.expectHeading(headings, {
  //         exact: false,
  //         timeout: config.exui.pageSubmitTimeout,
  //       }),
  //     undefined,
  //     { retries: 2, message: `Navigating to query management for ccd case id: ${caseId}` },
  //   );
  // }

  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings),
      super.expectSubheading(subheadings),
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

  async continue() {
    await super.retryClickContinue();
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
