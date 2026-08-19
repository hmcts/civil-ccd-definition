import { Page } from '@playwright/test';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import YesOrNoFragment from '../../../../fragments/yes-or-no/yes-or-no-fragment';
import ExuiPage from '../../../../mixin-pages/exui-page/exui-page';
import { radioButtons } from './human-rights-act-content';

@AllMethodsStep()
export default class HumanRightsActPage extends ExuiPage(BasePage) {
  private yesOrNoFragment: YesOrNoFragment;

  constructor(page: Page, yesOrNoFragment: YesOrNoFragment) {
    super(page);
    this.yesOrNoFragment = yesOrNoFragment;
  }

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectLegend(radioButtons.humanRightsAct.label),
      this.yesOrNoFragment.verifyContent(radioButtons.humanRightsAct.selectorKey),
    ]);
  }

  async selectYes() {
    await this.yesOrNoFragment.selectYes(radioButtons.humanRightsAct.selectorKey);
  }

  async selectNo() {
    await this.yesOrNoFragment.selectNo(radioButtons.humanRightsAct.selectorKey);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
