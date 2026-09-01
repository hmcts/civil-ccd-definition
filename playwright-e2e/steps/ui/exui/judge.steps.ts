import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeLAActionsFactory from '../../../actions/ui/exui/judge-la/judge-la-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import { judgeRegion1User, judgeRegion2User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events/ccd-events';
import CaseState from '../../../constants/cases/case-state';
import nihlFastTrackDirectionsTask from '../../../constants/wa-tasks/exui/nihlFastTrackDirectionsTask';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/exui/fastTrackDirectionsTask';
import smallClaimDirectionsTask from '../../../constants/wa-tasks/exui/smallClaimDirectionsTask';
import summaryJudgmentDirections from '../../../constants/wa-tasks/exui/summaryJudgmentDirectionsTask';
import defenceReceivedInTimeOrderThatJudgmentIsSetAside from '../../../constants/wa-tasks/exui/defenceReceivedInTimeOrderThatJudgmentIsSetAside';
import decisionOnReconsiderationRequestTask from '../../../constants/wa-tasks/exui/decisionOnReconsiderationRequestTask';
import multiTrackDirectionsTask from '../../../constants/wa-tasks/exui/multiTrackDirectionsTask';

@AllMethodsStep()
export default class JudgeSteps extends BaseExui {
  private judgeLaActionsFactory: JudgeLAActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeLaActionsFactory: JudgeLAActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.judgeLaActionsFactory = judgeLaActionsFactory;
  }

  async LoginRegion1() {
    await super.idamActions.exuiLogin(judgeRegion1User);
  }

  async LoginRegion2() {
    await super.idamActions.exuiLogin(judgeRegion2User);
  }

  async SdoSmallSum() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementYes();
        await sdoActions.selectSmallTrackSum();
        await sdoActions.smallTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoSmallNoSum() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementNo();
        await sdoActions.selectSmallClaimNoSum();
        await sdoActions.smallTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoSmallNoSumOtherRemedy() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementNo();
        await sdoActions.selectSmallClaimNoSumOtherRemedy();
        await sdoActions.smallTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
    );
  }

  async SdoSmallFromFastClaim() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementYes();
        await sdoActions.selectSmallTrackSum();
        await sdoActions.smallTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoSmallDRH() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementYes();
        await sdoActions.selectSmallTrackDRH();
        await sdoActions.sdoDRHDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
    );
  }

  async SdoFast() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementNo();
        await sdoActions.selectFastTrack();
        await sdoActions.fastTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoFastOtherRemedy() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementNo();
        await sdoActions.selectFastTrackOtherRemedy();
        await sdoActions.fastTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoTrail() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementYes();
        await sdoActions.allocateSmallTrackNo();
        await sdoActions.orderTypeTrail();
        await sdoActions.fastTrackDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoFastNIHL() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementNo();
        await sdoActions.selectFastTrackNIHL();
        await sdoActions.sdoNIHLDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      nihlFastTrackDirectionsTask,
      { expectedState: CaseState.CASE_PROGRESSION },
    );
  }

  async SdoDisposalHearing() {
    const { sdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoActions.enterJudgementYes();
        await sdoActions.allocateSmallTrackNo();
        await sdoActions.orderTypeDisposalHearing();
        await sdoActions.disposalHearingDetails();
        await sdoActions.orderPreview();
        await sdoActions.submitSdo();
      },
      async () => {
        await sdoActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoDJDisposalHearing() {
    const { sdoDJActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoDJActions.sdoDJSelectDisposalHearing();
        await sdoDJActions.sdoDJDisposalHearingDetails();
        await sdoDJActions.sdoDJOrderPreview();
        await sdoDJActions.sdoDJSubmit();
      },
      async () => {
        await sdoDJActions.sdoDJConfirm();
      },
      ccdEvents.STANDARD_DIRECTION_ORDER_DJ,
      judgeRegion1User,
      summaryJudgmentDirections,
    );
  }

  async SdoDJTrialHearing() {
    const { sdoDJActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await sdoDJActions.sdoDJSelectTrialHearing();
        await sdoDJActions.sdoDJTrialHearingDetails();
        await sdoDJActions.sdoDJOrderPreview();
        await sdoDJActions.sdoDJSubmit();
      },
      async () => {
        await sdoDJActions.sdoDJConfirm();
      },
      ccdEvents.STANDARD_DIRECTION_ORDER_DJ,
      judgeRegion1User,
      summaryJudgmentDirections,
    );
  }

  async NotSuitableSdoSmallTransferCase() {
    const { notSuitableSdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await notSuitableSdoActions.selectTransferCase();
        await notSuitableSdoActions.submitNotSuitableSdo();
      },
      async () => {
        await notSuitableSdoActions.confirmTransferCaseNotSuitableSdo();
      },
      ccdEvents.NOT_SUITABLE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
    );
  }

  async NotSuitableSdoFastOtherReason() {
    const { notSuitableSdoActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await notSuitableSdoActions.selectOtherReason();
        await notSuitableSdoActions.submitNotSuitableSdo();
      },
      async () => {
        await notSuitableSdoActions.confirmOtherReasonNotSuitableSdo();
      },
      ccdEvents.NOT_SUITABLE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async GenerateDirectionsOrderFreeForm() {
    const { generateDirectionsOrderActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await generateDirectionsOrderActions.selectFreeFormOrder();
        await generateDirectionsOrderActions.enterFreeFormOrderDetails();
        await generateDirectionsOrderActions.previewFreeFormOrderDetails();
        await generateDirectionsOrderActions.submitFreeFormOrderDetails();
      },
      async () => {
        await generateDirectionsOrderActions.confirmFreeFormOrderDetails();
      },
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      judgeRegion2User,
      defenceReceivedInTimeOrderThatJudgmentIsSetAside,
      { verifySuccessEvent: false },
    );
  }

  async GenerateDirectionsOrderInter() {
    const { generateDirectionsOrderActions } = this.judgeLaActionsFactory;
    await super.retryCCDEvent(
      async () => {
        await generateDirectionsOrderActions.trackAllocationInter();
        await generateDirectionsOrderActions.intermediateTrackComplexityBand();
        await generateDirectionsOrderActions.selectTemplateInter();
        await generateDirectionsOrderActions.downloadTemplate();
        await generateDirectionsOrderActions.uploadOrder();
        await generateDirectionsOrderActions.submitGenerateDirectionsOrder();
      },
      async () => {
        await generateDirectionsOrderActions.confirmGenerateDirectionsOrder();
      },
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      {
        verifySuccessEvent: false,
        expectedState: CaseState.CASE_PROGRESSION,
      },
    );
  }

  async GenerateDirectionsOrderMulti() {
    const { generateDirectionsOrderActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await generateDirectionsOrderActions.trackAllocationMulti();
        await generateDirectionsOrderActions.selectTemplateMulti();
        await generateDirectionsOrderActions.downloadTemplate();
        await generateDirectionsOrderActions.uploadOrder();
        await generateDirectionsOrderActions.submitGenerateDirectionsOrder();
      },
      async () => {
        await generateDirectionsOrderActions.confirmGenerateDirectionsOrder();
      },
      ccdEvents.GENERATE_DIRECTIONS_ORDER,
      judgeRegion1User,
      multiTrackDirectionsTask,
      {
        verifySuccessEvent: false,
        expectedState: CaseState.CASE_PROGRESSION,
      },
    );
  }

  async DecisionOnReconsiderationRequestUpholdOrder() {
    const { decisionOnReconsiderationRequestActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await decisionOnReconsiderationRequestActions.selectYes();
        await decisionOnReconsiderationRequestActions.orderPreview();
        await decisionOnReconsiderationRequestActions.submitDecisionOnReconsideration();
      },
      async () => {
        await decisionOnReconsiderationRequestActions.confirmDecisionOnReconsiderationRequestUpholdOrder();
      },
      ccdEvents.DECISION_ON_RECONSIDERATION_REQUEST,
      judgeRegion1User,
      decisionOnReconsiderationRequestTask,
      { verifySuccessEvent: false },
    );
  }

  async DecisionOnReconsiderationRequestCreateSdo() {
    const { decisionOnReconsiderationRequestActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await decisionOnReconsiderationRequestActions.selectNoCreateNewSdo();
        await decisionOnReconsiderationRequestActions.submitDecisionOnReconsideration();
      },
      async () => {
        await decisionOnReconsiderationRequestActions.confirmDecisionOnReconsiderationRequestCreateSdo();
      },
      ccdEvents.DECISION_ON_RECONSIDERATION_REQUEST,
      judgeRegion1User,
      decisionOnReconsiderationRequestTask,
      { verifySuccessEvent: false },
    );
  }

  async DecisionOnReconsiderationRequestPreviousOrderNeedsAmending() {
    const { decisionOnReconsiderationRequestActions } = this.judgeLaActionsFactory;
    await super.retryWAEvent(
      async () => {
        await decisionOnReconsiderationRequestActions.selectNoPreviousOrderNeedsAmending();
        await decisionOnReconsiderationRequestActions.submitDecisionOnReconsideration();
      },
      async () => {
        await decisionOnReconsiderationRequestActions.confirmDecisionOnReconsiderationRequestCreateGeneralOrder();
      },
      ccdEvents.DECISION_ON_RECONSIDERATION_REQUEST,
      judgeRegion1User,
      decisionOnReconsiderationRequestTask,
      { verifySuccessEvent: false },
    );
  }

}
