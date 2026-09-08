import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import HearingScheduledGaPageFactory from '../../../../pages/ga-exui/hearing-center-admin/hearing-scheduled-ga/hearing-scheduled-ga-page-factory';
import HearingScheduledGaActions from './hearing-scheduled-ga/hearing-scheduled-ga-actions';

export default class HearingCenterAdminGaActionsFactory extends BasePageActionsFactory {
  get hearingScheduledGaActions() {
    return new HearingScheduledGaActions(new HearingScheduledGaPageFactory(this.page), this.testData);
  }
}
