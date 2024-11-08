import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import {
  buttons,
  defendant1Checkboxes,
  defendant1Dropdowns,
  defendant1Heading,
  defendant1Inputs,
  defendant1RadioButtons,
  defendant2Dropdowns,
  defendant2Heading,
  defendant2Inputs,
  defendant2RadioButtons,
  heading1,
} from './notify-claim-content';

@AllMethodsStep()
export default class NotifyClaimFragment extends BasePage {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.expectHeading(heading1),
      super.expectText(defendant1Inputs.dateDeemedServed.label),
      super.expectText(defendant1Inputs.dateOfService.label),
      super.expectLabel(defendant1Inputs.firm.label),
      super.expectLabel(defendant1Inputs.documentsServed.label),
      super.expectLabel(defendant1Inputs.name.label),
      super.expectLabel(defendant1Inputs.notifyClaimRecipient.label),
      super.expectLabel(defendant1Dropdowns.locationType.label),
      super.expectLabel(defendant1Dropdowns.serveType.label),
      super.expectLabel(defendant1RadioButtons.claimant.label),
      super.expectLabel(defendant1RadioButtons.defendant.label),
      super.expectLabel(defendant1RadioButtons.litigationFriend.label),
      super.expectLabel(defendant1RadioButtons.solicitor.label),
      super.expectText(defendant1Checkboxes.signedTrue.label, { first: true }),
    ]);
  }

  async verifyDefendant1Content() {
    await super.expectHeading(defendant1Heading);
  }

  async verifyDefendant2Content() {
    await super.expectHeading(defendant2Heading);
  }

  async fillDefendant1NotifyClaim() {
    const day1 = new Date();
    const day2 = DateHelper.subtractFromToday({ days: 1 });
    await super.inputText(String(day1.getDate()), defendant1Inputs.dateDeemedServed.day.selector);
    await super.inputText(
      String(day1.getMonth() + 1),
      defendant1Inputs.dateDeemedServed.month.selector,
    );
    await super.inputText(
      String(day1.getFullYear()),
      defendant1Inputs.dateDeemedServed.year.selector,
    );
    await super.inputText(String(day2.getDate()), defendant1Inputs.dateOfService.day.selector);
    await super.inputText(
      String(day2.getMonth() + 1),
      defendant1Inputs.dateOfService.month.selector,
    );
    await super.inputText(String(day2.getFullYear()), defendant1Inputs.dateOfService.year.selector);
    await super.inputText('Test Documents 1', defendant1Inputs.documentsServed.selector);
    await super.inputText('Defendant 1', defendant1Inputs.notifyClaimRecipient.selector);
    await super.selectFromDropdown(
      defendant1Dropdowns.locationType.options[0],
      defendant1Dropdowns.locationType.selector,
    );
    await super.inputText('Test Address 1', defendant1Inputs.documentsServedLocation.selector);
    await super.clickBySelector(defendant1RadioButtons.claimant.selector);
    await super.selectFromDropdown(
      defendant1Dropdowns.serveType.options[0],
      defendant1Dropdowns.serveType.selector,
    );
  }

  async fillDefendant2NotifyClaim() {
    const day1 = DateHelper.subtractFromToday({ days: 2 });
    const day2 = DateHelper.subtractFromToday({ days: 3 });
    await super.inputText(String(day1.getDate()), defendant2Inputs.dateDeemedServed.day.selector);
    await super.inputText(
      String(day1.getMonth() + 1),
      defendant2Inputs.dateDeemedServed.month.selector,
    );
    await super.inputText(
      String(day1.getFullYear()),
      defendant2Inputs.dateDeemedServed.year.selector,
    );
    await super.inputText(String(day2.getDate()), defendant2Inputs.dateOfService.day.selector);
    await super.inputText(
      String(day2.getMonth() + 1),
      defendant2Inputs.dateOfService.month.selector,
    );
    await super.inputText(String(day2.getFullYear()), defendant2Inputs.dateOfService.year.selector);
    await super.inputText('Test Documents 2', defendant2Inputs.documentsServed.selector);
    await super.inputText('Defendant 2', defendant2Inputs.notifyClaimRecipient.selector);
    await super.selectFromDropdown(
      defendant2Dropdowns.locationType.options[0],
      defendant2Dropdowns.locationType.selector,
    );
    await super.inputText('Test Address 2', defendant2Inputs.documentsServedLocation.selector);
    await super.clickBySelector(defendant2RadioButtons.claimant.selector);
    await super.selectFromDropdown(
      defendant2Dropdowns.serveType.options[0],
      defendant2Dropdowns.serveType.selector,
    );
  }

  async fillDefendant1StatementOfTruth() {
    await super.inputText('Name 1', defendant1Inputs.name.selector);
    await super.inputText('Law firm 1', defendant1Inputs.firm.selector);
    await super.clickBySelector(defendant1Checkboxes.signedTrue.selector);
  }

  async fillDefendant2StatementOfTruth() {
    await super.inputText('Name 2', defendant2Inputs.name.selector);
    await super.inputText('Law firm 2', defendant2Inputs.firm.selector);
    await super.clickBySelector(defendant1Checkboxes.signedTrue.selector);
  }

  async continue() {
    await super.clickBySelector(buttons.continue.selector);
  }
}
