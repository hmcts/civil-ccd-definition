import { Page } from '@playwright/test';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import YesOrNoFragment from '../../../../fragments/yes-or-no/yes-or-no-fragment';
import ExuiPage from '../../../../mixin-pages/exui-page/exui-page';
import { inputs, radioButtons } from './claim-declaration-content';

@AllMethodsStep()
export default class ClaimDeclarationPage extends ExuiPage(BasePage) {
  private yesOrNoFragment: YesOrNoFragment;

  constructor(page: Page, yesOrNoFragment: YesOrNoFragment) {
    super(page);
    this.yesOrNoFragment = yesOrNoFragment;
  }

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectLegend(radioButtons.addOtherRemedy.label),
      this.yesOrNoFragment.verifyContent(radioButtons.addOtherRemedy.selectorKey),
    ]);
  }

  async selectYes() {
    await this.yesOrNoFragment.selectYes(radioButtons.addOtherRemedy.selectorKey);
  }

  async selectYesAndEnterDescription() {
    await this.selectYes();
    await super.inputText(
      'Details of the claim text for type OtherRemedy',
      inputs.description.selector,
    );
  }

  async selectNo() {
    await this.yesOrNoFragment.selectNo(radioButtons.addOtherRemedy.selectorKey);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
