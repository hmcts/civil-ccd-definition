import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import DefendantActionsFactory from '../../../actions/ui/exui/defendant-solicitor/defendant-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { defendantSolicitor2User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class DefendantSolicitor2SpecSteps extends BaseExui {
  private defendantActionsFactory: DefendantActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    defendantActionsFactory: DefendantActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.defendantActionsFactory = defendantActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(defendantSolicitor2User);
  }

  async RespondSmallTrackFullDefence1v2DS() {
    const { defendantResponseSpecActions } = this.defendantActionsFactory;
    await this.retryExuiEvent(
      async () => {
        await defendantResponseSpecActions.processDefendantSolicitor2InitialPages();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor2Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor2Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor2Page();
        await defendantResponseSpecActions.processDefendantSolicitor2TimelinePages();
        await defendantResponseSpecActions.processDefendantSolicitor2MediationPages();
        await defendantResponseSpecActions.processDefendantSolicitor2SmallTrackDQPages();
        await defendantResponseSpecActions.processDefendantSolicitor1FinalPages()
      },
      async () => {
        await defendantResponseSpecActions.confirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor2User,
      { verifySuccessEvent: false },
    );
  }
}
