import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import DateHelper from '../../../../../helpers/date-helper';
import GaCCDCaseData from '../../../../../models/ga-ccd-case-data';
import GaExuiPage from '../../../mixin-pages/ga-exui-page/ga-exui-page';
import { subheadings, inputs, radioButtons, checkboxes} from './resp-hearing-screen-content';

@AllMethodsStep()
export default class RespHearingScreenPage extends GaExuiPage(BasePage) {
  async verifyContent(gaCaseData: GaCCDCaseData) {
    await super.runVerifications([
      super.verifyHeadings(gaCaseData),
      super.expectText(subheadings.scheduledHearingsAndTrials),
      super.expectLegend(radioButtons.otherHearingScheduled.legend),
      super.expectLegend(radioButtons.trial.legend),
      super.expectLabel(radioButtons.typeOfHearing.label),
      super.expectLabel(inputs.reason.label),
      super.expectLabel(inputs.phone.label),
      super.expectLabel(inputs.email.label),
      super.expectLegend(radioButtons.unavailableDates.legend),
      super.expectLegend(radioButtons.vulnerability.legend),
    ]);
  }

  async enterDetails() {
    const year = DateHelper.addToToday({ years: 1 }).getFullYear();
    await super.clickBySelector(radioButtons.otherHearingScheduled.yes.selector);
    await super.clickBySelector(radioButtons.trial.yes.selector);
    await super.clickBySelector(radioButtons.typeOfHearing.inPerson.selector);

    await super.inputText('1', inputs.hearingDate.day);
    await super.inputText('10', inputs.hearingDate.month);
    await super.inputText(year, inputs.hearingDate.year);

    await super.inputText('1', inputs.trialFrom.day);
    await super.inputText('10', inputs.trialFrom.month);
    await super.inputText(year, inputs.trialFrom.year);
    await super.inputText('1', inputs.trialTo.day);
    await super.inputText('12', inputs.trialTo.month);
    await super.inputText(year, inputs.trialTo.year);

    await super.inputText('Test Test', inputs.reason.selector);
    await super.inputText('07446775177', inputs.phone.selector);
    await super.inputText('test@gmail.com', inputs.email.selector);

    await super.clickBySelector(radioButtons.hearingDuration.fortyFiveMinutes.selector);
    await super.clickBySelector(radioButtons.unavailableDates.no.selector);
    await super.clickBySelector(radioButtons.vulnerability.no.selector);
    await super.clickBySelector(checkboxes.supportRequirements.signLanguageInterpreter.selector);
    await super.inputText('SignLanguage', inputs.signLanguage.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
