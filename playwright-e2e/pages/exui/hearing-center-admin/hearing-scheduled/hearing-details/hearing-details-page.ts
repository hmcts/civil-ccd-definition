import BasePage from '../../../../../base/base-page.ts';
import ExuiPage from '../../../exui-page/exui-page.ts';
import { AllMethodsStep } from '../../../../../decorators/test-steps.ts';
import preferredCourts from '../../../../../config/preferred-courts.ts';
import partys from '../../../../../constants/users/partys.ts';
import DateHelper from '../../../../../helpers/date-helper.ts';
import { labels, radios, inputs, values } from './hearing-details-content.ts';

@AllMethodsStep()
export default class HearingDetailsPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(labels.venue),
      super.expectLabel(radios.inPerson),
      super.expectLabel(radios.video),
      super.expectLabel(radios.telephone),
      super.expectLabel(labels.startTime),
      super.expectSelector(inputs.duration),
    ]);
  }
  async enterHearingDetails() {
    const hearingDate = DateHelper.addToToday({ days: 2, workingDay: true });
    await super.selectFromDropdown(preferredCourts[partys.CLAIMANT_1.key].hmc!, inputs.venue);
    await super.clickByLabel(radios.inPerson);
    await super.inputText(DateHelper.getTwoDigitDay(hearingDate), inputs.day);
    await super.inputText(DateHelper.getTwoDigitMonth(hearingDate), inputs.month);
    await super.inputText(`${hearingDate.getFullYear()}`, inputs.year);
    await super.selectFromDropdown(values.startTime, inputs.startTime);
    await super.selectFromDropdown(values.duration, inputs.duration);
  }
  async submit() {
    await super.retryClickSubmit();
  }
}
