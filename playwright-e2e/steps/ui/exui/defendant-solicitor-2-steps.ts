import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import DefendantActionsFactory from '../../../actions/ui/exui/defendant-solicitor/defendant-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { defendantSolicitor2User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep()
export default class DefendantSolicitor2Steps extends BaseExuiSteps {
  private defendantActionsFactory: DefendantActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    defendantActionsFactory: DefendantActionsFactory,
  ) {
    super(exuiDashboardActions, idamActions);
    this.defendantActionsFactory = defendantActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(defendantSolicitor2User);
  }

  async RespondSmallTrackFullDefence1v2DS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;

        await defendantResponseActions.confirmDetailsPage();
        await defendantResponseActions.respondentResponseTypeDefendant2Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendant2Page();
        await defendantResponseActions.uploadDefendantResponseDefendant2Page();
        await defendantResponseActions.expertsDefendant2Page();
        await defendantResponseActions.witnessesDefendant2Page();
        await defendantResponseActions.languageDefendant2Page();
        await defendantResponseActions.hearingDefendant2Page();
        await defendantResponseActions.draftDirectionsDefendant2Page();
        await defendantResponseActions.requestedCourtDefendant2Page();
        await defendantResponseActions.hearingSupportDefendant2Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendant2Page();
        await defendantResponseActions.furtherInformationDefendant2Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendant2Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor2User,
    );
  }
}
