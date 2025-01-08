import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import filePaths from '../../../../config/file-paths';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import ExuiPage from '../../exui-page/exui-page';
import {
  getDefendantHeading,
  getInputs,
  getButtons,
  getCheckboxes,
  getDropdowns,
  getRadioButtons,
} from './certificate-of-service-content';

@AllMethodsStep()
export default class CertificateOfServiceFragment extends ExuiPage(BasePage) {
  private defendantNumber: number;

  constructor(page: Page, defendantNumber: number) {
    super(page);
    this.defendantNumber = defendantNumber;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectHeading(getDefendantHeading(this.defendantNumber)),
        super.expectText(getInputs(this.defendantNumber).dateDeemedServed.label),
        super.expectText(getInputs(this.defendantNumber).dateDeemedServed.label),
        super.expectLabel(getInputs(this.defendantNumber).statementOfTruth.firm.label),
        super.expectLabel(getInputs(this.defendantNumber).documentsServed.label),
        super.expectLabel(getInputs(this.defendantNumber).statementOfTruth.name.label),
        super.expectLabel(getInputs(this.defendantNumber).notifyClaimRecipient.label),
        super.expectLabel(getDropdowns(this.defendantNumber).locationType.label),
        super.expectLabel(getDropdowns(this.defendantNumber).serveType.label),
        super.expectLabel(getRadioButtons(this.defendantNumber).docsServed.litigationFriend.label),
        super.expectLabel(getRadioButtons(this.defendantNumber).docsServed.defendant.label),
        super.expectLabel(getRadioButtons(this.defendantNumber).docsServed.litigationFriend.label),
        super.expectLabel(getRadioButtons(this.defendantNumber).docsServed.solicitor.label),
        super.expectText(getCheckboxes(this.defendantNumber).signedTrue.label, { first: true }),
      ],
      { runAxe: false },
    );
  }

  async fillCertificateOfService() {
    let dateDeemedServed: Date;
    let dateOfService: Date;

    if (this.defendantNumber === 1) {
      dateDeemedServed = DateHelper.getToday();
      dateOfService = DateHelper.addToToday({ days: 2, workingDay: true });
    } else {
      dateDeemedServed = DateHelper.subtractFromToday({ days: 14 });
      dateOfService = DateHelper.subtractFromToday({ days: 14, workingDay: true });
    }

    await super.inputText(
      DateHelper.getTwoDigitDay(dateDeemedServed),
      getInputs(this.defendantNumber).dateOfService.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateDeemedServed),
      getInputs(this.defendantNumber).dateOfService.month.selector,
    );
    await super.inputText(
      dateDeemedServed.getFullYear(),
      getInputs(this.defendantNumber).dateOfService.year.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitDay(dateOfService),
      getInputs(this.defendantNumber).dateDeemedServed.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(dateOfService),
      getInputs(this.defendantNumber).dateDeemedServed.month.selector,
    );
    await super.inputText(
      dateOfService.getFullYear(),
      getInputs(this.defendantNumber).dateDeemedServed.year.selector,
    );
    await super.inputText(
      'Test Documents 1',
      getInputs(this.defendantNumber).documentsServed.selector,
    );
    await super.inputText(
      'Defendant 1',
      getInputs(this.defendantNumber).notifyClaimRecipient.selector,
    );
    await super.selectFromDropdown(
      getDropdowns(this.defendantNumber).locationType.options[0],
      getDropdowns(this.defendantNumber).locationType.selector,
    );
    await super.inputText(
      'Test Address 1',
      getInputs(this.defendantNumber).documentsServedLocation.selector,
    );
    await super.clickBySelector(getRadioButtons(this.defendantNumber).docsServed.claimant.selector);
    await super.selectFromDropdown(
      getDropdowns(this.defendantNumber).serveType.options[0],
      getDropdowns(this.defendantNumber).serveType.selector,
    );
  }

  async uploadSupportingEvidence() {
    await super.clickBySelector(getButtons(this.defendantNumber).addNewSupportingEvidence.selector);
    await super.retryUploadFile(
      filePaths.testPdfFile,
      getInputs(this.defendantNumber).evidenceDocument.selector,
    );
  }

  async fillStatementOfTruth() {
    await super.inputText('Name 1', getInputs(this.defendantNumber).statementOfTruth.name.selector);
    await super.inputText(
      'Law firm 1',
      getInputs(this.defendantNumber).statementOfTruth.firm.selector,
    );
    await super.clickBySelector(getCheckboxes(this.defendantNumber).signedTrue.selector);
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
