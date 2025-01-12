import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import { inputs, radioButtons, subHeadings } from './notifcations-content.ts';

@AllMethodsStep()
export default class NotificationsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.notifications),
      super.expectText(radioButtons.sameEmailForNotifications.label, { ignoreDuplicates: true }),
      super.expectSelector(radioButtons.sameEmailForNotifications.yes.selector),
      super.expectSelector(radioButtons.sameEmailForNotifications.no.selector),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.sameEmailForNotifications.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.sameEmailForNotifications.no.selector);
    await super.expectSubheading(subHeadings.notificationDetails);
    await super.expectLabel(inputs.email.label);
    await super.inputText('civilmoneyclaimsdemo@gmail.com', inputs.email.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
