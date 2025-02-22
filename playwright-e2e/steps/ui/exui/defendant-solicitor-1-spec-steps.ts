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
        await defendantResponseSpecActions.respondentChecklistPage();
        await defendantResponseSpecActions.responseConfirmNameAddressDefendantSolicitor1Page();
        await defendantResponseSpecActions.responseConfirmDetailsDefendantSolicitor1Page();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineUploadDefendantSolicitor1Page();
        await defendantResponseSpecActions.fileDirectionsQuestionaireDefendantSolicitor1Page();
        await defendantResponseSpecActions.fixedRecoverableCostsPageDefendantSolicitor1Page();
        await defendantResponseSpecActions.disclosureOfElectronicDocumentsLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.disclosureOfNonElectronicDocumentsLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.disclosureReportDefendantSolicitor1Page();
        await defendantResponseSpecActions.expertsDefendantSolicitor1Page();
        await defendantResponseSpecActions.witnessesSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.languageDefendantSolicitor1Page();
        await defendantResponseSpecActions.hearingLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.requestedCourtLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseSpecActions.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.applicationDefendantSolicitor1Page();
        await defendantResponseSpecActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseSpecActions.submitDefendantResponsePage();
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
        await defendantResponseSpecActions.respondentChecklistPage();
        await defendantResponseSpecActions.responseConfirmNameAddressDefendantSolicitor1Page();
        await defendantResponseSpecActions.responseConfirmDetailsDefendantSolicitor1Page();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineUploadDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationContactInformationDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationAvailabilityDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimExpertsDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimWitnessesDefendantSolicitor1Page();
        await defendantResponseSpecActions.languageDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimHearingDefendantSolicitor1Page();
        await defendantResponseSpecActions.requestedCourtLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseSpecActions.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseSpecActions.submitDefendantResponsePage();
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
        await defendantResponseSpecActions.respondentChecklistPage();
        await defendantResponseSpecActions.responseConfirmNameAddressDefendantSolicitor1Page();
        await defendantResponseSpecActions.responseConfirmDetailsDefendantSolicitor1Page();
        await defendantResponseSpecActions.singleResponse2v1Page();
        await defendantResponseSpecActions.respondentResponseType2v1SpecPage();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineUploadDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationContactInformationDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationAvailabilityDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimExpertsDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimWitnessesDefendantSolicitor1Page();
        await defendantResponseSpecActions.languageDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimHearingDefendantSolicitor1Page();
        await defendantResponseSpecActions.requestedCourtLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseSpecActions.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
        // await defendantResponseSpecActions.applicationDefendantSolicitor1Page(); //
        await defendantResponseSpecActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseSpecActions.submitDefendantResponsePage();
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
        await defendantResponseSpecActions.respondentChecklistPage();
        await defendantResponseSpecActions.responseConfirmNameAddress1v2Page();
        await defendantResponseSpecActions.responseConfirmDetailsDefendantSolicitor1Page();
        await defendantResponseSpecActions.singleResponsePage();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineUploadDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationContactInformationDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationAvailabilityDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimExpertsDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimWitnessesDefendantSolicitor1Page();
        await defendantResponseSpecActions.languageDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimHearingDefendantSolicitor1Page();
        await defendantResponseSpecActions.requestedCourtLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseSpecActions.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseSpecActions.submitDefendantResponsePage();
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
        await defendantResponseSpecActions.respondentChecklistPage();
        await defendantResponseSpecActions.responseConfirmNameAddressDefendantSolicitor1Page();
        await defendantResponseSpecActions.responseConfirmDetailsDefendantSolicitor1Page();
        await defendantResponseSpecActions.respondentResponseTypeSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.defenceRouteDefendantSolicitor1Page();
        await defendantResponseSpecActions.uploadDefendantResponseSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineDefendantSolicitor1Page();
        await defendantResponseSpecActions.howToAddTimelineUploadDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationContactInformationDefendantSolicitor1Page();
        await defendantResponseSpecActions.mediationAvailabilityDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimExpertsDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimWitnessesDefendantSolicitor1Page();
        await defendantResponseSpecActions.languageDefendantSolicitor1Page();
        await defendantResponseSpecActions.smallClaimHearingDefendantSolicitor1Page();
        await defendantResponseSpecActions.requestedCourtLRSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.hearingSupportDefendantSolicitor1Page();
        await defendantResponseSpecActions.vulnerabilityQuestionsSpecDefendantSolicitor1Page();
        await defendantResponseSpecActions.statementOfTruthDefendantResponseDefendantSolicitor1Page();
        await defendantResponseSpecActions.submitDefendantResponsePage();
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
