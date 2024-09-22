import ApiUsersSteps from '../../steps/api/api-users-steps';
import { test as base } from './requests-factory-fixtures';

type ApiStepsFixtures = {
  ApiUsersSteps: ApiUsersSteps;
};

export const test = base.extend<ApiStepsFixtures>({
  ApiUsersSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiUsersSteps(_requestsFactory, _testData));
  }
});
