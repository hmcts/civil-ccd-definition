import BasePageActionsFactory from '../../../../base/base-page-actions-factory';
import CaseProceedsInCasemanActions from '../caseworker/case-proceeds-in-caseman-actions.ts';
import CreateCaseFlagsPageFactory from '../../../../pages/exui/hearing-center-admin/create-case-flags/create-case-flags-page-factory';
import CaseProceedsInCasemanPageFactory from '../../../../pages/exui/caseworker/case-proceeds-in-caseman/case-proceeds-in-caseman-page-factory.ts';
import ManageCaseFlagsPageFactory from '../../../../pages/exui/hearing-center-admin/manage-case-flags/manage-case-flags-page-factory';
import CreateCaseFlagsActions from './create-case-flags/create-case-flags-actions';
import CreateCaseFlagsSpecActions from './create-case-flags/create-case-flags-spec-actions';
import ManageCaseFlagsActions from './manage-case-flags-actions';
import ReferToJudgeDefendedClaimActions from './refer-to-judge-defended-claim/refer-to-judge-defended-claim-actions';
import ReferToJudgeDefendedClaimPageFactory from '../../../../pages/exui/hearing-center-admin/refer-to-judge-defended-claim/refer-to-judge-defended-claim-page-factory';
import SetAsideJudgmentActions from './set-aside-judgment/set-aside-judgment-actions';
import SetAsideJudgmentPageFactory from '../../../../pages/exui/hearing-center-admin/set-aside-judgment/set-aside-judgment-page-factory';

export default class HearingCenterAdminActionsFactory extends BasePageActionsFactory {
  get caseProceedsInCasemanActions() {
    return new CaseProceedsInCasemanActions(
      new CaseProceedsInCasemanPageFactory(this.page),
      this.testData,
    );
  }

  get createCaseFlagsActions() {
    return new CreateCaseFlagsActions(new CreateCaseFlagsPageFactory(this.page), this.testData);
  }

  get createCaseFlagsSpecActions() {
    return new CreateCaseFlagsSpecActions(new CreateCaseFlagsPageFactory(this.page), this.testData);
  }

  get manageCaseFlagsActions() {
    return new ManageCaseFlagsActions(new ManageCaseFlagsPageFactory(this.page), this.testData);
  }

  get referToJudgeDefendedClaimActions() {
    return new ReferToJudgeDefendedClaimActions(
      new ReferToJudgeDefendedClaimPageFactory(this.page),
      this.testData,
    );
  }

  get setAsideJudgmentActions() {
    return new SetAsideJudgmentActions(new SetAsideJudgmentPageFactory(this.page), this.testData);
  }
}
