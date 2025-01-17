import { Page } from 'playwright-core';
import BasePage from '../../../../base/base-page';
import filePaths from '../../../../config/file-paths';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import ExuiPage from '../../exui-page/exui-page';
import {
  heading,
  inputs,
  buttons,
  checkboxes,
  dropdowns,
  radioButtons,
} from './certificate-of-service-content';
import { Party } from '../../../../models/partys';
import DateFragment from '../date/date-fragment';

@AllMethodsStep()
export default class CertificateOfServiceFragment extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;
  private defendantParty: Party;

  constructor(page: Page, defendantParty: Party) {
    super(page);
    this.dateFragment = new DateFragment(page);
    this.defendantParty = defendantParty;
  }

  async verifyContent() {
    await super.runVerifications(
      [
        super.expectHeading(heading(this.defendantParty)),
        super.expectText(inputs.dateDeemedServed.label),
        super.expectText(inputs.dateDeemedServed.label),
        super.expectLabel(inputs.statementOfTruth.firm.label),
        super.expectLabel(inputs.documentsServed.label),
        super.expectLabel(inputs.statementOfTruth.name.label),
        super.expectLabel(inputs.notifyClaimRecipient.label),
        super.expectLabel(dropdowns.locationType.label),
        super.expectLabel(dropdowns.serveType.label),
        super.expectLabel(radioButtons.docsServed.litigationFriend.label),
        super.expectLabel(radioButtons.docsServed.defendant.label),
        super.expectLabel(radioButtons.docsServed.litigationFriend.label),
        super.expectLabel(radioButtons.docsServed.solicitor.label),
        super.expectText(checkboxes.signedTrue.label, { first: true }),
      ],
      { runAxe: false },
    );
  }

  async fillCertificateOfService() {
    let dateDeemedServed: Date;
    let dateOfService: Date;

    if (this.defendantParty.number === 1) {
      dateDeemedServed = DateHelper.getToday();
      dateOfService = DateHelper.addToToday({ days: 2, workingDay: true });
    } else {
      dateDeemedServed = DateHelper.subtractFromToday({ days: 13 });
      dateOfService = DateHelper.subtractFromToday({ days: 13, workingDay: true });
    }

    await this.dateFragment.enterDate(dateDeemedServed, 'cosDateOfServiceForDefendant');
    await this.dateFragment.enterDate(dateOfService, 'cosDateDeemedServedForDefendant');

    await super.inputText(
      `Test Documents 1 - ${this.defendantParty.key}`,
      inputs.documentsServed.selector(this.defendantParty),
    );
    await super.inputText(
      `Defendant ${this.defendantParty.number}`,
      inputs.notifyClaimRecipient.selector(this.defendantParty),
    );
    await super.selectFromDropdown(
      dropdowns.locationType.options[0],
      dropdowns.locationType.selector(this.defendantParty),
    );
    await super.inputText(
      'Test Address 1',
      inputs.documentsServedLocation.selector(this.defendantParty),
    );
    await super.clickBySelector(radioButtons.docsServed.claimant.selector(this.defendantParty));
    await super.selectFromDropdown(
      dropdowns.serveType.options[0],
      dropdowns.serveType.selector(this.defendantParty),
    );
  }

  async uploadSupportingEvidence() {
    await super.clickBySelector(buttons.addNewSupportingEvidence.selector(this.defendantParty));
    await super.retryUploadFile(
      filePaths.testPdfFile,
      inputs.evidenceDocument.selector(this.defendantParty),
    );
  }

  async fillStatementOfTruth() {
    await super.inputText('Name 1', inputs.statementOfTruth.name.selector(this.defendantParty));
    await super.inputText('Law firm 1', inputs.statementOfTruth.firm.selector(this.defendantParty));
    await super.clickBySelector(checkboxes.signedTrue.selector(this.defendantParty));
  }

  async submit() {
    throw new Error('Method not implemented.');
  }
}
