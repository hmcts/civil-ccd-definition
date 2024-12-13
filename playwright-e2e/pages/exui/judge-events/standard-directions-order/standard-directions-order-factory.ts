import BasePageFactory from '../../../../base/base-page-factory';
import ClaimsTrackPage from './claims-track/claims-track-page';
import DisposalHearingPage from './disposal-hearing/disposal-hearing-page';
import DrawDirectionsOrderClaimsTrackPage from './draw-directions-order-claims-track/draw-directions-order-claims-track-page';
import DrawDirectionsOrderPage from './draw-directions-order/draw-directions-order-page';
import FastTrackNoiseInducedHearingLossPage from './fast-track-noise-induced-hearing-loss/fast-track-noise-induced-hearing-loss-page';
import FastTrackPage from './fast-track/fast-track-page';
import OrderPreviewPage from './order-preview/order-preview-page';
import OrderTypePage from './order-type/order-type-page';
import SmallClaimsDisputeResolutionPage from './small-claims-dispute-resolution-hearing/small-claims-dispute-resolution-hearing-page';
import SmallClaimsPage from './small-claims/small-claims-page';
import StandardDirectionsOrderConfirmPage from './standard-directions-order-confirm/standard-directions-order-confirm-page';
import StandardDirectionsOrderSubmitPage from './standard-directions-order-submit/standard-directions-order-submit-page';

export default class StandardDirectionOrderPageFactory extends BasePageFactory {
  get drawDirectionsOrderPage() {
    return new DrawDirectionsOrderPage(this.page);
  }

  get claimsTrackPage() {
    return new ClaimsTrackPage(this.page);
  }

  get drawDirectionsOrderClaimsTrackPage() {
    return new DrawDirectionsOrderClaimsTrackPage(this.page);
  }

  get disposalHearingPage() {
    return new DisposalHearingPage(this.page);
  }

  get fastTrackPage() {
    return new FastTrackPage(this.page);
  }

  get fastTrackNoiseInducedHearingLossPage() {
    return new FastTrackNoiseInducedHearingLossPage(this.page);
  }

  get orderPreviewPage() {
    return new OrderPreviewPage(this.page);
  }

  get smallClaimsPage() {
    return new SmallClaimsPage(this.page);
  }

  get smallClaimsDisputeResolutionHearingPage() {
    return new SmallClaimsDisputeResolutionPage(this.page);
  }

  get standardDirectionsOrderSubmitPage() {
    return new StandardDirectionsOrderSubmitPage(this.page);
  }

  get orderTypePage() {
    return new OrderTypePage(this.page);
  }

  get standarDirectionsOrderConfirmPage() {
    return new StandardDirectionsOrderConfirmPage(this.page);
  }
}
