import BasePage from '../../../../../base/base-page';
import { buttons, heading } from './notify-claim-submit-represented-defendants-content';

export default class NotifyClaimRepresentedDefendantSubmitPage extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([super.expectHeading(heading)]);
  }

  async submit() {
    await super.clickBySelector(buttons.submit.selector);
  }
}
