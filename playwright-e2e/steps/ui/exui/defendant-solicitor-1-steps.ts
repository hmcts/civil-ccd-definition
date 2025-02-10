import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import DefendantActionsFactory from '../../../actions/ui/exui/defendant-solicitor/defendant-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExuiSteps from '../../../base/base-exui-steps';
import { defendantSolicitor1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';

@AllMethodsStep()
export default class DefendantSolicitor1Steps extends BaseExuiSteps {
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
    await super.idamActions.exuiLogin(defendantSolicitor1User);
  }

  async RespondFastTrackFullDefence1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;
        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.fileDirectionsQuestionaireDefendantSolicitor1Page();
        await defendantResponseActions.fixedRecoverableCostsPageDefendantSolicitor1();
        await defendantResponseActions.disclosureOfNonElectronicDocumentsDefendantSolicitor1Page();
        await defendantResponseActions.expertsDefendantSolicitor1Page();
        await defendantResponseActions.witnessesDefendantSolicitor1Page();
        await defendantResponseActions.languageDefendantSolicitor1Page();
        await defendantResponseActions.hearingDefendantSolicitor1Page();
        await defendantResponseActions.draftDirectionsDefendantSolicitor1Page();
        await defendantResponseActions.requestedCourtDefendantSolicitor1Page();
        await defendantResponseActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendantSolicitor1Page();
        await defendantResponseActions.furtherInformationDefendantSolicitor1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence1v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;

        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.expertsDefendantSolicitor1Page();
        await defendantResponseActions.witnessesDefendantSolicitor1Page();
        await defendantResponseActions.languageDefendantSolicitor1Page();
        await defendantResponseActions.hearingDefendantSolicitor1Page();
        await defendantResponseActions.draftDirectionsDefendantSolicitor1Page();
        await defendantResponseActions.requestedCourtDefendantSolicitor1Page();
        await defendantResponseActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendantSolicitor1Page();
        await defendantResponseActions.furtherInformationDefendantSolicitor1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence2v1() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;

        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseType2v1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.expertsDefendantSolicitor1Page();
        await defendantResponseActions.witnessesDefendantSolicitor1Page();
        await defendantResponseActions.languageDefendantSolicitor1Page();
        await defendantResponseActions.hearingDefendantSolicitor1Page();
        await defendantResponseActions.draftDirectionsDefendantSolicitor1Page();
        await defendantResponseActions.requestedCourtDefendantSolicitor1Page();
        await defendantResponseActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendantSolicitor1Page();
        await defendantResponseActions.furtherInformationDefendantSolicitor1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence1v2SS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;

        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.singleResponsePage();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.expertsDefendantSolicitor1Page();
        await defendantResponseActions.witnessesDefendantSolicitor1Page();
        await defendantResponseActions.languageDefendantSolicitor1Page();
        await defendantResponseActions.hearingDefendantSolicitor1Page();
        await defendantResponseActions.draftDirectionsDefendantSolicitor1Page();
        await defendantResponseActions.requestedCourtDefendantSolicitor1Page();
        await defendantResponseActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendantSolicitor1Page();
        await defendantResponseActions.furtherInformationDefendantSolicitor1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirmDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }

  async RespondSmallTrackFullDefence1v2DS() {
    await super.exuiDashboardActions.retryExuiEvent(
      async () => {
        const { defendantResponseActions } = this.defendantActionsFactory;

        await defendantResponseActions.confirmDetailsDefendantSolicitor1Page();
        await defendantResponseActions.respondentResponseTypeDefendantSolicitor1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.uploadDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.expertsDefendantSolicitor1Page();
        await defendantResponseActions.witnessesDefendantSolicitor1Page();
        await defendantResponseActions.languageDefendantSolicitor1Page();
        await defendantResponseActions.hearingDefendantSolicitor1Page();
        await defendantResponseActions.draftDirectionsDefendantSolicitor1Page();
        await defendantResponseActions.requestedCourtDefendantSolicitor1Page();
        await defendantResponseActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendantSolicitor1Page();
        await defendantResponseActions.furtherInformationDefendantSolicitor1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirm1v2DSDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }
}
