import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data';
import ExuiEvent from '../../../../exui-event/exui-event';
import { paragraphs } from './extension-date-content';

@AllMethodsStep()
export default class ExtensionDatePage extends ExuiEvent(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData, extensionDate: Date) {
    await super.runVerifications([
      super.verifyHeadings(ccdCaseData),
      super.expectText(paragraphs.descriptionText, { ignoreDuplicates: true }),
      super.expectText(
        DateHelper.formatDateToString(extensionDate, { outputFormat: 'DD Mon YYYY' }),
      ),
    ]);
  }

  async submit() {
    await super.clickSubmit();
  }
}
