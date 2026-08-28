import HearingCenterAdminGaActionsFactory from '../../../actions/ui/ga-exui/hearing-center-admin/hearing-center-admin-ga-actions-factory';
import GaExuiDashboardActions from '../../../actions/ui/ga-exui/common/ga-exui-dashboard-actions';
import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseGaExui from '../../../base/base-ga-exui';
import gaCCDEvents from '../../../constants/ccd-events/ga-ccd-events/ga-ccd-events';
import { hearingCenterAdminRegion1User } from '../../../config/users/exui-users';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import scheduleApplicationHearingFast from '../../../constants/wa-tasks/ga-exui/scheduleApplicationHearingFast';

@AllMethodsStep()
export default class HearingCenterAdminGaSteps extends BaseGaExui {
  private hearingCenterAdminGaActionsFactory: HearingCenterAdminGaActionsFactory;

  constructor(
    gaExuiDashboardActions: GaExuiDashboardActions,
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    hearingCenterAdminGaActionsFactory: HearingCenterAdminGaActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(gaExuiDashboardActions, exuiDashboardActions, idamActions, requestsFactory, testData);
    this.hearingCenterAdminGaActionsFactory = hearingCenterAdminGaActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(hearingCenterAdminRegion1User);
  }

  async NavigateToGaCaseDetails() {
    await super.setDebugTestData();
    await super.gaExuiDashboardActions.goToGaCaseDetails();
  }

  async CreateHearingNotice() {
    const { hearingScheduledGaActions } = this.hearingCenterAdminGaActionsFactory;
    await super.retryGAWaEvent(
      async () => {
        await hearingScheduledGaActions.hearingNoticeGaDetails();
        await hearingScheduledGaActions.hearingDetails();
        await hearingScheduledGaActions.hearingInformation();
        await hearingScheduledGaActions.submitHearingNotice();
      },
      async () => {
        await hearingScheduledGaActions.confirmHearingNotice();
      },
      gaCCDEvents.HEARING_SCHEDULED_GA,
      hearingCenterAdminRegion1User,
      scheduleApplicationHearingFast
    );
  }
}
