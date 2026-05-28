import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import { headings, radios } from './hearing-notice-select-content.ts';

@AllMethodsStep()
export default class HearingNoticeSelectPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectHeading(headings.createHearingNotice),
      super.expectLabel(radios.smallClaimsHearing),
      super.expectLabel(radios.trial),
      super.expectLabel(radios.other),
    ]);
  }
  async selectSmallClaimsHearing() {
    await super.clickByLabel(radios.smallClaimsHearing);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
