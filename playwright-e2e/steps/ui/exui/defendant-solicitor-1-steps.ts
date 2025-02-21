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
export default class DefendantSolicitor1Steps extends BaseExui {
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
    const { defendantResponseActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.processDefendantSolicitor1FastTrackPages();
        await defendantResponseActions.processDefendantSolicitor1DQPages();
        await defendantResponseActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence1v1() {
    const { defendantResponseActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.processDefendantSolicitor1DQPages();
        await defendantResponseActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence2v1() {
    const { defendantResponseActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseType2v1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.processDefendantSolicitor1DQPages();
        await defendantResponseActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence1v2SS() {
    const { defendantResponseActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.singleResponsePage();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.processDefendantSolicitor1DQPages();
        await defendantResponseActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence1v2DS() {
    const { defendantResponseActions } = this.defendantActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.processDefendantSolicitor1DQPages();
        await defendantResponseActions.processDefendantSolicitor1FinalPages();
      },
      async () => {
        await defendantResponseActions.confirm1v2DSDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }
}
