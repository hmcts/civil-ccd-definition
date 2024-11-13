import ApiDataSteps from '../../steps/api/api-data-setup';
import ApiUserSteps from '../../steps/api/api-user-steps';
import { test as base } from './requests-factory-fixtures';

type ApiStepsFixtures = {
  ApiUserSteps: ApiUserSteps;
  ApiDataSteps: ApiDataSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  ApiUserSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiUserSteps(_requestsFactory, _testData));
  },
  ApiDataSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiDataSteps(_requestsFactory, _testData));
  }
});
