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
    await super.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;

        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor2Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor2Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor2Page();
        await defendantResponseActions.expertsDefendantSolicitor2Page();
        await defendantResponseActions.witnessesDefendantSolicitor2Page();
        await defendantResponseActions.languageDefendantSolicitor2Page();
        await defendantResponseActions.hearingDefendantSolicitor2Page();
        await defendantResponseActions.draftDirectionsDefendantSolicitor2Page();
        await defendantResponseActions.requestedCourtDefendantSolicitor2Page();
        await defendantResponseActions.hearingSupportDefendantSolicitor2Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendantSolicitor2Page();
        await defendantResponseActions.furtherInformationDefendantSolicitor2Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendantSolicitor2Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor2User,
    );
  }
}
