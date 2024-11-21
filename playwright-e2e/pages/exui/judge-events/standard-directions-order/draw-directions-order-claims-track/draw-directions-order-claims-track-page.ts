import BasePage from '../../../../../base/base-page';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import ExuiEvent from '../../../exui-event/exui-event';
import { checkboxes, paragraph, radioButtons } from './draw-directions-order-claims-track-content';

@AllMethodsStep()
export default class DrawDirectionsOrderClaimsTrackPage extends ExuiEvent(BasePage) {
  async verifyContent(...args: any[]): Promise<void> {
    await super.runVerifications([
      super.verifyHeadings(),
      super.expectText(paragraph),
      super.expectLabel(radioButtons.yes.label),
      super.expectLabel(radioButtons.no.label),
    ]);
  }

  async allocateToSmallClaimsTrack() {
    await super.clickBySelector(radioButtons.yes.selector);
    await super.runVerifications([
      super.expectText(checkboxes.smallClaims.label),
      super.expectText(checkboxes.smallClaims.creditHire.label),
      super.expectText(checkboxes.smallClaims.roadTrafficAccident.label),
      super.expectText(checkboxes.smallClaims.disputeResolutionHearing.label),
      super.expectText(checkboxes.smallClaims.flightDelay.label),
    ]);
  }

  async allocateToFastTrack() {
    await super.clickBySelector(radioButtons.no.selector);
  }

  async submit(...args: any[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
