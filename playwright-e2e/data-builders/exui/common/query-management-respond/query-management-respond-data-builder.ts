import BaseDataBuilder from '../../../../base/base-data-builder';
import {
  ctscAdminUser,
  hearingCenterAdminRegion1User,
} from '../../../../config/users/exui-users';
import { AllMethodsStep } from '../../../../decorators/test-steps';
import User from '../../../../models/users/user';
import queryManagementRespondDataBuilderComponents from './query-management-respond-data-builder-components';

@AllMethodsStep({ methodNamesToIgnore: ['buildData'] })
export default class QueryManagementRespondDataBuilder extends BaseDataBuilder {
  async buildQueryCtsc() {
    return this.buildData({ user: ctscAdminUser });
  }

  async buildQueryHearingCentreAdmin() {
    return this.buildData({ user: hearingCenterAdminRegion1User });
  }

  protected async buildData({
    user,
  }: {
    user: User;
  }) {
    return queryManagementRespondDataBuilderComponents.queryResponsePayload(
      this.ccdCaseData,
      user,
      this.requestsFactory.civilServiceRequests,
      this.retrieveLatestQuery(),
    );
  }
}
