import BasePage from '../../../../../../base/base-page.ts';
import { AllMethodsStep } from '../../../../../../decorators/test-steps.ts';
import DateHelper from '../../../../../../helpers/date-helper.ts';
import ExuiPage from '../../../../exui-page/exui-page.ts';
import {
  subheadings,
  radioButtons,
  dropdowns,
  inputs,
} from './hearing-support-requirements-field-dj-content.ts';
import DateFragment from '../../../../fragments/date/date-fragment';

@AllMethodsStep()
export default class HearingSupportRequirementsFieldDJPage extends ExuiPage(BasePage) {
  private dateFragment: DateFragment;

  async verifyContent() {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(subheadings.hearingRequirements),
    ]);
  }

  async selectInPerson() {
    await super.clickBySelector(radioButtons.typeOfHearing.inPerson.selector);
  }

  async selectVideo() {
    await super.clickBySelector(radioButtons.typeOfHearing.video.selector);
  }

  async selectTelephone() {
    await super.clickBySelector(radioButtons.typeOfHearing.telephone.selector);
    await super.inputText('Mr Test Person', inputs.telephoneHearing.selector);
  }

  async selectCourtLocation() {
    await super.selectFromDropdown(dropdowns.location.option, dropdowns.location.selector);
  }

  async inputTelephoneNumber() {
    await super.inputText('07464016633', inputs.telephoneNumber.selector);
  }

  async inputEmail() {
    await super.inputText('test@gmail.com', inputs.email.selector);
  }

  async selectYesUnavailableDates() {
    await super.clickBySelector(radioButtons.unavailableDates.yes.selector);
    const unavailableDateFrom = DateHelper.addToToday({ months: 1 });
    await this.dateFragment.enterDate(unavailableDateFrom, inputs.unavailableFrom.selectorKey);
    const unavailableDateTo = DateHelper.addToToday({ months: 2 });
    await this.dateFragment.enterDate(unavailableDateTo, inputs.unavailableTo.selectorKey);
  }

  async selectNoUnavailableDates() {
    await super.clickBySelector(radioButtons.unavailableDates.no.selector);
  }

  async selectYesRequireSupport() {
    await super.clickBySelector(radioButtons.requireSupport.yes.selector);
    await super.inputText('Test support', inputs.supportRequirements.selector);
  }

  async selectRequireNoSupport() {
    await super.clickBySelector(radioButtons.requireSupport.no.selector);
  }

  async submit() {
    await super.clickSubmit();
  }
}
