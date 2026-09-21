import BaseDataBuilder from '../../../../../base/base-data-builder';
import { AllMethodsStep } from '../../../../../decorators/test-steps';
import addDefendantLitigationFriendDataComponents from './add-defendant-litigation-friend-data-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class AddDefendantLitigationFriendDataBuilder extends BaseDataBuilder {
  async buildDataDS1() {
    return this.buildData();
  }

  protected async buildData() {
    const { civilServiceRequests } = this.requestsFactory;

    return {
      ...(await addDefendantLitigationFriendDataComponents.defendantLitigationFriend(
        civilServiceRequests,
      )),
    };
  }
}
