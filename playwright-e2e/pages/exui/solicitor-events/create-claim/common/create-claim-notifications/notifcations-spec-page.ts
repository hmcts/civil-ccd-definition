import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page';
import { labels, selectors, subHeadings } from './notifcations-spec-content.ts';

@AllMethodsStep()
export default class NotificationsSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subHeadings.notifications),
      super.expectText(labels.currentLoggedInEmail, { ignoreDuplicates: true }),
      super.expectText(labels.useSameEmailForNotifications, { ignoreDuplicates: true }),
      super.expectSelector(selectors.applicantSolicitor1CheckEmailCorrectYes),
      super.expectSelector(selectors.applicantSolicitor1CheckEmailCorrectNo),
    ]);
  }

  async clickUseSameEmailForNotifications() {
    await super.clickBySelector(selectors.applicantSolicitor1CheckEmailCorrectYes);
  }

  async submit() {
    await super.clickSubmit();
  }
}
