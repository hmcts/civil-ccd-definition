import { Page } from '@playwright/test';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import YesOrNoFragment from '../../../../fragments/yes-or-no/yes-or-no-fragment';
import ExuiPage from '../../../../mixin-pages/exui-page/exui-page';
import { radioButtons } from './claim-declaration-content';

@AllMethodsStep()
export default class ClaimDeclarationPage extends ExuiPage(BasePage) {
  private yesOrNoFragment: YesOrNoFragment;

  constructor(page: Page, yesOrNoFragment: YesOrNoFragment) {
    super(page);
    this.yesOrNoFragment = yesOrNoFragment;
    radioButtons;
  }

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectLegend(radioButtons.addOtherRemedy.label),
      super.expectText(radioButtons.addOtherRemedy.hint),
      this.yesOrNoFragment.verifyContent(radioButtons.addOtherRemedy.selector),
    ]);
  }

  async selectYes() {
    await this.yesOrNoFragment.selectYes(radioButtons.addOtherRemedy.selector);
  }

  async selectNo() {
    await this.yesOrNoFragment.selectNo(radioButtons.addOtherRemedy.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
