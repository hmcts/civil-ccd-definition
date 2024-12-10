import BasePageFactory from '../../../../base/base-page-factory';
import ClaimsTrackPage from './claims-track/claims-track-page';
import DrawDirectionsOrderPage from './draw-directions-order/draw-directions-order-page';

export default class StandardDirectionOrderPageFactory extends BasePageFactory {
  get drawDirectionsOrderPage() {
    return new DrawDirectionsOrderPage(this.page);
  }

  get claimsTrackPage() {
    return new ClaimsTrackPage(this.page);
  }
}
