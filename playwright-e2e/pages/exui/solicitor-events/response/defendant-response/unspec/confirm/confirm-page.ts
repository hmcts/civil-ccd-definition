import { Page } from 'playwright-core';
import { Party } from '../../../../../../../models/partys.ts';
import BasePage from '../../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../../decorators/test-steps.ts';
import CCDCaseData from '../../../../../../../models/ccd/ccd-case-data.ts';
import ExuiPage from '../../../../../exui-page/exui-page.ts';
import { getText } from './confirm-content.ts';
import DateHelper from '../../../../../../../helpers/date-helper.ts';

@AllMethodsStep()
export default class ConfirmUnspecPage extends ExuiPage(BasePage) {
  private party: Party;

  constructor(page: Page, party: Party) {
    super(page);
    this.party = party;
  }

  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async verifyTextGreenBox(ccdCaseData: CCDCaseData) {
    super.expectText(getText.greenText.text(ccdCaseData.legacyCaseReference));
  }

  async verifyDateText(ccdCaseData: CCDCaseData) {
    const extensionDate = DateHelper.addToDate(ccdCaseData.respondent1ResponseDeadline, {
      days: 28,
      workingDay: true,
    });
    const formatDate = DateHelper.formatDateToString(extensionDate, {
      outputFormat: 'DD Month YYYY',
    });
    super.expectText(getText.dateText.text(formatDate));
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
