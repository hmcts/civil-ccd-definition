import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import DefendantActionsFactory from '../../../actions/ui/exui/defendant-solicitor/defendant-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { defendantSolicitor2User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';

@AllMethodsStep()
export default class DefendantSolicitor2SpecSteps extends BaseExuiSteps {
  private defendantActionsFactory: DefendantActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    defendantActionsFactory: DefendantActionsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, testData);
    this.defendantActionsFactory = defendantActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(defendantSolicitor2User);
  }

  async SmallTrackFullDefence1v2DSDefendantSolicitor2() {
    await this.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseSpecActions } = this.defendantActionsFactory;
        await defendantResponseSpecActions.respondentChecklistPage();
        await defendantResponseSpecActions.responseConfirmNameAddressDefendantSolicitor2Page();
        await defendantResponseSpecActions.responseConfirmDetailsDefendantSolicitor2Page();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor2Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor2Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor2Page();
        await defendantResponseSpecActions.howToAddTimelineDefendantSolicitor2Page();
        await defendantResponseSpecActions.howToAddTimelineUploadDefendantSolicitor2Page();
        await defendantResponseSpecActions.mediationContactInformationDefendantSolicitor2Page();
        await defendantResponseSpecActions.mediationAvailabilityDefendantSolicitor2Page();
        await defendantResponseSpecActions.smallClaimExpertsDefendantSolicitor2Page();
        await defendantResponseSpecActions.smallClaimWitnessesDefendantSolicitor2Page();
        await defendantResponseSpecActions.languageDefendantSolicitor2Page();
        await defendantResponseSpecActions.smallClaimHearingDefendantSolicitor2Page();
        await defendantResponseSpecActions.requestedCourtLRSpecDefendantSolicitor2Page();
        await defendantResponseSpecActions.hearingSupportDefendantSolicitor2Page();
        await defendantResponseSpecActions.vulnerabilityQuestionsSpecDefendantSolicitor2Page();
        await defendantResponseSpecActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseSpecActions.submitDefendantResponsePage();
        await defendantResponseSpecActions.confirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor2User,
      { verifySuccessEvent: false },
    );
  }
}
