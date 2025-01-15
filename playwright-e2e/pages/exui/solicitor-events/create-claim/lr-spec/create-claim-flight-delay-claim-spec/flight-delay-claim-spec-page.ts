import BasePage from '../../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../../decorators/test-steps';
import ExuiPage from '../../../../exui-page/exui-page';
import { selectors, subHeadings } from './flight-delay-claim-spec-content';

@AllMethodsStep()
export default class FlightDelayClaimSpecPage extends ExuiPage(BasePage) {
  async verifyContent() {
    await super.runVerifications([
      super.expectText(subHeadings.airlineClaim),
      super.expectSelector(selectors.isFlightDelayClaimYes),
      super.expectSelector(selectors.isFlightDelayClaimNo),
    ]);
  }

  async clickIsFlightDelayClaimNo() {
    await super.clickBySelector(selectors.isFlightDelayClaimNo);
  }

  async submit() {
    await super.clickSubmit();
  }
}
