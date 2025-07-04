import ExuiDashboardActions from '../../../actions/ui/exui/common/exui-dashboard-actions';
import HearingCenterAdminActionsFactory from '../../../actions/ui/exui/hearing-center-admin/hearing-center-admin-actions-factory';
import IdamActions from '../../../actions/ui/idam/idam-actions';
import BaseExui from '../../../base/base-exui';
import {
  hearingCenterAdminRegion1User,
  hearingCenterAdminRegion2User,
} from '../../../config/users/exui-users';
import ccdEvents from '../../../constants/ccd-events';
import { AllMethodsStep } from '../../../decorators/test-steps';
import TestData from '../../../models/test-data';
import RequestsFactory from '../../../requests/requests-factory';

@AllMethodsStep()
export default class HearingCenterAdminSpecSteps extends BaseExui {
  private hearingCenterAdminActionsFactory: HearingCenterAdminActionsFactory;

  constructor(
    exuiDashboardActions: ExuiDashboardActions,
    idamActions: IdamActions,
    hearingCenterAdminActionsFactory: HearingCenterAdminActionsFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardActions, idamActions, requestsFactory, testData);
    this.hearingCenterAdminActionsFactory = hearingCenterAdminActionsFactory;
  }

  async LoginRegion1() {
    await super.idamActions.exuiLogin(hearingCenterAdminRegion1User);
  }

  async LoginRegion2() {
    await super.idamActions.exuiLogin(hearingCenterAdminRegion2User);
  }

  async CreateCaseLevelCaseFlag() {
    const { createCaseFlagsSpecActions } = this.hearingCenterAdminActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createCaseFlagsSpecActions.selectCaseLevel();
        await createCaseFlagsSpecActions.caseLevelComplexTypeCaseFlag();
      },
      async () => {},
      ccdEvents.CREATE_CASE_FLAGS,
      hearingCenterAdminRegion1User,
    );
  }

  async CreateCaseLevelCaseFlag1v2DS() {
    const { createCaseFlagsSpecActions } = this.hearingCenterAdminActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createCaseFlagsSpecActions.selectCaseLevel();
        await createCaseFlagsSpecActions.caseLevelComplexTypeCaseFlag();
      },
      async () => {},
      ccdEvents.CREATE_CASE_FLAGS,
      hearingCenterAdminRegion1User,
    );
  }

  async CreateClaimant1CaseFlag() {
    const { createCaseFlagsSpecActions } = this.hearingCenterAdminActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createCaseFlagsSpecActions.selectClaimant1();
        await createCaseFlagsSpecActions.claimant1SepcialMeasureCaseFlag();
      },
      async () => {},
      ccdEvents.CREATE_CASE_FLAGS,
      hearingCenterAdminRegion1User,
    );
  }

  async CreateClaimant1CaseFlag1v2DS() {
    const { createCaseFlagsSpecActions } = this.hearingCenterAdminActionsFactory;
    await super.retryExuiEvent(
      async () => {
        await createCaseFlagsSpecActions.selectClaimant1();
        await createCaseFlagsSpecActions.claimant1SepcialMeasureCaseFlag();
      },
      async () => {},
      ccdEvents.CREATE_CASE_FLAGS,
      hearingCenterAdminRegion1User,
    );
  }
}
