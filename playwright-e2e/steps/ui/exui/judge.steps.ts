import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeLAActionsFactory from '../../../actions/ui/exui/judge-la/judge-la-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-utils/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import { judgeRegion1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events/ccd-events';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/fastTrackDirectionsTask';
import smallClaimDirectionsTask from '../../../constants/wa-tasks/smallClaimDirectionsTask';
import summaryJudgmentDirections from '../../../constants/wa-tasks/summaryJudgmentDirectionsTask';

@AllMethodsStep()
export default class JudgeSteps extends BaseExui {
  private judgeActionsFactory: JudgeLAActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeActionsFactory: JudgeLAActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.judgeActionsFactory = judgeActionsFactory;
  }

  async Login() {
    await super.idamActions.exuiLogin(judgeRegion1User);
  }

  async SdoSmallTrack() {
    const { sdoActions: standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementYes();
        await standardDirectionsOrderActions.selectSmallTrack();
        await standardDirectionsOrderActions.smallTrackDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitSdo();
      },
      async () => {
        await standardDirectionsOrderActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
    );
  }

  async SdoSmallTrackDRH() {
    const { sdoActions: standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementYes();
        await standardDirectionsOrderActions.selectSmallTrackDRH();
        await standardDirectionsOrderActions.sdoDRHDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitSdo();
      },
      async () => {
        await standardDirectionsOrderActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      smallClaimDirectionsTask,
    );
  }

  async SdoFastTrack() {
    const { sdoActions: standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementNo();
        await standardDirectionsOrderActions.selectFastTrack();
        await standardDirectionsOrderActions.fastTrackDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitSdo();
      },
      async () => {
        await standardDirectionsOrderActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoFastTrackNIHL() {
    const { sdoActions: standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementNo();
        await standardDirectionsOrderActions.selectFastTrackNIHL();
        await standardDirectionsOrderActions.sdoNIHLDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitSdo();
      },
      async () => {
        await standardDirectionsOrderActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoDisposalHearing() {
    const { sdoActions: standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementYes();
        await standardDirectionsOrderActions.allocateSmallTrackNo();
        await standardDirectionsOrderActions.selectDisposalHearing();
        await standardDirectionsOrderActions.disposalHearingDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitSdo();
      },
      async () => {
        await standardDirectionsOrderActions.confirmSdo();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoDJDisposalHearing() {
    const { sdoDJActions: standardDirectionsOrderDJActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderDJActions.sdoDJSelectDisposalHearing();
        await standardDirectionsOrderDJActions.sdoDJDisposalHearingDetails();
        await standardDirectionsOrderDJActions.sdoDJOrderPreview();
        await standardDirectionsOrderDJActions.sdoDJSubmit();
      },
      async () => {
        await standardDirectionsOrderDJActions.sdoDJConfirm();
      },
      ccdEvents.STANDARD_DIRECTION_ORDER_DJ,
      judgeRegion1User,
      summaryJudgmentDirections,
    );
  }

  async SdoDJTrialHearing() {
    const { sdoDJActions: standardDirectionsOrderDJActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderDJActions.sdoDJSelectTrialHearing();
        await standardDirectionsOrderDJActions.sdoDJTrialHearingDetails();
        await standardDirectionsOrderDJActions.sdoDJOrderPreview();
        await standardDirectionsOrderDJActions.sdoDJSubmit();
      },
      async () => {
        await standardDirectionsOrderDJActions.sdoDJConfirm();
      },
      ccdEvents.STANDARD_DIRECTION_ORDER_DJ,
      judgeRegion1User,
      summaryJudgmentDirections,
    );
  }

  async NotSuitableSdoSmallTrackTransferCase() {
    const { notSuitableSdoActions } = this.judgeActionsFactory;
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
    const { notSuitableSdoActions } = this.judgeActionsFactory;
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
}
