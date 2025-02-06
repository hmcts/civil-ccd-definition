import BaseExuiSteps from '../../../../base/base-exui-steps';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import ExuiDashboardPageFactory from '../../../../pages/exui/exui-dashboard/exui-dashboard-page-factory';
import RequestsFactory from '../../../../requests/requests-factory';
import AddDefendantLitigationFriendPageFactory from '../../../../pages/exui/solicitor-events/add-defendant-litigation-friend/add-defendant-litigation-friend-page-factory';
import ccdEvents from '../../../../constants/ccd-events.ts';
import {
  civilAdminUser,
  claimantSolicitorUser,
  defendantSolicitor1User,
} from '../../../../config/users/exui-users.ts';

@AllMethodsStep()
export default class AddDefendantLitigationFriendSteps extends BaseExuiSteps {
  private addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory;

  constructor(
    addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory,
    exuiDashboardPageFactory: ExuiDashboardPageFactory,
    requestsFactory: RequestsFactory,
    testData: TestData,
  ) {
    super(exuiDashboardPageFactory, requestsFactory, testData);
    this.addDefendantLitigationFriendPageFactory = addDefendantLitigationFriendPageFactory;
  }
  async Defendant1Journey() {
    await super.fetchAndSetCCDCaseData(claimantSolicitorUser, 1738856115883045);
    await this.retryExuiEvent(
      async () => {
        await this.processLitigationFriendPage();
        await this.processSubmitAddLitigationFriend();
        await this.processConfirmAddDefendantLitigationFriend();
      },
      ccdEvents.ADD_DEFENDANT_LITIGATION_FRIEND,
      defendantSolicitor1User,
      { verifySuccessEvent: false },
    );
  }

  async Defendant2Journey() {
    await this.retryExuiEvent(
      async () => {
        await this.processAddLitigationFriendDefendant2();

        await this.processSubmitAddLitigationFriend();

        await this.processConfirmAddDefendantLitigationFriend();
      },
      ccdEvents.ADD_DEFENDANT_LITIGATION_FRIEND,
      civilAdminUser,
      { verifySuccessEvent: false },
    );
  }

  private async processSubmitAddLitigationFriend() {
    const { submitAddDefendantLitigationFriend } = this.addDefendantLitigationFriendPageFactory;
    await submitAddDefendantLitigationFriend.verifyContent(this.ccdCaseData);
    await submitAddDefendantLitigationFriend.submit();
  }

  private async processLitigationFriendPage() {
    const { litigationFriendPage } = this.addDefendantLitigationFriendPageFactory;
    await litigationFriendPage.verifyContent();
    await litigationFriendPage.enterLitigationFriendDetails();
    await litigationFriendPage.submit();
  }

  private async processConfirmAddDefendantLitigationFriend() {
    const { confirmAddDefendantLitigationFriend } = this.addDefendantLitigationFriendPageFactory;
    await confirmAddDefendantLitigationFriend.verifyContent(this.ccdCaseData);
    await confirmAddDefendantLitigationFriend.submit();
  }

  private async processAddLitigationFriendDefendant2() {
    const { defendant2LitigationFriendPage } = this.addDefendantLitigationFriendPageFactory;
    await defendant2LitigationFriendPage.verifyContent();
    await defendant2LitigationFriendPage.enterLitigationFriendDetails();
    await defendant2LitigationFriendPage.submit();
  }
}
