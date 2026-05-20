import { Page } from 'playwright';
import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import DateHelper from '../../../../../../helpers/date-helper';
import ExuiPage from '../../../../exui-page/exui-page';
import DateFragment from '../../../../fragments/date/date-fragment';
import { inputs, radioButtons, subheadings, dropdowns } from './flight-delay-claim-content';

@AllMethodsStep()
export default class FlightDelayClaimPage extends ExuiPage(BasePage) {
  dateFragment: DateFragment;

  constructor(page: Page, dateFragment: DateFragment) {
    super(page);
    this.dateFragment = dateFragment;
  }


  async verifyContent() {
    await super.runVerifications([
      super.expectSubheading(subheadings.airlineClaim),
      super.expectRadioYesLabel(radioButtons.flightDelay.yes.selector),
      super.expectRadioNoLabel(radioButtons.flightDelay.no.selector),
    ]);
  }

  async selectYes() {
    await super.clickBySelector(radioButtons.flightDelay.yes.selector);
  }

  async selectNo() {
    await super.clickBySelector(radioButtons.flightDelay.no.selector);
  }

  async enterFlightDetails() {
    const date = DateHelper.subtractFromToday({months: 1});
    await super.selectFromDropdown(dropdowns.airline.options.klm, dropdowns.airline.selector);
    await super.inputText('10001', inputs.flightNumber.selector);
    this.dateFragment.enterDate(date, inputs.dateOfFlight.selectorKey);
  }

  async submit() {
    await super.retryClickSubmit(() =>
      super.expectNoText(subheadings.airlineClaim, { timeout: 500 }),
    );
  }
}
