import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import JudgeActionsFactory from '../../../actions/ui/exui/judge/judge-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';
import { judgeRegion1User } from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import fastTrackDirectionsTask from '../../../constants/wa-tasks/fastTrackDirectionsTask';

@AllMethodsStep()
export default class JudgeSteps extends BaseExui {
  private judgeActionsFactory: JudgeActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    judgeActionsFactory: JudgeActionsFactory,
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
    const { standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementYes();
        await standardDirectionsOrderActions.selectSmallTrack();
        await standardDirectionsOrderActions.smallTrackDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitStandardDirectionsOrder();
      },
      async () => {
        await standardDirectionsOrderActions.confirmStandardDirectionsOrder();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoSmallTrackR2() {
    const { standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementYes();
        await standardDirectionsOrderActions.selectSmallTrackR2();
        await standardDirectionsOrderActions.smallTrackDetailsR2();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitStandardDirectionsOrder();
      },
      async () => {
        await standardDirectionsOrderActions.confirmStandardDirectionsOrder();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoFastTrack() {
    const { standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementNo();
        await standardDirectionsOrderActions.selectFastTrack();
        await standardDirectionsOrderActions.fastTrackDetails();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitStandardDirectionsOrder();
      },
      async () => {
        await standardDirectionsOrderActions.confirmStandardDirectionsOrder();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoFastTrackR2() {
    const { standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementNo();
        await standardDirectionsOrderActions.selectFastTrackR2();
        await standardDirectionsOrderActions.fastTrackDetailsR2();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitStandardDirectionsOrder();
      },
      async () => {
        await standardDirectionsOrderActions.confirmStandardDirectionsOrder();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }

  async SdoDisposalHearing() {
    const { standardDirectionsOrderActions } = this.judgeActionsFactory;
    await super.retryWAEvent(
      async () => {
        await standardDirectionsOrderActions.enterJudgementYes();
        await standardDirectionsOrderActions.allocateSmallTrackNo();
        await standardDirectionsOrderActions.selectDisposalHearing();
        await standardDirectionsOrderActions.submitDisposalHearing();
        await standardDirectionsOrderActions.orderPreview();
        await standardDirectionsOrderActions.submitStandardDirectionsOrder();
      },
      async () => {
        await standardDirectionsOrderActions.confirmStandardDirectionsOrder();
      },
      ccdEvents.CREATE_SDO,
      judgeRegion1User,
      fastTrackDirectionsTask,
    );
  }
}
