import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { dropdowns, inputs, radioButtons } from './hearing-scheduled-ga-hearing-details-content';

@AllMethodsStep()
export default class HearingScheduledGaHearingDetailsPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectLabel(dropdowns.location.label),
      super.expectLabel(radioButtons.channel.label),
      super.expectSelector(inputs.hearingDate.day.selector),
      super.expectSelector(inputs.hearingDate.month.selector),
      super.expectSelector(inputs.hearingDate.year.selector),
      super.expectLabel(dropdowns.time.label),
      super.expectLabel(dropdowns.duration.label),
    ]);
  }

  async enterHearingDetails() {
    const hearingDate = DateHelper.addToToday({ days: 2 });
    await super.selectFromDropdown(
      dropdowns.location.options.centralLondon,
      dropdowns.location.selector,
    );
    await super.clickBySelector(radioButtons.channel.inPerson.selector);
    await super.inputText(DateHelper.getTwoDigitDay(hearingDate), inputs.hearingDate.day.selector);
    await super.inputText(
      DateHelper.getTwoDigitMonth(hearingDate),
      inputs.hearingDate.month.selector,
    );
    await super.inputText(hearingDate.getFullYear(), inputs.hearingDate.year.selector);
    await super.blurSelector(inputs.hearingDate.year.selector);
    await super.selectFromDropdown(dropdowns.time.options.nineAm, dropdowns.time.selector);
    await super.selectFromDropdown(
      dropdowns.duration.options.thirtyMinutes,
      dropdowns.duration.selector,
    );
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
