import { test as requestFactories } from './requests-factory-fixtures';
import { test as dataBuilders } from './data-builder-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import { mergeTests } from '@playwright/test';
import ApiDataSteps from '../../steps/api/api-data-steps';
import ApiUserSteps from '../../steps/api/api-user-steps';
import ApiCaseRoleAssignmentSteps from '../../steps/api/api-case-role-assignment-steps';
import ApiCreateClaimSteps from '../../steps/api/ccd-events/solicitor-events/create-claim/api-create-claim-steps';
import ApiCreateClaimSpecSteps from '../../steps/api/ccd-events/solicitor-events/create-claim/api-create-claim-spec-steps';
import ApiServiceRequestSteps from '../../steps/api/api-service-request-steps';

type ApiStepsFixtures = {
  ApiUserSteps: ApiUserSteps;
  ApiDataSteps: ApiDataSteps;
  ApiCreateClaimSteps: ApiCreateClaimSteps;
  ApiCreateClaimSpecSteps: ApiCreateClaimSpecSteps;
  ApiServiceRequestsSteps: ApiServiceRequestSteps;
  ApiCaseRoleAssignmentSteps: ApiCaseRoleAssignmentSteps;
};

export const test = mergeTests(testUtils, requestFactories, dataBuilders).extend<ApiStepsFixtures>({
  ApiUserSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiUserSteps(_requestsFactory, _testData));
  },
  ApiDataSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiDataSteps(_requestsFactory, _testData));
  },
  ApiCreateClaimSteps: async ({ _createClaimDataBuilder, _testData, _requestsFactory }, use) => {
    await use(new ApiCreateClaimSteps(_createClaimDataBuilder, _requestsFactory, _testData));
  },
  ApiCreateClaimSpecSteps: async ({ _createClaimSpecDataBuilder, _testData, _requestsFactory }, use) => {
    await use(new ApiCreateClaimSpecSteps(_createClaimSpecDataBuilder, _requestsFactory, _testData));
  },
  ApiServiceRequestsSteps: async ({ _serviceRequestDataBuilder, _testData, _requestsFactory }, use) => {
    await use(new ApiServiceRequestSteps(_serviceRequestDataBuilder, _requestsFactory, _testData));
  },
  ApiCaseRoleAssignmentSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiCaseRoleAssignmentSteps(_requestsFactory, _testData));
  }
});
