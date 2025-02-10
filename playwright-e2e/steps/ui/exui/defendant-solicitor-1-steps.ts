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
        await defendantResponseActions.confirmDetailsPage();
        await defendantResponseActions.respondentResponseTypeDefendant1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendant1Page();
        await defendantResponseActions.uploadDefendantResponseDefendant1Page();
        await defendantResponseActions.fileDirectionsQuestionaireDefendant1Page();
        await defendantResponseActions.fixedRecoverableCostsPageDefendant1();
        await defendantResponseActions.disclosureOfNonElectronicDocumentsDefendant1Page();
        await defendantResponseActions.expertsDefendant1Page();
        await defendantResponseActions.witnessesDefendant1Page();
        await defendantResponseActions.languageDefendant1Page();
        await defendantResponseActions.hearingDefendant1Page();
        await defendantResponseActions.draftDirectionsDefendant1Page();
        await defendantResponseActions.requestedCourtDefendant1Page();
        await defendantResponseActions.hearingSupportDefendant1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendant1Page();
        await defendantResponseActions.furtherInformationDefendant1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendant1Page();
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

        await defendantResponseActions.confirmDetailsPage();
        await defendantResponseActions.respondentResponseTypeDefendant1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendant1Page();
        await defendantResponseActions.uploadDefendantResponseDefendant1Page();
        await defendantResponseActions.expertsDefendant1Page();
        await defendantResponseActions.witnessesDefendant1Page();
        await defendantResponseActions.languageDefendant1Page();
        await defendantResponseActions.hearingDefendant1Page();
        await defendantResponseActions.draftDirectionsDefendant1Page();
        await defendantResponseActions.requestedCourtDefendant1Page();
        await defendantResponseActions.hearingSupportDefendant1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendant1Page();
        await defendantResponseActions.furtherInformationDefendant1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendant1Page();
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

        await defendantResponseActions.confirmDetailsPage();
        await defendantResponseActions.respondentResponseType2v1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendant1Page();
        await defendantResponseActions.uploadDefendantResponseDefendant1Page();
        await defendantResponseActions.expertsDefendant1Page();
        await defendantResponseActions.witnessesDefendant1Page();
        await defendantResponseActions.languageDefendant1Page();
        await defendantResponseActions.hearingDefendant1Page();
        await defendantResponseActions.draftDirectionsDefendant1Page();
        await defendantResponseActions.requestedCourtDefendant1Page();
        await defendantResponseActions.hearingSupportDefendant1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendant1Page();
        await defendantResponseActions.furtherInformationDefendant1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendant1Page();
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

        await defendantResponseActions.confirmDetailsPage();
        await defendantResponseActions.singleResponsePage();
        await defendantResponseActions.respondentResponseTypeDefendant1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendant1Page();
        await defendantResponseActions.uploadDefendantResponseDefendant1Page();
        await defendantResponseActions.expertsDefendant1Page();
        await defendantResponseActions.witnessesDefendant1Page();
        await defendantResponseActions.languageDefendant1Page();
        await defendantResponseActions.hearingDefendant1Page();
        await defendantResponseActions.draftDirectionsDefendant1Page();
        await defendantResponseActions.requestedCourtDefendant1Page();
        await defendantResponseActions.hearingSupportDefendant1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendant1Page();
        await defendantResponseActions.furtherInformationDefendant1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendant1Page();
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

        await defendantResponseActions.confirmDetailsPage();
        await defendantResponseActions.respondentResponseTypeDefendant1Page();
        await defendantResponseActions.solicitorReferencesDefendantResponseDefendant1Page();
        await defendantResponseActions.uploadDefendantResponseDefendant1Page();
        await defendantResponseActions.expertsDefendant1Page();
        await defendantResponseActions.witnessesDefendant1Page();
        await defendantResponseActions.languageDefendant1Page();
        await defendantResponseActions.hearingDefendant1Page();
        await defendantResponseActions.draftDirectionsDefendant1Page();
        await defendantResponseActions.requestedCourtDefendant1Page();
        await defendantResponseActions.hearingSupportDefendant1Page();
        await defendantResponseActions.vulnerabilityQuestionsDefendant1Page();
        await defendantResponseActions.furtherInformationDefendant1Page();
        await defendantResponseActions.statementOfTruthDefendantResponseDefendant1Page();
        await defendantResponseActions.submitDefendantResponsePage();
        await defendantResponseActions.confirm1v2DSDefendantResponsePage();
      },
      ccdEvents.DEFENDANT_RESPONSE,
      defendantSolicitor1User,
    );
  }
}
