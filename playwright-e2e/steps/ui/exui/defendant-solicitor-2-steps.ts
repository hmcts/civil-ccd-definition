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
export default class DefendantSolicitor2Steps extends BaseExui {
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
    const { defendantResponseActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseActions.confirmDetailsDefendantSolicitor2Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor2Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor2Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor2Page();
        await defendantResponseActions.processDefendantSolicitor2DQPages();
        await defendantResponseActions.processDefendantSolicitor2FinalPages();
      },
      async () => {
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor2User,
    );
  }
}
