import BasePage from '../../../../../base/base-page';
import { buttons, heading, text } from './notify-claim-represented-defendants-continue-content';

export default class NotifyClaimRepresentedDefendantContinuePage extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([super.expectHeading(heading), super.expectText(text)]);
  }

  async continue() {
    await super.clickBySelector(buttons.continue.selector);
  }
}
