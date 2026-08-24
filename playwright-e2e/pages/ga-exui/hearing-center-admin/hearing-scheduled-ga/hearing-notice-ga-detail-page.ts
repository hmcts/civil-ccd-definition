import BasePage from '../../../../base/base-page';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import DateHelper from '../../../../helpers/date-helper';
import GaCCDCaseData from '../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../mixin-pages/ga-exui-page/ga-exui-page';
import { dropdowns, inputs } from './hearing-notice-ga-detail-content';

@AllMethodsStep()
export default class HearingNoticeGaDetailPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectLabel(dropdowns.applicationDetails.label),
      super.expectLabel(inputs.applicationType.label),
      super.expectSelector(inputs.applicationDate.day.selector),
      super.expectSelector(inputs.applicationDate.month.selector),
      super.expectSelector(inputs.applicationDate.year.selector),
    ]);
  }

  async enterApplicationDetails() {
    const applicationDate = DateHelper.addToToday({ days: 1 });
    await super.selectFromDropdown(
      dropdowns.applicationDetails.option,
      dropdowns.applicationDetails.selector,
    );
    await super.inputText('Test App type', inputs.applicationType.selector);
    await super.inputText(
      DateHelper.getTwoDigitDay(applicationDate),
      inputs.applicationDate.day.selector,
    );
    await super.inputText(
      DateHelper.getTwoDigitMonth(applicationDate),
      inputs.applicationDate.month.selector,
    );
    await super.inputText(applicationDate.getFullYear(), inputs.applicationDate.year.selector);
    await super.blurSelector(inputs.applicationDate.year.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
