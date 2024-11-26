import ApiDataSteps from '../../steps/api/api-data-setup';
import ApiUserSteps from '../../steps/api/api-user-steps';
import { test as requestFactories } from './requests-factory-fixtures';
import { test as ccdEventDataFactories } from './ccd-event-data-factory-fixtures';
import { test as testUtils } from '../utils/test-utils-fixtures';
import { mergeTests } from '@playwright/test';

type ApiStepsFixtures = {
  ApiUserSteps: ApiUserSteps;
  ApiDataSteps: ApiDataSteps;
};

export const test = mergeTests(testUtils, requestFactories, ccdEventDataFactories).extend<ApiStepsFixtures>({
  ApiUserSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiUserSteps(_requestsFactory, _testData));
  },
  ApiDataSteps: async ({ _testData, _requestsFactory }, use) => {
    await use(new ApiDataSteps(_requestsFactory, _testData));
  }
});
