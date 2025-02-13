import BaseTestData from '../../../../base/base-test-data';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import TestData from '../../../../models/test-data';
import AddDefendantLitigationFriendPageFactory from '../../../../pages/exui/claimant-defendant-solicitor/add-defendant-litigation-friend/add-defendant-litigation-friend-page-factory';

@AllMethodsStep()
export default class AddDefendantLitigationFriendActions extends BaseTestData {
  private addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory;

  constructor(
    addDefendantLitigationFriendPageFactory: AddDefendantLitigationFriendPageFactory,
    testData: TestData,
  ) {
    super(testData);
    this.addDefendantLitigationFriendPageFactory = addDefendantLitigationFriendPageFactory;
  }
}
