import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  hearingTypeRadio,
  locationDropdown,
  input,
  cannotAttendRadio,
  buttons,
  dateRange,
  requireSupportRadio,
} from './hearing-support-requirments-field-content.ts';
import CCDCaseData from '../../../../../../models/ccd/ccd-case-data.ts';

@AllMethodsStep()
export default class HearingSupportRequirementsFieldPage extends ExuiPage(BasePage) {
  async verifyContent(ccdCaseData: CCDCaseData) {
    await super.runVerifications([super.verifyHeadings(ccdCaseData)]);
  }

  async selectInPerson() {
    await super.clickBySelector(hearingTypeRadio.inPerson.selector);
  }

  async selectVideo() {
    await super.clickBySelector(hearingTypeRadio.video.selector);
  }

  async selectTelephone() {
    await super.clickBySelector(hearingTypeRadio.telephone.selector);
    await super.inputText('Test', hearingTypeRadio.telephone.textAreaSelector);
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(locationDropdown.option, locationDropdown.selector);
  }

  async inputTelephoneNumber() {
    await super.inputText('07464016633', input.telephoneNumber);
  }

  async inputEmail() {
    await super.inputText('test@gmail.com', input.email);
  }

  async selectYesCannotAttend() {
    await super.clickBySelector(cannotAttendRadio.yes.selector);
  }

  async addNewUnavailableDate() {
    await super.clickBySelector(buttons.selector);
    await super.inputText('01', dateRange.dayFrom);
    await super.inputText('01', dateRange.monthFrom);
    await super.inputText('2022', dateRange.yearFrom);
    await super.inputText('01', dateRange.dateTo);
    await super.inputText('01', dateRange.monthTo);
    await super.inputText('2022', dateRange.yearTo);
  }

  async selectNoCannotAttend() {
    await super.clickBySelector(cannotAttendRadio.no.selector);
  }

  async selectYesRequireSupport() {
    await super.clickBySelector(requireSupportRadio.yes.selector);
    await super.inputText('Test', requireSupportRadio.yes.textAreaSelector);
  }

  async selectNoRequireSupport() {
    await super.clickBySelector(requireSupportRadio.no.selector);
  }

  async submit() {
    await super.retryClickSubmit();
  }
}
