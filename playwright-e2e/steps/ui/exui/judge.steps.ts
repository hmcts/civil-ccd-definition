import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeLAActionsFactory from '../../../actions/ui/exui/judge-la/judge-la-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import { judgeRegion1User, judgeRegion2User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/fastTrackDirectionsTask';
import smallClaimDirectionsTask from '../../../constants/wa-tasks/smallClaimDirectionsTask';
import summaryJudgmentDirections from '../../../constants/wa-tasks/summaryJudgmentDirectionsTask';
import defenceReceivedInTimeOrderThatJudgmentIsSetAside from '../../../constants/wa-tasks/defenceReceivedInTimeOrderThatJudgmentIsSetAside';

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

  async SdoSmallTrackSum() {
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
    );
  }

  async SdoSmallTrackNoSum() {
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
    );
  }


  async SdoSmallTrackFromFastTrackClaim() {
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
    );
  }

  async SdoSmallTrackDRH() {
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

  async SdoFastTrack() {
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
    );
  }

  async SdoFastTrackNIHL() {
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
      fastTrackDirectionsTask,
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

  async NotSuitableSdoSmallTrackTransferCase() {
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

  async NotSuitableSdoFastTrackOtherReason() {
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
}
