import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd-case-data';
import ExuiPage from '../../../../exui-page/exui-page';
import { paragraphs } from './extension-date-content';

@AllMethodsStep()
export default class ExtensionDatePage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    const isMultiPartyExtension =
      Boolean(ccdCaseData.respondent2AcknowledgeNotificationDate) ||
      Boolean(ccdCaseData.applicant2);
    const extensionDate = DateHelper.addToDate(ccdCaseData.claimDetailsNotificationDate!, {
      days: isMultiPartyExtension ? 56 : 42,
      workingDay: true,
    });

    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraphs.descriptionText, { count: 1 }),
      super.expectText(
        DateHelper.formatDateToString(extensionDate, { outputFormat: 'DD Mon YYYY' }),
      ),
    ]);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
