import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import {
  buttons,
  heading1,
  heading2,
  subheading1,
  table,
} from './notify-claim-check-your-answers-content';

@AllMethodsStep()
export default class NotifyClaimCheckYourAnswersFragment extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading1),
      super.expectHeading(heading2),
      super.expectSubheading(subheading1),
      super.expectText(table.dateDeemedServed.label),
      super.expectText(table.dateOfService.label),
      super.expectText(table.documentsServed.label),
      super.expectText(table.documentsServedLocation.label),
      super.expectText(table.name.label),
      super.expectText(table.firm.label),
      super.expectText(table.locationType.label),
      super.expectText(table.notifyClaimRecipient.label),
      super.expectText(table.serveType.label),
    ]);
  }

  async checkDefendant1Answers() {
    const day1 = new Date();
    const day2 = DateHelper.subtractFromToday({ days: 1 });
    await super.expectText(DateHelper.formatDateDayShortMonthYear(day1));
    await super.expectText(DateHelper.formatDateDayShortMonthYear(day2));
    await super.expectText(table.documentsServed.defendant1Answer);
    await super.expectText(table.documentsServedLocation.defendant1Answer);
    await super.expectText(table.name.defendant1Answer);
    await super.expectText(table.firm.defendant1Answer);
    await super.expectText(table.locationType.defendant1Answer);
    await super.expectText(table.notifyClaimRecipient.defendant1Answer);
    await super.expectText(table.serveType.defendant1Answer);
  }

  async checkDefendant2Answers() {
    const day1 = new Date();
    const day2 = DateHelper.subtractFromToday({ days: 1 });
    await super.expectText(DateHelper.formatDateDayShortMonthYear(day1));
    await super.expectText(DateHelper.formatDateDayShortMonthYear(day2));
    await super.expectText(table.documentsServed.defendant2Answer);
    await super.expectText(table.documentsServedLocation.defendant2Answer);
    await super.expectText(table.name.defendant2Answer);
    await super.expectText(table.firm.defendant2Answer);
    await super.expectText(table.locationType.defendant2Answer);
    await super.expectText(table.notifyClaimRecipient.defendant2Answer);
    await super.expectText(table.serveType.defendant2Answer);
  }

  async submit() {
    await super.clickBySelector(buttons.submit.selector);
  }
}
