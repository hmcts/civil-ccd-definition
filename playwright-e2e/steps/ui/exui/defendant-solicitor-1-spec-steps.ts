import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import DefendantActionsFactory from '../../../actions/ui/exui/defendant-solicitor/defendant-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { defendantSolicitor1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class DefendantSolicitor1SpecSteps extends BaseExui {
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
    await super.idamActions.exuiLogin(defendantSolicitor1User);
  }

  async RespondFastTrackFullDefence1v1() {
    const { defendantResponseSpecActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseSpecActions.processDefendantSolicitor1InitialPages();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.processDefendantSolicitor1TimelinePages();
        await defendantResponseSpecActions.processDefendantSolicitor1FastTrackPages();
        await defendantResponseSpecActions.processDefendantSolicitor1FastTrackDQPages();
        await defendantResponseSpecActions.applicationDefendantSolicitor1Page();
        await defendantResponseSpecActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseSpecActions.confirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallTrackFullDefence1v1() {
    const { defendantResponseSpecActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseSpecActions.processDefendantSolicitor1InitialPages();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.processDefendantSolicitor1TimelinePages();
        await defendantResponseSpecActions.processDefendantSolicitor1MediationPages();
        await defendantResponseSpecActions.processDefendantSolicitor1SmallTrackDQPages();
        await defendantResponseSpecActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseSpecActions.confirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallTrackFullDefence2v1() {
    const { defendantResponseSpecActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseSpecActions.processDefendantSolicitor1InitialPages();
        await defendantResponseSpecActions.singleResponse2v1Page();
        await defendantResponseSpecActions.respondentResponseType2v1SpecPage();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.processDefendantSolicitor1TimelinePages();
        await defendantResponseSpecActions.processDefendantSolicitor1MediationPages();
        await defendantResponseSpecActions.processDefendantSolicitor1SmallTrackDQPages();
        await defendantResponseSpecActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseSpecActions.confirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallTrackFullDefence1v2SS() {
    const { defendantResponseSpecActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseSpecActions.processDefendantSolicitor1InitialPages1v2SS();
        await defendantResponseSpecActions.singleResponsePage();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.processDefendantSolicitor1TimelinePages();
        await defendantResponseSpecActions.processDefendantSolicitor1MediationPages();
        await defendantResponseSpecActions.processDefendantSolicitor1SmallTrackDQPages();
        await defendantResponseSpecActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseSpecActions.confirm1v2SSDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  async RespondSmallTrackFullDefence1v2DS() {
    const { defendantResponseSpecActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseSpecActions.processDefendantSolicitor1InitialPages();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.processDefendantSolicitor1TimelinePages();
        await defendantResponseSpecActions.processDefendantSolicitor1MediationPages();
        await defendantResponseSpecActions.processDefendantSolicitor1SmallTrackDQPages();
        await defendantResponseSpecActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseSpecActions.confirmDefendantResponseSpecPage();
      },
      ccdEvents.DEFENDANT_RESPONSE_SPEC,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }
}
