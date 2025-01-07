import BasePage from '../../../../base/base-page';
import filePaths from '../../../../config/file-paths';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import ExuiPage from '../../exui-page/exui-page';
import {
  defendant1Buttons,
  defendant1Checkboxes,
  defendant1Dropdowns,
  defendant1Heading,
  defendant1Inputs,
  defendant1RadioButtons,
  defendant2Buttons,
  defendant2Checkboxes,
  defendant2Dropdowns,
  defendant2Heading,
  defendant2Inputs,
  defendant2RadioButtons,
} from './certificate-of-service-content';

@AllMethodsStep()
export default class CertificateOfServiceFragment extends ExuiPage(BasePage) {
  async verifyContent() {
    throw new Error('Method not implemented.');
  }

  async verifyDefendant1Content() {
    await super.runVerifications(
      [
        super.expectHeading(defendant1Heading),
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
      ],
      { runAxe: false },
    );
  }

  async verifyDefendant2Content() {
    await super.runVerifications(
      [
        super.expectHeading(defendant2Heading),
        super.expectText(defendant2Inputs.dateDeemedServed.label),
        super.expectText(defendant2Inputs.dateOfService.label),
        super.expectLabel(defendant2Inputs.firm.label),
        super.expectLabel(defendant2Inputs.documentsServed.label),
        super.expectLabel(defendant2Inputs.name.label),
        super.expectLabel(defendant2Inputs.notifyClaimRecipient.label),
        super.expectLabel(defendant2Dropdowns.locationType.label),
        super.expectLabel(defendant2Dropdowns.serveType.label),
        super.expectLabel(defendant2RadioButtons.claimant.label),
        super.expectLabel(defendant2RadioButtons.defendant.label),
        super.expectLabel(defendant2RadioButtons.litigationFriend.label),
        super.expectLabel(defendant2RadioButtons.solicitor.label),
        super.expectText(defendant2Checkboxes.signedTrue.label, { first: true }),
      ],
      { runAxe: false },
    );
  }

  async fillDefendant1CertificateOfService() {
    const dateDeemedServed = DateHelper.getToday();
    const dateOfService = DateHelper.addToToday({ days: 2, workingDay: true });
    await super.inputText(
      DateHelper.getTwoDigitDay(dateDeemedServed),
      defendant1Inputs.dateOfService.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateDeemedServed),
      defendant1Inputs.dateOfService.month.selector,
    );
    await super.inputText(
      dateDeemedServed.getFullYear(),
      defendant1Inputs.dateOfService.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(dateOfService),
      defendant1Inputs.dateDeemedServed.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateOfService),
      defendant1Inputs.dateDeemedServed.month.selector,
    );
    await super.inputText(
      dateOfService.getFullYear(),
      defendant1Inputs.dateDeemedServed.year.selector,
    );
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

  async fillDefendant2CertificateOfService() {
    const dateDeemedServed = DateHelper.subtractFromToday({ days: 14 });
    const dateOfService = DateHelper.subtractFromToday({ days: 14, workingDay: true });
    await super.inputText(
      DateHelper.getTwoDigitDay(dateDeemedServed),
      defendant2Inputs.dateOfService.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateDeemedServed),
      defendant2Inputs.dateOfService.month.selector,
    );
    await super.inputText(
      dateDeemedServed.getFullYear(),
      defendant2Inputs.dateOfService.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(dateOfService),
      defendant2Inputs.dateDeemedServed.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateOfService),
      defendant2Inputs.dateDeemedServed.month.selector,
    );
    await super.inputText(
      dateOfService.getFullYear(),
      defendant2Inputs.dateDeemedServed.year.selector,
    );
    await super.inputText('Test Documents 2', defendant2Inputs.documentsServed.selector);
    await super.inputText('Defendant 2', defendant2Inputs.notifyClaimRecipient.selector);
    await super.selectFromDropdown(
      defendant2Dropdowns.locationType.options[1],
      defendant2Dropdowns.locationType.selector,
    );
    await super.inputText('Test Address 2', defendant2Inputs.documentsServedLocation.selector);
    await super.clickBySelector(defendant2RadioButtons.claimant.selector);
    await super.selectFromDropdown(
      defendant2Dropdowns.serveType.options[1],
      defendant2Dropdowns.serveType.selector,
    );
  }

  async uploadDefendant1SupportingEvidence() {
    await super.clickBySelector(defendant1Buttons.addNewSupportingEvidence.selector);
    await super.retryUploadFile(filePaths.testPdfFile, defendant1Inputs.evidenceDocument.selector);
  }

  async uploadDefendant2SupportingEvidence() {
    await super.clickBySelector(defendant2Buttons.addNewSupportingEvidence.selector);
    await super.retryUploadFile(filePaths.testTextFile, defendant2Inputs.evidenceDocument.selector);
  }

  async fillDefendant1StatementOfTruth() {
    await super.inputText('Name 1', defendant1Inputs.name.selector);
    await super.inputText('Law firm 1', defendant1Inputs.firm.selector);
    await super.clickBySelector(defendant1Checkboxes.signedTrue.selector);
  }

  async fillDefendant2StatementOfTruth() {
    await super.inputText('Name 2', defendant2Inputs.name.selector);
    await super.inputText('Law firm 2', defendant2Inputs.firm.selector);
    await super.clickBySelector(defendant2Checkboxes.signedTrue.selector);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
